# For Business — v3 Figma pass (2026-09-09)

Branch `figma-for-business-import-v3`, cut from `figma-v3` — the consolidated v3
branch carrying the homepage, About Us, How We Work and For Individual imports,
the rebuilt shared footer, the self-hosted Playfair italic and all the v3
tokens. It merges back into `figma-v3`. `master` is untouched.

The chaining that the four previous passes used has stopped here by decision:
this branch is not cut from `figma-for-individual-import-v3`, and the next page
must not be cut from this one.

## Source

Figma file `vbs2QJkAZE0ahMaKTa0Z46`, frame `For Business`, node `10214-104878`,
1440x5203, 18 top-level children. Reference render `For Business.png`,
2880x10406 — exactly 2x despite the filename.

### The Figma API is now unusable on this account

This is the finding most worth carrying to the next pass.

`/v1/files/:key?ids=…&geometry=paths` — the endpoint the previous four passes
relied on, and the one the brief for this pass named as the working route — now
returns HTTP 429 exactly as `/v1/files/:key/nodes` does. So does
`/v1/images/:key`. All three carry the paywall signature, not a throttle:

| Endpoint | Status | `Retry-After` | `rate-limit-type` | `plan-tier` |
|---|---|---|---|---|
| `/v1/files/:key?ids=…&geometry=paths` | 429 | 334018 s (3.87 d) | low | starter |
| `/v1/images/:key?ids=…` | 429 | 322651 s (3.73 d) | low | starter |
| `/v1/files/:key/nodes` | 429 | — (not called) | — | — |
| `/v1/files/:key/images` | **200** | — | — | — |
| `/v1/me` | **200** | — | — | — |

`/v1/me` returning 200 proves auth is fine, so a new token would not help — the
quota is per account. Only the `imageRef`→URL map survives, and without node
geometry there is no way to know which refs belong to this frame. **Assume the
geometry endpoint is gone for the remaining frames.**

Total spend on this: two calls and one header read. No retry loop, no
background poll.

### What carried the pass instead

The 2x reference render, which is pixel-accurate. Every value in this document
was measured off it with numpy — background-band segmentation to find the
sections, full-width uniform-run detection to find the gaps, and per-column
non-white bounding boxes to find each element. Line-spacing deltas read straight
off the ink runs and matched the tokens exactly, which is what confirmed the
type scale without the API.

## Verdict: incremental, and the frame is the one that is wrong

The frame's 18 top-level children flatten to: the navbar, the hero, two
three-up icon grids, the services 2x2, the FAQ, the CTA, and the footer's own
first band. Four of the page's six sections already matched.

| Section | Verdict |
|---|---|
| `layout-134` Hero | **Revised.** Type already exact; two vignettes added; promoted to `<h1>` |
| `services-list` | **Left alone by decision** — the frame replaces it with a weaker section |
| `layout-613` | **Matches.** Copy, four photos, 2x2 grid, hairline rules all as drawn |
| `timeline-05` | **Left alone by decision** — as above |
| `faq-01` | **Copy matches.** Question face corrected; one answer replaced |
| `cta-25` | **Re-skinned** to the v3 CTA, as on the four previous pages |

## The two icon grids were refused

The frame draws, in place of `services-list` and `timeline-05`:

1. **"Business Consultation That Fuels Your Growth"** — standfirst, then three
   icon columns: Expert Advice / Process To Improve / Access Tools.
2. **"Our Simple 3-Step Consultation Process"** — a people illustration, "Get
   started in just three simple steps", then Submit Request / Discovery Call /
   Expert Guidance.

These are `layout-237` and `layout-237_1`, and they are the two sections the
`/business-conusltation` merge **explicitly dropped as redundant** — the comment
saying so is still at the top of `page.tsx`. The frame predates or ignores that
merge.

Taking it literally would have cost:

- **Six real, linked service cards** for three generic icon columns.
  `services-list` renders `BUSINESS_SERVICES` from `lib/services.js` — the same
  array the navbar mega-menu renders, so the two cannot disagree — and each card
  links to a live service route. One of those links is `#business-consulting` on
  `layout-613`, which is where the `/business-conusltation` 301 lands.
- **Four specific engagement steps** (Discovery call, Assessment, Pathway Plan,
  Support through delivery) for three lines of Relume filler.

