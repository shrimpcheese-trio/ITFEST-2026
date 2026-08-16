import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { StatsStrip } from "@/components/sections/stats-strip";
import { About } from "@/components/sections/about";
import { Collection } from "@/components/sections/collection";
import { ValueProps } from "@/components/sections/value-props";
import { Showcase } from "@/components/sections/showcase";
import { Pricing } from "@/components/sections/pricing";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";
import type { Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return [{ locale: "id" }, { locale: "en" }];
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <StatsStrip />
        <About />
        <Collection />
        <ValueProps />
        <Showcase />
        <Pricing />
        <Faq />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
