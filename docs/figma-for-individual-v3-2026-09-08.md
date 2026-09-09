# For Individual — v3 Figma pass (2026-09-08)

Branch `figma-for-individual-import-v3`, cut from `figma-how-we-work-import-v3`
rather than from `master`. `master` is untouched.

## Why this branch is not off master

The v3 work chains: homepage → About Us → How We Work → this. That tip carries
the rebuilt shared footer, the self-hosted Playfair italic, three colour tokens,
two schemes and two utilities, all cross-site. Branching off `master` would have
meant building against chrome and tokens that no longer match. Every parent
branch is unmerged and under review; that is expected.

## Source

Figma file `vbs2QJkAZE0ahMaKTa0Z46`, frame `For Individual`, node
`10214-103875`, 1440x6838, 25 top-level children. Reference render
`For Individual.png`, 2880x13676 — exactly 2x despite the filename, and
pixel-accurate enough to sample fills off directly.

### The API route

`/v1/files/:key/nodes` is still paywalled on this account (starter tier, HTTP
429 with a ~4.2 day `Retry-After` — a quota, not a throttle). It was not called.
`/v1/files/:key?ids=10214:103875&geometry=paths` returned the frame in one shot:
HTTP 200, 822KB, 2.1s. `/v1/files/:key/images` resolved the `imageRef`/`gifRef`
map. Both are the same endpoints the How We Work pass settled on.

## Four sections revised, two replaced

The frame's 25 top-level children flatten to the six sections the page already
had, plus the navbar, the footer region, two hidden `Vector` leftovers
(`visible: false`, checked before building) and five decorative rectangles.

| Section | Verdict |
|---|---|
| `layout-134` Hero | **Revised.** Type identical to the frame; three decorative vignettes added |
| `layout-504` Tabs | **Revised.** The frame resolves a real content bug — see below |
| `layout-395` | **Replaced.** A different section entirely |
| `timeline-05` | **Replaced** as layout; the page's own content kept, by decision |
| `faq-01` | **Matches exactly.** Only the question face changed |
| `cta-25` | **Re-skinned** to the v3 CTA, as on the three previous pages |

## What changed, section by section

### `layout-134` — the hero gains three vignettes

Type was already exact: tagline 16/24 w600, heading 52/62.4 Playfair 400 at
-0.52, body 18/27, button 140x44. Nothing there moved.

The frame adds three line-art vignettes around the copy — a heart handed over on
the left, a flower on the right, a wrapped gift below the button. All three are
crops of one 4096x2731 sheet (`18880313_v911-a-01-b`) placed with non-uniform
STRETCH scaling. Rather than ship the sheet and fight `object-position`, each
was cut at its own `imageTransform` matrix and exported at exactly 2x the box
the frame draws it in, so each file is already the right shape.

They are `lg:` only. The frame is a 1440 desktop frame and below that the
vignettes would sit under the copy rather than beside it.

**The heading is now the page's `<h1>`.** The route previously had *two* — in
`layout-504` and `layout-395` — and none in the hero. Those are now `<h2>`, and
their child headings stepped down with them.

### `layout-504` — the frame fixes a bug the export shipped

The Relume export put tab 1's heading and body **verbatim in all three panes**,
so a tab set offering phone, video and scheduling said "a phone call keeps it
simple" on every one. The frame draws each pane with its own copy, and panes 2
and 3 with a tagline pane 1 does not have:

| Tab | Tagline | Heading |
|---|---|---|
| By phone | — | A steady voice on the other end of the line |
| By video | Video | Face to face without leaving your safe space |
| On your schedule | Schedule | Support that fits the shape of your day |

The media box is square in the frame (640x640 image, 640x640 content), not the
3:2 the export used. Headings are 44/52.8 = `text-h3`, which already matched.

Pane 1 gets the frame's own illustration — a tin-can telephone strung between
two rooftops, a far better fit for "By phone" than the stock photo the export
used. **The frame's panes 2 and 3 carry the grey Relume placeholder** (one
shared `imageRef`, 1000x1000, the picture-frame glyph), so the real
illustrations already in the repo were kept instead.

Two departures: pane 1 keeps its image on the left where the frame flips panes 2
and 3 to the right (only one pane is visible at a time, so alternating makes the
media jump across the card between clicks), and the "Learn more" secondary link
on panes 2 and 3 is not built — the frame gives it no destination.

### `layout-395` — replaced

The export shipped a three-up grid of bordered cards, each a photo above a
heading. The frame draws something structurally different: a display heading
over a staggered cascade of three text blocks on the left, and a diagonal stack
of three tall rounded cards on the right, the middle one a video. The three
items' copy is unchanged — the frame keeps it verbatim too.

