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
  There are nine: `.scheme-light`, `.scheme-accent`, `.scheme-navy`,
  `.scheme-mint`, `.scheme-deep-teal`, `.scheme-cerulean-deep`, `.scheme-black`,
  `.scheme-jade` (v3, `#01a66e`, the footer band only), and
  `.scheme-green-deep` (v3, `#05866b`, the About Us green band only).
  `--color-plantation` (v3, `#274d40`) is a palette entry but **not** a scheme:
  it is the How We Work decorative curve only, drawn at 20%. See [12].
  `.scheme-1/2/3` are aliases of the first three and are what the exported
  sections actually write. Prefer the named classes in new work; don't renumber
  anything.
- **Headings are Playfair Display; body is Lexend Deca.** Both self-hosted from
  `/fonts` via `@font-face` at the top of `globals.css`. That is the only place
  a font-family is declared — don't set one anywhere else. The one utility that
  reaches for the body face by name is `font-body`, also declared there, and it
  exists for a specific case: **FAQ accordion questions are Lexend Deca 700 in
  every Figma frame**, but Radix wraps the trigger in an `<h3>` (so the base
  `h1–h6` Playfair rule catches it) and its `font-bold` resolves through
  `--font-weight-bold`, which is 400. The fix is `font-body font-[700]` at the
  call site — both classes, since `cn()` is tailwind-merge and only drops
  `font-bold` when a real font-weight utility lands beside it. Applied on
  `/how-we-work`, `/for-individual-page` and `/for-business-page`; the other
  eight `faq-01` sections still render Playfair 400. See `globals.css` [13].
  Its counterpart `font-heading` (Playfair Display) exists for the mirror-image
  case: the For Individual step numerals must carry the heading face but must
  not be headings (they are decorative duplicates of the "Step N" label, so
  `aria-hidden` on a `<p>`). See `globals.css` [15].
- **Italic headings need `.font-heading-italic`, which is Playfair 500 italic.**
  The real italic face is self-hosted as of v3. It is registered at weight 500,
  so `font-style: italic` *without* the matching weight silently falls back to
  slanting the 400 roman — a synthesised italic that reads visibly wrong on a
  didone. The utility sets both; don't set `italic` by hand.
- **There is one type step above `--text-h1`: `--text-display`,** 3rem rising to
  5rem at >=992px (the Figma's 80/96 at -1%). It exists for the For Individual
  page's "Care built around *your life*" heading and nothing else; every other
  heading on the site tops out at `--text-h1`. See `globals.css` [14].
- **`--font-weight-bold` is `400` on purpose.** A "bold" section heading (h2–h6)
  is therefore still regular weight — Playfair Display 400 carries the headings.
  Do not "fix" this.
- **Never white text on the teal/green fill.** It is 1.96:1 and fails WCAG AA.
  Dark text on green is the only approved pairing; every scheme sets
  `--color-scheme-btn-text` to the dark neutral. On the green CTA banner the
  button goes black-with-white-label via the section's `.btn-dark` class.
  **`.scheme-jade` is the one sanctioned exception**, by explicit decision: the
  footer band carries white on `#01a66e` to match the Figma, which is 3.14:1
  against the 4.5:1 its 14px links need. It is scoped to that one scheme so it
  cannot leak into the eleven `cta-25` banners on `.scheme-accent`, where white
  would be 1.96:1. Do not copy the pairing anywhere else. `globals.css` [10]
  lists the two ways back to AA if that is ever wanted.
  `.scheme-green-deep` is **not** a second exception. The About Us frame asked
  for white on `#06a785` (3.06:1); that was raised, and the fill was darkened
  to `#05866b` instead, where white is 4.54:1 and passes. See `globals.css`
  [11].
- Cards: 2px border, `rounded-card`, no shadow. 1px hairlines for accordion
  rules, the footer divider and the nav dropdown sheet.
- **One shadow exists in this brand: a hard `0 3px 0 0` ledge under a control,
  zero blur.** There is no soft elevation system — never add a blurred shadow.
- Inputs and select triggers: 2px border all round, transparent fill, 12px
  radius, no focus ring.
- **Buttons translate down 3px onto their ledge on hover, and the ledge goes
  away — that is what reads as the press.** Hover and press are the same state
  by design; there is no separate press treatment to add.
- No emoji. Nothing bounces, springs, or scales on hover.
- **Gradients and textures: two exceptions, both v3, both homepage-only.**
  `hero-fade` (the mint wash behind the first screen) and the pale-green
  pattern band behind `layout-237`. Everything else is flat colour — no
  gradient in a button, a card, or behind text, and no blurred shadow ever.
  Both exceptions are documented in `globals.css` at `[8]` and in the section
  itself; a third needs a design decision, not a precedent. The How We Work
  curve is **not** a third: it is flat colour in a shape, no ramp and no
  repeat.

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
