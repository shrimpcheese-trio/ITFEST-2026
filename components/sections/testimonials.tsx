"use client";

import { useState } from "react";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

import "swiper/css";

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
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [realIndex, setRealIndex] = useState(0);

  return (
    <div className="mx-auto max-w-5xl px-0">
      <Swiper
        modules={[Autoplay]}
        loop
        centeredSlides
        slidesPerView={1}
        spaceBetween={8}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        onSwiper={setSwiper}
        onSlideChange={(slide) => setRealIndex(slide.realIndex)}
        breakpoints={{ 768: { slidesPerView: 3, spaceBetween: 16 } }}
        className="!overflow-visible px-1 md:px-3"
      >
        {cards.map((card, slot) => (
          <SwiperSlide key={card.name} className="!h-auto py-2">
            <Card
              className={cn(
                "h-full rounded-lg p-8 ring-2 transition-all duration-500 md:p-10",
                slot === realIndex
                  ? "translate-y-0 bg-canvas opacity-100 ring-ink md:-translate-y-3"
                  : "translate-y-0 bg-soft-cloud opacity-50 ring-transparent md:translate-y-3 md:opacity-70",
              )}
            >
              <div className="flex items-center justify-between gap-4">
                <Avatar size="lg" className="size-12">
                  <AvatarImage src={AVATARS[slot % AVATARS.length]} alt={card.name} />
                  <AvatarFallback>{card.name.charAt(0)}</AvatarFallback>
                </Avatar>
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
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-8 flex items-center justify-center gap-5">
        <Button
          type="button"
          variant="secondary"
          size="icon-lg"
          onClick={() => swiper?.slidePrev()}
          aria-label={t("prev")}
          className="rounded-full"
        >
          <ChevronLeft className="size-4" />
        </Button>

        <div className="flex items-center gap-2">
          {Array.from({ length: len }).map((_, dot) => (
            <button
              key={dot}
              type="button"
              onClick={() => swiper?.slideToLoop(dot)}
              aria-label={`Slide ${dot + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all",
                dot === realIndex
                  ? "w-6 bg-ink"
                  : "w-1.5 bg-hairline hover:bg-stone",
              )}
            />
          ))}
        </div>

        <Button
          type="button"
          variant="secondary"
          size="icon-lg"
          onClick={() => swiper?.slideNext()}
          aria-label={t("next")}
          className="rounded-full"
        >
          <ChevronRight className="size-4" />
        </Button>
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