The giveaway that this is drift rather than design: the frame's grid standfirst
is **word-for-word** `services-list`'s own — "We help businesses to set clear
goals, streamline workflows, and stay compliant so your practice can grow while
staying true to its mission." Building both would print the same sentence twice
on one page.

Raised before building and settled: the built sections stand, the grids are not
built.

Worth noting for the sibling page: the For Individual pass refused this same
"3-step consultation" copy as *For Business material on the wrong page*. It is
on the right page here — and it is still the weaker of the two options.

## Section by section

### `layout-134` — the hero gains two vignettes

Type was already exact and nothing in it moved: tagline 16/24 weight 600 Lexend
Deca, heading 52/62.4 Playfair Display 400, body 18/27, all `#000a08`.

The frame adds two line-art vignettes either side of the copy — a target struck
by arrows on the left, a lit bulb on the right. With the API down these could
not be pulled from an `imageRef`, so both were cut from the 2x render at exactly
the box the frame draws them in and un-composited off the white page with a
min-channel alpha key. That key round-trips over white to a mean channel
difference of **0.04** — lossless in practice.

They are `lg:` only, `aria-hidden`, and carry no alt text: the heading and body
carry all the meaning. Below `lg` they would sit under the copy rather than
beside it.

**The heading is now the page's `<h1>`.** The route had none — every section
opened with an `<h2>`. Same gap the How We Work and For Individual passes found.

Two frame typos were fixed rather than reproduced:

| Frame | Shipped |
|---|---|
| "Consulting Services for **Businesses** Growth" | "…for Business Growth" |
| "…for founders and leaders **Transform** challenges…" | "…for founders and leaders. Transform challenges…" |

The frame's line break after "Services" is kept, as a `<span class="block">` —
it carries the phrasing, and left to the container the break falls elsewhere.

### `faq-01` — face corrected, one answer replaced

All four questions and three of the four answers are identical to the frame, at
its own 18/27 and 16/24. Two things changed.

**The question face**, the site-wide finding the How We Work pass recorded:
every frame in the file sets FAQ questions in Lexend Deca 18/27 weight 700, and
the build renders them in Playfair Display 400. Radix wraps the trigger in an
`<h3>`, which the base `h1–h6` Playfair rule catches, and `font-bold` resolves
through `--font-weight-bold`, which this brand pins to 400 on purpose. Fixed
with `font-body font-[700]` at the call site — both classes, since `cn()` is
tailwind-merge and only drops `font-bold` when a real font-weight utility lands
beside it. **This is the third of eleven `faq-01` sections to get it**; the
other eight remain a site-wide change awaiting a decision.

**The "Which industries do you specialize in?" answer.** The frame ships
untouched Relume boilerplate — "across all industries—from startups and SaaS
ventures to retail, manufacturing, and professional services." That is a claim
this company cannot support and it contradicts the CARF and behavioural-health
positioning the rest of the site sells. Replaced with the answer the design
system's own UI kit already carries
(`.claude/skills/uplift-path-design/ui_kits/website/Chrome.jsx`):

> Our business consulting approach serves Founders and Leaders primarily in the
> behavioural health services sectors, from early-stage startups navigating
> accreditation to established agencies seeking operational transformation and
> growth.

Raised and settled before building.

The FAQ ships collapsed while the frame draws all four answers open — the About
Us, How We Work and For Individual precedent.

### `cta-25` — the v3 re-skin

The same Figma node backs this frame and the four already done, so this is the
fifth copy of a decision already taken: white rather than green `scheme-2`, copy
left-aligned, envelope illustration beside it. The illustration already ships as
`home-cta-envelope.png` at 924x888 — exactly 2x the 462x444 the frame draws it
at — so **no new asset**.

`.btn-dark btn-dark-on-light` on the section makes the button black with a white
label, which is what the frame has. Both classes are required: `scheme-1`
carries the nested default-button colour rule that `scheme-accent` omits, and it
out-specifies `.btn-dark` alone, which would put a black label on the black
fill.

One deliberate difference from the For Individual copy: the button keeps
`/contact-us` rather than opening the intake Application modal. That modal
drives Peer Coach matching — Application, Eligibility, Scheduling, Consent —
which is the individual offering. An organisation booking a discovery call
belongs in the contact form.

## New tokens

