# Compliance Support — v3 Figma pass (2026-09-10)

Branch `figma-compliance-support-import-v3`, cut from `figma-v3` and merged back
into it.

## Source

Figma file `vbs2QJkAZE0ahMaKTa0Z46`, frame `Compliance Support`, 1440x4527.
Reference render `Compliance Support.png`, 2880x9054 — exactly 2x. The Figma API
is paywalled on this account and was not used; see
`docs/figma-for-business-v3-2026-09-09.md` for the endpoint table. Unlike the
three service-page renders, this one carries **no** 1px non-white column at the
right edge (checked over the hero band; the last non-white column below the
navbar is well inside 2870).

## Verdict: incremental

The frame's five sections map 1:1 to the five the page already had, in the same
order, and every line of copy in `layout-16`, `layout-615`, `faq-01` and the
hero already matched the frame verbatim. What changed:

| Section | Change |
|---|---|
| `layout-134` Hero | Two vignettes added; promoted to `<h1>`; **CARF seal removed** |
| `layout-16` | `<h1>`→`<h2>`; four icons self-hosted and masked; quotes given their own line |
| `layout-615` | Alt text only. Copy and both portraits already matched |
| `faq-01` | Question face corrected. Copy already matched |
| `cta-25` | Re-skinned to the v3 CTA — ninth copy |

### The hero's CARF seal is not in the frame

The shipped hero opened with the CARF Gold Seal at 96px, linked to CARF's
provider listing, above the tagline. The frame draws **nothing** between the
navbar (which ends at y=72) and the tagline (ink at y=197) — the row profile
over that band is empty across the full 1440 — and puts the two vignettes in
that visual slot instead.

Settled by following the frame: the seal goes. No claim is lost. The hero body
still says "We hold the CARF Gold Seal ourselves", the seal component is
unchanged and still renders in `footer-04`'s first band on all 20 routes and in
the homepage trust strip, and the accreditation itself is the one already
verified in `components/brand/carf-seal.jsx`. Worth a look in review, since it
is the only element this pass removes rather than restyles.

### "Led by" names two people this pass cannot verify

`layout-615` credits "Julia Gilliam, LSW — Chief Compliance Officer, Clinical.
Nine years across behavioral health…" and "Martha Matthews — Chief Risk Officer.
20+ years in enterprise risk…", each with a portrait. The frame reproduces all
of it verbatim, and both portraits are the files already in the repo (mean
channel difference 2.1 and 1.4 against 44+ for the other candidate in the same
test), so nothing here is newly introduced by this pass.

They are still assertions — names, credentials, tenures — that nothing in the
codebase confirms, and both portraits read as generated rather than
photographed. Left exactly as shipped and **flagged for confirmation**, on the
same footing as Advisory's still-unconfirmed "Free, with no obligation." Only
the two `alt="Relume placeholder image"` strings were changed, to name the
person.

### The block geometry the frame draws is a pasted screenshot

The frame puts the whole of `layout-16` 90px right of the container edge, with
its right-hand column running past x=1440. The column widths give it away: the
text column's ink runs 170.5→767 (596.5 wide) and the illustration's centre sits
at 1151, which is exactly the centre of a 600px right column in a 600/80/600
container grid shifted +90. It is the built page pasted in, not design intent,
so the section stays container-aligned. Same call as the AI Consultation pass.

### The quoted situations were running into their answers

All five blocks in `layout-16` set the quote on line one and the answer beneath
it. The export ran each pair together into one run of text, so the reader had to
find the sentence boundary themselves. Each quote is now a `<span className="block">`.

## New tokens

**None.**

## Deliberate departures from the frame

- **`layout-16` is container-aligned, not at the frame's +90.** See above.
- **The shared `Button` renders 48px tall against the frame's 50.** Known,
  accepted, site-wide delta; not changed on one page.
- **The footer and navbar were not touched**, including the wordmark + CARF
  lockup above the torn edge and the seven `cdn.jsdelivr.net` icons still
  hot-linked inside the nav dropdown.

