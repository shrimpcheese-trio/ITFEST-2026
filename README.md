# Auto Rental Landing Page

Landing page for **Lomba Landing Page, IT FEST 2026** (HMPS Informatika UIN Gus Dur). Theme: Produk Jasa — car rental business, with an interactive 3D car model (McLaren 720S reference) in the hero.

Built with Next.js (App Router), Tailwind CSS, three.js (react-three-fiber), and next-intl for bilingual ID/EN support.

## Features

- **Bilingual** — Indonesian (default) and English, toggled in the navbar
- **Interactive 3D hero** — lazy-loaded GLB car model with a static image fallback
- **Responsive** sections: Hero, Stats, About, Collection/Fleet, Value Props, Showcase, Testimonials, Footer, Contact dialog
- **Design tokens** — all colors/type/spacing come from `DESIGN.md`

## Getting Started

```bash
npm install
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
  sections/            — Navbar, Hero, About, Collection, Value Props, Showcase, Testimonials, Footer
  ui/                  — base reusable components (button, logo, contact dialog)
  3d/                  — car model, lazy canvas, scenes
i18n/                  — next-intl routing/config
messages/              — id.json / en.json translation strings
public/
  images/              — section imagery
  models/              — compressed car.glb (hero); raw/ holds the uncompressed source (gitignored)
docs/DESIGN.md         — design tokens and visual language
```

## Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (source of truth for i18n checks) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

## Deployment

The production build must run clean and both locales must render before submitting. Submit a ZIP of the source plus the live deployment link.