**None.** Every value the frame asked for already had one. No new colour,
shadow, radius, scheme, utility or type step, and no new gradient — the page is
flat white end to end apart from the footer's jade band.

## Content integrity

This page sells consulting to organisations, so claims got the closer look.

- **The CARF "ASPIRE to Excellence" seal** above the torn edge is a real
  third-party accreditation claim, and it is **not new and not a page section**
  — it is the footer's own first band, rendered on all 20 routes by
  `footer-04.jsx` via `components/brand/carf-seal.jsx`, which already links to
  the carf.org provider record for verification. Confirmed present in the built
  page and left untouched. The design skill's readme already warns that this
  strip reads as a separate pre-footer element from the frame; it is not.
- **The "all industries / SaaS / manufacturing" answer** was refused, above.
- No client names, logos, case-study numbers or outcome statistics appear in the
  frame, and none were invented.
- No grey CloudFront placeholder avatars, "Placeholder Logo" nodes or fabricated
  testimonials appear in the in-scope region of this frame.
- Nothing on this page is blocked on the client.

## Deliberate departures from the frame

- **`services-list` and `timeline-05` stand; the frame's two icon grids are not
  built.** The decision above.
- **The "Which industries" answer** is the UI kit's, not the frame's.
- **Two hero typos** are corrected, not reproduced.
- **The FAQ ships collapsed**, as on the three previous pages.
- **The footer and navbar were not touched.** The footer departs from this frame
  deliberately and is shared by all 20 routes — see
  `docs/figma-homepage-v3-2026-09-08.md`.
- **`/for-individual-page` was not touched**, though it shares four section
  names with this page.

## Measured fidelity at 1440

Measured in the browser against the running build. The container renders 1280
wide inside a 1425px pane (a 15px scrollbar), so every x below is corrected to
the true 1440 frame.

| | Frame | Built | Δ |
|---|---|---|---|
| Page `<h1>` count | — | 1 | was **0**, now correct |
| Navbar height / hero top | 72 | 72 | **0** |
| Container | 1280 @ x=80 | 1280 @ x=80 | **0** |
| Tagline | 16/24 w600 Lexend Deca | 16/24 w600 Lexend Deca | **0** |
| Hero heading | 52/62.4 Playfair 400 | 52/62.4 Playfair 400 | **0** |
| Hero body | 18/27 Lexend Deca | 18/27 Lexend Deca | **0** |
| Target vignette | 47.5, 249 · 316x228 | 47.5, 249 · 316x228 | **0** |
| Bulb vignette | 1138.5, 363.5 · 117x137.5 | 1138.5, 363.5 · 117x137.5 | **0** |
| Hero section height | 551 (72→623) | 550.8 | **0.2** |
| Hero button | 144x50 | 143.9x48 | w **0.1**, h 2 ¹ |
| `layout-613` heading | 52/62.4 Playfair | 52/62.4 Playfair | **0** |
| `layout-613` card heading | 36/46.8 Playfair | 36/46.8 Playfair | **0** |
| `layout-613` card body | 16/24 | 16/24 | **0** |
| `layout-613` rule | 1280 wide, 2px | 1280 wide, 2px | **0** |
| `layout-613` card image | 156x156 | 152x152 r8 | 4 ² |
| FAQ question | 18/27 Lexend Deca **700** | 18/27 Lexend Deca **700** | **0** |
| CTA heading | 52/62.4 Playfair | 52/62.4 Playfair | **0** |
| CTA body | 18/27 | 18/27 | **0** |
| CTA button | 144x50, `#000a08` fill, white label | 143.9x48, `rgb(0,10,8)`, `#fff` | w **0.1**, h 2 ¹ |
| CTA illustration | 462x444 | 462x444 (924x888 source) | **0** |

¹ The 2px is the shared `Button` primitive's own height and appears on every
button on the site. `components/ui/` primitives are not to be rewritten, and the
For Individual pass shipped the same delta against its own frame. Not changed
here; it is a site-wide question if it is one at all.

² `basis-1/4` inside the export's grid. `layout-613` is a section the frame
draws exactly as built, and sections are the visual source of truth — restyling
it to gain 4px is the kind of change the repo rules forbid.

### Assets

| Asset | Size | File | Alpha round-trip Δ |
|---|---|---|---|
| `for-business-hero-target.png` | 632x456 | 103 KB | **0.043** |
| `for-business-hero-bulb.png` | 234x275 | 33 KB | **0.054** |

