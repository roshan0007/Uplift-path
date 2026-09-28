# Refactoring UI audit — /advisory-services, 2026-09-29

**Verdict:** This is the healthiest of the three service pages and nothing on it is visibly broken, but three things should be fixed. The "What We Do" card grid goes four-across too early and crushes its copy to 13–18 characters a line between 992 and 1279px. "The Problem We Solve" breaks the phone rule: all its text, then one lone picture. The FAQ questions centre themselves when they wrap on a phone. Each fix is a class or markup change inside the existing system.

**Counts:** 19 pass · 3 fail · 7 override · 4 decision

Measured in a dedicated tab at 1440x900, 1280x800, 1024x768 (above the 992 step), 991x768 (below it) and 375x812, with a reload after every resize. Computed values only. The page was not edited.

---

## Fails, in fix order

### 1. Grids are overrated (p. 72) / Keep your line length in check (p. 99) — four columns start 290px too early
**Where:** `components/sections/advisory-services/layout-374.jsx:87`
**Seen:** at 1024 the grid is already `lg:grid-cols-4`, but the type has also stepped up at 992. Each small card is 199px wide with a **151px** text column. Its bodies run **13–18 characters a line over 4–5 lines**, and its 28px `text-h5` titles wrap to **3 lines** ("Growth & Expansion Strategy", "Growth & Gap Assessment"). The feature card beside it sits at 43 cpl over 5 lines. One pixel below the step, at 991, the same cards are 371px wide at 28–44 cpl on 2 lines. At 1440 they are 244px wide at 22–29 cpl on 2–3 lines.
**Why it breaks:** the book's point is that a column should hold its shape rather than shrink to fill a grid. Between 992 and 1279 the four-up grid is fluid past the point where the copy can live in it, and it does so exactly where the type scale grows. The section reads as four narrow ribbons of text.
**Fix:** `lg:grid-cols-4` → `min-[1280px]:grid-cols-4`. This is the same arbitrary min-width `layout-134.jsx:63` on this page already uses, and it exists because this theme has no `xl` breakpoint. From 992 to 1279 the grid keeps its `sm:grid-cols-2` shape, the one measured at 991 (feature card full width, smalls two-up). At 1280 and up it is unchanged.
**Scope:** refactor

### 2. Site mobile rule (text, then media, then text) — "The Problem We Solve" ends on a lone picture
**Where:** `components/sections/advisory-services/layout-19.jsx:22-75`
**Seen:** at 375 the section reads **T×8 → IMG(398)**: the h2, two paragraphs and five list items, then the 338x398 illustration alone at the foot. The same page's `layout-28` was fixed to the rule on 2026-09-29 and now reads T×5 → IMG → T×12.
**Why it breaks:** this is the site's own phone convention. A single decorative picture at the end of a long run of text reads as the section's leftover, not its media.
**Fix:** use the three-child pattern already in `layout-28.jsx:77-93`. Split the text `<div>` in two:
- child 1 is the h2 and the two `<p>`s, with `md:col-start-1 md:row-start-1`;
- the image `<div>` becomes `md:col-start-2 md:row-span-2 md:row-start-1`;
- child 3 is the `<ul>`, with `md:col-start-1 md:row-start-2`.

Add `md:gap-y-0` to the grid on line 22. That keeps the desktop column's current 24px + 16px run from the last paragraph into the list, and `gap-y-12` separates the three parts on a phone. The phone then reads problem, illustration, audience list. The desktop picture does not change.
**Scope:** refactor

