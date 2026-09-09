# Global UI pass — 2026-09-10

A reported-defect pass, not a Figma import. Twelve items were raised off the
built site: three site-wide, nine on named pages. No new tokens, no new colour,
no new shadow, no new radius, and no new gradient — the one new `@utility`
(`home-nav-fade`) is built from two colours `hero-fade` already uses.

`pnpm build` clean, 23 static pages. Every measurement below is a computed
value read off the running page at 1440x900, before and after.

## Site-wide

### 1. The gap between every FAQ and the CTA below it

**383px on the homepage, and the same everywhere.** Three things stacked:

| | |
|---|---|
| 80px | An **empty `<div>`** at the foot of all ten `faq-01` sections — `mx-auto mt-12 max-w-md text-center md:mt-18 lg:mt-20`, zero height, 80px of top margin. A Relume "still have questions?" block that had been emptied of content but not removed. |
| 224px | `lg:py-28` on the FAQ meeting `lg:py-28` on the CTA. |
| 79px | The CTA grid is `items-center` and its envelope is 444px tall against a 287px copy column, so the heading was pushed down by half the difference. |

Fixed at all three: the dead div is gone, the FAQ's bottom padding drops to
`lg:pb-16` and the CTA's top padding to `lg:pt-16` (the two sections are the
same white scheme, so this is one gap, not two), and the envelope goes
462px → 400px, which also makes the banner less bulky.

**383px → 177px.**

### 2. FAQ question face — inconsistent, and now consistent

Eight routes rendered questions in Lexend Deca 700; `about-us`, `home` and
`faq-for-test` rendered them in Playfair 400. See `globals.css` [13] for the
full history — the short version is that the 700 face was correct per the
Figma but was only ever applied to the pages later passes happened to touch,
and carrying it to the last three was left open as a site-wide decision.

All eleven now compose `font-body font-[400]`. **The 400 is by explicit
instruction and is a deliberate departure from all nineteen frames**, which
specify 700; the request was consistent *and not bold*. Family, size and line
height are unchanged.

They were already `<h3>` — Radix's `AccordionPrimitive.Header` renders one, and
that is in fact half of why the face was wrong in the first place (the base
`h1–h6` Playfair rule caught it). Verified on all eleven routes after the
change: `H3`, `Lexend Deca`, `font-weight: 400`, identical padding.

### 3. Footer

Two problems, one of space and one of structure.

**Space.** The white lockup band was 355px tall to show a 64px logo and seal:
80px of top padding and a 210px bottom padding whose job is to clear the torn
edge, which is 11.85vw and therefore 170px at 1440. The clearance is real and
the calc stays; the *headroom* was the waste. `pt-20 → pt-14`, and the calc's
`+2.5rem` slack to `+1.5rem`. The green band gave up 2px steps at top and
bottom, the divider 8px, the legal row 8px.

**759px → 696px**, without the tear riding up over the wordmark (24px
clearance, was 42px).

**Structure.** The band was three link columns of 5 / 2 / 5 and then a fourth
track holding one LinkedIn glyph — so the short middle column had nothing to
balance it and the right of the band read as a loose icon rather than a
column. The fourth track is now **Get in touch**: email, phone and the street
address, with the social mark under them. Four real columns, heights that
roughly match.

Nothing invented — those three facts are the ones
`contact-us/contact-panel.jsx` already publishes.

## Per page

### Homepage — the navbar now blends into the hero wash

`hero-fade` starts at full-strength `--color-viking-faintest` immediately below
the navbar, and the navbar was flat white, so the site opened on a hard
horizontal seam. New `@utility home-nav-fade` ramps the bar from white at the
page's very top edge to *exactly* the wash's own first stop at the bar's bottom
edge — so the mint fades in from above as well as out below.

Applied by `navbar-12.jsx` on `usePathname() === "/"` only; every other route
is flat white under the bar and keeps `bg-scheme-background`. Verified: the
computed gradient ends on `rgb(240, 255, 252)`, which is the wash's first stop
to the byte.

