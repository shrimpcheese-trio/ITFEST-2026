"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { Markdown } from "@/components/ui/markdown";

type ChatMessage = { role: "user" | "assistant"; content: string };

type ChatReply = {
  status: "ok" | "refused" | "offline" | "error";
  message?: string;
};

export function ChatWidget() {
  const t = useTranslations("chat");
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages, pending]);

  function toggleOpen() {
    if (!open && messages.length === 0) {
      setMessages([{ role: "assistant", content: t("greeting") }]);
    }
    setOpen((prev) => !prev);
  }

  async function send() {
    const text = draft.trim();
    if (!text || pending) return;

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: text },
    ];
    setMessages(nextMessages);
    setDraft("");
    setPending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages, locale }),
      });
      const data = (await response.json()) as ChatReply;
      const reply =
        data.status === "ok" && data.message
          ? data.message
          : data.status === "refused"
            ? t("refusal")
            : data.status === "offline"
              ? t("offline")
              : t("error");
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: t("error") },
      ]);
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            role="dialog"
            aria-label={t("title", { name: siteConfig.assistantName })}
            className="fixed bottom-24 right-4 z-40 flex h-[min(520px,calc(100svh-7rem))] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-xl bg-canvas shadow-2xl md:right-6"
          >
            <div className="flex items-center justify-between gap-3 bg-ink px-5 py-4 text-canvas">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg bg-canvas/10">
                  <Sparkles className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold leading-tight">
                    {t("title", { name: siteConfig.assistantName })}
                  </p>
                  <p className="text-xs text-canvas/70">{t("subtitle")}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t("close")}
                className="flex size-9 items-center justify-center rounded-full transition-colors hover:bg-canvas/10"
              >
                <X className="size-4" />
              </button>
            </div>

            <div
              ref={listRef}
              className="flex-1 space-y-3 overflow-y-auto bg-soft-cloud/50 px-4 py-4"
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`max-w-[85%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "self-end rounded-br-xs bg-ink text-canvas"
                      : "self-start rounded-bl-xs bg-canvas text-ink ring-1 ring-hairline-soft"
                  }`}
                >
                  {message.role === "user" ? (
                    message.content
                  ) : (
                    <Markdown>{message.content}</Markdown>
                  )}
                </div>
              ))}
              {pending && (
                <div className="flex items-center gap-1 self-start rounded-2xl rounded-bl-md bg-canvas px-4 py-3 ring-1 ring-hairline-soft">
                  <span className="size-1.5 animate-bounce rounded-full bg-stone [animation-delay:-0.3s]" />
                  <span className="size-1.5 animate-bounce rounded-full bg-stone [animation-delay:-0.15s]" />
                  <span className="size-1.5 animate-bounce rounded-full bg-stone" />
                  <span className="sr-only">{t("typing")}</span>
                </div>
              )}
            </div>

            <form
              className="flex items-center gap-2 border-t border-hairline-soft bg-canvas p-3"
              onSubmit={(event) => {
                event.preventDefault();
                send();
              }}
            >
              <label htmlFor="chat-input" className="sr-only">
                {t("placeholder")}
              </label>
              <input
                id="chat-input"
                type="text"
                value={draft}
                maxLength={500}
                onChange={(event) => setDraft(event.target.value)}
                placeholder={t("placeholder")}
                autoComplete="off"
                className="h-11 flex-1 rounded-full border border-hairline bg-canvas px-4 text-sm text-ink outline-none transition-colors placeholder:text-stone focus:border-stone"
              />
              <button
                type="submit"
                disabled={!draft.trim() || pending}
                aria-label={t("send")}
                className="flex size-11 shrink-0 items-center justify-center rounded-full bg-ink text-canvas transition-colors hover:bg-ink/85 disabled:opacity-40"
              >
                <Send className="size-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={toggleOpen}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 18 }}
        aria-label={
          open
            ? t("close")
            : t("launcherLabel", { name: siteConfig.assistantName })
        }
        className="fixed bottom-5 right-4 z-40 flex size-14 items-center justify-center rounded-full bg-ink text-canvas shadow-xl transition-transform hover:scale-105 md:right-6"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "chat"}
            initial={{ opacity: 0, rotate: -60 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 60 }}
            transition={{ duration: 0.15 }}
          >
            {open ? (
              <X className="size-6" />
            ) : (
              <MessageCircle className="size-6" />
            )}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </>
  );
}
