# Homepage — v3 Figma pass (2026-09-08)

Branch `figma-homepage-import-v3`, cut from `figma-homepage-2026-09` rather than
from `master`. `master` is untouched.

## Why this branch is not off master

`figma-homepage-2026-09` (7 commits, 2026-09-03) had already rebuilt this
homepage from the same Figma frame, and was never merged. That frame was
1440×6431; it is now 1440×6558. The two reference screenshots differ by exactly
that much (12862 vs 13116 px at 2×), so v3 is an incremental revision of the
Sep 3 design, not a new one. Branching from master would have meant redoing
~1,100 lines and re-exporting the same ten illustrations to arrive at the same
place. Confirmed with the requester before starting.

## Source

Figma file `vbs2QJkAZE0ahMaKTa0Z46`, frame `Homepage`, node `10264-1164`.

The Framelink MCP server was **not** available in the session that did this
work — `.mcp.json` exists only on the `figma-export-2` branch, and MCP servers
bind at app start. The frame was pulled through the Figma REST API instead,
using the `FIGMA_API_KEY` already in the environment:

```
GET /v1/files/:key/nodes?ids=10264:1164     # full node tree, styles, fills
GET /v1/files/:key/images                   # imageRef -> asset URL map
GET /v1/images/:key?ids=<node>&scale=2      # render a node as drawn
```

That gives the same node structure, layout, colours and image fills the MCP
would have. If the MCP is wanted for the next pass, `.mcp.json` needs to be on
the working branch before the app starts.

## Two traps in this frame

**Several blocks are pasted screenshots of the built site**, placed with
non-uniform `STRETCH` scaling — both hero cards (`Screenshot 2026-09-02 122442
2/3`, one shared `imageRef`, 594×392 in the frame against a real 624×407), the
CARF strip (`Screenshot 2026-09-03 232651 1`), and the CTA illustration
(`Screenshot 2026-08-27 170613 1`). Their absolute y-positions therefore carry
error that is not design intent, and it accumulates down the page. Everything
below them was matched on **designed values and the gaps between elements**, not
on those blocks' box geometry. Chasing their exact y would mean squashing real
components to fit a stretched screenshot.

**`Vector 1` and `Vector 2` are `visible: false`** — a green wave in the hero
region that does not render. Easy to build by mistake from the node list alone.

## What changed

| Section | Component | Change |
|---|---|---|
| Hero | `header-104.jsx` | Mint wash behind it; both framing hand illustrations removed, and the `lg:pt-60` that existed only to clear them; sub-copy replaced with the Figma's line at 22px with a semibold "CARF accredited."; h1 to 70px/93.31px |
| CARF strip | `trust-strip.jsx` | Background only — made transparent so the wash shows through. Content unchanged |
| Three steps | `layout-423.jsx` | Heart and two sparkles removed; grid retracked to the Figma's own 574/204/350; heading to 50px so it holds two lines; step titles now Playfair 25px/**700** via `<h3>`; step bodies justified at 18px |
| What Actually Changes | `layout-237.jsx` | Full-bleed pale-green pattern band added. Content was already correct |
| Who We Work With | `layout-254.jsx` | Starburst removed; centre illustration replaced by the photo-in-a-drawn-oval composite |
| Testimonial | `testimonial-10.jsx` | Rebuilt as a data-driven carousel; controls render only when there is more than one entry |
| FAQ | `faq-01.jsx` | Untouched — content already matched |
| CTA | `cta-25.jsx` | Untouched — matched to within a few px |
| Footer | `footer-04.jsx` | **Cross-site.** `.scheme-accent` → `.scheme-jade`; torn edge re-exported in the new green; nav rebuilt from 5 links to the Figma's three columns of 13 |

Confirmed with the requester before the footer was touched, since it is shared
by every route.

## New tokens

Added to `app/globals.css` as marked deviations `[7]`–`[10]`, and mirrored into
the design skill (`tokens/colors.css`, `tokens/schemes.css`,
`tokens/effects.css`) so it stays the source of truth.

- `--color-viking-faintest: #f0fffc` — faintest step of the Viking ramp
- `--color-jade: #01a66e` — the footer band green, its own hue
- `@utility hero-fade` — the hero wash
- `@utility scheme-jade` — an eighth scheme, footer band only

### Why `hero-fade` is nine stops

The Figma fill is a two-stop linear from `#f0fffc` at full alpha to `#d9d9d9`
at **zero** alpha. Figma interpolates gradient stops with non-premultiplied
alpha, so the grey stays in the mix the whole way down and the wash desaturates
through a faintly grey middle before reaching white. CSS interpolates
premultiplied, where a transparent stop contributes no colour — a literal
two-stop translation goes straight mint-to-white and misses the middle by up to
10 levels of green. The nine stops are that ramp pre-composited over white and
sampled at eighths; it tracks Figma's own render to within **one channel step**
across the full 1929px.

