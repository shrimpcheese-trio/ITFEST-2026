"use client";

import { useReducedMotion as useFramerReducedMotion } from "motion/react";

/**
 * A wrapper around Framer Motion's useReducedMotion that provides
 * consistent handling for users who prefer reduced motion.
 * Use this to disable heavy animations like parallax or long staggers.
 */
export function useReducedMotion() {
  const shouldReduceMotion = useFramerReducedMotion();
  
  // We can return the boolean directly, or provide an object with 
  // helper methods if we need more complex logic in the future.
  return shouldReduceMotion === true;
}