The stagger is design intent, not drift: item 2 is indented 309px and dropped
below item 1, item 3 returns to the left, and the diagonal mirrors the diagonal
of the card stack opposite. It is dropped below `lg`, where there is no stack to
mirror.

The three cards are each 522x824 at r86, offset by (49,32) and (84,63) from the
backmost — a 606x887 bounding box. Positions and sizes are percentages of that
box so the stack scales as one object, and the radius is `cqw` against the box
(86/606 = 14.191%) rather than px, so it holds its proportion as the column
narrows instead of creeping towards a pill. Same technique as the How We Work
video, and it is why **no new radius token was needed** — 86 is a genuine
radius here, not one of Figma's clamps (half the shorter side is 261).

The two outer cards are empty 1px outlines in the frame — decoration, so
`aria-hidden`.

#### The `gifRef` trap fired again, and the clip is a montage

`Rectangle 14` (10302:1451) carries an `imageRef` **and** a `gifRef`. The
`imageRef` is only the poster frame; searching for `VIDEO` or `videoRef` finds
nothing.

| | Source GIF | Shipped |
|---|---|---|
| Care built around your life | 800x1422, 103 frames @10fps (10.3s), 45.1MB | 0.47MB MP4 / 0.24MB WebM |

Encoded at the source's native 10fps, x264 `crf 35` / VP9 `crf 52`, `-an`. It is
**not** any clip already in the repo: against every existing poster the nearest
mean channel difference is 53.

It is the same 800x1422 as the About Us and How We Work clips, but unlike those
it is a **montage** — five scenes in 10.3s: a sunset over the water with
pelicans, a hand holding a yellow flower in a field, a woman blowing bubbles in
golden light, a woman resting back on a swing, a woman laughing with clouds
painted around her eyes. This was caught only because the built page rendered a
field where the poster showed a beach. The `aria-label` names all five: the
poster shows only the first, so a label describing the poster would tell a
screen-reader user the wrong thing about four fifths of the clip.

The poster is the video's own first frame, unmasked — the Figma `imageRef` and
GIF frame 0 are byte-for-byte identical (mean difference **0.00**), so nothing
shifts when playback starts. The r86 mask is CSS. Autoplay is suppressed under
`prefers-reduced-motion` in JS, since no CSS pauses a video.

### `timeline-05` — the frame's layout, the page's content

The frame replaces the scroll-tracked vertical rail with numbered blocks: a
hairline rule carrying a 32px filled segment, a tagline, a 52/62.4 heading and
body copy, set against an oversized numeral in the left column. That layout is
built.

**The frame's copy is not.** It fills these blocks with For Business material —
"Our simple 3-step consultation process", "Submit request … through your
organisation", "Discovery call", "Expert guidance", "consultation expert",
"tailored strategies and solutions". That is sales language for the sibling
audience page, and this route is peer coaching, therapy and counselling for Ohio
Medicaid adults. The frame also mis-numbers itself: its intro block is labelled
"01", so its first real step reads "02".

Raised, and settled: the page keeps **"How getting matched works"** and its four
steps — Application, Eligibility, Scheduling, Consent — unchanged. Those are the
same four the intake flow walks a person through, and their names stay in sync
with `components/intake/intake-steps.js`, which drives the breadcrumb on
`/cmps`, `/booking` and `/consent-form`.

Two more departures, both settled the same way:

- **The eight buttons are not built.** Every one is labelled literally "Button"
  — untouched Relume placeholder, two per block. They were not in the section
  before, they have no destination, and the page already offers the same action
  in the hero, in all three tabs and in the CTA.
- **The numerals are Playfair Display 400, not the frame's Roboto 700.** Roboto
  is not one of this brand's two faces. Size (224px), position and colour
  (`#000a08`) are the frame's.

### `faq-01` — copy identical, face corrected

All five questions and all five answers are identical to the frame, at its own
18/27 and 16/24. Nothing in the copy or spacing changed.

What changed is the question face, and it is the site-wide finding the How We
Work pass recorded: every frame in the file sets FAQ questions in Lexend Deca
18/27 weight 700, and the build renders them in Playfair Display 400. Fixed with
`font-body font-[700]` at the call site — both classes, since `cn()` is
tailwind-merge and drops `font-bold` only when a real font-weight utility lands
beside it.

**This is the second of eleven `faq-01` sections to get it.** The other nine
remain a site-wide change awaiting a decision.

### `cta-25` — the v3 re-skin