## Measured fidelity at 1440

The pane's layout viewport is 1425 (15px scrollbar), so right-anchored elements
were corrected +15 before comparing.

| | Frame | Built | Δ |
|---|---|---|---|
| Page `<h1>` count | — | 1, on the hero | was 1, on `layout-16` |
| Hero tagline | 16/24 Lexend Deca 600 | 16/24 Lexend Deca 600 | **0** |
| Hero heading | 52/62.4 Playfair 400 | 52/62.4 Playfair 400 | **0** |
| Hero body | 18/27 Lexend Deca 400 | 18/27 Lexend Deca 400 | **0** |
| Letter vignette | 84, 371.5 · 237.5x222 | 84, 371.5 · 237.5x222 | **0** |
| Globe vignette | 1167, 225 · 156.5x153 | 1152+15, 225 · 156.5x153 | **0** |
| Hero CTA height | 50 | 48 | −2 (site-wide) |
| `layout-16` heading | 52/62.4 | 52/62.4 (`<h2>`) | **0** |
| `layout-16` icons | dark neutral, 24px box | `bg-scheme-text`, `size-6` | **0** |
| `layout-615` portraits | frame's two | same two files | 2.1 / 1.4 |
| FAQ question | 18/27 Lexend Deca **700** | 18/27 Lexend Deca **700** | **0** |
| CTA | white, left-aligned, envelope | white, left-aligned, envelope | **0** |
| CTA button | black fill, white label | `rgb(0,10,8)` / `rgb(255,255,255)` | **0** |

The frame's icon colour was sampled rather than assumed: the darkest channel
triple under the first list icon is `0,10,8`, which is the dark neutral, not the
Viking green the How We Work icons carry.

### Assets

| Asset | Size | File | Alpha round-trip Δ |
|---|---|---|---|
| `compliance-hero-letter.png` | 475x444 | 98 KB | **0.000** |
| `compliance-hero-globe.png` | 313x306 | 96 KB | **0.000** |

Both are 2x the box the frame draws them in, cut from the render and
un-composited off white with a min-channel alpha key. 194 KB added, shipped
unquantised. The round-trip figure proves the decomposition off white is
lossless; it is **not** a match against an independent source, since both came
from the render.

Isolating them needed the y-band technique: the letter shares rows with the body
copy and the globe shares rows with the heading, so a naive bounding box
swallows the centred column.

Three Material Symbols saved into `/svgs`, pinned at
`@material-symbols/svg-500@0.38.0` — `icon-search_insights.svg` (1.2 KB),
`icon-support.svg` (1.2 KB), `icon-send.svg` (0.4 KB). `icon-strategy.svg` was
already there from an earlier pass.

**No new photograph or illustration was needed.** The `layout-16` illustration
and both `layout-615` portraits are files already in the repo, confirmed by
ink-bbox match at 0.5, 2.1 and 1.4 against 38+ / 44+ for every other candidate.

## Verification

- `pnpm build` clean; 23 static pages; TypeScript clean.
- Exactly one `<h1>`, and it is the hero. Full outline: h1 hero → h2 "Where are
  you right now?" → h2 "Led by" (h3 per person) → h2 FAQ (h3 per question) →
  h2 CTA.
- No horizontal overflow at 375: `scrollWidth == clientWidth == 375`, zero
  elements extending past the viewport on either side. Both vignettes are hidden
  below `lg`.
- Zero `cdn.jsdelivr.net` requests from this page's own sections; the seven that
  remain are all inside the navbar dropdown, which is out of scope.
- No console errors.
- Every `href` on the page resolves to a real route in `out/` (`/contact-us`).

## Unreferenced assets

**Nothing newly orphaned.** All three `compliance-support-feature-section-*`
files are still referenced. Already-unreferenced and unchanged by this branch:
the standing backlog in `docs/figma-for-business-v3-2026-09-09.md` (25 files /
~7.5 MB), including `advisory-services-features-list-section-1.jpg`.
