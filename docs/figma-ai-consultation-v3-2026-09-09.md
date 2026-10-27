# AI Consultation — v3 Figma pass (2026-09-09)

Branch `figma-ai-consultation-import-v3`, cut from `figma-v3` and merged back
into it. Not chained off `figma-for-business-import-v3`.

## Source

Figma file `vbs2QJkAZE0ahMaKTa0Z46`, frame `AI Consultancy`, 1440x4467.
Reference render `AI Consultancy.png`, 2880x8934 — exactly 2x.

**The Figma API was not used.** All three file-reading endpoints and the render
endpoint are paywalled on this account (HTTP 429, `x-figma-plan-tier: starter`,
`x-figma-rate-limit-type: low`, `Retry-After` 302k–334k seconds ≈ 3.5–3.9 days;
`/v1/me` still 200, so it is quota, not auth). Re-probed at the start of this
pass and unchanged. Everything below was measured off the 2x render with numpy.
See `docs/figma-for-business-v3-2026-09-09.md` for the full endpoint table.

One render artifact worth knowing: this export carries a 1px non-white column at
x=1439–1440 down the whole page. It silently widened three bounding boxes before
it was spotted. Exclude the last pixel column when measuring this file.

## Verdict: incremental, but this page had the most actual bugs of the five

The frame's sections map 1:1 to the five the page already had. Nothing was added
or dropped. But four of the five needed real fixes, and two of those were
content bugs rather than styling.

| Section | Change |
|---|---|
| `layout-134` Hero | Two vignettes added; promoted to `<h1>` |
| `layout-01` | Frame's own illustration replaces a stock photo; body split into the frame's two paragraphs; `<h1>`→`<h2>` |
| `layout-253` | Icons self-hosted, tinted and resized; four `<h1>`s→`<h3>`; "Approch" typo fixed |
| `layout-423` | **All three cards were byte-identical.** Frame's real copy shipped; hover-expand and wrong links removed |
| `cta-25` | Re-skinned to the v3 CTA — sixth copy of a decision already taken |

### The page had five `<h1>`s and none on the hero

`layout-01`'s heading was one, and each of `layout-253`'s four card titles was
another. The hero heading was an `<h2>`. That is now one `<h1>` on the hero,
with `layout-01` at `<h2>` and the four approach titles at `<h3>` under their
section's `<h2>`.

### `layout-423` — the export shipped one service three times

Every card was headed "AI strategy and implementation" with the same body, on a
section whose standfirst promises "a full suite of services". Same Relume
duplication the How We Work pass found in its three-pillar section. The frame
draws three distinct cards and that copy ships:

| Card | Body |
|---|---|
| AI strategy and implementation | We help you build a strong AI foundation with strategy, governance, and workforce-ready solutions. |
| AI Workforce Training | AI training ensures your team has the skills to use new tools efficiently and drive growth. |
| Custom AI Solution Development | Custom AI solutions for your unique challenges, including intelligent chatbots and automation tools. |

Two behaviours went with it, both because the frame draws the cards static and
both doing harm:

- **The hover-to-expand.** Body copy and a "Learn more" link were hidden at `lg`
  until the pointer entered the card, and the card grew 50%→70%, squeezing its
  neighbours. Content that exists only on hover is unreachable by keyboard and
  by touch. The frame shows three equal cards with the body always visible.
- **The links.** All three linked to `/how-we-work` — three different services
  pointing at one unrelated page. The frame gives them no destination and no
  "Learn more", so they are no longer links. When these services get routes,
  that is when they become links again.

**The three photos are unchanged** — compared against the render, the frame uses
the same three files already in the repo, differing only by its scrim and crop.
The frame draws each card 405x630, which is exactly those files' own aspect.

### `layout-253` — the icons were hot-linked, untintable and the wrong size

Three faults, two of which share one fix:

1. They were fetched at runtime from `cdn.jsdelivr.net/...@latest` — an unpinned
   third-party dependency for four files that never change.
2. They rendered **black**. The export set `text-scheme-text` on an `<img>`,
   which cannot tint anything. The frame draws them `#06A785`.
3. They were 48px; the frame draws **40** (all four measure 40.5–41px tall; the
   widths vary with the glyph, so height is the reliable dimension).

Fixed the way `how-we-work/layout-254` already established: the same four
Material Symbols saved into `/svgs` (pinned at `@material-symbols/svg-500@0.38.0`)
and applied as CSS masks so the fill comes from the palette. `#06A785` is
already `--color-caribbean-green-dark` — **no new token.**

### `layout-01` — the frame's illustration, and two paragraphs

