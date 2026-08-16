import { NextResponse } from "next/server";
import { groq } from "@/lib/groq";
import {
  buildSystemPrompt,
  inspectUserMessage,
  judgeWithGuardModel,
  trimConversation,
} from "@/lib/chat-guard";

type ChatMessage = { role: "user" | "assistant"; content: string };

type ChatResponse = {
  status: "ok" | "refused" | "offline" | "error";
  message?: string;
};

type GroqCompletion = {
  choices?: { message?: { content?: string } }[];
};

export async function POST(request: Request): Promise<NextResponse<ChatResponse>> {
  let body: { locale?: string; messages?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ status: "error" } satisfies ChatResponse, {
      status: 400,
    });
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
    return NextResponse.json({ status: "error" } satisfies ChatResponse, {
      status: 400,
    });
  }

  const guard = inspectUserMessage(last.content);
  if (!guard.ok) {
    return NextResponse.json(
      {
        status: guard.reason === "jailbreak" ? "refused" : "error",
      } satisfies ChatResponse,
    );
  }
  history[history.length - 1] = { ...last, content: guard.text };

  if (!groq.apiKey) {
    return NextResponse.json({ status: "offline" } satisfies ChatResponse);
  }

  if (await judgeWithGuardModel(guard.text)) {
    return NextResponse.json({ status: "refused" } satisfies ChatResponse);
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
      messages: [
        { role: "system", content: buildSystemPrompt(locale) },
        ...trimmed,
      ],
    }),
  });

  if (!completion.ok) {
    return NextResponse.json({ status: "error" } satisfies ChatResponse);
  }

  const data = (await completion.json()) as GroqCompletion;
  const reply = data.choices?.[0]?.message?.content;
  if (typeof reply !== "string" || !reply.trim()) {
    return NextResponse.json({ status: "error" } satisfies ChatResponse);
  }

  return NextResponse.json({
    status: "ok",
    message: reply.trim(),
  } satisfies ChatResponse);
}