"use client";

import { useState } from "react";
import { RotateCw } from "lucide-react";
import { useTranslations } from "next-intl";
import { m, useScroll, useTransform, useSpring } from "motion/react";
import {
  staggerContainer,
  fadeUp,
  blurUp,
  springUp,
} from "@/lib/motion/variants";
import { useReducedMotion } from "@/lib/motion/hooks";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LazyCanvas } from "@/components/3d/lazy-canvas";
import { HeroScene } from "@/components/3d/hero-scene";
import { FEATURE_TABS, getCarModel, type FeatureTabId } from "@/lib/config/models";
import { useActiveModel, useModelMessages } from "@/lib/model-provider";

function FeaturePanel({
  active,
  onTabChange,
}: {
  active: FeatureTabId;
  onTabChange: (tab: FeatureTabId) => void;
}) {
  const t = useTranslations("hero");
  const model = useModelMessages();

  return (
    <div className="flex w-full flex-col gap-3 md:max-w-xs md:items-end">
      <m.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="flex flex-wrap gap-2.5 sm:flex-row sm:items-center sm:justify-end md:flex-col md:items-end"
      >
        {FEATURE_TABS.map((tab) => (
          <m.button
            key={tab}
            variants={springUp}
            type="button"
            onClick={() => onTabChange(tab)}
            aria-pressed={active === tab}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 15px rgba(17, 17, 17, 0.2)",
            }}
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
        className="min-h-[96px] max-w-[260px] animate-in fade-in duration-500 md:text-right"
      >
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-mute">
          {t("tabKicker")}
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-mute">
          {model(`tabCopy.${active}`)}
        </p>
      </div>
    </div>
  );
}

export function Hero() {
  const t = useTranslations("hero");
  const { modelId } = useActiveModel();
  const model = useModelMessages();
  const carConfig = getCarModel(modelId);
  const prefersReducedMotion = useReducedMotion();

  const [active, setActive] = useState<FeatureTabId>(
    carConfig.defaultFeature,
  );
  const [seenModel, setSeenModel] = useState(modelId);
  if (seenModel !== modelId) {
    setSeenModel(modelId);
    setActive(carConfig.defaultFeature);
  }

  const { scrollY } = useScroll();
  const smoothScroll = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
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
        {model("wordmark")}
      </m.div>

      <div className="relative z-20 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-between gap-8 px-6 pb-6 pt-28 md:px-10 md:pt-32">
        <div className="flex flex-wrap items-start justify-between gap-10">
          <m.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="max-w-md"
          >
            <m.h1
              variants={blurUp}
              className="mt-5 font-display text-[17vw] uppercase leading-[0.82] md:text-8xl lg:text-9xl"
            >
              {model("name")}
            </m.h1>
            <m.p
              variants={fadeUp}
              className="mt-4 max-w-sm text-base leading-relaxed text-mute md:text-lg"
            >
              {model("subtitle")}
            </m.p>
            <m.div variants={springUp} className="mt-6 flex flex-wrap gap-3">
              <m.div
                whileHover={{
                  y: -2,
                  boxShadow: "0px 10px 20px rgba(17, 17, 17, 0.15)",
                }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex rounded-full"
              >
                <Button asChild>
                  <a href="#fleet">{t("cta")}</a>
                </Button>
              </m.div>
              <m.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex rounded-full"
              >
                <Button variant="outline" asChild>
                  <a href="#fleet">{t("ctaSecondary")}</a>
                </Button>
              </m.div>
            </m.div>
          </m.div>

          <FeaturePanel
            key={modelId}
            active={active}
            onTabChange={setActive}
          />
        </div>
      </div>

      <div className="relative z-10 h-[52svh] min-h-[380px] md:h-[58svh]">
        <div aria-hidden className="absolute inset-0">
          <LazyCanvas
            camera={carConfig.heroCamera}
            fallback={
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={carConfig.heroFallback}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
              />
            }
          >
            <HeroScene modelId={modelId} tab={active} />
          </LazyCanvas>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-44 bg-gradient-to-t from-black to-transparent" />

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 0.61, 0.36, 1],
            delay: 0.35,
          }}
          className="absolute bottom-6 left-4 z-20 md:left-10"
        >
          <div className="rounded-full border border-hairline/50 bg-canvas/90 px-5 py-2.5 backdrop-blur">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-mute">
              {t("priceLabel")}
            </p>
            <p className="font-display text-xl leading-none text-ink">
              {model("price")}
            </p>
          </div>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 0.61, 0.36, 1],
            delay: 0.45,
          }}
          className="absolute bottom-6 right-4 z-20 hidden items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur sm:flex md:right-10"
        >
          <RotateCw className="size-3.5 text-canvas/80" />
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-canvas/80">
            {t("dragHint")}
          </span>
        </m.div>
      </div>
    </section>
  );
}
