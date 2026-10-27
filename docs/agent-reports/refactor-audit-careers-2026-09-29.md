# Refactoring UI audit — Careers (`/careers`), 2026-09-29

**Verdict:** One real bug to fix first. The "Why Uplift Path" intro uses a width class (`max-w-2xl`) that this design system doesn't define, so a centred paragraph runs the full 1280px, about 112 characters a line. After that, two sections break the phone rule by putting all their text before a lone picture, and the Core Values grid squeezes its paragraphs into 205px columns on tablets. Every fix is a class or markup change using existing tokens.

**Counts:** 14 pass · 5 fail · 7 override · 5 decision

Measured in a dedicated browser tab at 1440x900, 992x800, 768x1024 and 375x812 (mobile emulation). All values are computed values read with `getComputedStyle`, `getBoundingClientRect` and text `Range` rects. The Browser pane was hidden for the whole session, so there are no screenshots; every finding comes from measured numbers. Device pixel ratio in the emulated tab is 1.

## Fails, in fix order

### 1. Keep your line length in check (p. 99) / Align with readability in mind (p. 111): the "Why Uplift Path" intro spans the whole container (P1)
**Where:** `components/sections/career/layout-359.jsx:40` (`mx-auto max-w-2xl text-center`)
**Seen:** `app/globals.css:378` resets `--container-*: initial` and defines only `xxs`–`xxl` (20–80rem), so `max-w-2xl` has no token behind it and has no effect. The heading and the paragraph fill the container: 1280px at 1440, where the 18px paragraph is 4 centred lines of about 112 characters. At 992 it is 879px (5 lines, about 90). At 768 it is 678px (6 lines, about 75).
**Why it breaks:** It's more than twice the 45–75 character range, and centred, so the eye has no fixed left edge to return to. Every other section intro on the site is `max-w-lg`.
**Fix:** `max-w-2xl` → `max-w-lg` (48rem, 768px). By comparison with the Core Values intro, which is the same 18px copy at 768px and measures 70 characters a line, this gives about 70. It also puts this section on the same axis as the rest of the page.
**Scope:** refactor

### 2. Site mobile rule (text → media → text): "Who We Are" ends on a lone picture (P2)
**Where:** `components/sections/career/layout-213.jsx:26–49` (two grid children: image `order-2 md:order-1`, text `order-1 md:order-2`)
**Seen (375):** h2, a 9-line paragraph and the Apply button run y 1014–1370, then the only image comes at 1422–1760.
**Why it breaks:** That's exactly the pattern the site's mobile convention rules out, all the text and then one picture (see commit `7f48f89`).
**Fix:** Split the text child in two, the pattern `for-individual-page/layout-395` and `advisory-services/layout-28` use. The grid becomes `grid grid-cols-1 items-center gap-y-12 md:grid-cols-2 md:gap-x-12 md:gap-y-0 lg:gap-x-20`, and it holds three children: the h2 in `md:col-start-2 md:row-start-1 md:self-end`, the image wrapper in `md:col-start-1 md:row-span-2 md:row-start-1`, and the paragraph + button in `md:col-start-2 md:row-start-2 md:self-start`. Drop the `order-*` classes. The desktop picture is unchanged (image left, text right). Phones read heading, image, text.
**Scope:** refactor

### 3. Site mobile rule, plus Keep your line length in check (p. 99): "Growth Acceleration" ends on a lone picture (P2)
**Where:** `components/sections/career/layout-469.jsx:43–68`
**Seen (375):** eyebrow, h2 and a 13-line paragraph run y 3591–4055, then the only drawing comes at 4103–4413. At 768 the two-column split leaves the paragraph in 307px: 14 lines of about 36 characters, below the 45 minimum.
**Fix:** Same three-child structure as #2. Eyebrow + h2 go in `md:col-start-1 md:row-start-1 md:self-end`, the drawing in `md:col-start-2 md:row-span-2 md:row-start-1`, the paragraph in `md:col-start-1 md:row-start-2 md:self-start`, with `md:gap-y-0` on the grid. To also fix the tablet measure, move the split from `md:` to `lg:` on this grid (`md:grid-cols-2 md:gap-x-16` → `lg:grid-cols-2 lg:gap-x-16`, and the placement classes to `lg:`), so 768–991 stacks at full width.
**Scope:** refactor

### 4. Keep your line length in check (p. 99) / Align with readability in mind (p. 111): Core Values columns are too narrow on tablets (P2)
**Where:** `components/sections/career/layout-237.jsx:72` (`md:grid-cols-3 md:gap-x-8 … lg:gap-x-12`)
**Seen:** At 768 the three columns are 205px, and each centred value paragraph is 5–6 lines of 20–25 characters. At 992 they are 261px, 4–5 lines of 24–27 characters. At 1440 they are 395px, 3 lines of 34–46, which is fine. At 375 they are one column, 3–4 lines of 31–41, also fine.
**Why it breaks:** Five or six centred lines of about 22 characters leaves a ragged edge on both sides with nothing to align to, the case the book says not to centre.
**Fix:** `md:grid-cols-3` → `md:grid-cols-2 lg:grid-cols-3`. Six values make three even rows of two on tablet, at about 320px each. From 992 to about 1100 the lg columns are still about 26 characters wide. That remainder would need the missing `xl` breakpoint, so it isn't claimed as fixed.
**Scope:** refactor

