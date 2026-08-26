# Using this in production (Next.js + Tailwind)

This design system is a **guide**, not a component library for your app.

The `components/*.jsx` files here are inline-styled and built to render in a browser sandbox with no build step. Do not copy them into a Next.js project — the Relume React export already gives you the same components as real Tailwind + shadcn/Radix code, and that is what you should ship.

## Division of labour

| Use this repo for | Use the Relume React export for |
|---|---|
| `readme.md` — content fundamentals, visual foundations, iconography | `@/components/ui/*` — the actual components |
| `tokens/*.css` — the values | `globals.css` — Tailwind v4 `@theme` |
| `assets/` — fonts, logo, photography | `components/**` — page sections |
| `guidelines/*.card.html` — visual reference | Page routes |

## Setup

1. Relume → **Export → React**. Copy into your Next.js project.
2. Install the Relume packages the export expects:
   ```
   npm i @relume_io/relume-ui @relume_io/relume-tailwind
   ```
   `@relume_io/relume-ui` is what the export's `relume-icons` imports resolve against — installing it
   fixes the missing-glyph problem (Check, Close, ChevronRight, the social logos, etc.) with no
   substitution needed. Ignore this repo's advice about porting `Icon.jsx`; it was written before
   the package was known to be available.
3. `tailwind.config.js` — add the preset and content globs exactly as the Relume dialog shows.
4. Unzip this design system into `.claude/skills/uplift-path-design/`.
5. Copy `missing-components/*.jsx` into the matching folders (see that README) — Relume's exporter
   drops three components.
6. In your repo's `CLAUDE.md`:

```
Design: follow .claude/skills/uplift-path-design/readme.md.
Components live in @/components/ui (from the Relume export) — never rewrite them.
Never invent colors, shadows, or radii. Every section gets exactly one .scheme-N class.
```

## Tailwind version — important

The Relume React export is **Tailwind v3**: a `tailwind.config.js` with
`presets: [require("@relume_io/relume-tailwind")]`. The preset already carries the full token
set, so you do not need to define colours, type scale or radii yourself.

`tokens/tailwind-theme.css` in this repo is **Tailwind v4 `@theme` syntax and will not work in
that project.** It's useful only as a readable reference for the values, or if you later migrate
to v4. Prefer the preset.

## Component map

Everything here maps one-to-one onto the Relume export. When Claude Code needs a primitive, it should import the export's version, not reimplement this one.

| This repo | Relume export | Notes |
|---|---|---|
| `components/forms/Button` | `@/components/ui/button` | Same 8 variants, same 5 sizes |
| `components/forms/Input` | `@/components/ui/input` | |
| `components/forms/Textarea` | `@/components/ui/textarea` | |
| `components/forms/Label` | `@/components/ui/label` | |
| `components/forms/Checkbox` | `@/components/ui/checkbox` | |
| `components/forms/RadioGroup` | `@/components/ui/radio-group` | |
| `components/forms/Select` | `@/components/ui/select` | Export takes children; this takes an `options` array |
| `components/core/Card` | `@/components/ui/card` | `Card` + `BackgroundCard` |
| `components/core/Accordion` | `@/components/ui/accordion` | Radix in the export |
| `components/core/Tabs` | `@/components/ui/tabs` | Radix in the export |
| `components/core/Carousel` | `@/components/ui/carousel` | Embla in the export; `CarouselDots` is inline in `testimonial-10` |
| `components/core/Dialog` | `@/components/ui/dialog` | Radix in the export |
| `components/core/VideoIframe` | `@/components/ui/video-iframe` | |
| `components/core/Icon` | `@relume_io/relume-ui` | Install the package — don't port this file |

### Icon

The export imports glyphs from `relume-icons`, which resolves once you
`npm i @relume_io/relume-ui`. Use those imports as written. The `Icon.jsx` in this repo exists
only so the sandbox cards and UI kit can render without that dependency — it is not for production.

Inline Material Symbols (`<img src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/<name>.svg">`)
also appear throughout the export's page sections. Those work as-is, but they can't inherit the
scheme's text colour. If you need a coloured glyph, self-host it and use a CSS mask.

## Tailwind v4 theme

See "Tailwind version" above — your export is v3 and should use the Relume preset.
`tokens/tailwind-theme.css` is reference only.

## Expiring image URLs

Every `imagedelivery.net` URL in the export is signed with `exp=1788307200` (4 Sep 2026).
**They will 403 after that.** Download the images you're keeping and serve them from `/public`
before then.

## Scheme conflict

`DESIGN.md` defines eight section schemes; the export's `globals.css` defines four, with different assignments. This repo implements DESIGN.md's eight because `sitemap.md` references those numbers. **In your app, follow whichever your `globals.css` actually ships** — otherwise section colours will drift from the Relume pages. Worth reconciling once, deliberately.

## Sanity checklist for generated pages

- Section padding `py-16 md:py-24 lg:py-28`, `px-[5%]`, content `max-w-[80rem]`
- Text blocks cap at `48rem` and centre
- Headings Playfair Display **weight 400** — never bold
- Section header = semibold eyebrow → Playfair heading → one supporting sentence
- Cards: 2px border, 8px radius, **no shadow**
- Inputs: 2px bottom border only, transparent fill, no focus ring
- Images carrying text: flat 50% near-black scrim across the whole image
- One `.scheme-N` per section; children read `--color-scheme-*`
- No emoji, no gradients, no patterns, no press-state transforms
