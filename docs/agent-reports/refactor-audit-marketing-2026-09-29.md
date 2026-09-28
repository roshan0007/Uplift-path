# Refactoring UI audit — marketing, 2026-09-29

**Verdict:** On desktop this page is well built. On phones, though, two sections put all their text first and one picture last, which breaks the site's mobile rule. Below 992px the hero's telescope also pushes the hero past the first screen. Fix those two sections first, then the audience list, whose wrapped lines start with a stray "·", then the one long centred paragraph.
**Counts:** 21 pass · 5 fail · 5 override · 1 decision

Measured in the browser at 1440x900, 991x900 and 375x812, reloading after each resize. Computed values only.

## Fails, in fix order

### 1. Site mobile rule / Not all elements are equal (p. 30) — the hero ends in a lone telescope
**Where:** `components/sections/marketing/header-01.jsx:32`
**Seen:** Below `lg` the grid is one column, and `order-last` sends the decorative telescope under all the text. At 375 the eyebrow, h1, body and button end at y547, and then the 338x338 image follows at y599. The hero is **1001px tall**. At 991 the image is 420x420 at y470, and the hero runs from 72 to **1058px against a 900px fold**. At 1440 it fits (72 + 712 = 784).
**Why it breaks:** This is exactly the "all the text, then one lone picture" pattern the site's phone rule forbids. The picture is `aria-hidden` decoration, yet it is the element that pushes the hero past the fold on tablet. Every other service hero (`layout-134`) hides its decorative art below lg for this reason.
**Fix:** `className="order-last flex justify-center lg:order-none"` → `className="hidden justify-center lg:flex"`. That is the `layout-134` treatment. The lg two-column composition does not change. If the art has to survive on phones, the in-system alternative is the CTA's small-mark pattern (`w-24 sm:w-28` on the button line), but hiding it is the one-class fix.
**Scope:** refactor

### 2. Site mobile rule — "What the First Engagement Looks Like" is text then picture
**Where:** `components/sections/marketing/first-engagement.jsx:23-49`
**Seen:** At 375 the h2 (y64, 3 lines) and paragraph (y228, 8 lines) come first, and the 338x338 illustration comes last at y468. Between 768 and 991 the section is correctly two-column.
**Why it breaks:** This is the same text-then-lone-picture stack. The fix is the one `resource-assistance/layout-491` shipped on 2026-09-29.
**Fix:** Make three grid children instead of two: the `<h2>` in its own `<div className="md:col-start-1 md:row-start-1 md:self-end">`, then the image `<div>` with `md:col-start-2 md:row-span-2 md:row-start-1`, then the `<p>` in `<div className="md:col-start-1 md:row-start-2 md:self-start">`. Add `md:gap-y-0` to the grid on line 23, so that from md the heading keeps its own `mb-5 md:mb-6` to the paragraph. Phones then read heading → image → paragraph. That is the homepage Three Steps precedent: heading, illustration, then the copy.
**Scope:** refactor

### 3. Supercharge the defaults (p. 192) — wrapped audience lines start with "·"
**Where:** `components/sections/marketing/who-its-for.jsx:36` and `:43`
**Seen:** The four items total about 1,360px of text in a 768px list, so the list wraps at every width. `first:before:hidden` removes only the first item's separator. At 1440 line 2 begins "· Private practices…" (li at x336 with `::before` content "·" inline). At 375, lines 2, 3 and 4 each begin with a middot, so the list reads as a centred column of broken bullets.
**Why it breaks:** A separator that leads a line separates nothing. It reads as a mistake, and the whole section is just this one list.
**Fix:** Line 36: `flex flex-wrap justify-center gap-x-2 gap-y-1 text-medium` → `flex flex-col items-center gap-y-1 text-medium`. Line 43: drop `before:mr-2 before:content-['·'] first:before:hidden first:before:content-none`. The result is four centred lines, with no separator to orphan. The real `<ul>` semantics stay.
**Scope:** refactor

### 4. Align with readability in mind (p. 111) — a centred paragraph of 4 to 8 lines
**Where:** `components/sections/marketing/why-not-an-agency.jsx:26`
**Seen:** At 1440: 18px, **4 centred lines at 83 cpl** across 768px. At 991: 4 lines at 83 cpl. At 375: **8 centred lines** at 41 cpl.
**Why it breaks:** It fails twice. The measure is over 75, and long-form copy is centred, which gives every line a ragged left edge the eye has to hunt for. It is the page's argument paragraph, the one most worth reading.
**Fix:** `className="text-medium"` → `className="mx-auto max-w-md text-left text-medium"`. That gives about 62 cpl at 18px, left-aligned, under the h2, which stays centred. The keep-it-centred alternative is `mx-auto max-w-md` alone, which fixes the measure but runs about 6 centred lines. If the frame's centring has to hold, that is the call to take back to design.
**Scope:** refactor