### 5. Everything has an intended size (p. 181): the card illustration is scaled up (P3)
**Where:** `components/sections/career/layout-359.jsx:61` (`size-full object-contain` on `contact-us-illustration.png`)
**Seen:** The file is 600x599, drawn at 638x636 in the card at 1440, a 1.06x upscale at 1x (and about half the resolution it needs at 2x). At 992 it is 438px and at 375 334px, both fine.
**Fix:** `size-full object-contain` → `w-full max-w-md object-contain` (560px cap). The wrapper already centres it with `flex items-center justify-center`.
**Scope:** refactor

## Decisions: real improvements that need a design call

### Site mobile rule: the hero ends on a lone picture
At 375 the h1, paragraph and "Explore Opportunities" button run y 128–515, and the camera drawing comes after them at 567–886. The hero is 886px tall against an 812px screen. Moving the drawing between the heading and the button (to meet the rule) pushes the page's main action below the first screen, and hiding it below `md` (as the other heroes hide their vignettes) drops the one picture the frame gives this page on phones. Either one is a layout call, not a class fix.

### Align with readability in mind (p. 111): the "Why Uplift Path" paragraph is long for centred copy
Even after fail #1 it will be about 6 centred lines at desktop, and it is 11 centred lines at 375. The real fix is cutting the paragraph, or setting it left-aligned under a centred heading. Those are copy or layout decisions.

### Not all elements are equal (p. 30): the CTA speaks to clients, not candidates
The closing banner is the shared `cta-25` copy, "Ready to Unlock Your Growth Plan" / "Book your discovery call…", with a button to `/contact-us`. On a hiring page the loudest block on the page asks the reader to become a client. That's a copy change.

### Not all elements are equal (p. 30): every in-page action is the outline button
"Explore Opportunities" (twice) and "Apply" are all `variant="secondary"`. The only filled button is the CTA's, and it doesn't point at jobs. This is the same site-wide outline-hero question logged in `refactor-audit-for-individual-hero-2026-09-24.md`, and it's worth settling there.

### Everything has an intended size (p. 181): Who We Are ships a 2400px image for a 600px slot
`career-feature-section-0.png` is 2400x2400 and 644 KB, shown at 600px at desktop and 338px on phones, 4x the pixels it needs at desktop. That is an asset re-export (1200px would cover 2x), not a class fix.

## Overrides: book says X, brand says Y, no change

- **Balance weight and contrast** (p. 48). Headings stay Playfair 400. The h1 leads by size (72 vs 52px, 44 vs 40px below 992). No change.
- **FAQ questions** (p. 48). Lexend Deca 400 by the site-wide ruling, `text-large` against 16px answers. No change.
- **Use shadows to convey elevation** (p. 158). The "The Way We Work" card stays flat with its 2px border. Buttons carry the hard `0 3px 0 0` ledge, measured with no blur. No change.
- **Use fewer borders** (p. 206). The card border and FAQ hairlines stay. No change.
- **Decorate your backgrounds** (p. 198). White, mint, white, mint, white, mint, white, flat scheme colour, the cleanest alternation of the three pages. No change.
- **Palette construction** (pp. 119–129). The Core Values icons are masks filled with `bg-viking-dark`, an existing token. The `#41b19a` hits in the hex grep are in a comment. No change.
- **Supercharge the defaults** (p. 192). The values use brand icons rather than bullets, and the icons are decorative (`aria-hidden`). Nothing to add. No change.

## Passes

- **Personality / limit choices:** only Playfair and Lexend. No `text-[…]`, no `leading-*`/`tracking-*`, no gradients, no blurred shadow utilities. The arbitrary values are the frame widths of the two drawings (`max-w-[384.5px]`, `max-w-[310px]`) and the CTA's `max-w-[400px]`.
- **Hierarchy:** the h1 (72px) leads the page. The "Careers" eyebrow is 16px/600, 16px above it. Core Values titles (36px) outrank their bodies (16px). In the card, the 14px "Operations" eyebrow sits 8px above a 44px h3.
- **Grey on colour:** N/A. White and mint only, no `opacity-*`.
- **Avoid ambiguous spacing:** Core Values icon to title 24px, title to body 12px, so the title belongs to its body, as its code comment intends, and it holds. Section heads are 24px above their intro and 48px above their content.
- **Grids:** Core Values titles reserve `md:min-h-[2lh]`, so all six body paragraphs start on one line per row (y 2043 and 2357 at 1440).
- **Hero fold:** the hero is 685px (ending at y=757) at 1440x900. At 992x800 the h1 is 4 lines (346px tall, in a 400px column), but the button ends at y=728, inside the 800px screen.
- **Line length elsewhere:** hero paragraph 41 characters a line, Who We Are 55 at 1440, Growth Acceleration 64 at 1440, Core Values intro 70, card body 52, CTA 44.
- **Type scale:** steps at 992 (h1 44→72, h2 40→52, h3 24/32→36/44).
- **Line-height:** from tokens only.
- **Contrast:** body on white 20.06:1, on mint 17.91:1. The outline buttons' dark label on white or mint is 20.06 / 17.91. The CTA's white label on black is 20.06. The navbar Contact button (dark on `#08d1a7`) is 10.21. No white on green.
- **Depth:** a strict white/mint alternation means no two same-scheme sections sit next to each other.
- **Images:** hero camera 769px file at 385 (2x), growth drawing 500 at 310, CTA envelope 924 at 400.
- **Mobile rule, sections that pass:** "The Way We Work" reads heading/intro, illustration, card copy. The CTA puts its envelope on the button's row.
- **No horizontal scroll:** `scrollWidth` equals the viewport at 375, and the viewport minus the scrollbar at 1440.

**Not duplicated here:** the "Operations" eyebrow appearing on two sections is Relume fixture copy the code already flags. It is a content item for `qa-inspector`, not a visual finding.
