import { groq } from "@/lib/groq";
import {
  buildSystemPrompt,
  inspectUserMessage,
  judgeWithGuardModel,
  trimConversation,
} from "@/lib/chat-guard";

type ChatMessage = { role: "user" | "assistant"; content: string };

type StreamEvent = { type: "status" | "chunk" | "done"; status?: string; text?: string };

function encodeEvent(event: StreamEvent): string {
  return `data: ${JSON.stringify(event)}\n\n`;
}

function stream(event: StreamEvent): Response {
  return new Response(encodeEvent(event), {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}

type GroqChunk = {
  choices?: { delta?: { content?: string } }[];
};

export async function POST(request: Request): Promise<Response> {
  let body: { locale?: string; messages?: unknown };
  try {
    body = await request.json();
  } catch {
    return stream({ type: "status", status: "error" });
  }

  const locale = body.locale === "en" ? "en" : "id";
  const rawMessages = Array.isArray(body.messages) ? body.messages : [];

  const history: ChatMessage[] = rawMessages.filter(
    (entry): entry is ChatMessage =>
      typeof entry === "object" &&
      entry !== null &&
      (entry.role === "user" || entry.role === "assistant") &&
      typeof entry.content === "string",
  );

  const last = history[history.length - 1];
  if (!last) {
    return stream({ type: "status", status: "error" });
  }

  const guard = inspectUserMessage(last.content);
  if (!guard.ok) {
    return stream({
      type: "status",
      status: guard.reason === "jailbreak" ? "refused" : "error",
    });
  }
  history[history.length - 1] = { ...last, content: guard.text };

  if (!groq.apiKey) {
    return stream({ type: "status", status: "offline" });
  }

  if (await judgeWithGuardModel(guard.text)) {
    return stream({ type: "status", status: "refused" });
  }

  const trimmed = trimConversation(history);

  const completion = await fetch(`${groq.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${groq.apiKey}`,
    },
    body: JSON.stringify({
      model: groq.model,
      temperature: 0.3,
      max_tokens: 400,
      stream: true,
      messages: [
        { role: "system", content: buildSystemPrompt(locale) },
        ...trimmed,
      ],
    }),
  });

  if (!completion.ok || !completion.body) {
    return stream({ type: "status", status: "error" });
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const reader = completion.body.getReader();

  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      controller.enqueue(encoder.encode(encodeEvent({ type: "status", status: "ok" })));

      let buffer = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          let boundary: number;
          while ((boundary = buffer.indexOf("\n")) !== -1) {
            const line = buffer.slice(0, boundary);
            buffer = buffer.slice(boundary + 1);
            if (!line.startsWith("data:")) continue;

            const payload = line.slice(5).trim();
            if (!payload || payload === "[DONE]") continue;

            let chunk: GroqChunk;
            try {
              chunk = JSON.parse(payload) as GroqChunk;
            } catch {
              continue;
            }

            const delta = chunk.choices?.[0]?.delta?.content;
            if (typeof delta === "string" && delta.length > 0) {
              controller.enqueue(
                encoder.encode(encodeEvent({ type: "chunk", text: delta })),
              );
            }
          }
        }
      } catch {
        // Fall through and end the stream on any read error.
      } finally {
        controller.enqueue(encoder.encode(encodeEvent({ type: "done" })));
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}
