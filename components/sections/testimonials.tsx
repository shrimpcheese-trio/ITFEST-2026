"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  m,
  PanInfo,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { staggerContainer, fadeUp } from "@/lib/motion/variants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const AVATARS = [
  "/images/avatar-1.webp",
  "/images/avatar-2.webp",
  "/images/avatar-3.webp",
  "/images/avatar-4.webp",
  "/images/avatar-5.webp",
  "/images/avatar-6.webp",
];

function TestimonialCarousel() {
  const t = useTranslations("testimonials");
  const a11y = useTranslations("a11y");
  const cards = t.raw("cards") as {
    quote: string;
    name: string;
    role: string;
  }[];
  const len = cards.length;
  const track = [...cards, ...cards];
  const [perView, setPerView] = useState(1);
  const [index, setIndex] = useState(0);
  const [smooth, setSmooth] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setPerView(mq.matches ? 3 : 1);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const jump = (target: number) => {
    setSmooth(false);
    setIndex(target);
    requestAnimationFrame(() => requestAnimationFrame(() => setSmooth(true)));
  };

  const handleDragEnd = (
    e: MouseEvent | TouchEvent | PointerEvent,
    { offset, velocity }: PanInfo,
  ) => {
    const swipePower = Math.abs(offset.x) * velocity.x;
    if (swipePower < -500 || offset.x < -50) {
      step(1);
    } else if (swipePower > 500 || offset.x > 50) {
      step(-1);
    }
  };

  const step = useCallback(
    (dir: number) => {
      const target = index + dir;
      if (target > len) jump(0);
      else if (target < 0) jump(len);
      else setIndex(target);
    },
    [index, len],
  );

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => step(1), 6000);
    return () => window.clearInterval(timer);
  }, [paused, step]);

  const centerIndex = index + Math.floor(perView / 2);

  return (
    <m.div
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      className="mx-auto max-w-5xl px-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mb-12 text-center px-4">
        <m.h2
          variants={fadeUp}
          className="font-display text-5xl md:text-7xl uppercase leading-[0.9] text-ink"
        >
          {t("title")}
        </m.h2>
        <m.p
          variants={fadeUp}
          className="mt-4 text-mute max-w-lg mx-auto md:text-lg"
        >
          {t("subtitle")}
        </m.p>
      </div>

      <m.div variants={fadeUp} className="overflow-hidden px-1 py-4 md:px-3">
        <m.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
          animate={{ x: `-${index * (100 / perView)}%` }}
          transition={
            smooth
              ? { type: "spring", stiffness: 250, damping: 25 }
              : { duration: 0 }
          }
          className="flex cursor-grab active:cursor-grabbing"
        >
          {track.map((card, slot) => {
            const isActive = slot === centerIndex;
            return (
              <div
                key={`${card.name}-${slot}`}
                className="w-full shrink-0 px-2 md:w-1/3 md:px-3 select-none"
              >
                <m.figure
                  animate={{
                    scale: isActive ? 1 : 0.9,
                    y: isActive ? -8 : 0,
                    opacity: isActive ? 1 : 0.3,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className={cn(
                    "relative h-full flex flex-col justify-between p-8 md:p-10 transition-colors duration-500 rounded-xl border",
                    isActive
                      ? "bg-canvas border-ink shadow-[8px_8px_0_0_rgba(17,17,17,1)]"
                      : "bg-canvas border-hairline shadow-none pointer-events-none",
                  )}
                >
                  <div className="relative z-10 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                      <span className="font-display text-5xl text-ink leading-none block">
                        &ldquo;
                      </span>
                      <div className="flex gap-1">
                        {[0, 1, 2, 3, 4].map((star) => (
                          <Star
                            key={star}
                            className="size-3.5 fill-ink text-ink"
                          />
                        ))}
                      </div>
                    </div>

                    <blockquote className="text-lg md:text-xl leading-relaxed text-charcoal font-medium">
                      {card.quote}
                    </blockquote>
                  </div>

                  <div className="mt-10 pt-6 border-t border-hairline flex items-center gap-4">
                    <div className="relative size-12 overflow-hidden rounded-full shrink-0 grayscale">
                      <Image
                        src={AVATARS[slot % AVATARS.length]}
                        alt={card.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                        draggable={false}
                      />
                    </div>
                    <div>
                      <p className="font-bold text-ink uppercase tracking-wider text-xs">
                        {card.name}
                      </p>
                      <p className="text-xs text-mute uppercase tracking-widest mt-1">
                        {card.role}
                      </p>
                    </div>
                  </div>
                </m.figure>
              </div>
            );
          })}
        </m.div>
      </m.div>

      <m.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="mt-6 flex items-center justify-center gap-5"
      >
        <m.button
          variants={fadeUp}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="button"
          onClick={() => step(-1)}
          aria-label={t("prev")}
          className="flex size-10 items-center justify-center rounded-full bg-soft-cloud text-ink transition-colors hover:bg-hairline-soft"
        >
          <ChevronLeft className="size-4" />
        </m.button>

        <div className="flex items-center gap-2">
          {Array.from({ length: len }).map((_, dot) => {
            const active = dot === index % len;
            return (
              <button
                key={dot}
                type="button"
                onClick={() => setIndex(dot)}
                aria-label={a11y("slide", { n: dot + 1 })}
                className={cn(
                  "relative flex h-1.5 items-center justify-center rounded-full transition-all duration-300",
                  active ? "w-6" : "w-1.5",
                )}
              >
                {!active && (
                  <div className="absolute inset-0 rounded-full bg-hairline hover:bg-stone transition-colors" />
                )}
                {active && (
                  <m.div
                    layoutId="activeTestimonialDot"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <m.button
          variants={fadeUp}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="button"
          onClick={() => step(1)}
          aria-label={t("next")}
          className="flex size-10 items-center justify-center rounded-full bg-soft-cloud text-ink transition-colors hover:bg-hairline-soft"
        >
          <ChevronRight className="size-4 pointer-events-none" />
        </m.button>
      </m.div>
    </m.div>
  );
}

function BrandMarquee() {
  const t = useTranslations("testimonials");
  const reduceMotion = useReducedMotion();
  const brands = t.raw("brands") as { name: string; logo: string }[];
  const track = [...brands, ...brands];

  const logo = (brand: { name: string; logo: string }, slot: number) => (
    <Image
      key={`${brand.name}-${slot}`}
      src={brand.logo}
      alt=""
      width={24}
      height={24}
      draggable={false}
      className="mr-16 h-8 w-auto object-contain grayscale opacity-70 transition-opacity duration-300 hover:opacity-100 md:h-10"
    />
  );

  if (reduceMotion) {
    return (
      <div className="mt-20 px-6 md:px-10">
        <ul className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8">
          {brands.map((brand, slot) => (
            <li key={brand.name} className="flex">
              {logo(brand, slot)}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <m.div
      variants={fadeUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-50px" }}
      className="mt-20 px-6 md:px-10"
    >
      <div
        aria-hidden="true"
        className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
      >
        <m.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 45, ease: "linear", repeat: Infinity }}
          className="flex w-max items-center"
        >
          {track.map(logo)}
        </m.div>
      </div>
      <ul className="sr-only">
        {brands.map((brand) => (
          <li key={brand.name}>{brand.name}</li>
        ))}
      </ul>
    </m.div>
  );
}

export function Testimonials() {
  const t = useTranslations("testimonials");
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section id="purchase" className="scroll-mt-20 bg-canvas">
      <div className="px-6 pt-24 md:px-10">
        <TestimonialCarousel />
      </div>

      <BrandMarquee />

      <div ref={containerRef} className="relative mt-12 overflow-hidden">
        <m.div
          style={{ y }}
          className="absolute inset-0 -top-[20%] -bottom-[20%]"
        >
          <Image
            src="/images/testimonials-bg.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </m.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />

        <m.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="relative mx-auto max-w-3xl px-6 pb-36 pt-24 text-center"
        >
          <m.h2
            variants={fadeUp}
            className="font-display text-5xl uppercase leading-[0.9] text-canvas md:text-7xl"
          >
            {t("membershipTitle")}{" "}
            <span className="block text-canvas/50">{t("membershipSub")}</span>
          </m.h2>
          <m.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap justify-center gap-3"
          >
            <m.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex rounded-full"
            >
              <Button asChild>
                <a href="#contact">{t("ctaPrimary")}</a>
              </Button>
            </m.div>
            <m.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex rounded-full"
            >
              <Button
                asChild
                className="border-canvas/30 bg-transparent text-canvas hover:border-canvas/50 hover:bg-canvas/15"
              >
                <a href="#contact">{t("ctaSecondary")}</a>
              </Button>
            </m.div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