The media is the frame's line-art figure with a lit bulb for a head, not the
stock photo the export shipped. It is drawn 222x642 — tall and narrow, not the
wide crop the photo filled — so it gets its own width rather than stretching.

The body is two paragraphs in the frame; the export ran them together. The break
falls after "productivity and profitability." and measures as a 54px gap against
the 27px line pitch either side, i.e. exactly one blank line.

## New tokens

**None.** Heading 52/62.4, card headings 36/46.8, body 18/27 and 16/24, the
1280 container and `--color-caribbean-green-dark` all already existed.

## Deliberate departures from the frame

- **`layout-01` is container-aligned, not frame-aligned.** The frame draws that
  whole block 62px right of the container edge (copy at x=142.5, illustration at
  1012–1234). Every other section on this page and across the site aligns to the
  container, and the design skill flags these pasted blocks' absolute
  coordinates as not design intent. The illustration is centred in the right
  column, which lands it at 949–1171 — the frame's own position with the offset
  removed.
- **The service cards keep `rounded-card`.** The frame draws them square. Kept
  the brand's card radius rather than introducing a square-cornered card variant
  for one section.
- **The footer and navbar were not touched.**

## Measured fidelity at 1440

Corrected for the 15px scrollbar (pane renders 1425).

| | Frame | Built | Δ |
|---|---|---|---|
| Page `<h1>` count | — | 1 | was **5** |
| Hero top | 72 | 72 | **0** |
| Hero heading | 52/62.4 Playfair 400 | 52/62.4 Playfair 400 | **0** |
| Notepad vignette | 112, 245.5 · 165.5x154 | 112, 245.5 · 165.5x154 | **0** |
| Monitor vignette | 1167.5, 403 · 145.5x136 | 1167.5, 403 · 145.5x136 | **0** |
| `layout-01` heading | 52/62.4 | 52/62.4 | **0** |
| `layout-01` illustration | 222x642 | 222x642 (444x1284 source) | **0** |
| `layout-253` heading | 52/62.4 | 52/62.4 | **0** |
| Approach titles | 36/46.8 Playfair | 36/46.8 Playfair | **0** |
| Approach icons | 40px, `#06A785` | 40x40, `rgb(6,167,133)` | **0** |
| Service cards | 405x630, 32px gaps | 405x631, 32px gaps | **1** ¹ |
| Card label | 16/24 w600 | 16/24 w600 | **0** |
| Card heading | 36/46.8 Playfair, white | 36/46.8 Playfair, white | **0** |
| CTA heading | 52/62.4 | 52/62.4 | **0** |
| CTA illustration | 426x415 | 462x444 | see note ² |

¹ `aspect-[405/630]` rounding at this container width.
² The frame draws the envelope smaller here than in the five other frames that
share the node (426x415 against 462x444, the same 1.03 aspect). That spread is
inside the hand-placed-block error, so the shared 462px cap is kept for
consistency across the six CTAs.

### Assets

| Asset | Size | File | Alpha round-trip Δ |
|---|---|---|---|
| `ai-consultation-hero-notepad.png` | 331x308 | 44 KB | **0.185** |
| `ai-consultation-hero-monitor.png` | 291x272 | 37 KB | **0.173** |
| `ai-consultation-bulb-figure.png` | 444x1284 | 195 KB | **0.079** |
| `svgs/icon-strategy.svg` | — | 1.2 KB | — |
| `svgs/icon-integration_instructions.svg` | — | 1.0 KB | — |
| `svgs/icon-encrypted_add.svg` | — | 1.3 KB | — |
| `svgs/icon-align_justify_center.svg` | — | 0.7 KB | — |

All three PNGs are 2x the box the frame draws them in, cut from the render and
un-composited off white with a min-channel alpha key. As on For Business, that
round-trip figure proves the decomposition is lossless, not that the asset
matches an independent source — they came from the render. Shipped unquantised;
276 KB total, and the four SVGs remove a runtime CDN dependency.

## Verification

- `pnpm build` clean; 23 static pages; TypeScript clean.
- Exactly one `<h1>` (was five).
- No horizontal overflow at 375: `scrollWidth == clientWidth == 375`, zero
  overflowing elements. Vignettes hidden below `lg`; cards fall back to a
  352px min-height.
- `h1` steps 52px → 40px at 375.
- All four icon masks resolve and paint `rgb(6, 167, 133)`.
- Three distinct card titles render; no card contains a link.
- No console errors.

## Unreferenced assets

Newly orphaned **by this pass**:

- `public/images/ai-consultation-about-section.png` — the `layout-01` stock
  photo the frame's illustration replaces.

Not deleted. This adds to the standing 24-file / 6.9 MB backlog listed in
`docs/figma-for-business-v3-2026-09-09.md`.
