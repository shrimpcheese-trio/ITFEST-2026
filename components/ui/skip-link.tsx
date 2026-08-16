import { getTranslations } from "next-intl/server";

export async function SkipLink() {
  const t = await getTranslations("a11y");

  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-canvas"
    >
      {t("skipToContent")}
    </a>
  );
}