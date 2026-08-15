"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterForm() {
  const t = useTranslations("footer");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSubscribed(true);
      }}
    >
      <div className="flex gap-2">
        <Input
          type="email"
          required
          placeholder={t("newsletterPlaceholder")}
          className="h-12 min-w-0 flex-1 rounded-full border-canvas/20 bg-canvas/10 px-5 text-sm text-canvas placeholder:text-canvas/40 focus-visible:border-canvas/60"
        />
        <Button type="submit" variant="secondary" className="shrink-0">
          {t("newsletterButton")}
        </Button>
      </div>
      {subscribed && (
        <p className="mt-3 text-sm text-canvas/70">{t("newsletterHint")}</p>
      )}
    </form>
  );
}