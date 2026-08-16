"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { m } from "motion/react";
import { useReducedMotion } from "@/lib/motion/hooks";
import { staggerContainer, fadeUp, blurUp, scaleIn } from "@/lib/motion/variants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ContactDialog } from "@/components/ui/contact-dialog";
import { LazyCanvas } from "@/components/3d/lazy-canvas";
import { ShowcaseScene } from "@/components/3d/showcase-scene";

export function Showcase() {
  const t = useTranslations("showcase");
  const [spinning, setSpinning] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="configure" className="scroll-mt-20 bg-canvas pb-24 pt-20 md:pb-32 md:pt-28">
      <m.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col"
      >
        <m.h2 
          variants={blurUp}
          className="text-center font-display text-[26vw] uppercase leading-[0.78] text-ink md:text-[15rem]"
        >
          {t("modelName")}
        </m.h2>

        <m.div variants={scaleIn} className="relative mx-auto mt-2 w-full max-w-6xl px-4 md:px-10">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-soft-cloud sm:aspect-[16/10]">
          {/* Subtle ambient light movement in background */}
          <m.div
            animate={prefersReducedMotion ? {} : { 
              x: ["-10%", "10%", "-10%"], 
              y: ["-5%", "5%", "-5%"],
              scale: [1, 1.1, 1]
            }}
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-ink/10 via-transparent to-transparent blur-[80px] opacity-70"
          />
          <LazyCanvas
            camera={{ position: [0, 1.7, 6.4], fov: 34 }}
            fallback={
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/images/showcase-alt.webp"
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

        <m.button
          type="button"
          onClick={() => setSpinning((value) => !value)}
          aria-pressed={spinning}
          aria-label="360"
          animate={prefersReducedMotion ? {} : { scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className={cn(
            "absolute bottom-6 left-1/2 flex size-20 -translate-x-1/2 items-center justify-center rounded-full border font-display text-3xl transition-colors",
            spinning
              ? "border-ink bg-ink text-canvas"
              : "border-hairline bg-canvas text-ink hover:border-ink/40",
          )}
        >
          360°
        </m.button>
        </m.div>

        <div className="mx-auto mt-10 max-w-xl px-6 text-center">
          <m.p variants={fadeUp} className="text-xl font-semibold text-ink">{t("tagline")}</m.p>
          <m.p variants={fadeUp} className="mt-2 text-sm text-mute">{t("price")}</m.p>
          <m.div variants={fadeUp} className="mt-7 flex flex-wrap justify-center gap-3">
            <m.div whileHover={{ y: -2, boxShadow: "0px 10px 20px rgba(17, 17, 17, 0.15)" }} whileTap={{ scale: 0.95 }} className="inline-flex rounded-full">
              <Button asChild>
                <a href="#contact">{t("ctaPrimary")}</a>
              </Button>
            </m.div>
            <ContactDialog>
              <m.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }} className="inline-flex rounded-full">
                <Button variant="outline">{t("ctaSecondary")}</Button>
              </m.div>
            </ContactDialog>
          </m.div>
        </div>
      </m.div>
    </section>
  );
}