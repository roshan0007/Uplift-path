# Career — v3 Figma pass (2026-09-10)

Branch `figma-career-import-v3`, cut from `figma-v3` and merged back into it.

## Source

Figma file `vbs2QJkAZE0ahMaKTa0Z46`, frame `Career`, 1440x6198. Reference render
`Career.png`, 2880x12396 — exactly 2x. The Figma API is paywalled on this
account and was not used; see `docs/figma-for-business-v3-2026-09-09.md` for the
endpoint table. No 1px non-white column at the right edge on this render.

## Verdict: the largest of the three

The frame carries all seven sections the page already had, but **in a different
order**, rebuilds the hero, and replaces three photographs with line-art
illustrations.

| Section | Change |
|---|---|
| `layout-134` Hero | **Rebuilt** as a left-aligned two-column hero with a large camera vignette; promoted to `<h1>` |
| `layout-213` | Alt text only. Copy, button and illustration already matched |
| `layout-237` Core Values | **Moved up**, from last-before-FAQ to third; six icons self-hosted and tinted Viking dark |
| `layout-469` | **Moved up**; two overlapping photographs replaced by one vignette |
| `layout-359` | **Moved down**; card photograph replaced by the frame's illustration; **placeholder heading rewritten** |
| `faq-01` | Question face corrected. All four questions already matched |
| `cta-25` | Re-skinned to the v3 CTA — eleventh copy |

### The section order changed

Frame order is hero → Who we are → Our Core Values → Growth Acceleration → Why
Uplift Path → FAQ → CTA. The export ran 359 before 469 and put Core Values last
before the FAQ. Reordered in `app/(site)/career/page.tsx`; no section was
renamed, so the route's page map still reads the same names.

### The hero is not the centred `layout-134` the other nine routes carry

Every other v3 hero in this batch is a centred column with small decorative
vignettes absolutely positioned around it. The frame draws this one
left-aligned in a left column with a single large vignette — a hand holding a
flash camera, 384.5x363.5 — filling the right one. So it is a two-column grid,
and the vignette is a grid cell rather than absolute decoration, which means it
stacks under the copy below `md` instead of disappearing. The section keeps its
`layout-134` name because the route's page map does.

### `/career` had no `<h1>` at all

The only route in the batch where the outline was missing rather than misplaced
— Compliance Support and Resource Assistance each had one on the wrong section.
The hero heading is now `<h1>` and the six section headings below it are `<h2>`.

### `layout-359`'s heading was Relume fixture copy

Both the export **and the frame** give the card "Manage all support tickets from
a single dashboard" — a stock Relume product headline, for a product this
company does not sell, on a hiring page, above a body that is real and is about
how the team works internally:

> We built our internal systems the same way we advise clients. Clarity
> eliminates chaos and a single source of truth keeps the team moving forward
> together.

A defect the frame does not fix, like the Systems & Technology timeline body.
Settled the same way: rewrite it rather than ship a visible placeholder, and
rewrite it from what the page already commits to rather than invent. The new
heading is **"The way we work on the inside"** — it asserts nothing the body
does not already say, introduces no new claim, and avoids repeating a body
sentence verbatim the way a lift from "a single source of truth" would.

**This is the only copy on this page that was written rather than transcribed.**
Worth a read in review.

### Nothing about the hiring claims was invented

`/career` is a hiring page, so the bar was high. The frame contains no open
roles, no salaries, no benefits list, no locations, no headcount and no outcome
statistics, and none were added. The four FAQ answers, the six core values and
both body sections are the frame's word for word, and every "Explore
opportunities" / "Apply" button keeps the external ATS link the page already
had (`openings.upliftpathwellness.com`). Nothing that reads as a claim changed.

## New tokens

**None.** Four pages in a row now.

## Deliberate departures from the frame

- **`layout-469`'s body stays ragged-right.** The frame sets it justified, which
  nothing else on the site does and which opens visible rivers at this measure.
- **The "Operations" tagline appears twice and was left that way.** `layout-469`
  and `layout-359` carry the same string two sections apart. It is the Relume
  fixture eyebrow appearing twice rather than two real categories, but it is a
  label rather than a claim, and replacing it would mean inventing two
  categories. Raised, not acted on.
- **The blocks are container-aligned, not at the frame's offsets.** The frame
  puts the hero copy 46px and `layout-469` 48.5px right of the container edge —
  pasted screenshots of the built page, as on the two sibling pages.
- **The shared `Button` renders 48px tall against the frame's 50.** Known,
  accepted, site-wide delta.
- **The footer and navbar were not touched**, including the seven
  `cdn.jsdelivr.net` icons still hot-linked inside the nav dropdown — all seven
  jsdelivr requests this page makes come from there and none from its own
  sections.

