"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { m, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

import { staggerContainer, fadeUp } from "@/lib/motion/variants";
import { CAR_MODELS } from "@/lib/config/models";
import { useActiveModel } from "@/lib/model-provider";

type CarItem = {
  id: string;
  category: "supercar" | "sedan" | "suv";
  name: string;
  price: string;
  image: string;
};

const CATEGORY_ORDER: CarItem["category"][] = ["supercar", "sedan", "suv"];

export function Collection() {
  const t = useTranslations("collection");
  const modelT = useTranslations("models");
  const { modelId, setModelId } = useActiveModel();
  type ModelKey = Parameters<typeof modelT>[0];

  const allCars: CarItem[] = CAR_MODELS.map((car) => {
    const scope = (suffix: string) => `${car.id}.${suffix}` as ModelKey;
    return {
      id: car.id,
      category: car.category,
      name: modelT(scope("name")),
      price: modelT(scope("price")),
      image: car.heroFallback,
    };
  });

  const tabs = ["all", ...CATEGORY_ORDER.filter((category) =>
    allCars.some((car) => car.category === category),
  )];

  const [activeTab, setActiveTab] = useState(0);

  // Filter dataset based on selected tab
  const filteredCars =
    activeTab === 0
      ? allCars
      : allCars.filter((car) => car.category === tabs[activeTab]);

  // Determine which car is featured vs thumbnails
  const featuredCar =
    filteredCars.find((car) => car.id === modelId) ?? filteredCars[0];
  const thumbs = filteredCars.filter((car) => car.id !== featuredCar?.id);

  return (
    <section
      id="fleet"
      className="relative scroll-mt-20 overflow-hidden bg-canvas pb-32 pt-28 md:pt-36"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <m.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <m.h2
            variants={fadeUp}
            className="font-display text-5xl uppercase leading-[0.9] md:text-7xl"
          >
            {t("title")}
          </m.h2>
          <m.p variants={fadeUp} className="mx-auto mt-4 max-w-xl text-mute">
            {t("subtitle")}
          </m.p>
        </m.div>

        <m.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-10 flex flex-wrap justify-center gap-2.5"
        >
          {tabs.map((tab, index) => {
            const isActive = activeTab === index;
            return (
              <m.button
                variants={fadeUp}
                key={tab}
                type="button"
                onClick={() => setActiveTab(index)}
                className={cn(
                  "relative rounded-full px-5 py-2 text-sm font-medium transition-colors",
                  isActive ? "text-canvas" : "text-ink hover:text-ink/60",
                )}
              >
                {isActive && (
                  <m.span
                    layoutId="active-collection-tab"
                    className="absolute inset-0 z-0 rounded-full bg-ink"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {!isActive && (
                  <span className="absolute inset-0 z-0 rounded-full border border-hairline" />
                )}
                <span className="relative z-10">
                  {t(`categories.${tab}` as Parameters<typeof t>[0])}
                </span>
              </m.button>
            );
          })}
        </m.div>

        {/* Main Featured Card */}
        {featuredCar && (
          <button
            type="button"
            onClick={() => setModelId(featuredCar.id)}
            className="relative mt-12 block w-full aspect-[16/9] overflow-hidden rounded-xl bg-canvas text-left focus:outline-none md:aspect-[21/10]"
          >
            <AnimatePresence initial={false}>
              <m.div
                key={featuredCar.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="group absolute inset-0"
              >
                <div className="relative h-full w-full overflow-hidden">
                <m.div
                  className="h-full w-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <Image
                    src={featuredCar.image}
                    alt={featuredCar.name}
                    fill
                    priority
                    sizes="(max-width: 1152px) 100vw, 1152px"
                    className="object-cover"
                  />
                </m.div>

                {/* Editorial-style overlay with sharp pill */}
                <div className="absolute inset-0 bg-black/15 transition-opacity duration-500 group-hover:bg-black/30" />

                <div className="absolute inset-x-0 bottom-0 flex flex-col items-start justify-between gap-4 p-6 md:flex-row md:items-end md:p-10">
                  <div className="translate-y-2 opacity-0 transition-all duration-700 ease-[0.25,0.1,0.25,1] group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-canvas">
                      {t(`categories.${featuredCar.category}` as Parameters<typeof t>[0])}
                    </p>
                    <p className="mt-1.5 font-display text-4xl uppercase leading-none text-canvas md:text-6xl">
                      {featuredCar.name}
                    </p>
                  </div>

                  {/* Action Pill anchoring bottom right */}
                  <div className="flex shrink-0 items-center gap-2 rounded-full bg-canvas/95 px-5 py-2.5 shadow-sm backdrop-blur transition-transform duration-500 group-hover:scale-105">
                    <span className="text-xs font-semibold uppercase tracking-[0.1em] text-mute">
                      {t("from")}
                    </span>
                    <span className="text-sm font-bold text-ink">
                      {featuredCar.price}
                    </span>
                  </div>
                </div>
              </div>
            </m.div>
          </AnimatePresence>
          </button>
        )}

        <m.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6"
        >
          <AnimatePresence initial={false}>
            {thumbs.map((thumb) => (
              <m.div
                key={thumb.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <button
                  type="button"
                  onClick={() => setModelId(thumb.id)}
                  className="group relative flex w-full flex-col text-left focus:outline-none"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-soft-cloud">
                    <m.div
                      className="h-full w-full"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <Image
                        src={thumb.image}
                        alt={thumb.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover"
                      />
                    </m.div>
                  </div>
                  {/* Editorial metadata row below image */}
                  <div className="mt-4 flex flex-col gap-1">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mute">
                      {t(`categories.${thumb.category}` as Parameters<typeof t>[0])}
                    </span>
                    <span className="text-sm font-bold text-ink">
                      {thumb.name}
                    </span>
                    <span className="mt-1 text-sm text-ink/70">
                      {thumb.price}
                    </span>
                  </div>
                </button>
              </m.div>
            ))}
          </AnimatePresence>
        </m.div>
      </div>
    </section>
  );
}