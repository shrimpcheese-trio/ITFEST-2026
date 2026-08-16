"use client";

import { useTranslations } from "next-intl";
import { m, useInView, animate } from "motion/react";
import { useEffect, useRef } from "react";
import { staggerContainer, fadeUp } from "@/lib/motion/variants";
import { cn } from "@/lib/utils";

const STAT_KEYS = ["cars", "cities", "customers", "rating"] as const;

function Counter({ value }: { value: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView || !nodeRef.current) return;

    const numMatch = value.match(/[\d.]+/);
    if (!numMatch) {
      nodeRef.current.textContent = value;
      return;
    }

    const numStr = numMatch[0];
    const isFloat = numStr.includes(".");
    const num = parseFloat(numStr);

    const prefix = value.substring(0, numMatch.index);
    const suffix = value.substring(numMatch.index! + numStr.length);

    const node = nodeRef.current;

    const controls = animate(0, num, {
      duration: 2.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(v) {
        if (isFloat) {
          node.textContent = prefix + v.toFixed(1) + suffix;
        } else {
          node.textContent = prefix + Math.floor(v) + suffix;
        }
      },
    });

    return () => controls.stop();
  }, [inView, value]);

  return <span ref={nodeRef}>{value.replace(/[\d.]+/, "0")}</span>;
}

export function StatsStrip() {
  const t = useTranslations("stats");

  return (
    <section className="bg-ink py-16 md:py-20 relative overflow-hidden">
      <m.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto grid max-w-[1440px] grid-cols-2 gap-y-12 px-6 md:grid-cols-4 md:px-10"
      >
        {STAT_KEYS.map((key, i) => (
          <m.div key={key} variants={fadeUp} className="text-center relative">
            <p className="font-display text-6xl leading-none text-canvas/[0.13] md:text-8xl">
              <Counter value={t(key)} />
            </p>
            <p className="mt-3 text-xs font-medium uppercase tracking-[0.22em] text-canvas/55">
              {t(`${key}Label`)}
            </p>

            {i < STAT_KEYS.length - 1 && (
              <m.div
                className={cn(
                  "absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-16 bg-white/10 origin-center",
                  i % 2 === 1 ? "hidden md:block" : "block",
                )}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.7,
                  ease: [0.4, 0, 0.2, 1],
                  delay: 0.3 + i * 0.15,
                }}
              />
            )}
          </m.div>
        ))}
      </m.div>
    </section>
  );
}