## Deliberately not taken from the frame

**Body typeface.** The frame sets the hero sub-copy and the three step bodies in
Inter. The navbar and every other body run in the same frame specify Lexend
Deca, so Inter is an inconsistency in the design file, not a type change —
measured against the reference render, Playfair calibrates to 0.4% while the
body strings come out 2.7–4.8% narrower than Lexend Deca, which is what
confirmed the frame really did render Inter. Lexend Deca stands per brand rule.
The hero measure was widened from the Figma's 839px to 856px, because Lexend
Deca needs 846px to keep the Figma's break after "organizations" — at 839px it
wraps to three lines and the whole hero shifts down.

**The testimonial's placeholder content.** The frame's carousel is a grey
CloudFront placeholder avatar, a node named "Placeholder Logo" that renders as a
cropped stock photo of a man in a suit, and two attributions — "Sarah Mitchell,
Executive Director, Behavioral Health" and "James Chen, Founder, Digital
Startup" — that are Relume export fixtures. None of it is here. The carousel
structure is, driven off `TESTIMONIALS`, and it activates the moment a second
verified entry is added.

**Two footer typos.** "AI Conosultatin" and "Advisory  services" (double space)
are corrected.

**The FAQ drawn fully open.** All four panels are expanded in the frame, which
is how you draw an accordion's content in Figma, not a request for an accordion
that starts open. Collapsed by default, as before.

## Assets

Added to `public/images/`:

| File | Size | From |
|---|---|---|
| `home-changes-pattern-band.png` | 314 KB | `Rectangle 12` rendered at 2× (2880×1404), flattened on white, 16-colour palette — max error 8 on a soft pattern |
| `home-audience-portrait.jpg` | 130 KB | `Group 4` rendered at 2× (1014×1470), flattened on white, JPEG q88. Diffed against the reference at **mean 0.14** |
| `footer-torn-edge.png` | 26 KB *(was 71 KB)* | Replaced. `9833802_27050 1` rendered at 2×, cropped to the 1440-wide window the frame shows, ending on the first row that is flat `#01a66e` with zero variance — so it meets the band below without a seam |

No `public/videos/` **yet**. The frame has no Figma *video* fills — zero `VIDEO`
nodes and zero `videoRef`s in the whole tree — but that check was the wrong one:
the "Who We Work With" media is a placed **GIF**, carried on a separate
`gifRef`. See Follow-up change 5; `home-audience-portrait.jpg` is currently its
poster frame standing in for it.

### Seven assets are now unreferenced

`home-hero-hands-envelope`, `home-hero-hands-gift`, `home-steps-hand-heart`,
`home-steps-sparkle-a`, `home-steps-sparkle-b`, `home-audience-starburst`,
`home-benefits-section` (1.1 MB on its own). They are **left in place**, which
is what the Sep 3 pass did with `home-who-we-help-0/1/2` in the same situation.
`public/` ships wholesale into `out/`, so this is ~2 MB of dead weight in the
export — worth a reviewer's decision rather than a silent delete, especially if
any of this art comes back.

## Validation

`pnpm build` clean: 23 static routes, TypeScript passes, no console errors.
Measured against the frame at 1440:

| | Figma | Build |
|---|---|---|
| h1 top / size | 131 / 70px·93.31px | 131 / 70px·93.31px |
| Hero sub-copy top | 327, 2 lines | 328, 2 lines |
| Three-step heading | 50px / 66.65px, 2 lines | 50px / 66.65px, 2 lines |
| Pattern band height | 702 | 708 |
| Footer green | `#01a66e` | `#01a66e` |
| Hero wash | — | within 1 channel step of the reference across 1929px |

Document height is 6344 against the frame's 6558. Nearly all of the remainder
is the FAQ, which the frame draws with all four panels open (1242 vs 790), and
the testimonial, which the frame pads out with the placeholder avatar and logo
row (521 vs 438). Both are intended.

Checked at 375px: no horizontal overflow, wash and band both carry, and the new
three-column footer reflows to two columns with the services list wrapping
below.

All 16 footer link targets resolve to built pages, including the seven service
pages the footer had never reached before. `hero-fade` appears in `out/` on the
homepage only; `scheme-jade` on every page, as intended for shared chrome.

---

# Follow-up changes (same branch, after first review)

Five changes were asked for after the first pass.

## 1. The real Playfair italic is now self-hosted

