"use client";

import { useTranslations } from "next-intl";
import { LazyCanvas } from "@/components/3d/lazy-canvas";
import { Reveal } from "@/components/ui/reveal";
import { ValuePropsScene } from "@/components/3d/value-props-scene";

export function ValueProps() {
  const t = useTranslations("valueProps");
  const labels = (t.raw("markers") as { label: string }[]).map(
    (marker) => marker.label,
  );

  return (
    <section id="experience" className="scroll-mt-20 bg-canvas py-20 md:py-28">
      <Reveal className="mx-auto max-w-2xl px-6 text-center">
        <h2 className="font-display text-5xl uppercase leading-[0.9] md:text-7xl">
          {t("title")}
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-mute">{t("subtitle")}</p>
      </Reveal>
      <Reveal delay={0.1} className="mx-auto mt-12 h-[460px] max-w-6xl overflow-hidden rounded-lg px-0 md:h-[560px] md:px-6">
        <LazyCanvas
          orthographic
          frameloop="demand"
          camera={{ position: [0, 10, 0], zoom: 56, near: 0.1, far: 100 }}
        >
          <ValuePropsScene labels={labels} />
        </LazyCanvas>
      </Reveal>

      <div className="mx-auto mt-8 grid max-w-6xl grid-cols-2 gap-x-6 gap-y-3 px-6 sm:grid-cols-4 md:hidden">
        {labels.map((label, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-ink/20 font-display text-xs text-ink">
              {index + 1}
            </span>
            <span className="text-xs text-mute">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}