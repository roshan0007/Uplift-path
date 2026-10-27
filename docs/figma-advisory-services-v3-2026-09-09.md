# Advisory Services — v3 Figma pass (2026-09-09)

Branch `figma-advisory-services-import-v3`, cut from `figma-v3` and merged back
into it. Not chained off the AI Consultation branch.

## Source

Figma file `vbs2QJkAZE0ahMaKTa0Z46`, frame `Advisory Services`, 1440x5229.
Reference render `Advisory Services.png`, 2880x10458 — exactly 2x. The Figma API
is paywalled on this account and was not used; see
`docs/figma-for-business-v3-2026-09-09.md` for the endpoint table. This render
carries the same 1px non-white column at x=1439–1440 as the AI Consultancy one.

## Verdict: incremental in structure, substantial in content

The frame's sections map 1:1 to the six the page already had. Five changed.

| Section | Change |
|---|---|
| `layout-134` Hero | Two vignettes added; promoted to `<h1>` |
| `layout-19` | Body split into the frame's two paragraphs; frame's illustration replaces a stock photo |
| `layout-374` | Frame's four card titles, bodies and photos restored |
| `layout-28` | **Lists were not lists.** Rebuilt as three stacked blocks with real `<ol>`/`<ul>`; the tab set removed |
| `faq-01` | Question face corrected. Copy already matched the frame exactly |
| `cta-25` | Re-skinned to the v3 CTA — seventh copy |

### `layout-28` — the lists were run-together text inside `<p>`

All three blocks had their items jammed into a single paragraph with the markers
typed as literal characters:

> 1. Submit a request — Tell us where you are and what is in the way. 2.
> Discovery call — We listen before we advise. No pitch deck. 3. Your pathway
> plan — …

They rendered as unbroken walls of text with stray digits and hyphens mid
sentence, and carried no list semantics at all. They are now a real `<ol>` and
two real `<ul>`s — 4, 6 and 4 items — which is also how the frame draws them,
one item per line.

**The tab set went with them.** The three headings were `TabsTrigger`s, but each
trigger contained its own full body, so all three bodies were always visible and
clicking a heading only swapped a photo. That is not a tab set; it is three
content blocks with a decorative image swapper, and the frame draws exactly what
it produced — three stacked blocks. They are three stacked blocks now, and three
photos are replaced by the frame's one line-art figure.

The frame draws the left rule against "How it works" only. That is the
active-tab border showing through in what is otherwise a screenshot of this
component, not a design device, so the rule is kept on all three blocks rather
than one.

### `layout-374` — the frame's cards were the original set

The export shipped the four small cards byte-identical — same eyebrow, heading,
sentence and image, four times. An earlier pass patched that by writing three
replacements (Accreditation Readiness, Payer Readiness, Growth Planning) and
dropped the images to hold the section under one screen. It was working without
the design to hand.

**The four photos already in the repo are named for exactly the frame's four
cards** — `advisory-services-business-structuring.jpg`,
`-growth-expansion-strategy.jpg`, `-operational-advisory.jpg`,
`-growth-gap-assessment.jpg`. That naming settled it. Raised and confirmed
before building: the frame's copy and its photos both ship, and the section is
taller as a result.

Which photo goes where was not guessed. Each of the frame's five photo regions
was matched against every `advisory-services-*` file in the repo:

| Card | File | Score | Runner-up |
|---|---|---|---|
| Program Development (feature) | `features-list-section-0.jpg` | **1.98** | 66.72 |
| Business Structuring | `business-structuring.jpg` | **10.75** | 82.18 |
| Growth & Expansion Strategy | `growth-expansion-strategy.jpg` | **17.83** | 68.43 |
| Operational Advisory | `operational-advisory.jpg` | **11.06** | 68.27 |
| Growth & Gap Assessment | `growth-gap-assessment.jpg` | **15.00** | 69.80 |

The feature card's photo is `features-list-section-0.jpg`, not the file the
export had there. `features-list-section-1.jpg` (2560x1706, 483 KB) turns out to
be **the same photograph as `business-structuring.jpg`** (750x500, 89 KB) — mean
channel difference 0.23. The smaller one is used.

