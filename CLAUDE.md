# Uplift Path — website

Next.js 16 (App Router) + Tailwind v4, exported as a static site to `out/` and
served by Cloudflare Workers.

## Design

**Everything visual lives in one place: `.claude/skills/uplift-path-design/`.**
It is a skill, so it loads on demand — read it before any UI work rather than
inferring style from the code.

| Path | What it is |
|---|---|
| `readme.md` | The design guide. Start here. |
| `production.md` | Component map — which section serves which page |
| `tokens/` | Colour, type, spacing, shape, scheme tokens (the source of truth) |
| `guidelines/` | Per-topic cards: palette, type, spacing, radii, schemes, logo |
| `components/` | Core + form component specs, with `.prompt.md` usage notes |
| `design-export/` | The original Relume export: `DESIGN.md`, `sitemap.md`, `assets.md`, `globals.original.css` |
| `design-export/screenshots/` | **Rendered homepage, section by section — build against these** |
| `reference/homepage/` | Same screenshots, as shipped with the design system |
| `assets/` | Source fonts, logo, images (already copied into `public/`) |
| `missing-components/` | The three components Relume's exporter dropped |
| `ui_kits/website/` | Standalone HTML/JSX kit for prototyping |

## Layout of this repo

- `app/` — one folder per route; each `page.tsx` only composes sections
- `components/sections/<page>/` — the page sections, from the Relume design export
- `components/sections/navbar-05.jsx`, `footer-09.jsx` — site chrome, mounted in `app/layout.tsx`
- `components/ui/` — the 13 design-system primitives
- `hooks/`, `lib/utils.ts` — `useMediaQuery`, `cn`
- `public/images/`, `public/fonts/`, `public/logo/`, `public/svgs/`, `public/brand/`

## Rules

- **Sections are the visual source of truth.** They came out of Relume already
  styled to this system. Don't restyle, "improve", or reformat them — fix only
  what stops them working.
- **Never rewrite a primitive in `components/ui/` — compose it.**
- **Never invent colours, shadows, or radii.** Everything comes from the tokens
  in `globals.css`, which is generated from the design system. If a value isn't
  there, it isn't in the brand.
- **Every section gets exactly one `.scheme-N` class.** Children then read
  `--color-scheme-*` (`bg-scheme-foreground`, `text-scheme-text`,
  `border-scheme-border`). That indirection is what makes a section re-skinnable.
- **Headings are Playfair Display; body is Lexend Deca.** Both self-hosted from
  `/fonts` via `@font-face` at the top of `globals.css`. That is the only place
  a font-family is declared — don't set one anywhere else.
- **Never white text on the teal/green fill.** It is 1.96:1 and fails WCAG AA.
  Dark text on green is the only approved pairing; `scheme-1`/`scheme-2` already
  encode this via `--color-scheme-btn-text`.
- Cards: 2px border, `rounded-card`, no shadow. This brand has no elevation system.
- Inputs: 2px bottom border only, transparent fill, no focus ring.
- No emoji. No gradients outside the ones already tokenised. No press-state transforms.

## Gotchas

- `app/globals.css` is **derived** from `design-export/globals.original.css`.
  Three deviations are marked `[1] [2] [3]` in the file header — self-hosted
  fonts, a lifted `@layer theme` block the original nested illegally inside
  `@theme`, and the `@theme inline` block that makes the `scheme-*` colour
  utilities resolve. Don't hand-edit token values; re-derive if the export changes.
- Tailwind **v4** — no `tailwind.config.js`, and `@relume_io/relume-tailwind`
  (a v3 preset) cannot be used. Tokens live in CSS.
- Static export (`output: 'export'`): no API routes, no middleware, no server
  actions, and `next/image` optimization is off.
- Section folder names come from Relume and include its typos
  (`business-conusltation`, `advisory--services`). Routes match them. Renaming
  means renaming the route too.
