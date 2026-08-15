"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ITEMS = [
  { category: 1, image: "/images/collection-featured.jpg" },
  { category: 1, image: "/images/collection-supercar.jpg" },
  { category: 2, image: "/images/collection-suv.jpg" },
  { category: 3, image: "/images/collection-sedan.jpg" },
  { category: 4, image: "/images/collection-minibus.jpg" },
];

export function Collection() {
  const t = useTranslations("collection");
  const tabs = t.raw("tabs") as string[];
  const items = t.raw("items") as { name: string; price: string }[];

  const [activeTab, setActiveTab] = useState(0);
  const featuredIndex =
    activeTab === 0
      ? 0
      : ITEMS.findIndex((item) => item.category === activeTab);
  const featured = ITEMS[featuredIndex];
  const featuredMeta =
    featuredIndex === 0 ? t.raw("featured") : items[featuredIndex - 1];
  const thumbs = ITEMS.slice(1);

  return (
    <section
      id="fleet"
      className="relative scroll-mt-20 overflow-hidden bg-canvas pb-32 pt-28 md:pt-36"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="text-center">
          <h2 className="font-display text-5xl uppercase leading-[0.9] md:text-7xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-mute">{t("subtitle")}</p>
        </div>

        <Tabs
          value={String(activeTab)}
          onValueChange={(value) => setActiveTab(Number(value))}
          className="mt-10 flex justify-center"
        >
          <TabsList className="h-auto flex-wrap gap-2.5 rounded-full bg-transparent p-0">
            {tabs.map((tab, index) => (
              <TabsTrigger
                key={tab}
                value={String(index)}
                className="h-auto flex-none rounded-full border border-hairline bg-canvas px-5 py-2 text-sm font-medium text-ink transition-colors hover:border-ink/40 data-active:border-ink data-active:bg-ink data-active:text-canvas"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <Card className="relative mt-12 overflow-hidden rounded-lg ring-0 [--card-spacing:0px]">
          <div className="relative aspect-[16/9] md:aspect-[21/10]">
            <Image
              src={featured.image}
              alt={featuredMeta.name}
              fill
              priority
              sizes="(max-width: 1152px) 100vw, 1152px"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/70 to-transparent p-6 md:p-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-canvas/70">
                  {featuredMeta.category}
                </p>
                <p className="mt-1 font-display text-3xl uppercase leading-none text-canvas md:text-5xl">
                  {featuredMeta.name}
                </p>
              </div>
              <p className="shrink-0 rounded-full bg-canvas px-4 py-2 text-sm font-semibold text-ink">
                {featuredMeta.price}
              </p>
            </div>
          </div>
        </Card>

        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          {thumbs.map((thumb, index) => {
            const meta = items[index];
            const active = activeTab === ITEMS[index + 1].category;
            return (
              <button
                key={meta.name}
                type="button"
                onClick={() => setActiveTab(ITEMS[index + 1].category)}
                className={cn(
                  "group relative block overflow-hidden rounded-lg text-left transition-opacity",
                  active ? "ring-2 ring-ink" : "opacity-80 hover:opacity-100",
                )}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={thumb.image}
                    alt={meta.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-3 pb-2 pt-6 text-sm font-medium text-canvas">
                  {meta.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* <div
        aria-hidden
        className="text-watermark pointer-events-none relative -mb-[4vw] mt-10 text-center font-display text-[19vw] leading-[0.75] md:text-[16vw]"
      >
        {t("title")}
      </div> */}
    </section>
  );
}
