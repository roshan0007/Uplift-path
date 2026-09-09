# Resource Assistance — v3 Figma pass (2026-09-10)

Branch `figma-resource-assistance-import-v3`, cut from `figma-v3` and merged
back into it.

## Source

Figma file `vbs2QJkAZE0ahMaKTa0Z46`, frame `Resource Assistance`, 1440x3793.
Reference render `Resource Assistance.png`, 2880x7586 — exactly 2x. The Figma
API is paywalled on this account and was not used; see
`docs/figma-for-business-v3-2026-09-09.md` for the endpoint table. No 1px
non-white column at the right edge on this render.

## Verdict: one section rebuilt, the rest incremental

The frame's four sections map 1:1 to the four the page already had, in the same
order, and every line of copy already matched the frame verbatim. What changed:

| Section | Change |
|---|---|
| `layout-134` Hero | Two vignettes added; promoted to `<h1>` |
| `layout-491` | **Tabs removed** — rebuilt static; `<h1>`→`<h2>`, labels `<h2>`→`<h3>`; "You get:" given its own paragraph; one illustration instead of three |
| `faq-01` | Question face corrected. Copy already matched |
| `cta-25` | Re-skinned to the v3 CTA — tenth copy |

### `layout-491`'s tabs were an interaction that did nothing

The export built this as a Radix `Tabs`. Three triggers whose labels were
`<h2>`, each holding its own body inside a `motion.div` animated to
`height: 0` when inactive, the two inactive triggers dimmed to 25% opacity, and
a per-tab illustration cross-fading in the right-hand column.

The frame draws all three headings at full opacity, all three bodies open, one
illustration for the whole section, and nothing that reads as a control. Same
defect as Advisory's "tabs", where each tab contained its own full body so all
three were always visible and clicking only swapped a photo — except here the
control genuinely hid two thirds of the copy behind a click.

Rebuilt static: three plain blocks, each a heading, a body and its "You get:"
line, on a hairline rule. Nothing is behind a control, nothing is dimmed,
`motion/react` is no longer imported by this section.

### "You get:" was running onto the end of the body sentence

The frame sets it as its own paragraph in all three blocks — "…and set up the
reporting funders expect afterwards." / "You get: an eligible-opportunity
shortlist and a funding calendar." The export ran the two together.

### Heading levels

The route's only `<h1>` was `layout-491`'s "What do you need?", which is not the
page title; the hero has it now. The three tab labels were `<h2>` sitting
*inside* that `<h1>`'s own section, which put three siblings of the section
heading underneath it. They are `<h3>` under this section's `<h2>`.

## New tokens

**None.**

## Deliberate departures from the frame

- **`layout-491` is container-aligned, not at the frame's +51.** The frame puts
  the block 51px right of the container edge; that is a pasted screenshot of the
  built page, not design intent. Same call as AI Consultation and Compliance
  Support.
- **The rules stay at 1px.** The frame draws every rule on this page at 2px —
  the `layout-491` block rules *and* its `faq-01` accordion rules, measured the
  same way (4 render px at 2x). The brand settles accordion rules, the footer
  divider and the nav dropdown sheet at 1px hairlines, and matching the frame
  here would mean changing eleven `faq-01` sections and the footer too. Left at
  1px; raised rather than acted on.
- **The shared `Button` renders 48px tall against the frame's 50.** Known,
  accepted, site-wide delta.
- **The footer and navbar were not touched.**

## Measured fidelity at 1440

The pane's layout viewport is 1425 (15px scrollbar), so right-anchored elements
were corrected +15 before comparing.

| | Frame | Built | Δ |
|---|---|---|---|
| Page `<h1>` count | — | 1, on the hero | was 1, on `layout-491` |
| Hero heading | 52/62.4 Playfair 400 | 52/62.4 Playfair 400 | **0** |
| Bubble vignette | 140.5, 396.5 · 147.5x156.5 | 140.5, 396.5 · 147.5x156.5 | **0** |
| Network vignette | 1176, 178 · 180x141 | 1161+15, 178 · 180x141 | **0** |
| `layout-491` heading | 52/62.4 | 52/62.4 (`<h2>`) | **0** |
| Resource headings | 36/46.8 Playfair (frame ink 35.5) | 36/46.8 (`<h3>`) | **0** |
| Bodies visible at rest | 3 of 3 | 3 of 3 | was 1 of 3 |
| Illustrations in section | 1 | 1 | was 3 |
| Illustration box | ink 208x451 | 584px box → ink 208x451 | **0** |
| FAQ question | 18/27 Lexend Deca **700** | 18/27 Lexend Deca **700** | **0** |
| CTA | white, left-aligned, envelope | same | **0** |
| Rules | 2px | 1px | −1 (deliberate) |

The illustration's box is derived, not guessed: the source PNG is a 2000 square
with the drawing occupying 712x1543 inside it, so a 584px box puts its ink at
the frame's own 208x451.

### Assets

| Asset | Size | File | Alpha round-trip Δ |
|---|---|---|---|
| `resource-hero-bubble.png` | 295x313 | 43 KB | **0.000** |
| `resource-hero-network.png` | 360x282 | 24 KB | **0.000** |

Both are 2x the box the frame draws them in, cut from the render and
un-composited off white with a min-channel alpha key. 67 KB added, shipped
unquantised. The round-trip figure proves the decomposition off white is
lossless; it is **not** a match against an independent source, since both came
from the render.

`resource-assistance-feature-section.png` is the frame's own illustration and
was already in the repo (ink-bbox match, mean channel difference 0.4 against
35+ for every other candidate). No new photograph or illustration was needed.

## Verification

- `pnpm build` clean; 23 static pages; TypeScript clean.
- Exactly one `<h1>`, and it is the hero. Full outline: h1 hero → h2 "What do
  you need?" (h3 Funding / Payer enrolment and credentialing / Staff) → h2 FAQ
  (h3 per question) → h2 CTA.
- No horizontal overflow at 375: `scrollWidth == clientWidth == 375`, zero
  elements extending past the viewport on either side. Both vignettes are hidden
  below `lg`.
- All three resource bodies and all three "You get:" lines are in the rendered
  page with no interaction, and nothing on the page has `opacity: 0.25`.
- No console errors.
- Every `href` on the page resolves to a real route in `out/` (`/contact-us`).

## Unreferenced assets

**Two files newly orphaned by this branch**, both of them the per-tab
illustrations `layout-491` no longer swaps between:

| File | Size |
|---|---|
| `public/images/resource-assistance-payer-enrolment.png` | 653 KB |
| `public/images/resource-assistance-staff.png` | 803 KB |

Neither is referenced anywhere else in the repo. **Added to the standing
backlog** recorded in `docs/figma-for-business-v3-2026-09-09.md` (25 files /
~7.5 MB, which these two take to 27 / ~8.9 MB) rather than deleted, alongside
`advisory-services-features-list-section-1.jpg`, which is still the clearest
deletion candidate.