### 3. Align with readability in mind (p. 111) — FAQ questions centre when they wrap
**Where:** `components/sections/advisory-services/faq-01.jsx:49`, `:58`, `:67`
**Seen:** at 375 "How is advisory different from a consultant writing us a report?" wraps to 2 lines, starting 14px and 21px from the trigger's left edge. "How long does an engagement run?" wraps with lines starting **19px and 136px** in. The trigger computes `text-align: center`, inherited from the button's user-agent default. Nothing on the call site or the primitive sets it back. The answer below is left-aligned, the chevron is pinned right, and the accordion rules run full width.
**Why it breaks:** a multi-line centred run inside a left-aligned list has a ragged left edge where the eye returns. It also makes the questions look like headings of a different component from their own answers.
**Fix:** add `text-left` to each `AccordionTrigger` className, making it `text-left text-large font-body font-[400] md:py-5`. Do not change `components/ui/accordion.jsx`; compose at the call site. **Site-wide:** none of the twelve `faq-01.jsx` files sets `text-left`, so the same defect is on every FAQ route. Per the rule in `globals.css` [13] for this component, make the change on all of them at once.
**Scope:** refactor

---

## Decisions — real improvements that need a design call

### Even flat designs can have depth (p. 167) — hero and "The Problem We Solve" are both white
The page runs white · **white** · mint · white · mint · white. The comment at `layout-374.jsx:72-79` chose this knowingly. It is also forced by arithmetic: six sections between a white hero and the fixed white `cta-25` cannot alternate using only `scheme-light` and `scheme-mint`. Wherever the break goes, one white pair remains. AI Consultation and Compliance Support have five sections each and alternate cleanly. **Cost:** a third light scheme on one section, or moving the pair to FAQ → CTA. Either is a design call, not a class fix.

### Labels are a last resort (p. 41) — card eyebrows that don't label anything
The "What We Do" eyebrows are Clarity, Focus, Momentum, Honesty and Stability, at 14px/600. They sit above "Program Development", "Business Structuring" and so on, and don't classify them: "Honesty" over "Operational Advisory" says nothing a reader can use. They are the frame's own copy. **Cost:** copy change (drop or rewrite), not a class change.

### Labels are a last resort (p. 41), inverted — the audience list has no label
In "The Problem We Solve", five bullets naming *who* the service is for follow two paragraphs about *the problem*, with no lead-in. The list's role is left to inference. **Cost:** one line of new copy above the `<ul>`.

### Align with readability in mind (p. 111) — the hero sub-copy is a centred 4-line paragraph on a phone
At 375 the hero paragraph centres across 4 lines (24–351, 35–340, 30–345, 124–251). The book allows a centred heading over *short* centred copy, and at desktop it is 2 lines, which passes. This is the site-wide `layout-134` hero pattern on every route, so a change is site-wide. **Cost:** `text-center` → `text-left md:text-center` on the hero container, on every page at once. That changes how every hero looks on a phone.

---

## Overrides — book says X, brand says Y, no change

- **Balance weight and contrast** (p. 48). h1, h2 and h3 all compute to weight 400 despite `font-bold`. Working as designed.
- **Use shadows to convey elevation** (p. 158). All five cards measure `box-shadow: none`. The only shadow is the hard `0 3px 0 0` ledge on the hero button. No change.
- **Even flat designs can have depth → solid shadows** (p. 167). The `cta-25` black button carries no ledge. `.btn-dark` drops it deliberately (see `globals.css` at the `btn-dark-on-light` utility). No change.
- **Use fewer borders** (p. 206). Cards measure a 2px `rgb(0,10,8)` border at an 8px radius, and the FAQ rules are 1px. Borders are the structural system. No change.
- **Decorate your backgrounds** (p. 198). Flat white and flat mint, one scheme per section, no texture. Matches the 2026-09-03 ruling.
- **Ditch hex for HSL / You need more colours / Define your shades** (pp. 119, 123, 129). N/A by construction. No raw hex in the folder.
- **FAQ question weight.** The book would make the question bolder than its answer. It is Lexend 400 by explicit instruction (CLAUDE.md, `globals.css` [13]). Size carries the difference instead: 22px against 16px at ≥992, 18 against 16 below.

---

## Passes