Both are exactly 2x the box the frame draws them in. **The round-trip figure is
not an independent fidelity check** — these were cut from the reference render,
so a diff against it is circular by construction. What it does prove is that the
min-channel alpha decomposition is lossless: recomposited over white, each file
returns to the render's own pixels to within 0.05 of a channel step.

Both ship **unquantised**. Quantisation was tried and rejected: it plateaus at a
mean difference of 1.0 (target) and 1.6 (bulb) at every palette size from 48 to
256 colours, saving 67 KB for a 25x fidelity loss. PNG throughout — the repo has
no WebP precedent — and 136 KB total is well inside norms for a repo that
already ships a 1 MB PNG.

One property worth recording: the alpha key turns white *interior* regions
transparent as well as the background (the target's white ring, for instance).
Over `scheme-1` that is invisible and the round-trip proves it. On a non-white
fill these two files would not look right.

## Verification

- `pnpm build` clean; 23 static pages generated; TypeScript clean.
- Exactly one `<h1>` in the built page (was zero).
- No horizontal overflow at 375px: `scrollWidth == clientWidth == 375`, and zero
  elements extend past the viewport on either side. Both vignettes are
  `display: none` below `lg`.
- Type steps correctly at 375: `h1` 52px → 40px; the FAQ question holds Lexend
  Deca.
- No console errors.
- All 30 internal `href`s on the page resolve to real routes or files in `out/`.
  (`/systems-&-technology` appears as `&amp;` in the HTML and is easy to
  mis-flag; the route exists.)
- Both new assets present in the static export.
- `font-body{font-family:Lexend Deca,sans-serif}` present in the built CSS, and
  `font-body font-[700]` on all four accordion triggers in the built HTML.
- The "SaaS ventures" boilerplate appears **zero** times in the build; the
  replacement answer renders.

### One thing verification surfaced that is not this page's to fix

**No FAQ answer is in the static HTML on any route.** Radix does not
server-render collapsed accordion content, so all eleven `faq-01` sections ship
their answers to crawlers as nothing at all. This is pre-existing and unrelated
to this branch — the pre-existing answers are equally absent — but it means the
FAQ copy earns no search visibility anywhere on the site. Worth a decision
alongside the other eight question-face fixes.

## Unreferenced assets

**Nothing is newly orphaned by this branch** — no image reference was removed,
and the two files added are both new.

The standing backlog is larger than previously recorded: **24 files, 6.9 MB**.
Each was checked against `app/`, `components/`, `lib/`, `hooks/` and
`public/_redirects`; the ones that still match anywhere match only the design
skill's own documentation, not the site.

| File | Size |
|---|---|
| `home-benefits-section.png` | 1059 KB |
| `how-we-work-how-it-works-section-new-0.png` | 731 KB |
| `advisory-services-about-section-new.png` | 643 KB |
| `home-who-we-help-0.png` | 635 KB |
| `advisory-services-how-it-works-section.png` | 601 KB |
| `advisory-services-features-list-section-1.jpg` | 483 KB |
| `for-individual-page-benefits-section-0.jpg` | 454 KB |
| `contact-us-header-section.png` | 435 KB |
| `home-who-we-help-2.jpg` | 211 KB |
| `home-who-we-help-1.jpg` | 202 KB |
| `business-conusltation-features-list-section-1.png` | 196 KB |
| `business-conusltation-features-list-section-2.png` | 183 KB |
| `for-individual-page-benefits-section-2.png` | 181 KB |
| `business-conusltation-features-list-section-0.png` | 164 KB |
| `for-individual-page-benefits-section-1.png` | 160 KB |
| `home-hero-hands-envelope.png` | 157 KB |
| `home-hero-hands-gift.png` | 138 KB |
| `contact-us-illustration.png` | 121 KB |
| `how-we-work-team-section-new.png` | 114 KB |
| `for-individual-page-feature-section.png` | 74 KB |
| `home-steps-hand-heart.png` | 64 KB |
| `home-steps-sparkle-b.png` | 23 KB |
| `home-steps-sparkle-a.png` | 20 KB |
| `how-we-work-how-it-works-section-new-2.png` | 18 KB |

Not deleted. This branch adds 136 KB and removes nothing, so the page is
**+136 KB** net.