**Not a third gradient exception.** It is `[8]`'s hero wash finishing the job
on the element above it, in the same two colours.

### Homepage — the "What Actually Changes" band

The v3 pattern band ran at full strength behind a heading, three subheadings
and three bodies. Knocked back behind a flat `--color-white` veil at 62%, as a
`before` pseudo-element so the veil never exists in the DOM as content. Flat
colour at an opacity, so still inside the flat-colour rule.

### How We Work — "What You'll Experience" in one screen

**1130px tall**, which fits on no laptop, so the six values the section exists
to present were never on screen together. Three sources: the frame's 708px
video, the frame's 64px item gaps, and 112px of section padding each side.

- video cropped to 449x540 at `lg` through the `object-cover` already there
- item gaps 64 → 20, icon and heading margins tightened a step
- section padding `lg:py-28` → `lg:py-12`, heading block `mb-12` → `mb-8`

**1130px → 810px**, which clears a 900px viewport with the 72px navbar on it.
Below `lg` the media is single-column and full-bleed, where the frame's aspect
is right and the height costs nothing, so it is untouched there.

### AI Consultation — the three service cards

`aspect-[405/630]`: 630px of one section spent on three photographs, with the
copy in the bottom quarter and a half-metre of empty scrim above it. Now
`405/470`, padding one step down, and `object-top` rather than centre — all
three photos are portrait with the subject in the upper half, and the centred
470 crop cut heads off.

**Section 1174px → 866px.**

### Advisory Services — the hero collision

The reported overlap is real and it is at the design width, not only below it.
The frame's own x offsets put the planes at 101–355 and the chart at 1091–1304
against a text column running 329–1097 — so **both vignettes already crossed
into the text box**, the planes by 26px, straight through "Most organizations
stall not from a lack of ideas", which is a full-measure line. Every width
below 1440 made it worse, because the column is centred and slides outward into
art pinned to the viewport edges.

Both are now anchored off the centre line: `calc(50% + 416px)`, which is the
column's own 384px half-measure plus a 32px gutter. Measured after:
**32px clearance on both sides**, and it cannot close at any width.

**One thing worth carrying off this page: this theme has no `xl`.**
`globals.css` sets `--breakpoint-*: initial` and declares exactly three — sm
480, md 768, lg 992. `xl:block` compiles to a class no media query matches, so
the element stays `display: none` at every width. Caught here because the first
fix used it. The gate is an arbitrary `min-[1280px]:` instead.

### Advisory Services — "What we do"

The four small cards were letting their photo take every pixel the row gave
them, so each ran to 410–434px, and the feature card beside them — spanning
both rows — stretched to **876px with a 614px photograph in it**. Capping the
small photos at 144/160px settles the row height and the feature card follows
it down: **876 → 831 / 434 → 399**, feature photo 614 → 531. No card is mostly
image any more. The remaining height is copy, not media.

### Systems & Technology — the cut laptop

**`systems-hero-laptop.png` is genuinely clipped**: 162 rows of non-transparent
pixels sit on column 0 and the artwork runs off the bottom edge too, so the
keyboard's left side has no closing outline.

The cause is in this repo's own import method. That vignette was cut from the
reference render by measuring its extent over "only the y bands the heading
leaves free" — and the part of the keyboard that shares rows with the heading
fell outside the box.

**It cannot be re-cut.** The render is not in the repo, and all three Figma
endpoints that could re-fetch it are 429 on this account's quota — re-verified
on this pass, `/v1/files/:key?depth=1` included, which is the endpoint the
standing note says to prefer. There are no source pixels to recover.
Reconstructing the missing strokes by shear-extending column 0 along the base's
0.28 slope was tried and produced horizontal streaks; worse than the clip.

So the hero takes `ai-consultation-hero-monitor.png` instead: same illustrator,
same line language, same subject, complete on all four edges, already in
`/images`. Rendered at 291x272 → 145.5x136, the same 0.5 scale the other
vignettes use, anchored where the laptop was. **Cost: the doodle now appears on
two routes.** Both are technology pages and it is decorative on each. The
clipped file is left in place unreferenced rather than deleted, in case the
render ever comes back within quota.

