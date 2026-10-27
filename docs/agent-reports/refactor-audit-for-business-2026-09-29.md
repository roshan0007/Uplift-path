# Refactoring UI audit — For Business (`/for-business`), 2026-09-29

**Verdict:** The page is sound, but the two line-art drawings in the hero run through the heading and paragraph on every laptop-width screen between 992px and about 1400px. Hiding them below 1440px fixes that with one class. The remaining four fixes are small class changes that remove dead space, stop four low-resolution thumbnails being blown up on phones, and shorten the timeline's line length.

**Counts:** 15 pass · 5 fail · 7 override · 4 decision

Measured in a dedicated browser tab at 1440x900, 1380, 1280, 992x800, 991x800 and 375x812 (mobile emulation). All values below are computed values read with `getComputedStyle`, `getBoundingClientRect` and text `Range` rects. Ink collisions were counted by drawing each PNG to a canvas at its rendered size and counting pixels with alpha > 40 inside each text line's glyph box. The Browser pane was hidden for the whole session, so there are no screenshots; every finding comes from measured numbers. Device pixel ratio in the emulated tab is 1, so "at 2x" figures are calculated, not observed.

## Fails, in fix order

### 1. Not all elements are equal (p. 30) / Text needs consistent contrast (p. 176): the hero drawings run through the h1 (P1)
**Where:** `components/sections/for-business-page/layout-134.jsx:34` (the vignette wrapper's `lg:block`), with the fixed frame-px positions at `:39` and `:44`
**Seen:** The target is pinned at `left-[47.5px]` and the bulb at `right-[184.5px]`, both in 1440-frame px, while the copy is centred. So as the viewport narrows, the copy moves toward the drawings.
- **992:** target ink at x 48–361, y 250–475. The h1's first line has glyph box 176–801 / 219–315, and 2,832 target ink pixels fall inside it. The h1's second line (167–810 / 305–401) has 4,992, and the paragraph's first line has 468. The bulb (ink 676–791 / 364–501) puts 318 pixels into the h1's second line and 1,536 into the paragraph's first line.
- **1280:** target 456 / 639 ink pixels in the two h1 lines, bulb 414 in the paragraph.
- **1380:** 1 pixel. **1440:** clear.
So the drawings are drawn over the page title on every width from 992 to about 1400, which covers 1024, 1280 and 1366 laptops.
**Why it breaks:** Line art crossing a 72px heading turns the one element that should win into the busiest spot on the screen, and the lines cut through the letterforms.
**Fix:** `lg:block` → `min-[90rem]:block` on `:34`, so the drawings appear only at 1440 and up, the frame width their pixel positions were measured for. This is an arbitrary breakpoint: the system has no `xl`, and 992 is the only desktop step. If an off-scale breakpoint isn't acceptable, the alternative is a DECISION (see below).
**Scope:** refactor

### 2. Avoid ambiguous spacing (p. 83) / Establish a spacing system (p. 60): dead space closing the consulting-services section (P2)
**Where:** `components/sections/for-business-page/layout-613.jsx:124` (empty `<div className="mt-8 flex flex-wrap gap-4 md:mt-10 lg:mt-12" />`) and `:78` (`lg:py-12`) against `:32` (`lg:py-8`)
**Seen (1440):** 80px from the section top to the h2, but 176px from the last card's paragraph (ends y=2435) to the section's bottom edge (2611). That 176 is row 2's 48px bottom padding, plus 48px for the empty button row Relume left behind, plus the section's 80px. The two card rows are also spaced differently: row 1 sits 32px below its rule and row 2 sits 48px below its rule. At 375 the bottom is 120 against 64 at the top.
**Why it breaks:** The white space under the last row is more than twice the space above the heading, so the section looks unfinished, and the uneven row padding makes the second rule look like a new group.
**Fix:** Delete `:124`. On `:78`, change `lg:py-12` → `lg:py-8` so both rows match `:32`. The bottom becomes 32 + 80 = 112px.
**Scope:** refactor

### 3. Everything has an intended size (p. 181): thumbnails blown up to full width on phones (P2)
**Where:** `layout-613.jsx:33`, `:55`, `:79`, `:101`. Each card is `flex-col … md:flex-row`, and its image wrapper `w-full … basis-1/4` becomes full width in column mode.
**Seen:** Two of the four files are 288x171 (`-section-1.png`, `-section-2.png`), and `aspect-square object-cover` crops them square. At 375 each image renders at 338x338, so a 171px-tall source is scaled 1.98x at 1x density and about 4x at 2x. Stacked like that, the section is 2,712px tall. At 1440 the same images are 152px thumbnails, which is the size they were made for.
**Why it breaks:** `next/image` optimisation is off, so nothing resamples them. The phone gets the blurriest version of the smallest files on the page, at the largest size.
**Fix:** On all four lines, `flex-col` → `flex-row` and drop the now-redundant `md:flex-row`. The wrapper's existing `basis-1/4` then applies on phones too. **Tested at 375:** the images render at 84px (inside the 171px source at 2x), the h3s at 24px over 229px, and the section shrinks from 2,712 to 1,521px. Mobile still alternates media and text row by row, which is the site's text-media-text rule.
**Scope:** refactor

### 4. Keep your line length in check (p. 99): the timeline step bodies run long (P2)
**Where:** `components/sections/for-business-page/timeline-05.jsx:88` (`<p>{step.body}</p>`)
**Seen:** 688px wide at 16px from 768 up. Step 1 runs 87 characters a line, step 3 81, step 2 64. At 375 they are 32–35, which is fine.
**Fix:** `<p>` → `<p className="max-w-md">` (35rem, 560px). By proportion that is about 70 characters a line. The heading and numerals keep the full column.
**Scope:** refactor

### 5. Brand rule, no gradients: the timeline rail fades with two gradients (P3)
**Where:** `timeline-05.jsx:71` and `:74` (`bg-gradient-to-b from-scheme-background to-transparent` and the reverse)
**Seen:** Two 4x64px ramps fade the ends of the 3px rail. The grep for `gradient` finds them. CLAUDE.md allows exactly two gradients, both on the homepage: *"a third needs a design decision, not a precedent."*
**Fix:** Delete `:71` and `:74`. The rail then starts and stops square, which is how everything else in this brand ends. The same two lines exist in `for-individual-page/timeline-05.jsx:116,119` and in `systems-&-technology/timeline-05.jsx`, so change all three together or none.
**Scope:** refactor

## Decisions: real improvements that need a design call

### Grids are overrated (p. 72): seven services in a three-column grid
`services-list.jsx:36` lays `BUSINESS_SERVICES` out `md:grid-cols-2 lg:grid-cols-3`, and there are now seven entries (Marketing was added). At 1440 "Resource Assistance" sits alone on row 3 (y 1452), and at 768–991 it sits alone on row 4. The section is 1,046px tall at 1440, past the 900px ceiling its own comment cites. Fixing it means either a new arrangement (4 + 3, or a 2-column list) or a content decision about the seventh card. No class swap produces an even grid from seven items.

### Everything has an intended size (p. 181): the consulting thumbnails need real assets
Even after fail #3, the files are wrong for a square crop. `-section-1` and `-section-2` are 288x171 (a 16:9 crop can't fill a square above 171px), and `-section-3.jpg` is 2560x1440 at 331 KB for a 152px thumbnail, about 17x the pixels it needs. The cost is re-exporting four square images at 304px (2x of 152).

### Text needs consistent contrast (p. 176): keep the hero drawings between 992 and 1440
If hiding them below 1440 (fail #1) gives up too much, the alternative is new geometry: position them relative to the centred container instead of the page edges, so they track the copy. That is a layout change and needs the designer to say where they sit at 992.

### Not all elements are equal (p. 30): the only hero button is the outline style
Already logged in `refactor-audit-for-individual-hero-2026-09-24.md` as a site-wide call. Here, too, "Get Started" is `variant="secondary"` (`layout-134.jsx:81`). Not re-reported, only noted as still standing.

## Overrides: book says X, brand says Y, no change

- **Balance weight and contrast** (p. 48). The book would make the headings heavier. They stay Playfair 400 (measured `fontWeight: 400` on the h1, every h2 and every h3); size does the ranking. No change.
- **FAQ questions** (p. 48). The book would bold them. They stay Lexend Deca 400 by the site-wide ruling, and `text-large` (18px at 375, 22px at ≥992) separates them from the 16px answers. No change.
- **Use shadows to convey elevation** (p. 158). Cards stay flat, with a 2px border and no shadow. The only shadow is the hard `0 3px 0 0` button ledge, measured with no blur. No change.
- **Use fewer borders** (p. 206). Card borders and the 1px `layout-613` rules are the brand's structure. No change.
- **Decorate your backgrounds** (p. 198). Sections are separated only by flat scheme colour: white, white, mint, white, mint, white. No texture. No change.
- **Palette construction** (pp. 119–129). Fixed tokens. No change.
- **Timeline dot** (p. 158). `shadow-[0_0_0_8px_var(--color-scheme-background)]` is a zero-blur spread ring in the background colour, a mask gap rather than elevation, and `backdrop-blur-3xl` behind a 15px dot on flat colour has no visible effect. Neither is a blurred elevation shadow. No change.

## Passes

- **Personality / limit choices:** only Playfair Display and Lexend Deca are used. No `text-[…]`, no raw hex outside a comment, no `leading-*`/`tracking-*` overrides, no blurred shadow utilities. The arbitrary values are the frame-px vignette boxes (fail #1), the 3px rail and the CTA's `max-w-[400px]`.
- **Hierarchy:** the h1 clearly leads at desktop (72 vs 52px h2). The tagline (16px, w600) reads as a quiet label above the h1, 16px from it. The service card titles (28px) outrank their bodies (16px).
- **Hierarchy below 992:** the h1 is 44 vs 40px h2. The collapsed step is a type-scale token issue already logged 2026-09-24, so it isn't re-reported here.
- **Grey on colour:** N/A. Every section is `scheme-1` (white) or `scheme-mint`, and no `opacity-*` is used.
- **Spacing in the hero and section heads:** tagline to h1 16px, h1 to paragraph 24px, paragraph to button 32px. Every section's h2 sits 24px (20 on mobile) above its intro and 48–96px above its content. No ambiguous gaps outside fail #2.
- **Hero one-fold:** the section is 599px (ending at y=671) at 1440x900, 494px at 991, 543px at 375. The button is above the fold at every size.
- **Line length elsewhere:** the hero paragraph runs 58 characters a line, the services intro 70, the CTA 44, FAQ intro 40. At 375 everything is 20–38.
- **Type scale:** steps correctly at 992 (h1 44→72, h2 40→52, h3 24→36, text-medium 16→18).
- **Line-height:** from tokens only (h1 1.2, body 1.5).
- **Alignment:** the only centred copy is the section heads, each two lines or fewer at desktop.
- **Contrast:** body `rgb(0,10,8)` on white measures 20.06:1, on mint 17.91:1. The CTA's white label on black is 20.06:1. The navbar Contact button (dark on `#08d1a7`) is 10.21:1. There is no white on green anywhere.
- **Depth:** adjacent sections never form a run of more than two same-scheme sections.
- **Images:** the hero vignettes are exactly 2x (632x456 file at 316x228), the service icons 48px files at 32px, and the CTA envelope 924x888 at 400.
- **Mobile text-media-text rule:** `layout-613` alternates image and text per card, the CTA puts a 96px envelope on the button's row, and the hero and timeline have no media at 375. No section ends with a lone picture.
- **No horizontal scroll** at any width: `scrollWidth` equals the viewport minus the 15px scrollbar.
- **N/A:** labels as a last resort, semantic colour, empty states, user-uploaded content.

**Housekeeping, not a visual finding:** `faq-01.jsx:20` still says the fix is `font-body font-[700]`, but the triggers are `font-[400]` (measured 400). The comment went stale when the site-wide "not bold" ruling landed.
