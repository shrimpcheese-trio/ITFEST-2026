# Ventura Auto

Landing page for **Lomba Landing Page, IT FEST 2026** (HMPS Informatika UIN Gus Dur).

Built with Next.js 16 (App Router), Tailwind CSS v4, three.js (react-three-fiber + drei), and next-intl for bilingual ID/EN support.

## Features

- **Bilingual** — Indonesian (default) and English, toggled in the navbar (`/id`, `/en`)
- **Interactive 3D** — lazy-loaded GLB car model in the hero with a static image fallback; lightweight 3D scenes in Value Props and Showcase
- **Responsive sections** — Navbar, Hero, Stats, About, Mission, Collection, Value Props, Showcase, Pricing, Testimonials, FAQ, Newsletter, Footer, Contact dialog
- **Design tokens** — all colors/type/spacing come from `DESIGN.md`
- **Env-configurable contact details** — site name, email, and phone read from `NEXT_PUBLIC_*` vars with sane defaults (see `lib/config/site.ts`)

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router) + React 19, TypeScript |
| Styling | Tailwind CSS v4, tw-animate-css |
| UI components | shadcn/ui (Radix primitives), lucide-react icons, motion |
| 3D | three.js, @react-three/fiber, @react-three/drei, gltf-transform (packing) |
| Carousel | swiper |
| i18n | next-intl (route-based ID/EN locales) |
| Tooling | ESLint, PostCSS |

## Getting Started

```bash
npm install
cp .env.example .env.local   # optional — defaults work fine
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Locale routes: `/id` and `/en`.

## Local Verification

Verify against production builds, not the dev server (`next dev` serves stale message modules). For any copy/translation change:

```bash
npm run lint
npm run build
grep -o "Mulai dari" .next/server/app/id.html   # check ID strings
grep -o "Starting from" .next/server/app/en.html # check EN strings
```

## Project Structure

```text
app/[locale]/          — localized routes (layout + page)
components/
  sections/            — Navbar, Hero, Stats, About, Mission, Collection, Value Props, Showcase, Pricing, Testimonials, FAQ, Newsletter, Footer
  ui/                  — base reusable components (button, card, dialog, tabs, …)
  3d/                  — car model, lazy canvas, hero/showcase/value-props scenes
i18n/                  — next-intl routing, config, request
lib/                   — config.ts (env-driven contact details), utils.ts
messages/              — id.json / en.json translation strings
types/                 — i18n type declarations
public/
  images/              — section imagery
  models/              — packed car.glb (hero); raw/ holds the uncompressed source (gitignored)
docs/DESIGN.md         — design tokens and visual language
```

`proxy.ts` (root) wires next-intl's middleware to the routing config. The shipped model in `public/models/car.glb` is the gltfpack-compressed copy — `public/models/raw/` keeps the source, which is gitignored.

## Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (source of truth for i18n checks) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

## Environment Variables

All optional — see `.env.example`. Values are inlined into the client bundle at build time.

| Variable | Default |
| --- | --- |
| `NEXT_PUBLIC_SITE_NAME` | Ventura Auto |
| `NEXT_PUBLIC_ASSISTANT_NAME` | Ventura Auto (chatbot title + system prompt) |
| `NEXT_PUBLIC_SITE_EMAIL` | halo@venturaauto.id |
| `NEXT_PUBLIC_SITE_PHONE` | +62 812 1000 2000 |
| `GROQ_API_KEY` | — (optional; chat shows an offline notice without it) |
| `GROQ_MODEL` | `llama-3.1-8b-instant` |
| `GROQ_GUARD_MODEL` | `llama-3.1-8b-instant` (safety classifier run before the main model) |

> The chatbot widget (`components/ui/chat-widget.tsx`) calls a server-side route (`app/api/chat/route.ts`) that runs a strict jailbreak guard (`lib/chat-guard.ts`) before querying Groq. The guard is two-layered: a regex blocklist, then a separate Groq guard model (see `GROQ_GUARD_MODEL`) that classifies each user message as safe or unsafe; flagged messages are refused without reaching the main model. It needs a serverless deploy (Vercel or Netlify); on pure-static hosting the chat falls back to the offline notice.

## Deployment

Deploy to Netlify, Vercel, or GitHub Pages and keep the link live through the judging period. Before submitting: `npm run lint`, `npm run build`, verify both locales and that the 3D model loads on the deployed build (not just locally). Submission = ZIP of the source plus the live deployment link.