### Compliance Support — the CARF seal, highlighted

This is the one route whose entire subject is accreditation, and it was showing
the mark only in the footer lockup that all 20 routes show. A bordered card
below the hero copy now carries it at `size-20`/`size-24` — the largest the
seal appears anywhere on the site — with the claim and a verify link.

Brand card rule: 2px border, `rounded-card`, no shadow (measured: `2px`,
`8px`). Native 1:1, colours untouched, clear space of its own, per CARF's usage
rules. It links to CARF's own provider record, not to the page it is standing
on, because an accreditation mark's job is to be checkable.

**This does not reverse the earlier decision** that the frame draws nothing
above the tagline. Different element, different place; that gap is still empty.

### For Individual — the three services

The frame runs these down a diagonal — item 1 at the left edge, item 2 indented
309px and lower, item 3 back at the left — on the argument that it mirrors the
card stack opposite. Built, it does not read that way: each item is capped at
341px inside a 650px column, so nothing shares a left edge, the three headings
land on three different measures, and the middle one floats with its body copy
orphaned under it. A cascade needs the eye to follow a line; three unequal text
blocks at three indents just look misaligned.

Now one list on one axis: full column measure, hairline rules, and a masked
icon carrying the rank the stagger was reaching for. The icon treatment is
`layout-254`'s and `layout-253`'s, so it reads as part of the system rather
than a fourth idea about how to present three things. **Copy unchanged.**
Measured after: all three at left 73, all three 616 wide.

### For Individual — "How getting matched works"

Was the oversized-numeral layout the 2026-09-08 frame draws (224px Playfair
numeral, 258px column, progress rule, "Step N" tagline). Replaced with the
scroll-tracked rail — the `timeline-05` `/systems-&-technology` and
`/for-business-page` already share — so the site has one component for an
ordered list of steps instead of three.

The trade is real: the numeral layout gave each step more presence. The rail
gives four steps that read as one connected sequence, and a visitor arriving
from either of those two pages meets the same component doing the same job.
Consistency won, on request.

Heading, standfirst and all four steps unchanged. **Those four names must stay
in sync with `components/intake/intake-steps.js`**, which drives the breadcrumb
on `/cmps`, `/booking` and `/consent-form` — this section is the public
description of that same flow.

## Verification

- `pnpm build` clean; 23 static pages.
- FAQ face on all eleven routes: `<h3>`, Lexend Deca, weight 400, identical
  section padding, no dead trailing div. Checked by parsing the served HTML for
  each route rather than by reading the source.
- Envelope resized in all 11 `cta-25` files.
- No horizontal overflow at 375 on `/`, `/advisory-services` or
  `/for-individual-page`: `scrollWidth == clientWidth == 375`, zero
  overflowing elements.
- Navbar: gradient on `/`, flat `rgb(255,255,255)` on `/how-we-work`.
- Advisory hero vignettes: 32px clearance each side of the text column.
- Systems hero monitor: loads, 291x272 natural in a 145.5x136 box.
- CARF card: seal 96x96 from a 900x900 source, 2px border, 8px radius, links to
  `carf.org/provider/uplift-path-inc-409426/`.
- For Individual: three items at a shared left edge and equal width; timeline
  renders the rail with numerals 01–04.

**Screenshots were not captured.** The Browser pane's screenshot call timed out
repeatedly against this session — the app window was behind another, which
stops the page drawing — so everything above is computed values read off the
live page instead. Worth a look by eye before this ships.

## Still open

- The clipped `systems-hero-laptop.png` is unreferenced but not deleted. If the
  Figma quota ever clears, re-cutting it with a box that does not exclude the
  rows the heading occupies restores the frame's own drawing and the monitor
  can go back to being AI Consultation's alone.
- "What we do" on Advisory is 1093px (was 1138). The remaining height is card
  copy, not media, so cutting it further is a copy decision rather than a
  layout one.