**This was the "italic text hasn't been copied well" report, and it affected all
four italic clauses** — "We *Serve*", "know *which one you're on.*", "What
Actually *Changes*", "Who *We Work* With".

The cause: `.font-heading-italic` set `font-style: italic` with **no italic face
loaded**. Every `@font-face` in `globals.css` was `font-style: normal`, so the
browser *synthesised* the italic by mechanically slanting the 400 roman. On a
high-contrast didone that reads visibly wrong — the true italic has different
letterforms (single-storey a, calligraphic e, narrower sloped bowls), not just a
slant. `globals.css` had actually predicted this in its `[6]` note and left a
commented-out block for it.

The Figma says which face: all four runs are `PlayfairDisplay-MediumItalic`,
**weight 500** — one face, not a set. Now installed as
`playfair-display-italic-500.woff2` and `.font-heading-italic` sets style *and*
weight, because the face is registered at 500 and style alone falls straight
back to slanting the roman.

Verified: "We Serve" advance is now **280.8px** against the reference's measured
**281.0px** — a 0.2px match. With the synthesised italic it was 3.8px out.

It is the Google Fonts **latin** subset (23KB) rather than the full ~193KB face
its four siblings are. Covers U+0000-00FF, so all Latin-1 accents; Central and
Eastern European text would need latin-ext added.

## 2. "Where would you like to start?" moved above the cards

A deliberate departure from the frame, which puts it underneath as a caption on
the pair. Above, it reads as a lead-in: the question is put, then the two
answers follow.

## 3. Footer text is white

Previously dark, on WCAG grounds. Raised, then explicitly asked for, so it is
now white to match the frame. Recorded rather than silently applied — white on
`#01a66e` is **3.14:1** and the band is 14px links, which need 4.5:1 (the 3:1
large-text allowance starts at 24px, or 18.66px bold). The dark neutral was
6.38:1.

Scoped to `.scheme-jade` so it cannot reach the eleven `cta-25` banners still on
`.scheme-accent`, where white would be 1.96:1. `globals.css` `[10]` carries the
two routes back to AA: darken the fill to ~`#017a51` and keep white, or move the
band to `.scheme-deep-teal` (white at 9.05:1). Either way the torn edge PNG
needs re-toning, since its bottom row must equal the band colour exactly.

## 4. Footer regrouped

The frame stacks all seven service links in the middle of the band under a single
"Uplift Services", which reads as one undifferentiated block. Same thirteen
destinations, regrouped by what the links are:

| Column | Links |
|---|---|
| Company | Home, About, How we work, Career, Contact |
| Start here | For Individuals, For Businesses — the two audience doors, which are the site's whole IA |
| Services | AI Consultation, Advisory Services, Systems & Technology, Compliance Support, Resource Assistance |
| Follow | LinkedIn |

Left-aligned and spread across the container instead of centred as one clump.
The three headings and "Follow" are additions the frame does not have — without
them column one was an unlabelled list beside a labelled one, which was the
imbalance. The LinkedIn mark is now the grid's fourth track rather than
absolutely positioned, so it can't drift over a column. The divider runs the full
container width (the frame's 454px centred rule had nothing to align to once the
columns moved left), and the bottom bar splits copyright left / legal links
right, with the copyright lifted out of the legal `<ul>` where it was never one
of the links.

Reflows to two columns at 375px with Services and Follow below; no overflow.

## 5. The "Who We Work With" media is a GIF, and it is 30 MB

**It is not an image and not a Figma video fill** — which is why the first pass
missed it. `Rectangle 9` carries both an `imageRef` (the poster frame, which is
what got exported as `home-audience-portrait.jpg`) *and* a **`gifRef`**. My
initial scan looked for `VIDEO`/`videoRef` and found none, because Figma stores
placed GIFs separately.

The GIF is fetchable and was extracted: **800×1422, 83 frames, 8.3s, looping,
30.3 MB**.

30 MB is not shippable, and there is no transcoder in this environment — no
`ffmpeg` on PATH or in the usual install locations, and no `imageio-ffmpeg`,
`av`, `cv2` or `moviepy` in the Python environment. So this one item is
**not done**, pending a decision: supply an MP4/WebM, or approve installing a
transcoder to convert the extracted GIF.

When the file lands, the markup wants a `<video autoplay loop muted playsinline>`
with `poster="/images/home-audience-portrait.jpg"`, and the mask rebuilt in CSS
rather than baked into the asset: all three of `Group 4`'s rects share a **230px
corner radius**, with the two 1px black outlines offset behind the media —
relative to the group's origin, outline A at (0,0) 376×694, outline B at
(135,40) 372×695, media at (29,20) 449×708, group 507×735.