## Measured fidelity at 1440

The pane's layout viewport is 1425 (15px scrollbar).

| | Frame | Built | Δ |
|---|---|---|---|
| Page `<h1>` count | — | 1, on the hero | **was 0** |
| Section order | 134/213/237/469/359/faq/cta | same | **0** |
| Hero heading | 52/62.4 Playfair 400 | 52/62.4 Playfair 400 | **0** |
| Camera vignette | 899, 183.5 · 384.5x363.5 | 860.3, 184 · 384.5x363.5 | size **0**, y **0.5** |
| `layout-469` vignette | 892, — · 310x293 | 893.5, — · 310x293 | **1.5** |
| Core-values icon fill | `#41b19a` (sampled `65,177,154`) | `rgb(65, 177, 154)` | **0** |
| Core-values icons served from | — | `/svgs`, pinned 0.38.0 | was `@latest` on a CDN |
| `layout-359` card width | 78→1362 (container + 2px border) | 74.5→1354.5 at cw 1425 | **0** |
| `layout-359` card image ink | 524.5x359 | 527x360 | **2.5** |
| FAQ items | 4 (5 rules) | 4 | **0** |
| FAQ question | 18/27 Lexend Deca **700** | 18/27 Lexend Deca **700** | **0** |
| CTA | white, left-aligned, envelope | same | **0** |

The camera's x differs because the frame's hero block is a pasted screenshot
sitting 46px right of the container; its *size* and its *y* land at Δ0 and Δ0.5,
which is the check that matters.

### Assets

| Asset | Size | File | Alpha round-trip Δ |
|---|---|---|---|
| `career-hero-camera.png` | 769x727 | 223 KB | **0.000** |
| `career-growth-thinking.png` | 620x586 | 87 KB | **0.000** |

Both are 2x the box the frame draws them in, cut from the render and
un-composited off white with a min-channel alpha key. 310 KB added, shipped
unquantised. The round-trip figure proves the decomposition off white is
lossless; it is **not** a match against an independent source, since both came
from the render.

**The `layout-359` card illustration needed no export.** The frame's drawing is
already in the repo as `contact-us-illustration.png`: ink 496x339, ratio 1.4631
against the frame's 524.5x359, ratio 1.4610; ink-bbox comparison 22.1 against
49+ for every other candidate. `layout-213`'s illustration likewise matched
`career-feature-section-0.png` at 0.1.

Six Material Symbols saved into `/svgs`, pinned at
`@material-symbols/svg-500@0.38.0` — `commit`, `celebration`, `power`,
`biotech`, `design_services`, `target`, 0.6–1.6 KB each.

## Verification

- `pnpm build` clean; 23 static pages; TypeScript clean.
- Exactly one `<h1>`, and it is the hero. Full outline: h1 hero → h2 Who we are
  → h2 Our Core Values (h3 per value) → h2 Growth Acceleration → h2 Why Uplift
  Path (h3 card) → h2 FAQ (h3 per question) → h2 CTA.
- Rendered section order matches the frame's, verified by reading the heading
  sequence off the live page.
- No horizontal overflow at 375: `scrollWidth == clientWidth == 375`, zero
  elements extending past the viewport on either side.
- The six core-values icons compute to `rgb(65, 177, 154)`; zero
  `cdn.jsdelivr.net` requests come from this page's own sections.
- No console errors.
- The page's internal `href` is `/contact-us` (CTA), which resolves in `out/`;
  the three ATS links are the external `openings.upliftpathwellness.com` the
  page already carried.

## Unreferenced assets

**Three files newly orphaned by this branch**, all of them photographs the frame
replaces with line art:

| File | Size | Was |
|---|---|---|
| `public/images/career-feature-section-1.png` | 2.35 MB | `layout-359` card |
| `public/images/career-feature-section-2.png` | 2.14 MB | `layout-469` portrait |
| `public/images/career-feature-section-3.jpg` | 82 KB | `layout-469` square |

None is referenced anywhere else in the repo. **Added to the standing backlog**
recorded in `docs/figma-for-business-v3-2026-09-09.md` rather than deleted.
With the two this batch's Resource Assistance branch added, the backlog now
stands at **30 files / ~13.5 MB**, and
`advisory-services-features-list-section-1.jpg` is still the clearest deletion
candidate.

## One thing a render cannot tell you

A Figma node with an `imageRef` may also carry a `gifRef`, which makes it a
video with the `imageRef` as its poster frame — and that is invisible in a
render. Two earlier pages shipped videos found only in the node JSON. Nothing on
these three frames obviously reads as a clip, but the check was not possible
this pass and the possibility is noted rather than silently ruled out.
