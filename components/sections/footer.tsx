"use client";

import { useTranslations } from "next-intl";
import { m } from "motion/react";
import { staggerContainer, fadeUp } from "@/lib/motion/variants";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/ui/logo";
import { NewsletterForm } from "./newsletter-form";
import { siteConfig } from "@/lib/config/site";

const NAV_LINKS = [
  { key: "home", href: "#home" },
  { key: "fleet", href: "#fleet" },
  { key: "services", href: "#about" },
  { key: "experience", href: "#experience" },
  { key: "contact", href: "#contact" },
] as const;

const ABOUT_LINKS = ["story", "team", "careers", "press"] as const;

const SOCIALS: { label: string; path: string }[] = [
  {
    label: "Instagram",
    path: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6zm0 2a2.8 2.8 0 1 1 0 5.6 2.8 2.8 0 0 1 0-5.6zm5-2.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2z",
  },
  {
    label: "X",
    path: "M17.9 3h3l-7.2 8.3L22.5 21h-6.6l-5.2-6.1L4.6 21h-3l7.7-8.9L1.5 3h6.8l4.7 5.6L17.9 3zm-1.2 16.3h1.7L7.6 4.6H5.8l10.9 14.7z",
  },
  {
    label: "YouTube",
    path: "M22.5 8.2s-.2-1.7-.9-2.4c-.9-.9-1.9-.9-2.4-1C16.3 4.5 12 4.5 12 4.5s-4.3 0-7.2.3c-.5.1-1.5.1-2.4 1-.7.7-.9 2.4-.9 2.4S1.2 10.3 1.2 12.4v1.2c0 2.1.3 4.2.3 4.2s.2 1.7.9 2.4c.9.9 2.1.9 2.6 1 1.9.2 7.1.3 7.1.3s4.3 0 7.2-.3c.5-.1 1.5-.1 2.4-1 .7-.7.9-2.4.9-2.4s.3-2.1.3-4.2v-1.2c0-2.1-.3-4.2-.3-4.2zm-13 7V9.5l5.5 2.8-5.5 2.9z",
  },
  {
    label: "Facebook",
    path: "M14 13.5h2.6l.5-3H14V8.7c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.6H8.5v3H11V20h3z",
  },
];

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer
      id="contact"
      className="scroll-mt-20 bg-ink text-canvas overflow-hidden"
    >
      <m.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
        className="mx-auto w-full px-6 pt-16 md:px-10 md:pt-24"
      >
        <div className="grid gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-12 pb-20 border-b border-canvas/10">
          <m.div
            variants={fadeUp}
            className="lg:col-span-4 flex flex-col justify-between"
          >
            <div>
              <Logo className="text-canvas mb-6" />
              <p className="text-sm text-canvas/50 leading-relaxed max-w-sm">
                {t("learnMoreDesc")}
              </p>
            </div>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-10 inline-block text-lg font-medium text-canvas/80 transition-colors hover:text-canvas"
            >
              {siteConfig.email}
            </a>
          </m.div>

          <m.nav
            variants={fadeUp}
            className="lg:col-span-2"
            aria-label={t("navTitle")}
          >
            <h3 className="text-xs font-bold uppercase tracking-widest text-canvas/40 mb-8">
              {t("navTitle")}
            </h3>
            <ul className="space-y-4">
              {NAV_LINKS.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-sm text-canvas/80 transition-colors hover:text-canvas hover:underline underline-offset-4"
                  >
                    {t(`links.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </m.nav>

          <m.nav
            variants={fadeUp}
            className="lg:col-span-2"
            aria-label={t("aboutTitle")}
          >
            <h3 className="text-xs font-bold uppercase tracking-widest text-canvas/40 mb-8">
              {t("aboutTitle")}
            </h3>
            <ul className="space-y-4">
              {ABOUT_LINKS.map((link) => (
                <li key={link}>
                  <a
                    href="#about"
                    className="text-sm text-canvas/80 transition-colors hover:text-canvas hover:underline underline-offset-4"
                  >
                    {t(`aboutLinks.${link}`)}
                  </a>
                </li>
              ))}
            </ul>
          </m.nav>

          <m.div variants={fadeUp} className="lg:col-span-4 lg:pl-10">
            <h3 className="text-xs font-bold uppercase tracking-widest text-canvas/40 mb-8">
              {t("newsletterTitle")}
            </h3>
            <NewsletterForm />
          </m.div>
        </div>

        <m.div
          variants={fadeUp}
          className="flex flex-wrap items-center justify-between gap-6 py-8"
        >
          <p className="text-xs text-canvas/40 uppercase tracking-widest">
            {t("copyright")}
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#about"
              className="text-xs text-canvas/40 uppercase tracking-widest transition-colors hover:text-canvas"
            >
              {t("privacy")}
            </a>
            <div className="flex gap-4">
              {SOCIALS.map((social) => (
                <m.a
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="text-canvas/40 transition-colors hover:text-canvas"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="size-5 fill-current"
                    aria-hidden
                  >
                    <path d={social.path} />
                  </svg>
                </m.a>
              ))}
            </div>
          </div>
        </m.div>

        {/* Massive Watermark */}
        <m.div
          variants={fadeUp}
          className="w-full flex justify-center items-end select-none mt-10 overflow-hidden"
        >
          <span className="font-display text-[18vw] leading-[0.75] uppercase tracking-tighter text-canvas whitespace-nowrap opacity-[0.98]">
            Ventura
          </span>
        </m.div>
      </m.div>
    </footer>
  );
}
