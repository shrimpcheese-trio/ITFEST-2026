# Auto Rental Landing Page — Agent Instructions

## Project Overview

Landing page entry for **Lomba Landing Page, IT FEST 2026** (HMPS Informatika UIN Gus Dur). Theme: Produk Jasa (service) — car rental business. Hero section features an interactive 3D car model (reference: McLaren 720S render).

Goal: a fast, polished, bilingual (ID/EN) landing page that maximizes the judged criteria: UI (25%), functionality (25%), responsiveness (15%), code quality (20%), presentation (15%).

---

## Technology Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js (App Router) or React/Vite — pick one, stay consistent |
| UI | Tailwind CSS (+ shadcn/ui optional) |
| 3D | three.js or `<model-viewer>` web component |
| i18n | `next-intl` or `react-i18next` |
| Language | TypeScript |

**Banned (disqualifying):** Wix, Webflow, Google Sites, Squarespace, or any no-code website builder.

---

## Repository Structure

```text
app/                  — routes/pages
components/
  sections/           — Navbar, Hero, About, Fleet/Services, Gallery, Testimonials, Contact, Footer
  ui/                 — base reusable components (buttons, cards, badges)
  3d/                 — car model component + loader/fallback logic
lib/
  i18n/               — locale config, helpers
public/
  models/             — 3d model assets (gltf/glb, compressed)
messages/
  id.json             — Indonesian strings
  en.json             — English strings
docs/
  DESIGN.md            — design tokens, from design.md provided separately
```

---

## Architecture Principles

1. **No hardcoded UI text.** Every user-facing string goes through a translation key, sourced from `messages/id.json` / `messages/en.json`.
2. **3D model is isolated.** Model logic lives in its own component with a loading state and a static-image fallback — never blocks first paint of the rest of the hero.
3. **Design tokens over ad-hoc values.** Colors/type/spacing come from `DESIGN.md` tokens (Tailwind config), not one-off hex codes in components.

---

## Required Structure (guidebook minimum)

Header → Hero (3D car + CTA) → Tentang/About → Layanan/Fleet or Services → Dokumentasi/Gallery → Kontak/Contact → Footer.
Extra sections allowed if relevant to rental business (pricing, testimonials, FAQ, booking form).

---

## 3D Model Rules

- Hero section only.
- Compress geometry + textures (Draco/gltf-transform); keep model low-poly enough not to tank load time.
- Lazy-load the model — don't block LCP/first paint.
- Provide a static image fallback for slow connections or if WebGL unsupported.
- Measure FPS after every change. If janky, strip detail before adding more features. Perf > flash.

---

## Internationalization

- Support Indonesian + English, toggle in header/navbar.
- Default locale: Indonesian (or detect browser locale, EN fallback).
- All strings in `messages/id.json` and `messages/en.json` — no hardcoded text in components.
- Check both languages for text overflow/layout break after translating (ID strings tend to run longer than EN).

---

## Design System

- Follow tokens/typography/component rules from `DESIGN.md` (provided separately) — don't invent colors/fonts outside it.
- Keep visual language consistent across all sections (one type scale, one color system, one icon set).

---

## Judging Criteria Alignment

| Aspect | Weight | What matters |
| --- | --- | --- |
| Desain Visual (UI) | 25% | Consistency, polish, brand identity |
| Fungsionalitas | 25% | Everything works, no broken links/buttons, 3D model loads |
| Responsivitas | 15% | Desktop/laptop/tablet/mobile, no layout breaking |
| Source Code | 20% | Clean structure, sane naming, no dead files, runs standalone |
| Presentasi | 15% | Handled outside code — grand final Q&A |

---

## Browser & Device Support

Test on Chrome, Firefox, Edge. Must render correctly on desktop, laptop, tablet, smartphone.

---

## Git Conventions

Commit messages follow this format:

`<label>: <message>`

Labels: `feat`, `fix`, `chore`, `docs`, `refactor`, `style`, `perf`
Message: imperative, lowercase, no period

Examples:

```text
feat: add hero 3d car model with lazy load
fix: fix nav overflow on mobile viewport
perf: compress gltf textures for hero model
style: align fleet card spacing to design tokens
```

---

## Deployment

- Platform: Netlify, Vercel, or GitHub Pages (allowed per guidebook).
- Keep deployed link live through the entire judging period.
- Before submission: `npm run lint`, `npm run build`, verify both locales, verify 3D model loads on deployed build (not just local).
- Submission = ZIP of source code + live deployment link.

---

## AI-Generated Code Guardrails

Keep codebase looking human-written, not AI-boilerplate.

### Naming

- No `data`, `result`, `response`, `payload`, `value`, `item` as variable names.
- No placeholder names: `test1`, `example`, `foo`, `bar`, `baz`.
- Use realistic content for copy/test data (real rental car names/models, Indonesian city names, plausible IDR prices), not generic "Lorem Ipsum" or "Car 1".

### Structure

- No unnecessary abstraction layers — write what's needed, not what an AI might extrapolate.
- Prefer flat files over deep nesting. No `index.ts` barrel files unless genuinely needed.
- No premature splitting of files that could live together.

### Patterns to Avoid

- Don't repeat the same guard-clause pattern in every function — natural variation is fine.
- No `TODO: implement` or `// will be used later` stubs — build it or leave it out.
- No overly defensive null checks on every parameter.
- No wrapping every function in try/catch — only where recovery is actually possible.
- No `console.log` left in — use proper error handling or remove.
- No JSDoc on trivial getters/setters — only where the *why* isn't obvious.
- Perfectly uniform, copy-pasted-looking code is a red flag — refactor shared logic or explain the divergence.

---

## Boundaries

- ✅ **Always do:** keep 3D model perf-safe, route all text through i18n, follow `DESIGN.md` tokens, test responsiveness before commit.
- 🚫 **Never do:** use a website-builder platform, hardcode ID/EN strings, submit a site that was entered/won another competition, revise submission after deadline.
