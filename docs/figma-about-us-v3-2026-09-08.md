# About Us — v3 Figma pass (2026-09-08)

Branch `figma-about-us-import-v3`, cut from `figma-homepage-import-v3` rather
than from `master`. `master` is untouched.

## Why this branch is not off master

`figma-homepage-import-v3` carries three things this page depends on and that
are cross-site: the rebuilt shared footer, the self-hosted Playfair Display
italic, and the v3 palette additions. Branching off `master` would have meant
building against chrome and tokens that no longer match. That branch is unmerged
and under review; that is expected.

## Source

Figma file `vbs2QJkAZE0ahMaKTa0Z46`, frame `About us`, node `10358-8178`,
1440x7563. Reference render `About us@2x.png`, 2880x15126 — exactly 2x, and
pixel-accurate enough to sample colours off directly, which is how the button
and band fills below were confirmed.

Pulled through the Figma REST API, same as the homepage pass — the Framelink MCP
is still not loadable, because `.mcp.json` lives only on the `figma-export-2`
branch and MCP servers bind at app start.

```
GET /v1/files/:key/nodes?ids=10358:8178     # node tree, styles, fills
GET /v1/files/:key/images                   # imageRef/gifRef -> asset URL map
GET /v1/images/:key?ids=<node>&scale=2      # render a node as drawn
```

## This was incremental, not a rebuild

Four of the page's eight sections already matched the frame and were not
touched:

| Section | Why it was left alone |
|---|---|
| `layout-237` Our Core Values | All six values, all copy, and 52/36/16px type identical to the frame |
| `team-06` Our team | Names, roles and bios identical. The three portraits are **byte-identical** (MD5) to the files already in `public/images/` |
| `layout-507` Board of Advisory | The frame's block here is a *pasted screenshot of the built section* (`Screenshot 2026-09-02 141817 1`, 1297x764, `STRETCH`). No design change was intended |
| The wordmark + CARF lockup | The frame draws it at y=6998–7091, just above the torn edge. That is the **footer's** own white band, which already renders exactly this lockup on all 20 routes. See the note below |
| `cta-25` copy | Heading and body already matched; only the skin changed |

## What changed