The same Figma node backs this frame and the homepage, About Us and How We Work
frames, so this is the fourth copy of a decision already taken: white rather
than green `scheme-2`, copy left-aligned, envelope illustration beside it. The
illustration already ships as `home-cta-envelope.png` at 924x888 — exactly 2x
the 462x444 the frame draws it at — so **no new asset**.

One deliberate difference from the How We Work and About Us copies: the button
opens the intake Application modal rather than linking to `/contact-us`. That is
this page's own wiring, and a general contact form is the wrong destination for
someone being matched to a Peer Coach.

## New tokens and utilities

Two additions to `app/globals.css`, mirrored into `tokens/typography.css`, the
design skill's `readme.md` and `CLAUDE.md`.

- **`--text-display`** (deviation `[14]`) — 3rem, rising to **5rem** at ≥992px.
  The frame sets "Care built around your life" at 80/96 with -1% tracking, one
  step above `--text-h1`, which tops out at 72/86.4. No existing token is 80px,
  and bending h1 was not an option — it is the page title on every route. The
  line height is the 1.2 that h1, h2 and h3 all share and the tracking is the
  -1% every heading token carries, so it is generated the same way as the rest
  of the scale. Used by this one heading and nothing else.
- **`@utility font-heading`** (deviation `[15]`) — Playfair Display, the exact
  counterpart to `font-body` at `[13]` and for the same reason: the heading face
  is reachable only through the base `h1–h6` rule, so an element that should
  carry it but must not be a heading has no way to ask. The step numerals are
  decorative duplicates of the "Step N" label beside them, so they are
  `aria-hidden` on a `<p>`; promoting them to `<h3>` would put four content-free
  headings into the outline of a page that already has a heading per step. The
  family is declared here and nowhere else, so the brand's one-file rule holds.

Everything else the frame asked for already had a token: at ≥992px `--text-h2`
(52/62.4), `--text-h3` (44/52.8) and `--text-h4` (36/46.8) and the 18/27 and
16/24 body sizes matched exactly.

**No new colour, shadow or radius.** The only value that looked like a candidate
was the cards' r86, and `cqw` against the stack's own box expresses it without
one.

## Content integrity

This page covers therapy, peer coaching and counselling, so the bar was higher
here. Three things the frame contains were refused:

- **The For Business process copy**, above. Nothing about consultation experts
  or organisational intake ships on a page about Ohio Medicaid peer coaching.
- **The eight "Button" placeholders**, above.
- **The grey Relume placeholder** behind tabs 2 and 3 — a 1000x1000
  picture-frame glyph shared by both panes. The repo's real illustrations were
  kept.

No clinical claims, credentials, outcome statistics or crisis-line details
appear in the frame, and none were invented. No fabricated names, testimonials
or logos appear in the in-scope region. Nothing on this page is blocked on the
client.

## Deliberate departures from the frame

- **The hero runs `lg:pb-52` rather than the standard `lg:py-28`.** The gift
  vignette runs to y=655, 150px below where the button's own bottom padding
  would end the section, and `overflow-hidden` sliced it. The extra depth is the
  frame's own — it leaves the hero 735px tall.
- **The card stack sits inside the container.** The frame runs it from x=788 to
  x=1394 against a container that ends at 1360, so it overhangs the right edge
  by 34px — the hand-placed-block signature. Built at the column edge instead,
  which puts it 39px left of the frame.
- **The `layout-395` standfirst uses `text-medium` (18/27), not the frame's
  20/30.** No token is 20px, the frame itself sets every other standfirst on
  this page at 18/27, and a token for one line of one section was not worth it.
  A 2px departure.
- **The italic clause is Playfair 500 italic, not the frame's SemiBold 600.**
  `.font-heading-italic` is the only sanctioned route to the italic and the real
  face is self-hosted at 500. One weight step.
- **The FAQ ships collapsed** while the frame draws all five answers open. The
  About Us and How We Work precedent.
- **The footer and navbar were not touched.** The footer departs from this frame
  deliberately and is shared by all 20 routes — see
  `docs/figma-homepage-v3-2026-09-08.md`.
- **`/for-business-page` was not touched**, though it shares section names.

## Measured fidelity at 1440

Frame-relative, measured in the browser against the built static export. The
container renders 1280 wide at x=73 in a 1425px pane.

