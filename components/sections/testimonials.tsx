"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const AVATARS = [
  "/images/avatar-1.jpg",
  "/images/avatar-2.jpg",
  "/images/avatar-3.jpg",
  "/images/avatar-4.jpg",
  "/images/avatar-5.jpg",
  "/images/avatar-6.jpg",
];

function TestimonialCarousel() {
  const t = useTranslations("testimonials");
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
    <div
      className="mx-auto max-w-5xl px-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="overflow-hidden px-1 md:px-3">
        <div
          className={cn(
            "flex",
            smooth
              ? "transition-transform duration-500 ease-out"
              : "transition-none",
          )}
          style={{ transform: `translateX(-${index * (100 / perView)}%)` }}
        >
          {track.map((card, slot) => (
            <div
              key={`${card.name}-${slot}`}
              className="w-full shrink-0 px-1 py-2 md:w-1/3 md:px-2"
            >
              <figure
                className={cn(
                  "h-full rounded-lg p-8 transition-all duration-500 md:p-10",
                  slot === centerIndex
                    ? "translate-y-0 bg-canvas opacity-100 ring-2 ring-ink md:-translate-y-3"
                    : "translate-y-0 bg-soft-cloud opacity-50 md:translate-y-3 md:opacity-70",
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="relative size-12 overflow-hidden rounded-full">
                    <Image
                      src={AVATARS[slot % AVATARS.length]}
                      alt={card.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex gap-0.5">
                    {[0, 1, 2, 3, 4].map((star) => (
                      <Star key={star} className="size-4 fill-ink text-ink" />
                    ))}
                  </div>
                </div>
                <blockquote className="mt-6 text-lg leading-relaxed text-charcoal">
                  &ldquo;{card.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6">
                  <p className="font-semibold text-ink">{card.name}</p>
                  <p className="text-sm text-mute">{card.role}</p>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label={t("prev")}
          className="flex size-10 items-center justify-center rounded-full bg-soft-cloud text-ink transition-colors hover:bg-hairline-soft"
        >
          <ChevronLeft className="size-4" />
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: len }).map((_, dot) => (
            <button
              key={dot}
              type="button"
              onClick={() => setIndex(dot)}
              aria-label={`Slide ${dot + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all",
                dot === index % len
                  ? "w-6 bg-ink"
                  : "w-1.5 bg-hairline hover:bg-stone",
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => step(1)}
          aria-label={t("next")}
          className="flex size-10 items-center justify-center rounded-full bg-soft-cloud text-ink transition-colors hover:bg-hairline-soft"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}

export function Testimonials() {
  const t = useTranslations("testimonials");

  return (
    <section id="purchase" className="scroll-mt-20 bg-canvas">
      <div className="px-6 pt-24 md:px-10">
        <TestimonialCarousel />
      </div>

      <div className="relative mt-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/testimonials-bg.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/25" />
        </div>

        <div className="relative mx-auto max-w-3xl px-6 pb-36 pt-24 text-center">
          <h2 className="font-display text-5xl uppercase leading-[0.9] text-canvas md:text-7xl">
            {t("title")}{" "}
            <span className="block text-canvas/50">{t("subtitle")}</span>
          </h2>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <a href="#contact">{t("ctaPrimary")}</a>
            </Button>
            <Button
              asChild
              className="border-canvas/30 bg-transparent text-canvas hover:border-canvas/50 hover:bg-canvas/15"
            >
              <a href="#contact">{t("ctaSecondary")}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
