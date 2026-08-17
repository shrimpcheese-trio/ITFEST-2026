import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { siteConfig } from "@/lib/config/site";

type LegalSection = { heading: string; body: string };

export async function LegalDoc({
  locale,
  doc,
}: {
  locale: Locale;
  doc: "privacy" | "terms";
}) {
  const t = await getTranslations({ locale, namespace: `legal.${doc}` });
  const sections = t.raw("sections") as LegalSection[];

  return (
    <>
      <Navbar />
      <main id="main">
        <div className="mx-auto max-w-5xl px-6 py-24 md:px-10 md:py-32">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-mute">
            {t("kicker")}
          </p>
          <h1 className="mt-3 font-display text-5xl uppercase leading-[0.9] md:text-7xl">
            {t("title")}
          </h1>
          <p className="mt-6 text-sm text-mute">{t("updated")}</p>
          <p className="mt-8 text-base leading-relaxed text-mute md:text-lg">
            {t("intro")}
          </p>

          <div className="mt-14 border-t border-hairline">
            {sections.map((section) => (
              <section
                key={section.heading}
                className="border-b border-hairline py-8"
              >
                <h2 className="text-base font-semibold text-ink md:text-lg">
                  {section.heading}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-mute md:text-base">
                  {section.body}
                </p>
              </section>
            ))}

            <section className="border-b border-hairline py-8">
              <h2 className="text-base font-semibold text-ink md:text-lg">
                {t("contactHeading")}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-mute md:text-base">
                {t("contactIntro")}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-mute md:text-base">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-info underline underline-offset-2 transition-colors hover:text-ink"
                >
                  {siteConfig.email}
                </a>
                <span aria-hidden className="px-2 text-stone">
                  ·
                </span>
                <a
                  href={siteConfig.phoneTel}
                  className="text-info underline underline-offset-2 transition-colors hover:text-ink"
                >
                  {siteConfig.phone}
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}