**One thing the frame asks for is not built.** Its Growth & Gap Assessment body
ends "Free, with no obligation." That is a pricing commitment and nothing
anywhere else in the codebase offers a free service. Raised and confirmed: the
sentence is dropped pending confirmation, the rest of the card is the frame's.

### `layout-134` — isolating the vignettes took care

Paper planes left, a framed rising chart right. At several y values a vignette
and the centred copy share a row, so a naive bounding box swallowed the body
text and reported the planes as 396px wide. They were measured instead over the
four horizontal bands the hero leaves text-free, which gives 254 and 212.5.

Promoted from `<h2>` to `<h1>` — the route had none.

## New tokens

**None.**

## Deliberate departures from the frame

- **"Free, with no obligation." is not shipped**, above.
- **The left rule is on all three `layout-28` blocks**, not just the first,
  above.
- **`layout-19`'s illustration is capped at its drawn width** (392.5px) rather
  than stretched to fill the column, as the frame draws it.
- **The footer and navbar were not touched.**

## Measured fidelity at 1440

Corrected for the 15px scrollbar.

| | Frame | Built | Δ |
|---|---|---|---|
| Page `<h1>` count | — | 1 | was **0** |
| Hero heading | 52/62.4 Playfair 400 | 52/62.4 Playfair 400 | **0** |
| Planes vignette | 101, 247.5 · 254x308 | 101, 247.5 · 254x308 | **0** |
| Chart vignette | 1106, 419 · 212.5x180 | 1106, 419 · 212.5x180 | **0** |
| `layout-19` paragraphs | 2 | 2 | **0** |
| `layout-19` illustration | 392.5x463 | 392.5x463 | **0** |
| `layout-28` lists | 4 / 6 / 4 items | `OL:4` `UL:6` `UL:4` | **0** |
| `layout-28` headings | 36/46.8 Playfair | 36/46.8 Playfair | **0** |
| `layout-28` figure | 189x391.5 | 189x391.5 | **0** |
| FAQ question | 18/27 Lexend Deca **700** | 18/27 Lexend Deca **700** | **0** |
| Feature card | ~612x854 | 624x876 | 12 / 22 ¹ |
| Small cards | ~311x413 | 296x434 | 15 / 21 ¹ |

¹ The export's own four-column grid with `gap-6 md:gap-8` (32px) against the
frame's ~24px gaps. The grid is unchanged from the export, which is the
structure the frame draws; only the card contents changed. Not worth re-cutting
a working grid for 12–15px.

### Assets

| Asset | Size | File | Alpha round-trip Δ |
|---|---|---|---|
| `advisory-hero-planes.png` | 508x616 | 112 KB | **0.063** |
| `advisory-hero-chart.png` | 425x360 | 87 KB | **0.047** |
| `advisory-problem-writing.png` | 785x926 | 135 KB | **0.019** |
| `advisory-pathway-figure.png` | 378x783 | 123 KB | **0.025** |

All four are 2x the box the frame draws them in, cut from the render and
un-composited off white with a min-channel alpha key. As on the other passes the
round-trip proves the decomposition is lossless, not that the asset matches an
independent source. 457 KB added; shipped unquantised.

## Verification

- `pnpm build` clean; 23 static pages; TypeScript clean.
- Exactly one `<h1>` (was zero).
- No horizontal overflow at 375: `scrollWidth == clientWidth == 375`, zero
  overflowing elements.
- Both `layout-28` list types render with the right item counts; every list item
  is a real `<li>`.
- All five `layout-374` cards carry a photo and the frame's title.
- "Free, with no obligation" appears **zero** times in the rendered page.
- No console errors.

## Unreferenced assets

**Nothing newly orphaned.** The photos were reshuffled — `growth-gap-assessment`
moved from `layout-19` to its own card, `operational-advisory` from the feature
card to its own, `features-list-section-0` from a tab to the feature card,
`business-structuring` and `growth-expansion-strategy` from tabs to their cards
— but all five remain referenced, and three of them are referenced for the first
time by the card they are named after.

Already-unreferenced and unchanged by this branch, from the standing backlog:
`advisory-services-about-section-new.png` (643 KB),
`advisory-services-how-it-works-section.png` (601 KB), and
`advisory-services-features-list-section-1.jpg` (483 KB) — now known to be a
5x-larger duplicate of a file that *is* used, so it is the clearest deletion
candidate in the whole backlog.
