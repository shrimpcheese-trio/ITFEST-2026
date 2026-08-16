import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { NewsletterForm } from "./newsletter-form";

const NAV_LINKS = [
  { key: "home", href: "#home" },
  { key: "fleet", href: "#fleet" },
  { key: "services", href: "#about" },
  { key: "experience", href: "#experience" },
  { key: "contact", href: "#contact" },
] as const;

const ABOUT_LINKS = [
  "story",
  "team",
  "careers",
  "press",
] as const;

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

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer id="contact" className="scroll-mt-20 bg-ink text-canvas">
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-10 md:py-20">
        <Reveal className="flex flex-wrap items-start justify-between gap-8 border-b border-canvas/10 pb-12">
          <div>
            <Logo className="text-canvas" />
            <p className="mt-4 max-w-xs text-canvas/60">{t("tagline")}</p>
          </div>
          <a
            href={`mailto:${t("email")}`}
            className="text-lg text-canvas/80 transition-colors hover:text-canvas"
          >
            {t("email")}
          </a>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.4fr]">
          <div>
            <p className="text-sm text-canvas/45">{t("learnMoreDesc")}</p>
            <Link
              href="#about"
              className="mt-4 inline-block text-sm font-medium text-canvas underline underline-offset-4 hover:text-canvas/80"
            >
              {t("learnMore")}
            </Link>
          </div>

          <nav aria-label={t("navTitle")}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-canvas/45">
              {t("navTitle")}
            </h3>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-canvas/75 transition-colors hover:text-canvas"
                  >
                    {t(`links.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t("aboutTitle")}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-canvas/45">
              {t("aboutTitle")}
            </h3>
            <ul className="mt-5 space-y-3">
              {ABOUT_LINKS.map((link) => (
                <li key={link}>
                  <a
                    href="#about"
                    className="text-canvas/75 transition-colors hover:text-canvas"
                  >
                    {t(`aboutLinks.${link}`)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-canvas/45">
              {t("newsletterTitle")}
            </h3>
            <div className="mt-5">
              <NewsletterForm />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-canvas/10 pt-8">
          <p className="text-sm text-canvas/50">{t("copyright")}</p>
          <div className="flex items-center gap-3">
            <a
              href="#about"
              className="text-sm text-canvas/50 transition-colors hover:text-canvas"
            >
              {t("privacy")}
            </a>
            <div className="flex gap-2">
              {SOCIALS.map((social) => (
                <Button
                  key={social.label}
                  asChild
                  variant="ghost"
                  size="icon-lg"
                  className="rounded-full border border-canvas/15 text-canvas/70 hover:border-canvas/50 hover:bg-transparent hover:text-canvas"
                >
                  <a href="#" aria-label={social.label}>
                    <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
                      <path d={social.path} />
                    </svg>
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}