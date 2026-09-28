# Refactoring UI audit — resource-assistance, 2026-09-29

**Verdict:** The page is in good shape. Hierarchy, spacing and the phone reading order are all correct. The only real defect is that two centred intro paragraphs run too wide on tablet and desktop. Constraining each one with a single `max-w-md` class fixes both, and nothing else needs to change.
**Counts:** 21 pass · 2 fail · 5 override · 3 decision

Measured in the browser at 1440x900, 991x900 (one pixel below the type-scale step) and 375x812, reloading after every resize. Computed values only. `transition-all` on the accordion triggers leaves a stale font-size after a live resize, so every figure below is from a fresh load.

## Fails, in fix order

### 1. Keep your line length in check (p. 99) — hero intro runs 85 characters
**Where:** `components/sections/resource-assistance/layout-134.jsx:61`
**Seen:** At 1440 the paragraph sits in the 768px `max-w-lg` container at 18px Lexend Deca: 2 lines, **85 characters per line**. At 991 (16px) it is still **85 cpl**. At 375 it is 43 cpl, which passes.
**Why it breaks:** 85 is above the 45–75 band. The container is sized for the 72px h1, not for body copy, so the paragraph takes the heading's measure.
**Fix:** `className="text-medium"` → `className="mx-auto max-w-md text-medium"`. `max-w-md` is the 560px (35rem) cap `cta-25` already uses on this page, which gives about 62 cpl at 18px. This changes nothing at 375, where the column is 338px. The left vignette, at x141–288, does not share a column with the copy, so it does not collide.
**Scope:** refactor

### 2. Keep your line length in check (p. 99) — "What Do You Need?" standfirst
**Where:** `components/sections/resource-assistance/layout-491.jsx:59`
**Seen:** At 991 the standfirst is **one centred line of 96 characters** across 768px. At 1440 it is 2 lines at about 48 cpl, which passes. At 375 it is 3 lines at 32 cpl.
**Why it breaks:** A 96-character line is well past the band, and on the tablet range it is the widest run of body copy on the page.
**Fix:** `className="text-medium"` → `className="mx-auto max-w-md text-medium"`, the same class as fail 1.
**Scope:** refactor

## Decisions — real improvements that need a design call

### Even flat designs can have depth (p. 167) — the hero and "What Do You Need?" are both white
The page runs white · white · MINT · white. The hero (`scheme-1`) and `layout-491` (`scheme-1`) touch. The boundary between them is carried only by 192px of white at lg (the hero's 112px bottom padding plus 491's 80px top padding). Moving 491 to mint would put mint directly against the mint FAQ, so no single class change fixes it without also re-sequencing the FAQ. The fix would cost a scheme re-plan for the route, which the comment in `faq-01.jsx:20-27` records as already decided.

### Labels are a last resort (p. 41) — "You get:" reads as a second body paragraph
`layout-491.jsx:48`. The deliverable line is the payoff of each block, but it renders at the same 16px/400 as the body above it. The book would either drop the label or make it clearly secondary. The Figma frame sets it this way as its own paragraph. Changing it, for example by wrapping the label in `font-semibold`, is a typographic call against the frame, not a repair.

### Not all elements are equal (p. 30) — eyebrow weight (site-wide, carried over)
"Resource Assistance" renders at 16px/**600** over an h1 at 400. Size still gives the h1 the win (72px / 44px). This was already logged on 2026-09-11 as a site-wide call covering 17 eyebrow occurrences. It is still open and is not re-litigated here.

## Overrides — book says X, brand says Y, no change

- **Balance weight and contrast** (p. 48). The h1, h2 and h3 compute to 400 despite `font-bold`, because `--font-weight-bold` is 400. Rank comes from size: 72/52/36 at lg and 44/40/24 below. No change.
- **Use shadows to convey elevation** (p. 158). The only shadow is the button ledge. No change.
- **Use fewer borders** (p. 206). The 1px `border-scheme-border` rules under each resource block and the accordion hairlines are the system. No change.
- **Decorate your backgrounds** (p. 198). Flat scheme colour only, with mint on the FAQ as the one break. No texture. No change.
- **Ditch hex for HSL / You need more colours / Define your shades** (pp. 119, 123, 129). N/A by construction. There is no raw hex in the four section files.

## Passes

**Starting from Scratch.** No raw hex, gradient, blurred shadow, inline style or `leading-*`/`tracking-*` override. The arbitrary values are the lg-only vignette placements (`top-[324.5px]` and similar, measured off the frame and decorative), the `max-w-[584px]` illustration box and `max-w-[400px]` on the CTA art. None of them is on the type or spacing scale.

**Hierarchy.** One winner per section: h1 72px against h2 52px at lg, and 44 against 40 below. The three resource titles are `<h3>` rendered at `text-h4` (36px / 24px), a correct split of visual rank from document rank. The FAQ questions sit a token step above their answers (22 vs 18 at lg, 18 vs 16 below), which resolves the question/answer tie without weight. There are no non-light schemes, so the grey-on-colour check is N/A.

**Layout and Spacing.** Every gap lands on the scale. Proximity holds in `layout-491`: standfirst to the first block is 72px, block to block is 49px, and heading to its own body is 16px (the same at 1440 and 991). The illustration is contained at 584px rather than stretched. No `em` units.

**Designing Text.** The type scale steps correctly at 992. Line-heights are the tokens, untouched (1.2 on h1/h2, 1.5 on body). Only the two self-hosted families are used. The resource bodies are left-aligned at 51–66 cpl at 1440 and 29–44 at 991. The hero copy runs 4 centred lines at 375, one over the book's three. It is a centred hero composition with a centred button, so left-aligning it would restyle the section, and it is not proposed.

**Colour.** Measured contrast is 20.06:1 on white and 17.91:1 on mint throughout.

**Images.** The hero vignettes are 295x313 and 360x282, drawn at 148x157 and 180x141, so exactly 2x. The illustration is a 2000px square drawn at 584/415/338px, scaled down and never up.

**Site mobile rule (text → media → text).** Pass. At 375, `layout-491` reads Funding (ends y523), then the illustration (y596–934), then the other two blocks (from y1006). The CTA's envelope is the 96px mark on the button line, not a 400px trailing image. The hero has no media below lg.

**Hero fold.** It fits at 1440x900 (nav 72 plus hero 685 = 757) and at 375x812 (64 plus 514 = 578).

*Not a design finding, noted for whoever edits next:* the docblock at `faq-01.jsx:11-16` still says the questions are `font-body font-[700]`. The code is correctly 400, per the CLAUDE.md ruling. A stale "700" comment is how the bold version gets restored on one page.
