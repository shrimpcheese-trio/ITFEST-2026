"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { ContactDialog } from "@/components/ui/contact-dialog";

const LINKS = [
  { key: "home", href: "#home" },
  { key: "services", href: "#about" },
  { key: "experience", href: "#experience" },
  { key: "fleet", href: "#fleet" },
  { key: "contact", href: "#contact" },
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const otherLocale = locale === "id" ? "en" : "id";

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 md:px-6">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-6 rounded-full border border-hairline bg-canvas/85 px-4 backdrop-blur-md py-3">
        <Link href="/" aria-label="Ventura Auto">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
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
          <Link
            href={pathname}
            locale={otherLocale}
            className="flex size-10 items-center justify-center rounded-full border border-hairline text-xs font-semibold uppercase tracking-wider text-ink transition-colors hover:bg-soft-cloud"
            aria-label="Switch language"
          >
            {locale === "id" ? "EN" : "ID"}
          </Link>
          {/* <button
            type="button"
            className="relative flex size-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-soft-cloud"
            aria-label={t("fleet")}
          >
            <ShoppingBag className="size-5" />
          </button> */}
          <ContactDialog>
            <Button className="hidden sm:inline-flex">{t("getInTouch")}</Button>
          </ContactDialog>
        </div>
      </div>
    </header>
  );
}
