"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ContactDialog } from "@/components/ui/contact-dialog";
import { LazyCanvas } from "@/components/3d/lazy-canvas";
import { ShowcaseScene } from "@/components/3d/showcase-scene";

export function Showcase() {
  const t = useTranslations("showcase");
  const [spinning, setSpinning] = useState(true);

  return (
    <section id="configure" className="scroll-mt-20 bg-canvas pb-24 pt-20 md:pb-32 md:pt-28">
      <h2 className="text-center font-display text-[26vw] uppercase leading-[0.78] text-ink md:text-[15rem]">
        {t("modelName")}
      </h2>

      <div className="relative mx-auto mt-2 max-w-6xl px-4 md:px-10">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-soft-cloud sm:aspect-[16/10]">
          <LazyCanvas
            camera={{ position: [0, 1.7, 6.4], fov: 34 }}
            fallback={
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/images/showcase-alt.jpg"
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
              />
            }
          >
            <ShowcaseScene spinning={spinning} />
          </LazyCanvas>
          <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-hairline-soft ring-inset" />
        </div>

        <button
          type="button"
          onClick={() => setSpinning((value) => !value)}
          aria-pressed={spinning}
          aria-label="360"
          className={cn(
            "absolute bottom-6 left-1/2 flex size-20 -translate-x-1/2 items-center justify-center rounded-full border font-display text-3xl transition-colors",
            spinning
              ? "border-ink bg-ink text-canvas"
              : "border-hairline bg-canvas text-ink hover:border-ink/40",
          )}
        >
          360°
        </button>
      </div>

      <div className="mx-auto mt-10 max-w-xl px-6 text-center">
        <p className="text-xl font-semibold text-ink">{t("tagline")}</p>
        <p className="mt-2 text-sm text-mute">{t("price")}</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <a href="#contact">{t("ctaPrimary")}</a>
          </Button>
          <ContactDialog>
            <Button variant="outline">{t("ctaSecondary")}</Button>
          </ContactDialog>
        </div>
      </div>
    </section>
  );
}