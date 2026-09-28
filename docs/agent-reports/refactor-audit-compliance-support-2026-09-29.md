# Refactoring UI audit — /compliance-support, 2026-09-29

**Verdict:** One thing on this page is visibly broken, so fix it first. Between 992 and about 1300px, the hero's two line-art pictures (the letter and the globe) sit on top of the headline and the body copy. The fix is already written on the Advisory page. After that, the "Where are you right now?" section breaks the phone rule (all its text, then one lone picture). Its five quoted situations also need their quote lines set apart from the answers. Everything is a class or markup change.

**Counts:** 16 pass · 6 fail · 7 override · 4 decision

Measured in a dedicated tab at 1440x900, 1024x768 and 375x812, with a reload after every resize. Computed values only. The page was not edited.

---

## Fails, in fix order

### 1. Not all elements are equal (p. 30) — hero art collides with the H1
**Where:** `components/sections/compliance-support/layout-134.jsx:41`, `:46`, `:51`
**Seen:** the vignettes switch on at `lg` (992) at fixed offsets from the viewport edges (`left-[84px]`, `right-[116.5px]`), while the text column is centred and slides outward as the viewport narrows. At **1024** the letter's box overlaps the H1's line boxes by **185px** and the body copy by **191px**. The globe overlaps two H1 lines by **84px and 136px**. At 1440 they clear, but the letter by only **17px**. This is the worst hero collision of the three service pages, because this letter is the largest vignette on any of them (237.5x222).
**Why it breaks:** decoration is drawn over the page title. The Advisory hero had exactly this defect, and its comment (`advisory-services/layout-134.jsx:36-60`) records the fix.
**Fix:** copy Advisory's anchoring:
- line 41: `lg:block` → `min-[1280px]:block`;
- line 46: `left-[84px]` → `right-[calc(50%+416px)]`;
- line 51: `right-[116.5px]` → `left-[calc(50%+416px)]`.

Each picture then sits 32px outside the `max-w-lg` column at every width it shows. At 1440 the letter lands at 66–304 (frame 84–322) and the globe at 1136–1293 (frame 1167–1324). At 1280 the letter's left 13px run off canvas inside the section's `overflow-hidden`, a trade Advisory already accepted for its planes. Leave the `top-[...]` values alone.
**Scope:** refactor

### 2. Site mobile rule (text, then media, then text) — "Where Are You Right Now?" ends on a lone picture
**Where:** `components/sections/compliance-support/layout-16.jsx:74-125`
**Seen:** at 375 the section reads **T×6 → IMG(338)**: the h2, the lead situation, the four listed situations, then the 338x338 illustration alone. The section is 1362px tall on a phone.
**Why it breaks:** this is the site's phone rule. It is the same defect as Advisory `layout-19` and AI `layout-01`, and it has the same fix as the already-corrected Advisory `layout-28`.
**Fix:**
- Split the text `<div>` (line 75) into two children. Child 1 is the h2 and the `<p>` at line 79, with `md:col-start-1 md:row-start-1`. The image `<div>` (line 118) gets `md:col-start-2 md:row-span-2 md:row-start-1`. Child 3 is the `<ul>` at line 85, with `md:col-start-1 md:row-start-2`.
- Add `md:gap-y-0` to the grid on line 74, and change the `<p>`'s `mb-5 md:mb-6` to `md:mb-6`.

The phone then reads heading and first situation, illustration, the other four. Desktop is unchanged.
**Scope:** refactor

### 3. Emphasize by de-emphasizing (p. 39) — the five quotes don't read as a scannable list
**Where:** `components/sections/compliance-support/layout-16.jsx:55` and `:80`
**Seen:** each situation is a quoted line ("We have findings.") on its own line, followed by the answer. Both compute to the same thing: Lexend Deca **16px / 400**, same colour, same line height (`<li>`s at 16px, and the lead at 18px on desktop, 16px on a phone). The quote is the part a reader scans for: "which of these am I?". It is distinguishable only by its quotation marks.
**Why it breaks:** five peers, each with a label and a body, and nothing separates label from body. Weight is still available here. Only headings are pinned to 400 (`--font-weight-bold`); Lexend 600 is self-hosted and is the eyebrow weight the site already uses.
**Fix:** `<span className="block">` → `<span className="block font-semibold">` on line 55 (the `Situation` component) and on line 80 (the lead). The answers stay 400. Do not use `font-bold`: it resolves to 400.
**Scope:** refactor

