import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { siteConfig } from "@/lib/config/site";

export type AboutSlug = "story" | "team" | "careers" | "press";

type Member = { name: string; role: string; bio: string; avatar: string };
type Milestone = { year: string; title: string; body: string };
type Opening = { title: string; location: string; description: string };
type Release = { date: string; title: string; body: string };

function PageHeader({ kicker, title, intro }: { kicker: string; title: string; intro: string }) {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-32 md:px-10 md:pt-40">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-mute">
        {kicker}
      </p>
      <h1 className="mt-3 font-display text-5xl uppercase leading-[0.9] md:text-7xl">
        {title}
      </h1>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-mute md:text-lg">
        {intro}
      </p>
    </div>
  );
}

async function StoryBody() {
  const t = await getTranslations("aboutPages.story");
  const paragraphs = t.raw("paragraphs") as string[];
  const milestones = t.raw("milestones") as Milestone[];

  return (
    <>
      <div className="mt-12 space-y-5">
        {paragraphs.map((paragraph) => (
          <p
            key={paragraph.slice(0, 32)}
            className="text-base leading-relaxed text-mute md:text-lg"
          >
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="font-display text-3xl uppercase leading-none md:text-4xl">
          {t("milestonesTitle")}
        </h2>
        <div className="mt-10 space-y-0">
          {milestones.map((milestone, index) => (
            <div key={milestone.year} className="relative border-l border-hairline pl-8 pb-12 last:pb-0">
              <span className="absolute -left-[5px] top-1.5 size-2.5 rounded-full bg-ink" />
              <p className="text-xs font-semibold uppercase tracking-widest text-stone">
                {milestone.year}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-ink">
                {milestone.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mute">
                {milestone.body}
              </p>
              {index < milestones.length - 1 && (
                <div className="pointer-events-none absolute inset-y-0 -left-px w-px bg-hairline" />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

async function TeamBody() {
  const t = await getTranslations("aboutPages.team");
  const members = t.raw("members") as Member[];

  return (
    <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((member) => (
        <figure
          key={member.name}
          className="flex flex-col gap-5 rounded-xl border border-hairline p-6"
        >
          <div className="relative aspect-square w-24 overflow-hidden rounded-full bg-soft-cloud">
            <Image
              src={member.avatar}
              alt={member.name}
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
          <figcaption>
            <h2 className="text-lg font-semibold text-ink">{member.name}</h2>
            <p className="mt-0.5 text-xs font-semibold uppercase tracking-widest text-stone">
              {member.role}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-mute">{member.bio}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

async function CareersBody() {
  const t = await getTranslations("aboutPages.careers");
  const perks = t.raw("perks") as string[];
  const openings = t.raw("openings") as Opening[];

  return (
    <>
      <div className="mt-14 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl uppercase leading-none">
            {t("perksTitle")}
          </h2>
          <ul className="mt-8 space-y-4">
            {perks.map((perk) => (
              <li
                key={perk.slice(0, 32)}
                className="flex items-start gap-3 text-base leading-relaxed text-mute"
              >
                <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-ink" />
                {perk}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-3xl uppercase leading-none">
            {t("openingsTitle")}
          </h2>
          <div className="mt-8 border-t border-hairline">
            {openings.map((opening) => (
              <div
                key={opening.title}
                className="border-b border-hairline py-6"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-base font-semibold text-ink">
                    {opening.title}
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-widest text-stone">
                    {opening.location}
                  </p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-mute">
                  {opening.description}
                </p>
              </div>
            ))}
          </div>
          <a
            href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(
              `${t("openingsTitle")}: ${openings[0]?.title ?? ""}`,
            )}`}
            className="mt-8 inline-block text-sm font-semibold uppercase tracking-widest text-info underline underline-offset-4 transition-colors hover:text-ink"
          >
            {t("applyCta")}
          </a>
        </div>
      </div>
    </>
  );
}

async function PressBody() {
  const t = await getTranslations("aboutPages.press");
  const releases = t.raw("releases") as Release[];

  return (
    <>
      <div className="mt-14">
        <h2 className="font-display text-3xl uppercase leading-none">
          {t("releasesTitle")}
        </h2>
        <div className="mt-8 border-t border-hairline">
          {releases.map((release) => (
            <article
              key={release.title}
              className="border-b border-hairline py-8"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-stone">
                {release.date}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-ink md:text-xl">
                {release.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-mute md:text-base">
                {release.body}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-16 grid gap-10 sm:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl uppercase leading-none">
            {t("mediaKitTitle")}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-mute md:text-base">
            {t("mediaKitBody")}
          </p>
        </div>
        <div>
          <h2 className="font-display text-3xl uppercase leading-none">
            {t("contactTitle")}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-mute md:text-base">
            {t("contactBody")}
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-3 inline-block text-sm font-semibold text-info underline underline-offset-4 transition-colors hover:text-ink"
          >
            {siteConfig.email}
          </a>
        </div>
      </div>
    </>
  );
}

export async function AboutPage({
  locale,
  slug,
}: {
  locale: Locale;
  slug: AboutSlug;
}) {
  const t = await getTranslations({ locale, namespace: `aboutPages.${slug}` });

  const body = {
    story: <StoryBody />,
    team: <TeamBody />,
    careers: <CareersBody />,
    press: <PressBody />,
  }[slug];

  return (
    <>
      <Navbar />
      <main id="main">
        <div className="pb-24 md:pb-32">
          <PageHeader
            kicker={t("kicker")}
            title={t("title")}
            intro={t("intro")}
          />
          <div className="mx-auto max-w-3xl px-6 md:px-10">{body}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}