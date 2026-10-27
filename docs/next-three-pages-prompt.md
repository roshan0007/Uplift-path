# Task: rebuild Compliance Support, Resource Assistance and Career from Figma

Same process as the six v3 pages already done. Everything below is verified —
don't re-derive it.

## ═══ THE THREE PAGES ═══

| Render in `Downloads\` | Frame | Route | Sections today |
|---|---|---|---|
| `Compliance Support.png` 2880x9054 | 1440x4527 | `/compliance-support` | layout-134, layout-16, layout-615, faq-01, cta-25 |
| `Resource Assistance.png` 2880x7586 | 1440x3793 | `/resource-assistance` | layout-134, layout-491, faq-01, cta-25 |
| `Career.png` 2880x12396 | 1440x6198 | `/career` | layout-134, layout-213, layout-359, layout-469, layout-237, faq-01, cta-25 |

All three renders are **exactly 2x** the frame despite the filenames. They are
pixel-accurate — sampling them and comparing computed values is reliable to
about one channel step.

Figma file `vbs2QJkAZE0ahMaKTa0Z46`. I do not have the node ids for these three
frames; you do not need them (see below).

## ═══ THE FIGMA API IS DEAD ON THIS ACCOUNT — DO NOT CALL IT ═══

Every file-reading and render endpoint is paywalled. Verified 2026-09-09:

| Endpoint | Status | Retry-After | headers |
|---|---|---|---|
| `/v1/files/:key?ids=…&geometry=paths` | **429** | ~334,000 s (3.9 d) | `plan-tier: starter`, `rate-limit-type: low` |
| `/v1/files/:key/nodes` | **429** | ~302,000 s (3.5 d) | same |
| `/v1/images/:key` (render) | **429** | ~321,000 s (3.7 d) | same |
| `/v1/files/:key/images` | 200 | — | but returns 3,294 anonymous refs with no node JSON to say which belong to which frame — useless alone |
| `/v1/me` | 200 | — | so it is **quota, not auth**; a new token on this account will not help |

The `Retry-After` counts down in real time, so it clears around **2026-09-13**.
If the user has supplied a key from a *different* account by the time you read
this, use it — that is the one thing that unblocks video detection. Otherwise:
**do not call Figma at all.** Measure everything off the 2x render. That is how
all four of the last four pages were built and every measured value landed at
Δ0. One probe of `/v1/me` is enough to confirm nothing has changed.

## ═══ BRANCHING ═══

One branch per page, each cut **fresh from `figma-v3`**, merged back with
`--ff-only` before the next one starts. Do not chain them off each other.
`figma-v3` is currently 17 commits ahead of master and unmerged; that's
expected. Don't touch master. Don't push.

Names: `figma-compliance-support-import-v3`, etc.

## ═══ WHAT WILL BE TRUE ON ALL THREE (verified) ═══

These three things needed doing on every one of the last six pages. All three
of these pages need all three:

1. **The hero gains two line-art vignettes** and its heading is promoted to
   `<h1>`. Verified: `layout-134` opens with `<h2>` on all three routes.
   `/career` has **no `<h1>` at all**; `/compliance-support` has one on
   `layout-16` and `/resource-assistance` has one on `layout-491` ("What do you
   need?") — both on the wrong section. Fix the outline, don't just add.
2. **`faq-01` questions are Lexend Deca 700**, not Playfair 400. All three still
   need it. The fix is `font-body font-[700]` at the call site — both classes,
   since `cn()` is tailwind-merge and only drops `font-bold` when a real
   font-weight utility lands beside it. See `globals.css` [13]. **These three
   are the last of the eleven** apart from `about-us`, `home` and
   `faq-for-test`.
3. **`cta-25` needs the v3 re-skin** — all three are still `scheme-2`. White
   rather than green, copy left-aligned, `home-cta-envelope.png` beside it
   (924x888, already in the repo, no new asset), section classes
   `scheme-1 btn-dark btn-dark-on-light badge-alt`. Copy the header comment and
   markup from `components/sections/systems-&-technology/cta-25.jsx` — that is
   the eighth copy and the pattern is settled. Keep `/contact-us` as the
   destination; the intake modal is for individual Peer Coach matching only.

## ═══ TECHNIQUES THAT WILL SAVE YOU AN HOUR ═══

**Isolating a vignette that shares rows with text.** A naive bounding box
swallows the centred copy and over-reports width by 150–230px. This bit twice.
Measure the x-extent over only the y bands the neighbouring text leaves free,
then take the y-extent within that x:

```python
occ = np.zeros(a.shape[1], bool)
for y0, y1 in TEXT_FREE_BANDS:                     # e.g. (216,243),(359,385),(434,463),(516,660)
    occ |= (a[y0*2:y1*2].min(axis=2) < 248).any(axis=0)