| | Frame | Built | Δ |
|---|---|---|---|
| Page `<h1>` count | — | 1 | was **2**, now correct |
| Hero heading | 52/62.4 Playfair 400 | 52/62.4 Playfair 400 | **0** |
| Hero heart vignette | 0,72 358x333 | 0,72 358x333 | **0** |
| Hero flower vignette | 1031,72 426x333 | 1016,72 426x333 | size **0**, x −15 (pane is 1425, not 1440) |
| Hero gift vignette | 888,483 421x172 | 873,483 421x172 | size **0**, x −15 (as above) |
| Tab heading | 44/52.8 Playfair | 44/52.8 Playfair | **0** |
| Tab media | square | 590x590 square | ratio **0** |
| Display heading | 80/96 Playfair 400, -1% | 80/96 Playfair 400, -1% | **0** |
| Italic clause | Playfair italic 600 | Playfair italic 500 | one weight step |
| Video card | 522x824 r86 | 522x824 r85.9975 | size **0**, radius **0.0025** |
| Step numeral | 224px `#000a08` | 224px `rgb(0,10,8)` | size **0**, colour **0** |
| Step numeral face | Roboto 700 | Playfair Display 400 | departure above |
| FAQ question | 18/27 Lexend Deca **700** | 18/27 Lexend Deca **700** | **0** |

Every designed value that is not a listed departure matches exactly.

### Assets, numerically

Each exported file compared against the same region of the 2x reference render,
best-aligned within ±3px:

| Asset | Size | File | Mean channel Δ |
|---|---|---|---|
| `for-individual-hero-heart.png` | 716x666 | 28KB | **0.81** |
| `for-individual-hero-flower.png` | 852x666 | 30KB | **0.98** ¹ |
| `for-individual-hero-gift.png` | 842x344 | 25KB | **0.61** |
| `for-individual-by-phone.png` | 1080x1080 | 42KB | **0.61** |
| `for-individual-care-poster.jpg` | 800x1422 | 143KB | **2.95** ² |
| `for-individual-care.mp4` | 800x1422 | 459KB | — |
| `for-individual-care.webm` | 800x1422 | 239KB | — |

¹ Over the 818 of 852 columns the render actually contains — the frame runs this
vignette 17px (34px at 2x) past the 1440 edge, so the render has no pixels there.
² After accounting for `object-cover` into the 522x824 box and masking the r86
corners, which are page-white in the render. Unmasked and uncropped it reads
17.73, which is the mask and the crop, not the image. The residual is JPEG q82
against the render's PNG — comparable to the How We Work poster's 3.58.

The four stills are line art, so they are quantised (32 colours for the
vignettes, 64 for the illustration) with alpha preserved; the palette costs
nothing visible and takes the three vignettes from 439KB to 85KB. PNG
throughout — the repo has no WebP precedent. The poster is JPEG q82, matching
the other three video posters.

## Verification

- `pnpm build` clean; 23 static pages generated; TypeScript clean.
- Exactly one `<h1>` in the built page (was two, in two different sections).
- No horizontal overflow at 375px: `scrollWidth == clientWidth == 375`, and zero
  elements extend past the viewport on either side. The hero vignettes are
  `display: none` below `lg`, and the flower — which overhangs the page edge by
  design at 1440 — is clipped by the section's `overflow-hidden` and creates no
  scrollbar there either.
- Video reaches `readyState 4` and plays; WebM is selected, poster and both
  encodings load.
- Type scale steps correctly: display 80px→48px and numerals 224px→96px at 375.
- `--text-display` (8 hits) and `font-heading` (2) both present in the built
  CSS, along with the stack's `14.191cqw` radius.
- All 28 internal `href`s on the page resolve to real routes in `out/`.
- All 10 assets the page references are present in the export.

## Unreferenced assets

Newly orphaned **by this pass** — not deleted, flagged for a decision:

- `public/images/for-individual-page-benefits-section-0.jpg` (455KB) — was a
  card photo in the old `layout-395`, which the frame replaces
- `public/images/for-individual-page-benefits-section-1.png` (160KB) — as above
- `public/images/for-individual-page-benefits-section-2.png` (182KB) — as above
- `public/images/for-individual-page-feature-section.png` (75KB) — was the tab 1
  photo, superseded by the frame's own tin-can illustration

That is 872KB orphaned against 965KB added (four stills, poster, two video
encodings), so the page is **+93KB** net — the cost of trading three card
photos for a 10.3s montage, which is cheap for what it buys. The 45.1MB source
GIF is not shipped in any form.

Still referenced and unchanged: `for-individual-page-by-video.png` and
`for-individual-page-on-your-schedule.png`, kept precisely because the frame
offers only a grey placeholder in their place.

The twenty files listed as already-unreferenced in
`docs/figma-how-we-work-v3-2026-09-08.md` are unchanged by this branch.
