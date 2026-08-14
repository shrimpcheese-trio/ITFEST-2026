"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, type CanvasProps } from "@react-three/fiber";

function supportsWebGL(): boolean {
  try {
    const probe = document.createElement("canvas");
    return !!(probe.getContext("webgl2") || probe.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Mounts the WebGL canvas only once the section scrolls near the viewport and
 * WebGL is available, so three heavy scenes never run simultaneously offscreen.
 */
export function LazyCanvas({
  children,
  fallback = null,
  dpr = [1, 2],
  gl,
  ...props
}: CanvasProps & { fallback?: React.ReactNode }) {
  const holder = useRef<HTMLDivElement>(null);
  const [mounted] = useState(() => typeof window !== "undefined");
  const [supported] = useState(() => (mounted ? supportsWebGL() : true));
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = holder.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "240px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const ready = mounted && supported && visible;

  return (
    <div ref={holder} className="relative h-full w-full">
      {ready ? (
        <Canvas
          dpr={dpr}
          gl={{ antialias: true, powerPreference: "high-performance", ...gl }}
          {...props}
        >
          {children}
        </Canvas>
      ) : (
        fallback
      )}
    </div>
  );
}