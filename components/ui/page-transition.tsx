"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { Logo } from "@/components/ui/logo";

const MIN_DURATION = 600;
const MAX_DURATION = 2500;
const LOCALE_RE = /^\/(id|en)(?=\/|$)/;

export function PageTransition() {
  const t = useTranslations("common");
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const pathnameRef = useRef(pathname);
  const shownAtRef = useRef(0);
  const shownPathnameRef = useRef(pathname);
  const fallbackTimer = useRef<number | null>(null);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      const url = new URL(href, window.location.origin);
      if (url.origin !== window.location.origin) return;
      if (anchor.target === "_blank") return;

      const targetPath = url.pathname.replace(LOCALE_RE, "") || "/";
      if (targetPath === pathnameRef.current) return;

      setVisible(true);
      shownAtRef.current = Date.now();
      shownPathnameRef.current = pathnameRef.current;

      if (fallbackTimer.current !== null) {
        window.clearTimeout(fallbackTimer.current);
      }
      fallbackTimer.current = window.setTimeout(() => {
        setVisible(false);
      }, MAX_DURATION);
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    if (pathname === shownPathnameRef.current) return;

    const elapsed = Date.now() - shownAtRef.current;
    const remaining = Math.max(0, MIN_DURATION - elapsed);

    const timer = window.setTimeout(() => {
      setVisible(false);
    }, remaining);

    return () => window.clearTimeout(timer);
  }, [visible, pathname]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          role="status"
          aria-live="polite"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-10 bg-canvas"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Logo className="scale-125" />
          </motion.div>
          <div className="h-px w-40 overflow-hidden rounded-full bg-hairline">
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              className="block h-full origin-left bg-ink"
            />
          </div>
          <span className="sr-only">{t("loadingPage")}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}