# then read the runs off `occ`, and take the y-extent inside that x window
```

**Cutting an asset off the render.** Min-channel alpha key, which round-trips
over white to ~0.05 of a channel step:

```python
al = np.clip(1.0 - c.min(axis=2)/255.0, 0, 1)
out[..., k] = (c[..., k] - 255.0*(1-al)) / al       # where al > 0
```

Export at exactly 2x the box the frame draws it in. **Ship unquantised** —
quantisation plateaued at a mean difference of 1.0–1.7 at every palette size
from 48 to 256 colours, for ~60 KB. Not worth it. PNG only; the repo has no
WebP precedent. Say in the record that the round-trip figure proves the
decomposition is lossless, **not** that the asset matches an independent source
— it came from the render, so that comparison is circular.

**Matching a frame photo to a file already in the repo.** Centre-crop each
candidate to the region's aspect, thumbnail both to 48x48, compare. Correct
matches score 2–18, wrong ones 68+ — an unambiguous gap. Do this before
exporting any photo; on Advisory it showed all five photos were already in the
repo and that the export had the wrong one on the feature card.

**`Image.open(x).convert("RGB")` composites alpha onto BLACK.** A correct match
read 208 that way and 21.8 composited onto white. Always
`alpha_composite(white, img)` first.

**The 1px right-edge artifact.** All three service-page renders carry a
non-white column at x=1439–1440 that silently widens bounding boxes. Check for
it and slice it off: `a = np.asarray(im)[:, :2878, :]`.

**Type you don't need to measure.** At ≥992px the tokens already equal the frame
exactly on every page so far: `--text-h2` 52/62.4, `--text-h3` 44/52.8,
`--text-h4` 36/46.8, `--text-h5` 28/39.2, `--text-medium` 18/27, body 16/24.
Container 1280 at a 1440 viewport with `px-[5%]`. Hero rhythm has been identical
on all six pages: ink-gaps 47 / 62 / 80 / 27 / 51. If the frame asks for those,
use the token — don't measure and don't add a new one.

**The browser pane renders 1425, not 1440** (15px scrollbar). Correct every x
before comparing. Right-anchored elements shift −15; centred ones −7.5.

**Screenshots come back black if the page is scrolled.** Capture at scrollY 0,
or set a tall viewport (`resize_window` 1440 x page-height) for a whole-page
shot. Verify with computed values via `javascript_tool`; use screenshots to
confirm and to show the user.

## ═══ WHAT THE FRAMES WILL GET WRONG ═══

Every one of these has bitten. Assume the frame is not automatically right:

- **Byte-identical repeated blocks.** AI Consultation shipped one service card
  three times; Advisory shipped four identical small cards; Systems repeated a
  timeline step's body — **and that last one the frame repeated too.** Diff
  every repeated block's copy against its siblings before building.
- **Lists that are not lists.** Advisory had `1.` and `- ` typed as literal
  characters inside a single `<p>`, rendering as walls of text with no
  semantics. Check every list-looking block.
- **Interactions that do nothing.** Advisory's "tabs" each contained their own
  full body, so all three were always visible and clicking only swapped a photo.
  AI Consultation hid card bodies behind hover at `lg` — unreachable by keyboard
  and touch. If the frame draws it static, build it static.
- **Wrong or placeholder links.** Three different AI services all linked to
  `/how-we-work`. If the frame gives no destination, don't invent one — drop the
  link and say so.
- **Pasted screenshots of the built site.** Their absolute coordinates are not
  design intent and the error accumulates downward. On AI Consultation a whole
  block sat 62px right of the container edge. Match designed values and the gaps
  between elements, not those blocks' geometry. Container-align.
- **Hot-linked CDN assets.** AI Consultation fetched four icons from
  `cdn.jsdelivr.net/...@latest` at runtime, and they rendered black because
  `text-scheme-text` was set on an `<img>`, which cannot tint. Self-host into
  `/svgs`, pin the version, apply as a CSS mask so the fill comes from the
  palette. Pattern: `how-we-work/layout-254.jsx` and
  `ai-consultation/layout-253.jsx`.
- **Typos.** Fix them, don't reproduce them. So far: "for Businesses Growth",
  "Our Approch", a missing full stop, and a hero body that repeated its own
  heading verbatim.
- **Check `visible` on every node** — earlier frames carried hidden leftovers.
- **A node with an `imageRef` may also carry a `gifRef`** — that means it's a
  video and the imageRef is only a poster. **You cannot detect this from a
  render**, which is the single real cost of working without the API. If
  anything looks like it could be a clip, say so rather than silently shipping a
  still. Two of the earlier pages shipped videos found only via the node JSON.
- **Figma interpolates gradient stops non-premultiplied, CSS premultiplied.** A
  fill fading to a transparent *coloured* stop won't survive a two-stop CSS
  translation. Sample the ramp, emit multiple opaque stops.
- **Figma clamps corner radii larger than half the shorter side.** Use
  `rounded-full` to reproduce the clamp; a literal px radius will be wrong.

## ═══ SETTLED — DON'T RE-LITIGATE ═══

- **White text on green.** `.scheme-jade` (the footer, 3.14:1) is the one
  sanctioned exception. If a frame wants white on green, darken the fill to
  reach 4.5:1 and reuse `--color-caribbean-green-deep` `#05866b` if it fits, as
  the About Us pass did. Flag it; don't add a third exception.
