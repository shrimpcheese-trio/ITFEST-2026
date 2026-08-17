"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { LazyCanvas } from "@/components/3d/lazy-canvas";
import { ValuePropsScene } from "@/components/3d/value-props-scene";
import { m, AnimatePresence } from "motion/react";
import { staggerContainer, fadeUp } from "@/lib/motion/variants";
import { cn } from "@/lib/utils";
import { useActiveModel } from "@/lib/model-provider";
import { getModelHighlights } from "@/lib/config/highlights";

export function ValueProps() {
  const t = useTranslations("valueProps");
  const locale = useLocale();
  const { modelId } = useActiveModel();
  const markers = getModelHighlights(modelId).map((highlight) => ({
    label: highlight.label[locale],
    description: highlight.description[locale],
  }));
  const labels = markers.map((marker) => marker.label);

  const [activeMarker, setActiveMarker] = useState<number | null>(null);
  const [selectedSpec, setSelectedSpec] = useState<number | null>(null);

  return (
    <section
      id="experience"
      className="scroll-mt-20 bg-canvas py-20 md:py-28 relative overflow-x-clip"
    >
      <div className="mx-auto max-w-2xl px-6 text-center">
        <m.h2
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="font-display text-5xl uppercase leading-[0.9] md:text-7xl"
        >
          {t("title")}
        </m.h2>
        <m.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mx-auto mt-5 max-w-lg text-mute"
        >
          {t("subtitle")}
        </m.p>
      </div>

      <div className="mx-auto mt-12 h-[460px] max-w-6xl overflow-visible rounded-none px-0 md:h-[600px] md:px-6">
        <LazyCanvas
          orthographic
          frameloop="demand"
          camera={{ position: [0, 10, 0], zoom: 56, near: 0.1, far: 100 }}
        >
          <ValuePropsScene
            modelId={modelId}
            labels={labels}
            activeMarker={activeMarker}
            setActiveMarker={setActiveMarker}
            onClickMarker={setSelectedSpec}
          />
        </LazyCanvas>
      </div>

      <m.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
        className="mx-auto mt-8 grid max-w-6xl grid-cols-2 gap-x-6 gap-y-6 px-6 sm:grid-cols-4 md:hidden"
      >
        {labels.map((label, index) => {
          const isActive = activeMarker === index;
          return (
            <m.div
              variants={fadeUp}
              key={index}
              onMouseEnter={() => setActiveMarker(index)}
              onMouseLeave={() => setActiveMarker(null)}
              onClick={() => setSelectedSpec(index)}
              className={cn(
                "group flex flex-col gap-1 transition-all duration-300 cursor-pointer",
                isActive ? "opacity-100" : "opacity-70",
              )}
            >
              <span
                className={cn(
                  "flex size-6 items-center justify-center rounded-full text-[10px] font-bold leading-none transition-colors",
                  isActive
                    ? "bg-ink text-canvas"
                    : "border border-hairline bg-canvas text-ink/60 group-hover:border-ink/40",
                )}
              >
                {index + 1 < 10 ? `0${index + 1}` : index + 1}
              </span>
              <div className="relative w-fit">
                <span
                  className={cn(
                    "text-xs font-semibold uppercase tracking-[0.1em] transition-colors",
                    isActive ? "text-ink" : "text-ink/70 group-hover:text-ink",
                  )}
                >
                  {label}
                </span>
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-[1px] bg-ink transition-all duration-500 ease-out",
                    isActive ? "w-full" : "w-0 group-hover:w-1/2",
                  )}
                />
              </div>
            </m.div>
          );
        })}
      </m.div>

      <div className="mx-auto mt-8 max-w-6xl px-6">
        <AnimatePresence mode="wait">
          {activeMarker !== null && markers[activeMarker] ? (
            <m.div
              key={activeMarker}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="flex items-start gap-4 border-t border-hairline pt-6"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-bold text-canvas">
                {activeMarker + 1 < 10 ? `0${activeMarker + 1}` : activeMarker + 1}
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-mute">
                  {t("spec", { n: activeMarker + 1 })}
                </p>
                <h3 className="font-display text-xl uppercase leading-tight text-ink">
                  {markers[activeMarker].label}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-mute">
                  {markers[activeMarker].description}
                </p>
              </div>
            </m.div>
          ) : (
            <m.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="border-t border-hairline pt-6 text-sm text-mute"
            >
              {t("hoverHint")}
            </m.p>
          )}
        </AnimatePresence>
      </div>

      {/* Info Modal */}
      <AnimatePresence>
        {selectedSpec !== null && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="absolute inset-0 bg-black/30 backdrop-blur-md transition-opacity"
              onClick={() => setSelectedSpec(null)}
            />

            <m.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-md bg-canvas p-8 md:p-10 shadow-2xl"
            >
              <button
                onClick={() => setSelectedSpec(null)}
                className="absolute top-4 right-4 p-2 text-mute hover:text-ink transition-colors"
                aria-label={t("close")}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              <p className="text-[10px] font-bold text-ink/40 tracking-widest uppercase mb-4">
                {t("spec", { n: selectedSpec + 1 })}
              </p>
              <h3 className="font-display text-2xl uppercase leading-tight mb-4 text-ink">
                {markers[selectedSpec].label}
              </h3>
              <p className="text-sm text-mute leading-relaxed">
                {markers[selectedSpec].description}
              </p>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
}
