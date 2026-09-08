# How We Work — v3 Figma pass (2026-09-08)

Branch `figma-how-we-work-import-v3`, cut from `figma-about-us-import-v3` rather
than from `master`. `master` is untouched.

## Why this branch is not off master

The v3 work chains: homepage → About Us → this. That tip carries the rebuilt
shared footer, the self-hosted Playfair italic, three colour tokens and two
schemes, all of which are cross-site. Branching off `master` would have meant
building against chrome and tokens that no longer match. Both parent branches
are unmerged and under review; that is expected.

## Source

Figma file `vbs2QJkAZE0ahMaKTa0Z46`, frame `How we work`, node `10214-103297`,
1440x5223, 22 top-level children. Reference render `How we work.png`,
2880x10446 — exactly 2x despite the filename, and pixel-accurate enough to
sample fills off directly.

### The API route changed, and the next pass should know why

`/v1/files/:key/nodes` — the endpoint both previous passes used — now returns
**429 for days at a time**, and it is not a transient throttle. The response
headers say so plainly:

```
x-figma-plan-tier: starter
x-figma-rate-limit-type: low
Retry-After: 369945            # 4.3 days
x-figma-upgrade-link: https://www.figma.com/files?api_paywall=true
```

That is Figma's free-tier paywall on the expensive endpoints, and the two
previous passes exhausted the quota. Retrying does not clear it. Everything
else still works, so nothing was lost:

| Endpoint | Status | Used for |
|---|---|---|
| `/v1/files/:key/nodes` | **429, paywalled** | — |
| `/v1/files/:key` | 200 | whole file, 284MB in 47s; the frame extracted locally |
| `/v1/files/:key?ids=…&geometry=paths` | 200 | **the `ids` filter works here** — 25KB for one vector's `fillGeometry` |
| `/v1/files/:key/images` | 200 | `imageRef`/`gifRef` → URL map |
| `/v1/images/:key?ids=…&scale=2` | 200 | node renders |

The `ids` filter on `/v1/files/:key` is the useful discovery: it makes the
whole-file endpoint a drop-in for the paywalled one at a fraction of the size.
`/v1/images` is separately rate-limited and needs ~40s of spacing between
bursts.

The Framelink MCP is still not loadable — `.mcp.json` lives only on the
`figma-export-2` branch and MCP servers bind at app start.

## This was incremental, not a rebuild

The frame's 22 top-level children flatten to the same five sections the page
already had. Two of them needed nothing:

| Section | Why it was left alone |
|---|---|
| `layout-134` Hero | Tagline 16/24 w600, heading 52/62.4 Playfair 400 at -0.52, body 18/27, button 140x44 r12 — all identical to the frame. Only the heading *element* changed; see below |
| `faq-01` | All four questions and all four answers identical to the frame, at its own 18/27 and 16/24. Only the question *face* changed |

Of the 22 children, 6 are the footer region and the navbar (out of scope), 2 are
hidden leftovers (`Vector 1`, `Vector 2` — `visible: false`, checked before
building), and 3 are stray footer text nodes.

## What changed

| Section | Change |
|---|---|
| `layout-365` Three simple steps | The second pillar is **Kaizen**; cards take the frame's uneven 640/608 columns; all three illustrations re-cut from the frame |
| `layout-254` What You'll Experience | Icons are Viking dark and self-hosted; the centre media is a **video**; a new decorative curve behind the foot of the section |
| `faq-01` | Questions are Lexend Deca 700 — a site-wide finding, see below |
| `cta-25` | Re-skinned to the v3 CTA: white rather than green `scheme-2`, copy left-aligned, envelope illustration beside it. Byte-identical to the About Us one |
| `layout-134` | `<h2>` → `<h1>`. The route had no `<h1>` at all |

### Kaizen, and what it resolves

The Relume export shipped the second card as a byte-identical copy of the first
— same "First", same "Accountability", same sentence, same image — so a section
promising three pillars showed two. An earlier pass patched the gap by writing a
new pillar called "Clarity". The frame resolves it properly: the missing pillar
is **Kaizen**, and the copy now in the build is the frame's own.

