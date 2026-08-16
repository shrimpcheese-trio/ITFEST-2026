"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
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

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  const { scrollY } = useScroll();
  const smoothScroll = useSpring(scrollY, { stiffness: 300, damping: 40 });

  const backgroundColor = useTransform(
    smoothScroll,
    [0, 150],
    ["rgba(233, 233, 233, 0)", "rgba(233, 233, 233, 0.85)"],
  );

  const color = useTransform(smoothScroll, [0, 150], ["#1a1a1a", "#1a1a1a"]);

  const borderColor = useTransform(
    smoothScroll,
    [0, 150],
    ["rgba(202, 202, 203, 0.5)", "rgba(255, 255, 255, 0.15)"],
  );

  const backdropFilter = useTransform(
    smoothScroll,
    [0, 150],
    ["blur(0px)", "blur(12px)"],
  );

  const headerPaddingTop = useTransform(
    smoothScroll,
    [0, 150],
    ["0px", "12px"],
  );
  const headerPaddingX = useTransform(smoothScroll, [0, 150], ["0px", "24px"]);
  const borderRadius = useTransform(smoothScroll, [0, 150], ["0px", "9999px"]);

  const progress = useTransform(smoothScroll, [0, 150], [0, 1]);
  const percentSub = useTransform(progress, (p) => p * 100);
  const pxAdd = useTransform(progress, (p) => p * 1240);
  const maxWidth = useMotionTemplate`calc(100% - ${percentSub}% + ${pxAdd}px)`;

  const logoStroke = useTransform(scrollY, [0, 100], ["#fafafa", "#fafafa"]);
  const textColor = useTransform(scrollY, [0, 100], ["#fafafa", "#fafafa"]);

  useEffect(() => {
    if (mobileMenuOpen) {
      wasOpenRef.current = true;
    } else if (wasOpenRef.current) {
      menuBtnRef.current?.focus();
      wasOpenRef.current = false;
    }
  }, [mobileMenuOpen]);

  return (
    <m.header
      className="fixed inset-x-0 top-0 z-50"
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      onKeyDown={(event) => {
        if (event.key === "Escape") setMobileMenuOpen(false);
      }}
      style={{
        paddingTop: headerPaddingTop,
        paddingLeft: headerPaddingX,
        paddingRight: headerPaddingX,
      }}
    >
      <m.div
        className="mx-auto flex w-full items-center justify-between gap-6 px-4 py-3 transition-colors"
        style={
          {
            backgroundColor,
            borderColor,
            borderWidth: 1,
            borderStyle: "solid",
            backdropFilter,
            color,
            borderRadius,
            maxWidth,
            "--logo-stroke": logoStroke,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any -- motion style accepts custom CSS properties
          } as any
        }
      >
        <Link
          href="/"
          aria-label={siteConfig.name}
          onClick={() => setMobileMenuOpen(false)}
        >
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
              className="text-sm font-medium opacity-80 transition-opacity hover:opacity-100"
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <m.div
            role="group"
            aria-label={a11y("langSwitch")}
            className="relative flex items-center rounded-full p-1"
            style={{
              borderColor,
              borderWidth: 1,
              borderStyle: "solid",
            }}
          >
            {["id", "en"].map((l) => {
              const isActive = locale === l;
              return (
                <Link
                  key={l}
                  href={pathname}
                  locale={l as Locale}
                  className="relative z-10 flex size-8 items-center justify-center rounded-full text-[11px] font-semibold uppercase tracking-wider"
                >
                  {isActive && (
                    <m.div
                      layoutId="lang-indicator"
                      className="absolute inset-0 -z-10 rounded-full"
                      style={{ backgroundColor: color }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                  <m.span
                    style={{
                      color: isActive ? textColor : "inherit",
                    }}
                    className={
                      isActive
                        ? ""
                        : "opacity-60 transition-opacity hover:opacity-100"
                    }
                  >
                    {l}
                  </m.span>
                </Link>
              );
            })}
          </m.div>

          <ContactDialog>
            <m.button
              className="hidden h-10 items-center justify-center rounded-full px-6 text-sm font-medium transition-transform active:scale-95 sm:inline-flex"
              style={{
                backgroundColor: color,
                color: textColor,
              }}
            >
              {t("getInTouch")}
            </m.button>
          </ContactDialog>

          <m.button
            ref={menuBtnRef}
            type="button"
            className="flex size-10 items-center justify-center rounded-full lg:hidden"
            style={{
              borderColor,
              borderWidth: 1,
              borderStyle: "solid",
            }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? t("closeMenu") : t("openMenu")}
          >
            {mobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </m.button>
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
              id="mobile-menu"
              aria-label={a11y("mainNav")}
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