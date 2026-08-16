"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { ContactDialog } from "@/components/ui/contact-dialog";
import {
  m,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionTemplate,
  useSpring,
} from "motion/react";
import { staggerContainer, fadeUp } from "@/lib/motion/variants";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/config";
import type { Locale } from "@/i18n/routing";

const LINKS = [
  { key: "home", href: "/#home" },
  { key: "services", href: "/#about" },
  { key: "experience", href: "/#experience" },
  { key: "fleet", href: "/fleet" },
  { key: "contact", href: "/#contact" },
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const a11y = useTranslations("a11y");
  const locale = useLocale();
  const pathname = usePathname();
  const otherLocale = locale === "id" ? "en" : "id";
  const [menuOpen, setMenuOpen] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (menuOpen) {
      wasOpenRef.current = true;
    } else if (wasOpenRef.current) {
      menuBtnRef.current?.focus();
      wasOpenRef.current = false;
    }
  }, [menuOpen]);

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onKeyDown={(event) => {
        if (event.key === "Escape") setMenuOpen(false);
      }}
      className="fixed inset-x-0 top-3 z-50 px-3 md:px-6"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="relative rounded-full border border-hairline bg-canvas/85 backdrop-blur-md">
          <div className="flex items-center justify-between gap-6 px-4 py-3">
            <Link href="/" aria-label={siteConfig.name}>
              <Logo />
            </Link>

            <nav
              aria-label={a11y("mainNav")}
              className="hidden items-center gap-7 lg:flex"
            >
              {LINKS.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className="text-sm text-ink/80 transition-colors hover:text-ink"
                >
                  {t(link.key)}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Button
                asChild
                variant="outline"
                size="icon-lg"
                className="rounded-full text-xs font-semibold uppercase tracking-wider"
              >
                <Link
                  href={pathname}
                  locale={otherLocale}
                  aria-label={a11y("langSwitch")}
                >
                  {locale === "id" ? "EN" : "ID"}
                </Link>
              </Button>
              <ContactDialog>
                <Button className="hidden sm:inline-flex">{t("getInTouch")}</Button>
              </ContactDialog>
              <button
                ref={menuBtnRef}
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
                className="flex size-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-soft-cloud focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink lg:hidden"
              >
                {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {menuOpen && (
              <motion.nav
                id="mobile-menu"
                aria-label={a11y("mainNav")}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden lg:hidden"
              >
                <div className="border-t border-hairline-soft px-4 pb-4 pt-2">
                  {LINKS.map((link) => (
                    <Link
                      key={link.key}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block py-2.5 text-sm text-ink/80 transition-colors hover:text-ink"
                    >
                      {t(link.key)}
                    </Link>
                  ))}
                  <ContactDialog>
                    <Button
                      onClick={() => setMenuOpen(false)}
                      className="mt-3 w-full sm:hidden"
                    >
                      {t("getInTouch")}
                    </Button>
                  </ContactDialog>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </m.div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <m.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-x-3 top-full mt-2 rounded-xl border border-hairline bg-canvas p-6 shadow-2xl lg:hidden text-ink"
          >
            <m.nav
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col gap-5"
            >
              {LINKS.map((link) => (
                <m.div key={link.key} variants={fadeUp}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-2xl font-medium text-ink hover:text-mute transition-colors"
                  >
                    {t(link.key)}
                  </Link>
                </m.div>
              ))}
              <m.div
                variants={fadeUp}
                className="mt-4 border-t border-hairline pt-6"
              >
                <ContactDialog>
                  <Button
                    className="w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t("getInTouch")}
                  </Button>
                </ContactDialog>
              </m.div>
            </m.nav>
          </m.div>
        )}
      </AnimatePresence>
    </m.header>
  );
}
