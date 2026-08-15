"use client";

import { useState } from "react";
import { RotateCw } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LazyCanvas } from "@/components/3d/lazy-canvas";
import { HeroScene, type HeroTab } from "@/components/3d/hero-scene";

const TABS: HeroTab[] = [
  "performance",
  "design",
  "safety",
  "luxury",
  "multimedia",
];

export function Hero() {
  const t = useTranslations("hero");
  const [active, setActive] = useState<HeroTab>("performance");

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-canvas"
    >
      <div
        aria-hidden
        className="text-watermark pointer-events-none absolute inset-x-0 top-[40%] z-20 text-center font-display text-[30vw] leading-none md:text-[26vw]"
      >
        MCLAREN&nbsp;720S
      </div>

      <div className="relative z-20 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-between gap-8 px-6 pb-6 pt-28 md:px-10 md:pt-32">
        <div className="flex flex-wrap items-start justify-between gap-10">
          <div className="max-w-md">
            <Badge
              variant="outline"
              className="h-auto gap-2 rounded-full border-hairline px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-mute"
            >
              <span className="size-1.5 rounded-full bg-sale" />
              {t("badge")}
            </Badge>
            <h1 className="mt-5 font-display text-[17vw] uppercase leading-[0.82] md:text-8xl lg:text-9xl">
              {t("title")}
            </h1>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-mute md:text-lg">
              {t("subtitle")}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <a href="#fleet">{t("cta")}</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="#fleet">{t("ctaSecondary")}</a>
              </Button>
            </div>
          </div>

          <Tabs
            value={active}
            onValueChange={(value) => setActive(value as HeroTab)}
            className="flex flex-col gap-3 md:items-end"
          >
            <TabsList className="h-auto flex-wrap gap-2.5 rounded-full bg-transparent p-0 md:flex-col md:items-end">
              {TABS.map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="h-auto flex-none rounded-full border border-hairline bg-canvas px-5 py-2 text-sm font-medium text-ink transition-colors hover:border-ink/40 data-active:border-ink data-active:bg-ink data-active:text-canvas"
                >
                  {t(`tabs.${tab}`)}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent
              value={active}
              className="max-w-[260px] animate-in fade-in duration-500 md:text-right"
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-stone">
                {t("tabKicker")}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-mute">
                {t(`tabCopy.${active}`)}
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="relative z-10 h-[52svh] min-h-[380px] md:h-[58svh]">
        <LazyCanvas
          camera={{ position: [-3.4, 1.0, 3.4], fov: 32 }}
          fallback={
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/images/hero-fallback.jpg"
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
          }
        >
          <HeroScene tab={active} />
        </LazyCanvas>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-44 bg-gradient-to-t from-black to-transparent" />

        <div className="absolute bottom-6 left-4 z-20 md:left-10">
          <div className="rounded-full border border-hairline/50 bg-canvas/90 px-5 py-2.5 backdrop-blur">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-stone">
              {t("priceLabel")}
            </p>
            <p className="font-display text-xl leading-none text-ink">
              {t("price")}
            </p>
          </div>
        </div>

        <div className="absolute bottom-6 right-4 z-20 hidden items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur sm:flex md:right-10">
          <RotateCw className="size-3.5 text-canvas/80" />
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-canvas/80">
            {t("dragHint")}
          </span>
        </div>
      </div>
    </section>
  );
}