### 4. Align with readability in mind (p. 111) — FAQ questions centre when they wrap
**Where:** `components/sections/compliance-support/faq-01.jsx:48`, `:57`, `:66`
**Seen:** at 375 "Do you write our policies or coach us to write them?" wraps to 2 lines, starting **6px and 80px** from the trigger's left edge. The trigger computes `text-align: center`, the button's user-agent default. The answer below is left-aligned.
**Why it breaks:** a ragged left edge on a left-aligned list.
**Fix:** add `text-left` to each `AccordionTrigger` className, making it `text-left text-large font-body font-[400] md:py-5`. **Site-wide:** none of the twelve `faq-01.jsx` files sets it. Make the change on all of them at once, per `globals.css` [13].
**Scope:** refactor

### 5. Align with readability in mind (p. 111) — the CARF card centres a 5-line paragraph on a phone
**Where:** `components/sections/compliance-support/layout-134.jsx:103`
**Seen:** below `sm` (480) the card is `items-center text-center`. At 375 its 14px body ("An independent accreditor surveyed…") centres over **5 lines** (105px), and so do the title and link. From 480 up it goes to a row, left-aligned.
**Why it breaks:** long copy is never centred. Three or more centred lines lose the left edge the eye returns to.
**Fix:** on line 103, `items-center` → `items-start sm:items-center`, and `text-center sm:text-left` → `text-left`. The seal then sits left above left-aligned copy on a phone. The row layout from `sm` up is unchanged.
**Scope:** refactor

### 6. Supercharge the defaults (p. 192) — the "Verify on carf.org" link is a 21px tap target
**Where:** `components/sections/compliance-support/layout-134.jsx:124`
**Seen:** at 375 the anchor measures **142x21**, against a 44px minimum. It is also `font-medium` (500), the heaviest weight in the card after the 600 title, on its least important line. That is the same stray-500 pattern the 2026-09-11 contact-us audit found on "Get directions". The seal link above it is 80x80 and fine.
**Why it breaks:** the link exists to be tapped on the one route whose whole subject is accreditation, and its hit area is smaller than a fingertip.
**Fix:** on line 124, `mt-3` → `py-3` (21 + 24 = 45px). The 12px above it stays visually the same, now carried by padding. Drop `font-medium`; the underline and chevron are the affordance.
**Scope:** refactor

---

## Decisions — real improvements that need a design call

### Not all elements are equal (p. 30) — one situation is dressed as an intro
"We are brand new." is the first of five peer situations, but it is set as a lead `<p>`: `text-medium` (18px at ≥992), no icon, outside the `<ul>`. The other four are 16px list items, each with an icon. So the section reads as an intro plus four options, not five options. **Cost:** move it into the `<ul>` as a fifth `Situation`. That needs an icon chosen from `/public/svgs`; `icon-power` or `icon-commit` exist, so no new asset. Picking one is a design call, and the frame draws it this way.

### Everything has an intended size (p. 181) — the two portraits are upscaled
In "Led by" the portraits are 661x441 and **512x341** sources rendered at **592x333** at 1440, so the second is stretched 1.16x at 1x and about 2.3x on a 2x display. At 1024 (406px) they hold at 1x. **Cost:** larger source files (new assets), or cap the column. The import note in `layout-615.jsx:13-17` already questions whether these portraits are final (a content question for qa-inspector), so settle that first.

