"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type FaqItem = { q: string; a: string };

export function Faq() {
  const t = useTranslations("faq");
  const items = t.raw("items") as FaqItem[];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 bg-canvas py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <h2 className="text-center font-display text-5xl uppercase leading-[0.9] md:text-7xl">
          {t("title")} <span className="text-stone">{t("titleAccent")}</span>
        </h2>

        <div className="mt-14 border-t border-hairline">
          {items.map((item, index) => {
            const expanded = open === index;
            return (
              <div key={item.q} className="border-b border-hairline">
                <button
                  type="button"
                  onClick={() => setOpen(expanded ? null : index)}
                  aria-expanded={expanded}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="text-base font-medium text-ink md:text-lg">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={cn(
                      "size-5 shrink-0 text-mute transition-transform duration-300",
                      expanded && "rotate-180 text-ink",
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-out",
                    expanded
                      ? "grid-rows-[1fr] pb-6 opacity-100"
                      : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl text-sm leading-relaxed text-mute md:text-base">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="font-display text-2xl uppercase md:text-3xl">{t("moreTitle")}</p>
          <Button asChild variant="secondary">
            <a href="#contact">{t("moreCta")}</a>
          </Button>
        </div>
      </div>
    </section>
  );
}