| Section | Change |
|---|---|
| `layout-134` Hero | Rebuilt from a centred single column into the frame's two-column opener — four-tile collage left, tagline / heading / two justified paragraphs / button right. The bottom-left tile is a **video** |
| `layout-183` Why Uplift Path | Was a full-bleed **Relume placeholder video** (`d22po4pjz3o32e.cloudfront.net/placeholder-video.mp4`) under a 50% black scrim. The frame draws a flat green band and no imagery. Now `.scheme-green-deep`, heading Playfair 44px/**700**, body 18px SemiBold |
| `layout-54` Vision & Mission | Gains the media it was missing: a tall 60px-radius **video** with two offset 1px outlines. Icons tinted Viking dark per the frame |
| `faq-01` | Replaced with the frame's About-specific questions — see the content note below |
| `cta-25` | Re-skinned to the frame: white rather than green `scheme-2`, copy left-aligned, envelope illustration beside it. Identical to the homepage's v3 CTA, which is the same design |
| `layout-507` | One fix only: it carried an `<h1>`, and so did the rebuilt hero. Demoted to `<h2>`, and its four tab headings from `<h2>` to `<h3>`. The page now has exactly one `<h1>` |

## The `gifRef` trap fired twice

Both are nodes with an `imageRef` *and* a `gifRef`. The `imageRef` is only a
poster frame; searching for `VIDEO` or `videoRef` finds nothing, which is how a
video shipped as a still on an earlier pass.

| | Source GIF | Shipped |
|---|---|---|
| Hero bottom-left tile | 800x450, 104 frames @10fps (10.4s), 17.2MB | 0.48MB MP4 / 0.30MB WebM |
| Vision & Mission | 800x1422, 174 frames @10fps (17.4s), 74.0MB | 1.05MB MP4 / 0.69MB WebM |

Both sources are **10fps**; an initial encode at 25fps just duplicated frames
and cost ~2.5x the bytes for nothing. Encoded at native rate, x264 `crf 35` /
VP9 `crf 52`, `-an`. Posters are each video's own first frame, unmasked, so
nothing shifts when playback starts. Masks are CSS, never baked into the asset.
Both suppress autoplay under `prefers-reduced-motion` in JS, since no CSS pauses
a video.

The vision clip is the heaviest asset on the site at 0.69MB, against the
homepage montage's 0.42MB. It is twice as long and it is a moving camera; that
is where the bytes go.

## Corner radii — the opposite call from the homepage

The homepage montage needed `rounded-full` because Figma **clamped** its 230px
radius to half the shorter side. Neither composite here is clamped: 71/80/68px
against 298px-wide tiles, and 60px against 372px-wide rects, are all well under
the clamp. So these are literal radii.

They are expressed in `cqw` against each composite's own container rather than
in px. The frame's values are drawn against a 639px (hero) and 513px (vision)
box; as px they would stay fixed while the composite shrank, and at 375px the
hero tiles would read as pills. As a fraction of the container they hold their
proportion at every width.

## Contrast — raised and decided

The frame draws the "Why Uplift Path" band as white on `#06a785`.

```
white   on #06a785   3.06:1   fails AA for this band's body copy
white   on #05866b   4.54:1   passes                  <- shipped
#000a08 on #06a785   6.57:1   passes, but not what the frame draws
```

The 44px heading clears the 3:1 large-text allowance at 3.06:1. The body does
not: it is 18px SemiBold, and that allowance needs 24px or 18.66px **bold**.

This is the same situation as the footer band, which `globals.css` `[10]`
records as an override taken *by explicit decision* and explicitly not a
precedent. It was raised again here, and the decision was route 1 of the two
that note lists — keep the white, darken the fill. `#05866b` is the same hue at
the same saturation, dropped in value until white clears AA.

So **`.scheme-jade` is still the only white-on-green contrast exception in the
brand.** `.scheme-green-deep` passes on its own terms.

## New tokens

Added to `app/globals.css` as marked deviation `[11]`, and mirrored into the
design skill (`tokens/colors.css`, `tokens/schemes.css`, `readme.md`) and
`CLAUDE.md` so they stay the source of truth.

- `--color-caribbean-green-deep: #05866b` — a step between `-dark` and `-darker`
  on the existing Caribbean Green ramp
- `@utility scheme-green-deep` — a ninth scheme, the About Us green band only

Everything else the frame asked for already had a token. At >=992px `--text-h2`
(52/62.4), `--text-h3` (44/52.8), `--text-h4` (36/46.8) and the 18/27 and 16/24
body sizes matched the frame exactly, so nothing was added for type.

## Content integrity — two answers still outstanding

The frame's FAQ has four About-specific questions, but only two of them carry
real answers. The other two are authoring notes sitting in the answer slot:

- *"How long has Uplift Path been operating?"* → "Needs your answer — founding
  year."
- *"How do you measure '100,000 lives uplifted'?"* → "Needs your answer. This is
  what a sceptical reader asks about your headline number."

Those are not shippable copy and are **not** in the build. The two written
answers lead the accordion; behind them stand two of the export's generic
answers that still earn their place ("Who benefits from your consulting
services?" and "What types of challenges can you help with?"). The export's
other two were dropped as duplicates of the frame's second question, which
answers the same thing far more concretely.

Both missing answers are blocked on the client, not on the build.

Nothing else on this page is placeholder. The team portraits were checked
against the frame's own image fills and are the same real photographs, not the
grey CloudFront avatars Relume ships; the names, roles and bios are real and
internally consistent (the frame's own FAQ answer refers to a "four-member Board
of Advisors", and `layout-507` carries exactly four).

## Deliberate departures from the frame

- **Team card portraits** stay 3:2 with a "Read more" clamp rather than the
  frame's square portraits and always-visible ~9-line bios. This is the
  pre-existing documented departure, re-confirmed rather than reverted: square
  portraits plus full bios push the section well past one screen.
- **Justification** on the hero copy is held back to `lg`. The frame only
  specifies it at the 554px measure; justifying the full-width mobile column
  tears rivers of white space through it.
- **The hero text column is not vertically centred** against the collage. The
  frame hangs it off the top of the tall middle photo, 77px below the collage's
  own top edge, and that is reproduced with a percentage top padding so it
  tracks the collage height at every width.
- **No pre-footer lockup was added.** The frame's centred wordmark + CARF seal
  above the torn edge is not a page section — it is the shared footer's first
  band, which `footer-04.jsx` already renders exactly that way. A separate
  section was built for it first and then removed once a full-page capture
  showed the wordmark twice within 150px. The frame is satisfied here by chrome
  that already exists.
- **The footer was not touched**, as instructed. It departs from this frame
  deliberately and is shared by all 20 routes — see
  `docs/figma-homepage-v3-2026-09-08.md`.

## Measured fidelity at 1440

Frame-relative coordinates, measured in the browser against the frame's own
values. The viewport reports 1425 because of the scrollbar, so 7px is added to
every x to compare like with like.

| | Frame | Built | Δ |
|---|---|---|---|
| Hero collage | 104,161 639x564 | 104,168 639x564 | x **0**, y +7 |
| Hero tagline | 806,238 | 806,245 | x **0**, y +7 |
| Hero h1 | 806,262 52/62.4 | 806,269 52/62.4 | x **0**, y +7 |
| Hero button | 806,715 140x44 | 806,716 144x48 | +4 on each axis = the 2px border |
| Core Values h2 | 336,1041 768 wide | 336,1040 768 wide | **-1** |
| Green band | 490 tall, #06a785 | 487 tall, #05866b | -3 tall; fill is the decision above |
| Green band h2 | 44/52.8 w700 | 44/52.8 w700 | **0** |
| Green band body | 18/27 w600 | 18/27 w600 | **0** |
| Vision video | 449x708, r60 | 449x708, r60 | **0** |

Below the green band the page runs shorter than the frame, cumulatively about
480px by the CTA. Three causes, all expected and none of them a positioning
error: the team cards are 3:2 rather than square (the approved departure); the
FAQ ships collapsed while the frame draws all four answers open; and the
`layout-507` block in the frame is a stretched screenshot whose geometry is not
design intent. Matched on designed values and inter-element gaps rather than on
those blocks' absolute y, exactly as on the homepage pass.

## Verification

- `pnpm build` clean; 23 static pages generated.
- Every internal `href` on `/about-us` resolves to a real route in `out/`.
- Exactly one `<h1>` on the page.
- No horizontal overflow at 375px, and no element extending past the viewport.
- Both videos and both posters present in the export and referenced.

## Unreferenced assets

Not deleted, and not created by this pass — flagged for a decision:

- `public/images/home-hero-hands-envelope.png`
- `public/images/home-hero-hands-gift.png`

Both are the hand illustrations the **homepage** v3 pass removed from the hero.
Nothing references them now.

`docs/about-us-figma-prompt.md` was deleted: it was a prompt written for an
earlier attempt against the older frame, and this pass supersedes it.