### Hero fits in one fold — the CARF card pushes it 11px past a 900px screen
At 1440x900 the hero's bottom is at **911px**; Advisory's is at 757 and AI's at 671. The overflow is the CARF card, which was added by explicit request below the hero copy. The primary button is well inside the fold, and the one-fold rule is only a hard pass/fail on the homepage. So this is noted, not failed. **Cost:** tightening the card's `mt-10 md:mt-12` or `p-8` gains 12–16px. Whether the card belongs in the fold at all is the actual question.

### Align with readability in mind (p. 111) — the hero sub-copy is centred on a phone
This is the site-wide `layout-134` pattern; see the Advisory report. It is a site-wide call.

---

## Overrides — book says X, brand says Y, no change

- **Balance weight and contrast** (p. 48). Headings compute to 400. Working as designed. (Fail 3 is about body copy, where weight *is* available.)
- **Use shadows to convey elevation** (p. 158). The CARF card has a 2px border, `rounded-card` and no shadow, which is the brand's card rule. The only shadow is the hero button's `0 3px 0 0` ledge.
- **Even flat designs can have depth → solid shadows** (p. 167). The CTA's black button drops its ledge via `.btn-dark`, which is deliberate.
- **Use fewer borders** (p. 206). "Led by" uses a 1px top rule, a 1px vertical divider and 1px row rules between the people on a phone, all hairlines in `border-scheme-border`. This is the system's structure. No change.
- **Decorate your backgrounds** (p. 198). Flat white and mint.
- **Ditch hex for HSL / You need more colours / Define your shades** (pp. 119, 123, 129). N/A. No raw hex.
- **FAQ question weight.** Lexend 400 by explicit instruction ([13]); size carries it (22 against 16 at ≥992).

---

## Passes

**Starting from Scratch.** No gradient, blurred shadow, raw hex, `leading-*`/`tracking-*` or `text-[...]`. The one inline style is the icon mask (the documented treatment). `opacity-70` appears only as a hover state on the two CARF links in `scheme-1`. It is a light scheme, so this is not grey-on-colour.

**Hierarchy.** h1 is 72 against h2 at 52 (≥992) and 44 against 40 (375). In the CARF card the title is 16px/600, the body 14px and the link 14px, a clear three-step order. "Led by" names are 44px (32 on a phone) above 16px roles. The section h2 is a label ("Led by"), so letting the names win is right.

**Layout and Spacing.** Every gap on the scale. Name to role is 24px against image to name at 32px (20 against 24 on a phone), so each name groups with its role. `layout-615` runs at 80px padding against 112 elsewhere, which is a cross-page note, not a fail.

**Designing Text.** The scale steps at 992. Measures: hero 54 cpl (1440), situations 42–52 cpl (1440), roles 47–60, CARF body 55. Two families. No `em`. `text-small` is 14px both sides of 992.

**Working with Colour.** 20.06:1 on white, 17.91:1 on mint. No white on green. The CARF seal renders at its native colours, 288px source at 96px, so crisp at 2x.

**Creating Depth.** W M W M W. No two adjacent sections share a scheme.

**Working with Images.** The `layout-16` illustration is 2400x2400 at 600. The hero vignettes are 475x444 and 313x306 at half size, so 2x-crisp.

**Finishing Touches.** Situation icons are palette-tinted masks, not default bullets. The CARF card uses the brand's own card border as its accent.

**Mobile rule.** `layout-134` (text → seal → text), `layout-615` (T → IMG → T → IMG → T) and `cta-25` pass. Only `layout-16` fails (fail 2).

---

## Across the three service pages

See the comparison table in `refactor-audit-advisory-services-2026-09-29.md`. On this page: the hero vignettes use the edge-pinned pattern Advisory already fixed, with the largest overlap measured on any of the three (fail 1). The text-then-lone-picture phone defect is shared with Advisory `layout-19` and AI `layout-01` (fail 2). The FAQ alignment defect is shared with Advisory and every other `faq-01` on the site (fail 4). It is the only service hero that doesn't fit a 1440x900 fold (decision).
