import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { AboutPage, type AboutSlug } from "@/components/about/about-page";

const ABOUT_SLUGS: AboutSlug[] = ["story", "team", "careers", "press"];

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    ABOUT_SLUGS.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: AboutSlug }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: `aboutPages.${slug}` });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function AboutSlugPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: AboutSlug }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  return <AboutPage locale={locale} slug={slug} />;
}