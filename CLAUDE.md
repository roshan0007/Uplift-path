# Uplift Path — website

Next.js 16 (App Router) + Tailwind v4, exported as a static site to `out/` and
served by Cloudflare Workers.

## Design

**Everything visual lives in one place: `.claude/skills/uplift-path-design/`.**
It is a skill, so it loads on demand — read it before any UI work rather than
inferring style from the code. It is the **v2** design system (imported
2026-08-28); v1 is in git history only.

| Path | What it is |
|---|---|
| `readme.md` | The design guide. Start here — its Index section is also the component map. |
| `tokens/` | Colour, type, spacing, shape, effect, scheme tokens (the source of truth) |
| `guidelines/` | 22 per-topic specimen cards: palette, type, spacing, radii, schemes, shadows, logo |
| `components/` | `actions/`, `forms/`, `surfaces/` component specs, each with a `.prompt.md` usage note |
| `design-export/` | The Relume export this was built from: `DESIGN.md`, `sitemap.md`, `assets.md`, `RELUME-README.md`, `globals.original.css` |
| `design-export/screenshots/` | **Relume's own rendered homepage, section by section — build against these** |
| `reference/homepage/` | The design system's *recreation* of the same screenshots. It has drifted from the code (extra nav item, different CTA label) — prefer `design-export/screenshots/`. |
| `assets/` | Source fonts, logo, svgs, and all 48 images (the 44 the site references are copied into `public/`) |
| `ui_kits/website/` | Standalone HTML/JSX kit for prototyping |

`sitemap.md` in `design-export/` is the page map: every route, its sections in
order, and the scheme each one carries.

## Layout of this repo

- `app/` — one folder per route; each `page.tsx` only composes sections. Pages are
  server components; every section carries its own `"use client"`.
- `components/sections/<page>/` — the page sections, from the Relume design export
- `components/sections/navbar-12.jsx`, `footer-04.jsx` — site chrome, mounted in `app/layout.tsx`
- `components/ui/` — the 13 design-system primitives
- `hooks/`, `lib/utils.ts` — `useMediaQuery`, `cn`
- `public/images/`, `public/fonts/`, `public/logo/`, `public/svgs/`, `public/brand/`
- `docs/` — reports and import records

## Rules

- **Sections are the visual source of truth.** They came out of Relume already
  styled to this system. Don't restyle, "improve", or reformat them — fix only
  what stops them working.
- **Never rewrite a primitive in `components/ui/` — compose it.** The one
  deviation from the export is documented in a comment in `button.jsx`.
- **Never invent colours, shadows, or radii.** Everything comes from the tokens
  in `globals.css`, which is generated from the design system. If a value isn't
  there, it isn't in the brand.
- **Every section gets exactly one scheme class.** Children then read
  `--color-scheme-*` (`bg-scheme-foreground`, `text-scheme-text`,
  `border-scheme-border`). That indirection is what makes a section re-skinnable.
  There are seven: `.scheme-light`, `.scheme-accent`, `.scheme-navy`,
  `.scheme-mint`, `.scheme-deep-teal`, `.scheme-cerulean-deep`, `.scheme-black`.
  `.scheme-1/2/3` are aliases of the first three and are what the exported
  sections actually write. Prefer the named classes in new work; don't renumber
  anything.
- **Headings are Playfair Display; body is Lexend Deca.** Both self-hosted from
  `/fonts` via `@font-face` at the top of `globals.css`. That is the only place
  a font-family is declared — don't set one anywhere else.
- **`--font-weight-bold` is `400` on purpose.** A "bold" section heading (h2–h6)
  is therefore still regular weight — Playfair Display 400 carries the headings.
  Do not "fix" this.
- **Never white text on the teal/green fill.** It is 1.96:1 and fails WCAG AA.
  Dark text on green is the only approved pairing; every scheme sets
  `--color-scheme-btn-text` to the dark neutral. On the green CTA banner the
  button goes black-with-white-label via the section's `.btn-dark` class.
- Cards: 2px border, `rounded-card`, no shadow. 1px hairlines for accordion
  rules, the footer divider and the nav dropdown sheet.
- **One shadow exists in this brand: a hard `0 3px 0 0` ledge under a control,
  zero blur.** There is no soft elevation system — never add a blurred shadow.
- Inputs and select triggers: 2px border all round, transparent fill, 12px
  radius, no focus ring.
- **Buttons translate down 3px onto their ledge on hover, and the ledge goes
  away — that is what reads as the press.** Hover and press are the same state
  by design; there is no separate press treatment to add.
- No emoji. No gradients — the brand has none. Nothing bounces, springs, or
  scales on hover.

## Gotchas

- `app/globals.css` is **derived** from
  `.claude/skills/uplift-path-design/design-export/globals.original.css`.
  Four deviations are marked `[1] [2] [3] [4]` in the file header — self-hosted
  fonts, a lifted `@layer theme` block the original nested illegally inside
  `@theme`, the `@theme inline` block that makes the `scheme-*` colour utilities
  resolve, and a dropped `body { border-width: 2px }`. Don't hand-edit token
  values; re-derive if the export changes.
- **The green `.scheme-accent` / `.scheme-2` utility deliberately omits the
  nested default-button colour rule** that the other six schemes carry. It would
  out-specify `.btn-dark`'s white label and paint black text on the black CTA
  button. There is a comment saying so; don't "restore" it for symmetry.
- Tailwind **v4** — no `tailwind.config.js`, and `@relume_io/relume-tailwind`
  (a v3 preset) cannot be used. Tokens live in CSS.
- Static export (`output: 'export'`): no API routes, no middleware, no server
  actions, and `next/image` optimization is off.
- Section folder names come from Relume and include its typos
  (`business-conusltation`, `advisory--services`). Routes match them. Renaming
  means renaming the route too — and the site is indexed, so each rename needs a
  301.
- `faq-for-test` and `page-20` are Relume scratch pages that exist on the live
  site. They still build, but carry `robots: { index: false }` and are out of the
  nav. See `docs/import-v2-report.md`.
- Every nav and footer link is still `href="#"`, exactly as Relume exported it.
  Wiring them is a real outstanding task, not an oversight in a given section.
