import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/reveal";

const STAT_KEYS = ["cars", "cities", "customers", "rating"] as const;

export async function StatsStrip() {
  const t = await getTranslations("stats");

  return (
    <section className="bg-ink py-12 md:py-16">
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-y-12 px-6 md:grid-cols-4 md:px-10">
        {STAT_KEYS.map((key, index) => (
          <Reveal key={key} delay={index * 0.08} className="text-center">
            <p className="font-display text-6xl leading-none text-canvas/[0.13] md:text-8xl">
              {t(key)}
            </p>
            <p className="mt-3 text-xs font-medium uppercase tracking-[0.22em] text-canvas/55">
              {t(`${key}Label`)}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}