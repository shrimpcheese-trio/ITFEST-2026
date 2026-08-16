"use client";

import { useState } from "react";
import { RotateCw } from "lucide-react";
import { useTranslations } from "next-intl";
import { m, useScroll, useTransform, useSpring } from "motion/react";
import { staggerContainer, fadeUp, blurUp, springUp } from "@/lib/motion/variants";
import { useReducedMotion } from "@/lib/motion/hooks";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
  const prefersReducedMotion = useReducedMotion();
  
  const { scrollY } = useScroll();
  const smoothScroll = useSpring(scrollY, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const ghostX = useTransform(smoothScroll, [0, 500], ["0%", "-5%"]);
  const ghostOpacity = useTransform(smoothScroll, [0, 300], [1, 0]);

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-canvas"
    >
      <m.div
        aria-hidden
        style={prefersReducedMotion ? {} : { x: ghostX, opacity: ghostOpacity }}
        className="text-watermark pointer-events-none absolute inset-x-0 top-[40%] z-20 text-center font-display text-[30vw] leading-none md:text-[26vw]"
      >
        MCLAREN&nbsp;720S
      </m.div>

      <div className="relative z-20 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-between gap-8 px-6 pb-6 pt-28 md:px-10 md:pt-32">
        <div className="flex flex-wrap items-start justify-between gap-10">
          <m.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="max-w-md"
          >
            <m.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-hairline px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-mute">
                <span className="size-1.5 rounded-full bg-sale" />
                {t("badge")}
              </span>
            </m.div>
            <m.h1 variants={blurUp} className="mt-5 font-display text-[17vw] uppercase leading-[0.82] md:text-8xl lg:text-9xl">
              {t("title")}
            </m.h1>
            <m.p variants={fadeUp} className="mt-4 max-w-sm text-base leading-relaxed text-mute md:text-lg">
              {t("subtitle")}
            </m.p>
            <m.div variants={springUp} className="mt-6 flex flex-wrap gap-3">
              <m.div whileHover={{ y: -2, boxShadow: "0px 10px 20px rgba(17, 17, 17, 0.15)" }} whileTap={{ scale: 0.95 }} className="inline-flex rounded-full">
                <Button asChild>
                  <a href="#fleet">{t("cta")}</a>
                </Button>
              </m.div>
              <m.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }} className="inline-flex rounded-full">
                <Button variant="outline" asChild>
                  <a href="#fleet">{t("ctaSecondary")}</a>
                </Button>
              </m.div>
            </m.div>
          </m.div>

          <div className="flex flex-col gap-3 md:items-end">
            <m.div 
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="flex flex-wrap gap-2.5 md:flex-col md:items-end"
            >
              {TABS.map((tab) => (
                <m.button
                  key={tab}
                  variants={springUp}
                  type="button"
                  onClick={() => setActive(tab)}
                  aria-pressed={active === tab}
                  whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(17, 17, 17, 0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "rounded-full border px-5 py-2 text-sm font-medium transition-colors",
                    active === tab
                      ? "border-ink bg-ink text-canvas shadow-[0_0_15px_rgba(17,17,17,0.2)]"
                      : "border-hairline bg-canvas text-ink hover:border-ink/40",
                  )}
                >
                  {t(`tabs.${tab}`)}
                </m.button>
              ))}
            </m.div>
            <div
              key={active}
              className="max-w-[260px] animate-in fade-in duration-500 md:text-right"
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-stone">
                {t("tabKicker")}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-mute">
                {t(`tabCopy.${active}`)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 h-[52svh] min-h-[380px] md:h-[58svh]">
        <LazyCanvas
          camera={{ position: [-3.4, 1.0, 3.4], fov: 32 }}
          fallback={
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/images/hero-fallback.webp"
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
          <m.div
            animate={prefersReducedMotion ? {} : { x: [-4, 4, -4] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <RotateCw className="size-3.5 text-canvas/80" />
          </m.div>
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-canvas/80">
            {t("dragHint")}
          </span>
        </div>
      </div>
    </section>
  );
}