**Starting from Scratch.** Calm, institutional personality; no emoji, no bounce. Grep: no raw hex, no gradient, no blurred shadow, no inline style, no `leading-*`/`tracking-*`, no `opacity-*`. Every arbitrary value is a measured vignette box, the `min-[1280px]` breakpoint, or an image cap (`max-w-[392.5px]`, `max-w-[189px]`, `max-w-[400px]`). There is no `text-[...]`.

**Hierarchy.** h1 is 72px against h2 at 52 (≥992), and 44 against 40 at 375. The h1 wins at both sizes, and the hero fits the fold: bottom at 757px on 1440x900 and on 1024x768. The feature card's 44px title correctly outranks the four 28px small-card titles. The FAQ question (22/18px) sits above its 16px answer on size alone, which is the lever this brand has. No heading is used only for its size; the outline belongs to seo-auditor.

**Layout and Spacing.** Every gap lands on the scale: heading to body 16–24px, h2 to grid 40px, block to block 40/48px, section padding 64/96/112px. Illustrations are capped at their drawn width rather than stretched (*You don't have to fill the whole screen*, p. 65). Headings sit closer to their own copy than to the block above: `layout-28` h3 has 16px below and 40–48px between blocks. No `em`.

**Designing Text.** The scale steps at 992 as tokens say: h1 44→72, h2 40→52, h4 24→36, medium 16→18. `text-small` measures 14px on both sides (`globals.css` [16]). **The checklist's "known defect" note is stale:** regular and small no longer collapse below 992. Hero measure is 72 cpl at 1440 and 36 at 375. Problem copy is 59–61 cpl at 1440 and 44–46 at 991. Two Lexend/Playfair families only. Lists are real `<ol>`/`<ul>` left-aligned. Default disc and decimal markers are kept because the frame draws them; not a finding.

**Working with Colour.** Every text pair measured passes AA: 20.06:1 on white, 17.91:1 on mint, and white on black in the CTA button. There is no text on the green fill anywhere on the page.

**Creating Depth.** Mint breaks the white run twice, and adjacent sections otherwise differ.

**Working with Images.** No image renders above its source. The smallest source is 741x493 in a 292x160 slot, which holds at 2x. `advisory-services-operational-advisory.jpg` is 3800x2138 for a 292x160 slot. That is file weight, not a visual defect.

**Finishing Touches.** The 1px left rule on the three `layout-28` blocks is the book's accent-border device in the system's own hairline. No empty states on the page.

**Mobile rule.** `layout-374` (text → image per card), `layout-28` (T → IMG → T) and `cta-25` (small envelope on the button line) all follow it. Only `layout-19` fails (fail 2).

---

## Across the three service pages

These pages share a template (`layout-134` hero, a two-column text/media section, a card section, `faq-01`, `cta-25`). Where they diverge:

| | Advisory | AI Consultation | Compliance |
|---|---|---|---|
| Hero vignettes | Anchored to the centre line (`calc(50%+416px)`), shown from 1280. **Never touch the text**: measured 38px clear at 1440 | Pinned to the viewport edges from 992. **Overlaps the H1/body** at 992–1279 | Pinned to the viewport edges from 992. **Overlaps the H1/body** at 992–1279 |
| Text/media section on a phone | `layout-19` fails, `layout-28` passes | `layout-01` fails | `layout-16` fails |
| Scheme rhythm | W W M W M W (forced, see Decisions) | W M W M W | W M W M W |
| FAQ | yes | **none** (the sitemap has none) | yes |
| Section padding at ≥992 | `layout-374` 80px, rest 112px | 112px throughout | `layout-615` 80px, rest 112px |
| Card/person h3 step | `text-h3` feature, `text-h5` smalls, `text-h4` blocks | `text-h4` | `text-h3` names |
| Icon treatment | none | 40px mask, `caribbean-green-dark` | 24px mask, `scheme-text` |

Advisory is the reference implementation for the hero vignettes. The other two pages should copy its anchoring, not the other way round. `cta-25` is byte-identical across all three apart from its comments, and passes.
