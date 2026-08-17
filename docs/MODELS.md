# Adding / Editing a 3D Car Model

Every car on the site is driven by three coordinated config files. Change a model = touch all three, in both locales.

## 1. Registry + 3D props — `lib/config/models.json`

Each entry in the `CAR_MODELS` array controls how the 3D scene renders:

| Key | Meaning |
| --- | --- |
| `id` | Stable key that links config ↔ messages ↔ highlights. Avoid changing casually. |
| `modelUrl` | Packed GLB under `public/models/`. Must be the packed copy, never the raw source. |
| `heroFallback` / `showcaseFallback` | Static images shown before WebGL is ready. |
| `heroCamera` | Hero framing: `{ position: [x, y, z], fov }`. |
| `targetLength` | Model's target size in meters; `fitToStage` normalizes the car to this. |
| `defaultFeature` | Active tab on load (`performance` / `design` / `safety` / `luxury` / `multimedia`). |
| `features` | Per-tab config: `overrides` (recolor materials by name, e.g. `"Car_Paint": { "color": "#c8102e", "clearcoat": 0.9 }`), `azimuth` (camera angle), `light` + `intensity` (key light). |

Paint-override targets are per-model material names (e.g. mclaren → `Car_Paint`, ferrari → `material`, bmw/mustang → `PaletteMaterial001`, range-rover → `rphong18SG1`). Overrides silently no-op if a material name doesn't exist.

## 2. Display name + copy — `messages/en.json` and `messages/id.json`

Under `models.<id>`:

| Key | Purpose |
| --- | --- |
| `name` | Display name (e.g. `"Shelby GT500"`). |
| `wordmark` | Big display text (e.g. `"SHELBY GT500"`). |
| `subtitle` | Hero subtitle. |
| `price` | Rental price, locale-formatted. |
| `tagline` | Showcase tagline. |
| `tabCopy.*` | Blurb per feature tab. |

Edit **both locales** — each model needs a complete block in `en.json` and `id.json`.

## 3. Highlights — `lib/config/highlights.ts`

`MODEL_HIGHLIGHTS[modelId]` holds 8 markers (label + description, `en`/`id`). Must match the 8 anchors `ValuePropsScene` renders. Missing keys fall back to the first model's highlights — add one so the wrong car's spec never shows.

## Workflow to add a car

1. Pack the raw export: `npx @gltf-transform/cli optimize <raw>.glb public/models/<id>.glb --compress meshopt --texture-compress webp --texture-size 1024 --simplify true --simplify-ratio 0.5 --weld true`. (Node `gltfpack` lacks WebP support — use gltf-transform instead.)
2. Point `modelUrl` at the packed GLB, add fallback images.
3. Register the entry in `lib/config/models.json`.
4. Add the `models.<id>` block to `messages/en.json` + `messages/id.json`.
5. Add 8 highlights to `lib/config/highlights.ts`.
6. Verify: `npm run lint`, `npx tsc --noEmit`, `npm run build`, then grep the SSG output (`.next/server/app/{id,en}.html`) for the new strings.

## Other places to know

- `MODEL_ROTATION_INTERVAL_MS` (8 min) and `getCarModel()` fallback live in `lib/config/models.ts`.
- Showcase camera is fixed in `components/sections/showcase.tsx`.
- The Fleet section (`collection.items`) is separate static data and is not wired to `models.json`.