- **Gradients and textures.** Two exceptions exist, both homepage-only. A new
  one needs a design decision, not a precedent.
- **The footer and navbar are out of scope**, including the wordmark + CARF
  lockup above the torn edge — that is the footer's own first band, rendered on
  all 20 routes by `footer-04.jsx`, and it is easy to mistake for a page
  section. The CARF accreditation is real and already verified in
  `components/brand/carf-seal.jsx`. Leave all of it alone.
- **`--font-weight-bold` is 400 on purpose.** Don't "fix" it.
- **Never rewrite a primitive in `components/ui/`** — compose it. The shared
  `Button` renders 48px tall against the frames' 44–50; that is a known,
  accepted, site-wide delta. Don't change it on one page.

## ═══ CONTENT INTEGRITY ═══

`/career` is a hiring page and `/compliance-support` sells regulatory work, so
the bar is high on both. Do not ship placeholder or invented content even where
the frame contains it — these frames are littered with Relume fixtures: grey
CloudFront avatars, nodes named "Placeholder Logo", fabricated names and
testimonials.

Be especially careful with anything that reads as a claim: **open roles,
salaries, benefits, locations, headcount, certifications, client names, outcome
statistics, and compliance/accreditation assertions.** If the frame asserts
something you cannot verify from the codebase, build the structure, leave the
copy to be filled, and flag it. Two live precedents:

- Advisory's frame said a service was "Free, with no obligation." Nothing else
  in the codebase offers a free service, so it was dropped pending
  confirmation — **still unconfirmed.**
- An FAQ answer claimed the company serves "all industries — from startups and
  SaaS ventures to retail, manufacturing". It sells behavioural-health
  consulting. Replaced with the answer the design system's own UI kit carried.

If you find a defect the frame does not fix (like the repeated timeline body),
prefer rewriting from commitments the page already makes over inventing new
copy, and say clearly in the record which copy was written rather than
transcribed.

## ═══ BATCH YOUR QUESTIONS ═══

Read all three frames first, then ask **once**, early, about everything only the
user can settle. Don't stop-ask-build-stop-ask. The last three pages needed two
question rounds total across all three.

## ═══ DESIGN SYSTEM ═══

Read `.claude/skills/uplift-path-design/` and `CLAUDE.md` before any UI work.
Seven import records exist in `docs/figma-*-v3-*.md`; read the three service-page
ones (`ai-consultation`, `advisory-services`, `systems-technology`) — they are
the closest siblings to these three and record every decision already taken.

Where Figma genuinely differs from v2, Figma wins and gets new tokens following
the existing generation pattern — but **check for an existing token first.** The
last four pages needed **zero** new tokens. `globals.css` deviations run
[1]–[15], so a genuinely new one is [16]. Update the design skill's readme and
tokens, and CLAUDE.md if a rule changes.

Write one import record per page at `docs/figma-<page>-v3-<date>.md`, matching
the existing seven: source, verdict, section-by-section, new tokens, deliberate
departures, a measured-fidelity table with numbers, assets with sizes, a
verification list, and unreferenced assets.

## ═══ ASSETS ═══

Export every image the frame actually uses into `public/images/`, at 2x the
drawn box. No Figma-hosted URLs. Say what you chose and why.

**Check the repo first** — Advisory needed zero new photos because all five were
already there under the right names.

List anything your changes leave unreferenced. There is a standing backlog of
**25 files / ~7.5 MB** recorded in `docs/figma-for-business-v3-2026-09-09.md`
and the AI Consultation record — add to that list, don't start a new one, and
don't delete anything. `advisory-services-features-list-section-1.jpg` is
already flagged as the clearest deletion candidate: it is the same photograph as
`advisory-services-business-structuring.jpg` at 5x the size.

## ═══ VALIDATION AND HANDOFF ═══

Verify by measurement, not by eye:

- `pnpm build` clean, 23 static pages, TypeScript clean.
- Exactly one `<h1>` per route, on the hero.
- No horizontal overflow at 375: `scrollWidth == clientWidth == 375` **and**
  zero elements extending past the viewport on either side.
- Computed type sizes, colours and element positions against the frame's own
  values, corrected for the 1425 pane.
- No console errors; every new `href` resolves to a real route in `out/`.
- Dev server: `preview_start` with `uplift-path-dev` (port 3000).

Then report what matches, what doesn't, and what you deliberately departed from
— **with numbers**. Merge each page into `figma-v3` with `--ff-only` once it is
verified, and say whether it merged cleanly. Don't push.