### 5. Keep your line length in check (p. 99) — capabilities run 87 characters on tablet
**Where:** `components/sections/marketing/what-we-do.jsx:113`
**Seen:** Between 768 and 991 the section is one column, and each capability body is **842px wide at 87 cpl** (3 lines each, at 991). At 1440 the cells are 348px at 37 cpl, and at 375 they are 302px at 33 cpl. Both pass.
**Why it breaks:** The five bodies are the densest copy on the page, and on the tablet range they run the full container width.
**Fix:** `className={capability.place}` → ``className={`mx-auto w-full max-w-md ${capability.place}`}``. It is inert at 375 (338px column) and at lg (348px cells), so it acts only on the tablet range, where it caps the bodies at about 58 cpl.
**Scope:** refactor

## Decisions — real improvements that need a design call

### Not all elements are equal (p. 30) — eyebrow weight (site-wide, carried over)
"Marketing" renders at 16px/600 above a 400 h1. Size keeps the h1 on top (72/44). This is the same site-wide call logged 2026-09-11, and it is still open.

## Overrides — book says X, brand says Y, no change

- **Balance weight and contrast** (p. 48). The h1, h2 and h3 compute to 400. Rank is carried by size: 72/52/28 at lg, 44/40/20 below. No change.
- **Use shadows to convey elevation** (p. 158). Only the button ledge. No change.
- **Use fewer borders** (p. 206). The accordion hairlines are the system. No change.
- **Icons in green.** The design guide says icons are monochrome and "never coloured green". `what-we-do` masks its five Material Symbols in `--color-caribbean-green-dark`, the documented treatment from `how-we-work/layout-254` and `ai-consultation`. The inline `style={{ maskImage }}` at `:72` is that same established pattern, not an ad-hoc style. No change.
- **Ditch hex for HSL / You need more colours / Define your shades** (pp. 119, 123, 129). N/A by construction. There is no raw hex.

## Passes

**Starting from Scratch.** No raw hex, gradient, blurred shadow or `leading-*`/`tracking-*` override. The arbitrary values are `lg:grid-cols-[2fr_3fr]` (the frame's 2/5 : 3/5 split), the image caps `max-w-[400px]`/`[420px]`, and `content-['·']`. None of them is on the type or spacing scale.

**Hierarchy.** One h1 per page at 72/44px. Section h2s are 52/40. Capability titles are `<h3>` at `text-h5` (28/20) over 16px bodies. FAQ questions are one step above their answers. Every scheme is light, so the grey-on-colour check is N/A. Nothing is resized to fake the outline.

**Layout and Spacing.** Every gap is on the scale. In `what-we-do` at lg, each title sits 12px above its body and 64px from the next capability, so proximity is unambiguous. The central column holds the h2 and the art at 384px rather than stretching. The text column in `first-engagement` stops at 600px.

**Designing Text.** The scale steps at 992: 18px body at lg, 16px below. Hero body is 69 cpl at both 1440 and 991. `first-engagement` is 61 cpl at 1440 and 43 at 991. Line-heights are the tokens. There are two families only. `text-balance` holds the h1 at 3 lines (1440), 2 (991) and 4 (375) with no orphan.

**Colour.** Contrast is 20.06:1 on white and 17.91:1 on mint everywhere measured.

**Depth.** *Even flat designs can have depth* (p. 167) is done the brand's way: white · MINT · white · MINT · white · MINT · white, so no two adjacent sections share a scheme.

**Images.** The telescope (990px) is drawn at 420/338. The what-we-do collage (892x672) is drawn at 384/400/338. The first-engagement art (1294px) is drawn at 400/338. All are scaled down, none up.

**Site mobile rule.** `what-we-do` passes. At 375 it reads h2 (y64), the collage (y144–398), then the five capabilities (from y446), which is text → media → text. The CTA uses the small envelope mark. Fails 1 and 2 above are the two sections that do not follow the rule.

**Hero fold (desktop).** It fits at 1440x900 (bottom at 784).
