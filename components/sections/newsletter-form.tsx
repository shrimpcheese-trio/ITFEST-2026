"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { m, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function NewsletterForm() {
  const t = useTranslations("footer");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSubscribed(true);
        // Optional: Reset after a few seconds
        setTimeout(() => setSubscribed(false), 3000);
      }}
    >
      <div className="flex gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          {t("newsletterPlaceholder")}
        </label>
        <Input
          id="newsletter-email"
          type="email"
          required
          disabled={subscribed}
          placeholder={t("newsletterPlaceholder")}
          className="h-12 min-w-0 flex-1 rounded-full border-canvas/20 bg-canvas/10 px-5 text-sm text-canvas placeholder:text-canvas/55 focus-visible:border-canvas/60"
        />
        <Button
          type="submit"
          variant="secondary"
          disabled={subscribed}
          className="relative shrink-0 w-28 overflow-hidden transition-all duration-300"
        >
          <AnimatePresence mode="wait">
            {subscribed ? (
              <m.div
                key="success"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="flex items-center gap-2 text-success-foreground"
              >
                <Check className="size-4" />
              </m.div>
            ) : (
              <m.span
                key="default"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                {t("newsletterButton")}
              </m.span>
            )}
          </AnimatePresence>
        </Button>
      </div>
      {subscribed && (
        <p aria-live="polite" className="mt-3 text-sm text-canvas/70">
          {t("newsletterHint")}
        </p>
      )}
    </form>
  );
}
