"use client";

import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { m, useScroll, useTransform } from "motion/react";
import { staggerContainer, fadeUp, scaleIn } from "@/lib/motion/variants";
import { useReducedMotion } from "@/lib/motion/hooks";

export function About() {
  const t = useTranslations("about");
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Left image moves up slightly as we scroll down
  const yLeft = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
  // Right image moves down slightly as we scroll down
  const yRight = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative scroll-mt-20 overflow-hidden bg-canvas py-28 md:py-36"
    >
      <m.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-16 px-6 md:flex-row md:items-start md:px-10"
      >
        {/* Left Image (Larger) */}
        <m.div
          variants={scaleIn}
          className="relative w-full max-w-sm md:w-5/12 lg:w-4/12"
        >
          <m.div style={prefersReducedMotion ? {} : { y: yLeft }}>
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-soft-cloud">
              <Image
                src="/images/about-left.webp"
                alt={t("imageLeftAlt")}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          </m.div>
        </m.div>

        {/* Text Content (Asymmetric, not strictly centered) */}
        <m.div
          variants={staggerContainer}
          className="flex w-full flex-col items-start text-left md:mt-16 md:w-5/12 lg:w-4/12"
        >
          <m.h2
            variants={fadeUp}
            className="font-display text-5xl uppercase leading-[0.9] md:text-6xl lg:text-7xl"
          >
            {t("heading1")} <span className="text-stone">{t("heading2")}</span>
          </m.h2>
          <m.p
            variants={fadeUp}
            className="mt-6 text-base leading-relaxed text-mute md:text-lg"
          >
            {t("paragraph")}
          </m.p>
          <m.div variants={fadeUp} className="mt-9">
            <Link
              href="/about"
              className="group relative inline-flex items-center pb-1 text-sm font-medium uppercase tracking-[0.15em] text-ink transition-colors hover:text-ink/70"
            >
              {t("cta")}
              <span className="absolute bottom-0 left-0 h-[1px] w-full origin-left scale-x-0 bg-ink transition-transform duration-500 ease-[0.4,0,0.2,1] group-hover:scale-x-100" />
            </Link>
          </m.div>
        </m.div>

        {/* Right Image (Smaller, offset) */}
        <m.div
          variants={scaleIn}
          className="hidden relative w-full md:block md:w-3/12 lg:w-3/12 md:mt-32"
        >
          <m.div style={prefersReducedMotion ? {} : { y: yRight }}>
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-soft-cloud">
              <Image
                src="/images/about-right.webp"
                alt={t("imageRightAlt")}
                fill
                sizes="(max-width: 768px) 0px, 25vw"
                className="object-cover"
              />
            </div>
          </m.div>
        </m.div>
      </m.div>
    </section>
  );
}
