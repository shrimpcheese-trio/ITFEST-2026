"use client";

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ContactDialog } from "@/components/ui/contact-dialog";

type Plan = {
  name: string;
  price: string;
  period: string;
  popular?: boolean;
  features: string[];
};

export function Pricing() {
  const t = useTranslations("pricing");
  const plans = t.raw("plans") as Plan[];

  return (
    <section id="pricing" className="scroll-mt-20 bg-canvas py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="text-center">
          <h2 className="font-display text-5xl uppercase leading-[0.9] md:text-7xl">
            {t("title")} <span className="text-stone">{t("titleAccent")}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-mute">{t("subtitle")}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => {
            const featured = Boolean(plan.popular);
            return (
              <div
                key={plan.name}
                className={cn(
                  "relative flex flex-col rounded-lg p-8 ring-1",
                  featured
                    ? "bg-ink text-canvas ring-hairline-soft"
                    : "bg-canvas text-ink ring-hairline",
                )}
              >
                {featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-canvas px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink ring-1 ring-hairline">
                    {t("popular")}
                  </span>
                )}

                <p
                  className={cn(
                    "text-xs font-semibold uppercase tracking-[0.22em]",
                    featured ? "text-canvas/60" : "text-mute",
                  )}
                >
                  {plan.name}
                </p>
                <p className="mt-4 font-display text-4xl leading-none md:text-5xl">
                  {plan.price}
                  <span
                    className={cn(
                      "ml-1 text-sm font-medium",
                      featured ? "text-canvas/60" : "text-mute",
                    )}
                  >
                    {plan.period}
                  </span>
                </p>

                <ul
                  className={cn(
                    "mt-8 space-y-3 border-t pt-7",
                    featured ? "border-canvas/15" : "border-hairline",
                  )}
                >
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check
                        className={cn(
                          "mt-0.5 size-4 shrink-0",
                          featured ? "text-success-bright" : "text-success",
                        )}
                      />
                      <span className={featured ? "text-canvas/85" : "text-charcoal"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  variant={featured ? "outline" : "default"}
                  className="mt-8 w-full"
                >
                  <a href="#contact">{t("bookCta")}</a>
                </Button>
              </div>
            );
          })}
        </div>

        <div className="mt-14 flex flex-col items-center gap-5 rounded-lg bg-soft-cloud px-6 py-10 text-center md:flex-row md:justify-between md:px-12 md:text-left">
          <div>
            <p className="font-display text-2xl uppercase leading-tight md:text-3xl">
              {t("quoteTitle")}
            </p>
            <p className="mt-2 max-w-xl text-sm text-mute">{t("quoteDesc")}</p>
          </div>
          <ContactDialog>
            <Button className="shrink-0">{t("quoteCta")}</Button>
          </ContactDialog>
        </div>
      </div>
    </section>
  );
}