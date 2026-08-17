"use client";

import { useEffect, useState } from "react";
import { m, useMotionValue, useSpring } from "motion/react";
import { useTranslations } from "next-intl";
import { useActiveModel } from "@/lib/model-provider";
import { MODEL_ROTATION_INTERVAL_MS } from "@/lib/config/models";

export function ModelRotationIndicator() {
  const t = useTranslations("common");
  const { rotationEpochRef } = useActiveModel();
  const [visible, setVisible] = useState(false);
  const progress = useMotionValue(0);
  const smooth = useSpring(progress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.0005,
  });

  useEffect(() => {
    let raf: number;

    const tick = () => {
      const epoch = rotationEpochRef.current;
      setVisible(epoch !== null);
      if (epoch !== null) {
        const elapsed = Date.now() - epoch;
        progress.set((elapsed % MODEL_ROTATION_INTERVAL_MS) / MODEL_ROTATION_INTERVAL_MS);
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [rotationEpochRef, progress]);

  if (!visible) return null;

  return (
    <div
      role="progressbar"
      aria-label={t("nextModel")}
      className="pointer-events-none fixed inset-x-0 bottom-0 z-30 h-0.5 border-t border-hairline/60 bg-canvas/60"
    >
      <m.div
        style={{ scaleX: smooth }}
        className="h-full w-full origin-left bg-ink/70"
      />
    </div>
  );
}