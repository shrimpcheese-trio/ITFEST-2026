import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";

export async function Mission() {
  const t = await getTranslations("mission");

  return (
    <section id="mission" className="relative scroll-mt-20 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/mission-bg.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 py-32 text-center text-canvas md:py-40">
        <h2 className="font-display text-5xl uppercase leading-[0.9] md:text-7xl">
          {t("title")} <span className="text-canvas/50">{t("subtitle")}</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl leading-relaxed text-canvas/75">
          {t("paragraph")}
        </p>
        <Button
          variant="secondary"
          asChild
          className="mt-9 border border-canvas/20"
        >
          <a href="#contact">{t("cta")}</a>
        </Button>
      </div>
    </section>
  );
}