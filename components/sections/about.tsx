import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";

export async function About() {
  const t = await getTranslations("about");

  return (
    <section
      id="about"
      className="relative scroll-mt-20 overflow-hidden bg-canvas py-28 md:py-36"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-5xl uppercase leading-[0.9] md:text-7xl">
          {t("heading1")} <span className="text-stone">{t("heading2")}</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-mute md:text-lg">
          {t("paragraph")}
        </p>
        <Button asChild className="mt-9">
          <a href="#experience">{t("cta")}</a>
        </Button>
      </div>

      <div className="pointer-events-none absolute left-[-6%] top-1/2 hidden w-64 -translate-y-1/2 -rotate-3 md:block lg:w-80">
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
          <Image
            src="/images/about-left.jpg"
            alt={t("imageLeftAlt")}
            fill
            sizes="(max-width: 1024px) 0px, 320px"
            className="object-cover"
          />
        </div>
      </div>

      <div className="pointer-events-none absolute right-[-6%] top-1/2 hidden w-64 -translate-y-1/2 rotate-3 md:block lg:w-80">
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
          <Image
            src="/images/about-right.jpg"
            alt={t("imageRightAlt")}
            fill
            sizes="(max-width: 1024px) 0px, 320px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}