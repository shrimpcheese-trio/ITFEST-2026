"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.22, 0.61, 0.36, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: "bottom" | "left" | "right";
};

export function Reveal({
  children,
  className,
  delay = 0,
  from = "bottom",
}: RevealProps) {
  const travel = 28;
  const x = from === "left" ? -travel : from === "right" ? travel : 0;
  const y = from === "bottom" ? travel : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px 0px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}