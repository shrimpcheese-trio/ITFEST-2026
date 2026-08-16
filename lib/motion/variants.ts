import { type Variants } from "motion/react";

// Motion Tokens
export const duration = {
  fast: 0.2,
  base: 0.4,
  slow: 0.7,
};

export const easing = {
  enter: [0.0, 0.0, 0.2, 1] as [number, number, number, number], // easeOut
  exit: [0.4, 0.0, 1, 1] as [number, number, number, number], // easeIn
  smooth: [0.4, 0.0, 0.2, 1] as [number, number, number, number], // easeInOut
};

// Reusable Variants
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: duration.base, ease: easing.enter },
  },
  exit: {
    opacity: 0,
    transition: { duration: duration.fast, ease: easing.exit },
  },
};

export const fadeUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: easing.enter },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: { duration: duration.fast, ease: easing.exit },
  },
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.base, ease: easing.enter },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: duration.fast, ease: easing.exit },
  },
};

export const blurUp: Variants = {
  initial: { opacity: 0, y: 30, filter: "blur(8px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: duration.slow, ease: easing.smooth },
  },
  exit: {
    opacity: 0,
    y: 10,
    filter: "blur(4px)",
    transition: { duration: duration.fast, ease: easing.exit },
  },
};

export const springUp: Variants = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 25 },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: duration.fast, ease: easing.exit },
  },
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};
