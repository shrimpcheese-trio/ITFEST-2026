import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";

export async function About() {
  const t = await getTranslations("about");

  return (
    <section
      id="about"
      className="relative scroll-mt-20 bg-canvas py-28 md:py-36"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 md:grid-cols-2 md:gap-12 md:px-10 lg:gap-16">
        <div className="relative hidden pb-8 md:block">
          <div className="relative aspect-[4/5] w-[78%] overflow-hidden rounded-lg">
            <Image
              src="/images/about-left.jpg"
              alt={t("imageLeftAlt")}
              fill
              sizes="(max-width: 1024px) 50vw, 40vw"
              className="object-cover"
            />
            <span className="absolute bottom-4 left-4 rounded-full bg-canvas px-4 py-2 text-xs font-medium text-ink ring-1 ring-hairline">
              {t("imageLeftCaption")}
            </span>
          </div>

          <div className="relative -mt-[16%] ml-auto aspect-[4/5] w-[58%] overflow-hidden rounded-lg">
            <Image
              src="/images/about-right.jpg"
              alt={t("imageRightAlt")}
              fill
              sizes="(max-width: 1024px) 40vw, 30vw"
              className="object-cover"
            />
            <span className="absolute bottom-4 left-4 rounded-full bg-canvas px-4 py-2 text-xs font-medium text-ink ring-1 ring-hairline">
              {t("imageRightCaption")}
            </span>
          </div>

          <div className="absolute -bottom-4 left-0 z-10 rounded-full bg-ink px-6 py-3 text-canvas">
            <span className="text-sm font-medium">{t("chip")}</span>
          </div>
        </div>

        <div className="text-center md:text-left">
          <h2 className="font-display text-5xl uppercase leading-[0.9] md:text-7xl">
            {t("heading1")} <span className="text-stone">{t("heading2")}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-mute md:text-lg lg:mx-0">
            {t("paragraph")}
          </p>
          <Button asChild className="mt-9">
            <a href="#experience">{t("cta")}</a>
          </Button>
        </div>
      </div>
    </section>
  );
}