### The `gifRef` trap fired again

`Rectangle 9` (10283:1376), the centre media, carries an `imageRef` *and* a
`gifRef`. The `imageRef` is only the poster frame. Searching for `VIDEO` or
`videoRef` finds nothing.

| | Source GIF | Shipped |
|---|---|---|
| What You'll Experience | 800x1422, 103 frames @10fps (10.3s), 38.7MB | 0.62MB MP4 / 0.36MB WebM |

Same 800x1422 as the About Us vision clip but a different one (mean pixel
difference 59.6 against that poster) — a woman turning with her arms out under
a blossoming tree. Encoded at the source's native 10fps, x264 `crf 35` / VP9
`crf 52`, `-an`. The poster is the video's own first frame, unmasked: the Figma
`imageRef` and GIF frame 0 are **byte-for-byte identical** (mean diff 0.00), so
nothing shifts when playback starts. The r20 mask is CSS. Autoplay is suppressed
under `prefers-reduced-motion` in JS, since no CSS pauses a video.

### The icons were never going to be green

The frame draws all six at `#41b19a` (`--color-viking-dark`). The export set
`text-scheme-text` on an `<img>`, which cannot tint anything, so they rendered
black regardless of the class. Tinting needs the file as a CSS mask, and a mask
needs a same-origin file — so the six Material Symbols are now in `public/svgs/`
rather than hot-linked off jsdelivr, and the fill comes from the token. All six
measure `rgb(65, 177, 154)` in the browser.

This also removes a runtime CDN dependency from this page. The other sections
that hot-link jsdelivr are untouched.

## The FAQ finding — site-wide, not page-local

**Every one of the nineteen frames in the Figma file** — the v2 desktop set and
the v3 rebuilds alike — sets FAQ accordion questions in **Lexend Deca 18/27 at
weight 700**. The build renders them in **Playfair Display 400**, on all eleven
routes that carry an FAQ.

Two things compound, and neither is wrong on its own:

- Radix's `AccordionPrimitive.Header` renders an `<h3>`, which the base
  `h1–h6 { font-family: "Playfair Display" }` rule catches.
- The trigger's own `font-bold` resolves through `--font-weight-bold`, which
  this brand pins to 400 deliberately.

So a question that is marked bold and is not a heading comes out as neither.

Fixed by composing at the call site, not by rewriting the primitive. It takes
**two** classes and the split is not cosmetic:

- `font-body` — the family, declared in `globals.css` so the brand's
  one-file rule for `font-family` still holds.
- `font-[700]` — the weight. It has to be a real font-weight utility: `cn()` is
  tailwind-merge, which drops the earlier `font-bold` only when the later class
  lands in the same group. A `font-weight` buried inside `font-body` is
  invisible to that, and `font-bold` then wins on source order and puts the
  weight back to 400. This was observed, not assumed — the first attempt shipped
  the weight inside the utility and measured 400 in the browser.

**Applied on `/how-we-work` only.** The same two classes belong on the other ten
`faq-01` sections; that is a site-wide visual change and is left for a decision
rather than made here.

## New token

Added to `app/globals.css` as marked deviation `[12]`, and mirrored into
`tokens/colors.css`, the design skill's `readme.md` and `CLAUDE.md`.

