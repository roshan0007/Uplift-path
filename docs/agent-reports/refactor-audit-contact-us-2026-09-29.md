# Refactoring UI audit — contact-us, 2026-09-29

**Verdict:** All four fails from the 2026-09-11 audit are fixed, and the page is sound. Two small issues are new. On tablet the intro paragraph runs too wide. On a 375px phone there is about 150px of empty white under the form inside its card. Each is a one-class change. The biggest remaining problem is still the Zoho form's own white-on-teal Submit button, which has to be changed in Zoho, not in this repo.
**Counts:** 15 pass · 2 fail · 5 override · 4 decision

Measured in the browser at 1440x900, 991x900 and 375x812, reloading after each resize. The Zoho form was also loaded standalone at the three column widths the page renders it at (589, 810 and 286px) to find where its content ends. Computed values only.

## Status of the 2026-09-11 findings

| # | 2026-09-11 fail | Now | Evidence |
|---|---|---|---|
| 1 | One fixed `h-[58rem]` frame hid Submit about 200px below the frame at 375 | **Fixed** | `contact-panel.jsx:179` is a measured height ladder. The frame is 1248px at 375 against Submit's bottom at 1048. At 991 it is 880 against 761. At 1440 it is 880 against 778. Submit is inside the frame at all three. |
| 2 | Email and phone links were 20px tap targets | **Fixed** | `-my-3 inline-block py-3` on both anchors. Both measure **48px** tall at every width (181x48, 133x48). |
| 3 | "Get directions" at weight 500 outranked email and phone | **Fixed (removed)** | The map and directions link are gone by decision (`contact-panel.jsx:32-34`). |
| 4 | Lead → details gap tied the 32px row rhythm | **Fixed** | `mt-12`. The lead-to-`<dl>` gap measures **48px** at all three widths, against 32px of row padding. |

The three 2026-09-11 decisions are all still open and are carried below.

## Fails, in fix order

### 1. Keep your line length in check (p. 99) — lead paragraph runs 92 characters on tablet
**Where:** `components/sections/contact-us/contact-panel.jsx:67`
**Seen:** Below `lg` the left column is the full container. At 991 the lead is **878px wide, 2 lines at 92 cpl** (16px). At 1440 the grid column holds it to 559px, 61 cpl, which passes. At 375 it is 37 cpl.
**Why it breaks:** The first thing a visitor reads is 17 characters past the limit, across the whole tablet range.
**Fix:** `className="text-medium"` → `className="max-w-md text-medium"`. It is inert at lg, where the column is 559px and narrower than `max-w-md`'s 560, and inert at 375.
**Scope:** refactor

### 2. You don't have to fill the whole screen (p. 65) — about 150px of dead white under the form at 375
**Where:** `components/sections/contact-us/contact-panel.jsx:179`
**Seen:** At 375 the form column is 286px, and the base step `h-[78rem]` gives a **1248px** frame. Standalone at 286px, the form's content ends at **1094px** (Submit's bottom at 1048). That leaves **about 154px of empty white** inside the 2px card. At 1440 the gap is about 56px and at 991 about 73px, both within the comment's own "about 50px" intent. The base step is sized for the 320px worst case (236px column, 1241px). It is correct there, and 375, the commonest phone width, pays for it.
**Why it breaks:** The dead band is on the device where the card is already the tallest thing on the page. It reads as a form that failed to load its last field.
**Fix:** Add one more step to the ladder in the same style as the three `min-[…]` steps already there: insert `min-[375px]:h-[71rem]` after `h-[78rem]`. 71rem is 1136px, which clears the comment's own 1130 measurement at a 286px column, the worst case in 375–479. That recovers about 112px at 375 and leaves 320–374 on 78rem. Re-measure if the Zoho fields change, as the comment already says.
**Scope:** refactor

## Decisions — real improvements that need a design call

### Accessible doesn't have to mean ugly (p. 142) — the Zoho Submit button is white on teal (carried over, still open)
Re-measured today on the form itself: `background rgb(7, 209, 167)`, `color rgb(255, 255, 255)`, 15px Montserrat, 8px radius. That is **1.96:1**, the pairing CLAUDE.md forbids, on the page's primary control. The inputs are still 1px at a 4px radius in Montserrat, and there are still **0** `required`/`aria-required` attributes behind the asterisks (*Don't rely on colour alone*, p. 146). The cost is unchanged. Either re-theme the form in Zoho (button colour, font, radius, border width), with no code in this repo, or rebuild it natively on `components/ui/` and post to Zoho.

### Not all elements are equal (p. 30) — the form starts below the fold on phones (new)
At 375x812 the card's top edge is at **y732**, so about 80px of the form is visible without scrolling. The file says the form "is the point of the page". The details block (email, phone, office) sits above it. On a phone, the `tel:` link above the form is arguably the better first action, so which one leads is a content-priority call. It could be done with `order-*` classes. It is not proposed because it inverts the page's reading order.

### Not all elements are equal (p. 30) — eyebrow weight (site-wide, carried over)
"Contact" renders at 16px/600 above a 400 h1. It is still the site-wide 17-occurrence call.

### Labels are a last resort (p. 41) — "Contact" over "Start Here" on /contact-us (carried over)
Route, nav item, title and eyebrow all say the same word. Removing it is a copy change. Still open.

## Overrides — book says X, brand says Y, no change

- **Use fewer borders** (p. 206). The card is 2px at an 8px radius. The detail rows are 1px `rgb(0, 10, 8)` hairlines. No change.
- **Use shadows to convey elevation** (p. 158). The card computes `box-shadow: none`. No change.
- **Balance weight and contrast** (p. 48). The h1 computes to 400. No change.
- **Decorate your backgrounds** (p. 198). Flat mint `rgb(220, 248, 242)`, one scheme, no texture. No change.
- **Ditch hex for HSL / You need more colours / Define your shades** (pp. 119, 123, 129). N/A by construction.

## Passes

**Starting from Scratch.** No raw hex, gradient, blurred shadow, inline style or type override. The arbitrary values are `lg:grid-cols-[0.85fr_1fr]` and the measured iframe height ladder. The two `opacity-70` values are hover transitions on a light scheme, not resting de-emphasis.

**Hierarchy.** The white card is the only white surface on the mint ground, and it is the focal element at every width. The h1 is 72/44px on one line. The `<dt>` labels are 14px/600 against 16px/400 values, so they are correctly secondary (p. 41, the good version). There is no emphasis-by-weight on the links any more.

**Layout and Spacing.** Every gap is on the scale. The group gap beats the inner gap (48 against 32). Tap targets are 48px. The left column stops at 559px beside a 657px card at 1440 rather than stretching.

**Designing Text.** The scale steps at 992. Lead line-length passes at 1440 (61) and 375 (37). Line-heights are the tokens. Two families in our markup. Nothing long-form is centred. `sm:items-baseline` aligns the 14px label with the 16px value (p. 102).

**Colour.** 17.91:1 across the page.

**Depth.** Mint section between the white navbar and the white footer, then a white card on mint. There are no same-scheme neighbours.

**Images / mobile rule.** N/A. There is no media on the page, so there is no text → media → text sequence to check.
