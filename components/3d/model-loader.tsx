"use client";

import { Html } from "@react-three/drei";
import { useTranslations } from "next-intl";

export function ModelLoader() {
  const t = useTranslations("common");

  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="size-10 animate-spin rounded-full border-2 border-ink/10 border-t-ink/60" />
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-mute">
          {t("loading")}
        </p>
      </div>
    </Html>
  );
}