- `--color-plantation: #274d40` — the decorative curve behind the foot of
  `layout-254`, drawn at 20% opacity. Nothing on the Viking or Caribbean Green
  ramps is this colour; `--color-viking-darker` (#20584d) is nearest and is
  lighter and more cyan. Named for the swatch the way Viking, Cerulean and
  Pickled Bluewood are — all Name-That-Color names, and #274d40 is Plantation
  on that list. The token holds the *source* colour; the 20% is applied where
  the shape is drawn, so over this section's white it resolves to `#d4dbd9`,
  which is what the reference render measures.

`@utility experience-curve` positions it. `@utility font-body` is deviation
`[13]`, above.

Everything else the frame asked for already had a token. At ≥992px `--text-h2`
(52/62.4), `--text-h3` (44/52.8), `--text-h5` (28/39.2) and the 18/27 and 16/24
body sizes matched the frame exactly, and `--radius-card` is already the
frame's 8px.

### The curve is not a third gradient exception

It is flat colour in a shape — one fill, one opacity, no ramp and no repeat — so
the two homepage-only exceptions at `[8]` stand unchanged. The path is the
frame's own vector (`Vector 5`, 10286:1391) inlined verbatim rather than
redrawn, and sized in percentages of the viewport (`width: 108.576%`,
`left: -0.347%`) so it keeps its relationship to the page at every width. A
fixed-px curve would hold its 1563px span while the page narrowed and the
visible portion would drift to the flat left end.

Fetched with `?ids=10286:1391&geometry=paths`, which returns `fillGeometry` the
plain node call omits.

## Content integrity

Nothing placeholder shipped, and one thing the frame asks for was refused:

- **The duplicated value.** The frame lists "The people behind it" **twice**,
  once per column, with two rewordings of the same sentence about leadership
  experience. That is the export's own duplication carried into the design file,
  and it leaves a section headed "six core values" showing five — one of which
  is not a value but an About Us line. The two slots keep the pillars an earlier
  pass put there: **Collaboration** (the U in UPLIFT) and **Inclusion** (the I).
- The illustrations are real line-art, not the grey CloudFront avatars Relume
  ships. The video is real footage.
- No fabricated names, testimonials or logos appear in this frame's in-scope
  region.

Nothing on this page is blocked on the client.

## Deliberate departures from the frame

- **Section rhythm.** The frame's five inter-section gaps run 197px, 255px,
  279px, 332px — no pattern, which is the signature of hand-placed blocks rather
  than a designed rhythm. Rather than hard-code four different paddings,
  `layout-365` and `layout-254` were moved onto the brand's standard
  `py-16 md:py-24 lg:py-28`, which the page's other three sections already use.
  Every gap now lands at 224px, inside the frame's own spread. They previously
  carried `py-20` and `py-18`, which a v2 pass had tightened.
- **The CTA's horizontal inset.** This frame puts the CTA heading at x=171, and
  the About Us frame puts it at 171 too — both pages ship it at the container
  edge, x=80. Left consistent with the two pages already under review rather
  than changed on one of three. Worth settling across all three.
- **The FAQ ships collapsed** while the frame draws all four answers open. The
  About Us precedent.
- **The footer and navbar were not touched**, as instructed. The footer departs
  from this frame deliberately and is shared by all 20 routes — see
  `docs/figma-homepage-v3-2026-09-08.md`.

## Measured fidelity at 1440

Frame-relative coordinates measured in the browser. The frame's own text boxes
in `layout-254` sit 5px left of the container (heading at x=331 against a
336 container centre, columns at 75 against 80), a systematic overhang in the
design file rather than intent; the built x values are the corrected ones and
are marked accordingly.

| | Frame | Built | Δ |
|---|---|---|---|
| Hero h1 | 336,228 768x124 52/62.4 | 336,224 768x125 52/62.4 | x **0**, type **0** |
| Hero tagline | 16/24 w600 | 16/24 w600 | **0** |
| Hero button | 650,462 140x44 | 648,459 144x48 | +4 each axis = the 2px border |
| Steps card 1 | 80,1005 640x290 | 80,923 640x293 | x **0**, w **0**, h +3 |
| Steps card 3 | 752,1005 608x613 | 752,923 608x617 | x **0**, w **0**, h +4 |
| Steps card 1 image | 400 320x290 | 400 318x289 | x **0**, −2 = the 2px border |
| Steps card 3 image | 752 608x360 | 754 604x358 | −4 = the 2px border |
| "Accountability" | 28/39.2 Playfair 400 | 28/39.2 Playfair 400 | **0** |
| "Flexibility" | 44/52.8 Playfair 400 | 44/52.8 Playfair 400 | **0** |
| Experience columns | 322 wide | 322 wide | **0** |
| Experience video | 490*,2069 449x708 r20 1px | 495,1953 449x708 r20.0005 1px | x **0** (*+5), size **0**, radius **0** |
| Value headings | 28/39.2 Playfair 400 | 28/39.2 Playfair 400 | **0** |
| Value icons | 48x48 `#41b19a` | 48x48 `rgb(65,177,154)` | **0** |
| Curve | −5,2085 1563x749 #274d40 @20% | −5,1887 1563x749 rgb(39,77,64) @0.2 | geometry **0**, fill **0** |
| FAQ question | 18/27 Lexend Deca **700** | 18/27 Lexend Deca **700** | **0** |
| CTA h2 | 171,4182 52/62.4 | 80,3754 52/62.4 | x −91, the departure above |

Every designed value that is not a deliberate departure matches exactly. The
page runs shorter than the frame cumulatively — about 430px by the CTA — for
three reasons, all expected: the standardised section padding above, the FAQ
shipping collapsed while the frame draws it open, and this page's "Collaboration"
copy running to three lines where the frame's duplicate ran to two.

### Assets, numerically

Each exported file compared against the same region of the 2x reference render,
best-aligned within ±2px:

| Asset | Size | Mean channel Δ vs reference |
|---|---|---|
| `how-we-work-accountability.png` | 640x581, 23KB | **0.12** at offset (0,0) |
| `how-we-work-kaizen.png` | 640x581, 46KB | **0.20** at offset (0,−1) |
| `how-we-work-flexibility.png` | 1216x720, 41KB | **0.10** |
| `how-we-work-experience-poster.jpg` | 800x1422, 102KB | **3.58** (JPEG q82 against the render's PNG) |

The three illustrations are the frame's node renders at scale 2 — pre-cropped to
exactly the box each is drawn in, so no `object-fit` guesswork — then flattened
onto white and quantised to 64 colours. They are line art, so the palette costs
nothing visible and takes card 1 from 749KB to 23KB. PNG throughout; the repo has
no WebP precedent.

Two of the three sources turned out to be files the repo already had:
`how-we-work-how-it-works-section-new-0.png` is byte-for-byte the same Figma
asset as the new accountability image, and `…-new-2.png` the same as the
flexibility one. What changed is the crop and the optimisation, not the artwork.
Only Kaizen is a genuinely new illustration.

## Verification

- `pnpm build` clean; 23 static pages generated; TypeScript clean.
- Exactly one `<h1>` in `out/how-we-work.html`.
- All 27 internal `href`s on the page resolve to real routes in `out/`.
- All 12 new assets present in the export and referenced by the page.
- `--color-plantation`, `experience-curve` and `.font-body` all present in the
  built CSS; the curve path inlined in the exported HTML.
- No horizontal overflow at 375px (`scrollWidth == clientWidth == 375`). The
  curve SVG is wider than the viewport by design and is clipped by the section's
  `overflow-hidden`; it creates no scrollbar.
- Video reaches `readyState 4` and plays; poster and both encodings load.

## Unreferenced assets

Newly orphaned **by this pass** — not deleted, flagged for a decision:

- `public/images/how-we-work-how-it-works-section-new-0.png` (749KB) — superseded
  by the pre-cropped, quantised `how-we-work-accountability.png`
- `public/images/how-we-work-how-it-works-section-new-2.png` (19KB) — superseded
  by `how-we-work-flexibility.png`
- `public/images/how-we-work-team-section-new.png` (117KB) — superseded by the
  video
- `public/images/advisory-services-about-section-new.png` (659KB) — was the
  image on the invented "Clarity" card; nothing references it now

Sixteen other files in `public/images/` were already unreferenced before this
branch and are unchanged by it (the `home-*`, `business-conusltation-*`,
`contact-us-*` and two `advisory-services-*` sets). Listed here only so the two
groups are not confused.
