# Systems & Technology — v3 Figma pass (2026-09-09)

Branch `figma-systems-technology-import-v3`, cut from `figma-v3` and merged back
into it.

## Source

Figma file `vbs2QJkAZE0ahMaKTa0Z46`, frame `System & Technology`, 1440x5010.
Reference render `System & Technology.png`, 2880x10020 — exactly 2x. The Figma
API is paywalled on this account and was not used; see
`docs/figma-for-business-v3-2026-09-09.md` for the endpoint table. Same 1px
non-white column at x=1439–1440 as the other two service-page renders.

## Verdict: incremental

The frame's sections map 1:1 to the five the page already had, and every line of
copy in `layout-564`, `timeline-05` and `faq-01` already matched the frame
verbatim. What changed:

| Section | Change |
|---|---|
| `layout-134` Hero | Two vignettes added; promoted to `<h1>`; body's repeated first sentence dropped |
| `layout-564` | Sparkle decoration added; `<h1>`→`<h2>` |
| `timeline-05` | Step 05's duplicated body rewritten |
| `faq-01` | Question face corrected. Copy already matched |
| `cta-25` | Re-skinned to the v3 CTA — eighth copy |

### Step 05 "Hand over" said what step 01 said

Both the export **and the frame** give "Hand over" step 01 "Map"'s body word for
word:

> We sit with your people and document how things actually get done. The real
> process, not the one in the manual.

The other three steps are specific and well written, so this is a defect the
frame does not fix rather than a design decision. Raised, and settled: rewrite
it from commitments the page already makes rather than leave a step describing
the wrong thing or ship a visible placeholder. The new body is assembled from
two sentences already on this route —

- `faq-01`: "…the safeguards are documented at handover."
- `layout-564`: "Implementations fail on adoption, not technology. Your team
  owns it when we step back."

— giving:

> We hand over the documentation and the safeguards behind the system, then step
> back. Implementations fail on adoption, not technology, so your team owns it
> before we leave.

**No new claim is introduced.** Worth a read in review all the same, since it is
the only copy on these three pages that was written rather than transcribed.

### The hero body repeated the heading

The frame opens the hero body "Technology should remove work, not add it." —
which is the heading, verbatim, two lines below itself. Raised and settled: the
echo is dropped, the rest of the sentence is the frame's. The body is now "We
map your operations, then build systems that give your people time back."

### Heading levels

The route's only `<h1>` was `layout-564`'s "What we do", which is not the page
title; the hero heading was an `<h2>`. Swapped. Third of the three pages in this
batch to have had its heading outline wrong, and the fifth of six overall.

## New tokens

**None.**

## Deliberate departures from the frame

- **The `layout-564` sparkle is anchored from the column's left edge, not its
  right.** The built column starts 80px right of the frame's (`lg:ml-20`) while
  being the same width, so right-anchoring pushed the sparkle 88px past where
  the frame has it. Both columns start their text at the same offset, so a left
  offset of 355.5px reproduces the frame's relationship to the heading exactly.
  The column's own position is pre-existing geometry in a section that is
  otherwise unchanged, and not something to restyle for this.
- **The `layout-564` figure is unchanged.** Confirmed as the frame's own
  illustration by comparing the render region against the shipped file
  composited on white: mean channel difference 21.8, against 68+ for any
  non-matching image in the same test on the Advisory page. (Compared naively
  against the RGBA file it reads 208 — the alpha composites onto black. Worth
  knowing before concluding an asset does not match.)
- **The footer and navbar were not touched.**

## Measured fidelity at 1440

Corrected for the 15px scrollbar.

| | Frame | Built | Δ |
|---|---|---|---|
| Page `<h1>` count | — | 1, on the hero | was 1, on the wrong section |
| Hero heading | 52/62.4 Playfair 400 | 52/62.4 Playfair 400 | **0** |
| Envelope vignette | 132, 368 · 138.5x127 | 132, 368 · 138.5x127 | **0** |
| Laptop vignette | 1185, 181 · 169.5x178 | 1185, 181 · 169.5x178 | **0** |
| `layout-564` heading | 52/62.4 | 52/62.4 (`<h2>`) | **0** |
| `layout-564` standfirst | 18/27 | 18/27 | **0** |
| Sparkle | 147x97, +355.5 from column left | 147x97, +355.5 | **0** |
| Timeline steps | 5 | 5 | **0** |
| FAQ question | 18/27 Lexend Deca **700** | 18/27 Lexend Deca **700** | **0** |
| CTA | white, left-aligned, envelope | same | **0** |

### Assets

| Asset | Size | File | Alpha round-trip Δ |
|---|---|---|---|
| `systems-hero-envelope.png` | 277x254 | 38 KB | **0.110** |
| `systems-hero-laptop.png` | 339x356 | 118 KB | **0.071** |
| `systems-whatwedo-sparkle.png` | 294x194 | 26 KB | **0.047** |

All three are 2x the box the frame draws them in, cut from the render and
un-composited off white with a min-channel alpha key. 182 KB added, shipped
unquantised.

Isolating the two hero vignettes needed the technique the Advisory pass
established: the envelope shares rows with the body copy and the laptop shares
rows with the heading, so a naive bounding box reported them as 366 and 339.5
wide. Measuring each over only the y bands its neighbouring text leaves free
gives 138.5 and 169.5.

## Verification

- `pnpm build` clean; 23 static pages; TypeScript clean.
- Exactly one `<h1>`, and it is the hero.
- No horizontal overflow at 375: `scrollWidth == clientWidth == 375`, zero
  overflowing elements. Both vignettes and the sparkle are hidden below `lg`.
- The duplicated timeline body now appears **once** in the rendered page (step
  01 only), down from twice.
- The hero heading no longer appears in the hero body.
- Sparkle clears the heading (bottom 656.6 against heading top 669.6).
- No console errors.

## Unreferenced assets

**Nothing newly orphaned.** Already-unreferenced and unchanged by this branch,
from the standing backlog: `how-we-work-*` and the other files listed in
`docs/figma-for-business-v3-2026-09-09.md`.
