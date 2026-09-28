# Refactoring UI audit — systems-technology, 2026-09-29

**Verdict:** Two sections undercut their own message. In the timeline, the step numbers ("01"–"05") are bigger than the step names. In "What We Do", one of four equal services is set as a lead paragraph above the other three. Fix those two first. Then give "What We Do" the site's text → picture → text phone order, and remove the timeline's two small gradient fades and a hidden backdrop blur, which break the brand's flat-colour rule.
**Counts:** 19 pass · 5 fail · 5 override · 3 decision

Measured in the browser at 1440x900, 991x900 and 375x812, reloading after each resize. Computed values only.

## Fails, in fix order

### 1. Not all elements are equal (p. 30) — the step numerals outrank the step titles
**Where:** `components/sections/systems-&-technology/timeline-05.jsx:67, 78, 89, 102, 113`
**Seen:** "01"…"05" are `text-h3`: **44px** at 1440 and **32px** at 991 and 375. The titles under them ("Map", "Design", "Build in Phases", "Train", "Hand over") are `text-h5`: **28px** at 1440 and **20px** below. Both are Playfair 400 and the same colour, so the numeral is 1.6x the title at every width. It is also only 8px short of the section h2 at 1440 (52px).
**Why it breaks:** The ordinal is the least informative thing in each step, since the vertical track already says "sequence". Yet it is the loudest. Weight is not available (400 on purpose), so the reader's eye lands on five numbers before five verbs.
**Fix:** On all five, `text-h3` → `text-h6`. That makes the numeral 22px at lg and 18px below, one step under the title at both widths, and keeps `mb-3 md:mb-4`. The `<h3>`/`<h4>` element choice is the seo-auditor's to judge. This fix changes size only.
**Scope:** refactor

### 2. Not all elements are equal (p. 30) — one of four parallel services is promoted to a lead
**Where:** `components/sections/systems-&-technology/layout-564.jsx:57-60` against `:61-81`
**Seen:** "Map and automate — …" is a `<p>` at `text-medium` (**18px** at 1440, 53 cpl) above a `list-disc` `<ul>` whose three siblings ("Select and implement —", "Report and measure —", "Train and hand over —") are **16px** bulleted items. All four share the same "Verb and verb — sentence" shape.
**Why it breaks:** Size and position rank the first service above the other three, but the copy presents them as equals. A reader sees an intro followed by three details, not four offerings.
**Fix:** Delete the `<p>` at 57-60 and add its text as the first item, `<li className="my-1 self-start pl-2"><p>Map and automate — …</p></li>`, at the top of the `<ul>`. The h2's `mb-5 md:mb-6` then sets the heading-to-list gap. Nothing else changes.
**Scope:** refactor

### 3. Site mobile rule — "What We Do" is all text, then one picture
**Where:** `components/sections/systems-&-technology/layout-564.jsx:7, 15, 37`
**Seen:** Below `lg`, `order-last` puts the illustration under all of the copy. At 375 the h2, lead and three bullets end around y524, and then the image (375x320) follows at y604. At 991 the image is 976x416 at y504, after the copy.
**Why it breaks:** This is the text-then-lone-picture stack the site's phone rule forbids, and at 991 it holds for the whole tablet range too.
**Fix:** Use the `resource-assistance/layout-491` pattern, which needs three grid children instead of two.
- (a) A `<div>` holding the sparkle and the `<h2>`, with `mx-[5%] lg:col-start-2 lg:row-start-1 lg:self-end lg:mr-[5vw] lg:ml-20`.
- (b) The image `<div>`, with `order-last … lg:order-first` replaced by `lg:col-start-1 lg:row-span-2 lg:row-start-1`.
- (c) A `<div>` holding the `<ul>`, with `mx-[5%] lg:col-start-2 lg:row-start-2 lg:self-start lg:mr-[5vw] lg:ml-20`.
- Carry `sm:max-w-md md:justify-self-start` onto (a) and (c). Add `pb-16 md:pb-24 lg:pb-0` to the section, because the list, not the image, is now last on phones.

Phones then read heading → figure → list, the homepage Three Steps precedent. Do fail 2 first, so the lead paragraph is already inside the list that moves.
**Scope:** refactor (existing classes, one precedent)

### 4. Keep your line length in check (p. 99) — timeline bodies run 86 characters
**Where:** `components/sections/systems-&-technology/timeline-05.jsx:66, 77, 88, 101, 112`
**Seen:** The step column is **688px** at both 1440 and 991. At 16px Lexend Deca, a full line is **about 86 characters**. Step 05 measures 86 cpl over two full lines, and the other four's first lines run the same width. At 375 the column is 290px, which passes.
**Why it breaks:** The copy is over the 75 limit on both sides of 992.
**Fix:** On each step wrapper, `mt-4 ml-4 flex flex-col md:ml-12` → `mt-4 ml-4 flex max-w-md flex-col md:ml-12`. That caps it at 560px, about 70 cpl, and is inert at 375.
**Scope:** refactor

### 5. Limit your choices (p. 24) / brand: no gradients, no backdrop blur — the timeline carries both
**Where:** `components/sections/systems-&-technology/timeline-05.jsx:57`, `:60` (gradients) and `:20` (blur)
**Seen:** Two 4x64px `linear-gradient` fades compute from `rgb(220, 248, 242)` to transparent at the top and bottom of the track. Every step dot computes `backdrop-filter: blur(64px)` on a 15px circle. CLAUDE.md permits exactly two gradient/texture exceptions, both homepage-only. The design guide says "No backdrop blur anywhere".
**Why it breaks:** These are straight brand violations from the Relume timeline template. The blur has no visible effect: it sits on a 15px dot over a flat mint ground. The fades are the only ramps on the route.
**Fix:** Delete the two `<div>`s at lines 57 and 60. Remove `backdrop-blur-3xl` from line 20. The track then ends square, which matches the flat system. The `top-[-50vh]` background mask at line 61 already handles the sticky bar's entry.
**Scope:** refactor

## Decisions — real improvements that need a design call

### Even flat designs can have depth (p. 167) — two white-on-white joins
The route runs white · white · MINT · white · white. Hero and `layout-564` touch, and so do the FAQ and the CTA. The comment at `timeline-05.jsx:34-44` records that `layout-564` was put back to white **by request**. The CTA's white is the documented v3 reversal. Undoing either is a design call, not a repair.

### Supercharge the defaults (p. 192) — browser disc bullets in "What We Do"
`layout-564.jsx:61` computes `list-style-type: disc`. A brand mark, such as a 24px Material Symbol `check` masked in the scheme colour, is on-system. It needs a choice of glyph and a small list-item component, so it is not a class swap.

### Not all elements are equal (p. 30) — eyebrow weight (site-wide, carried over)
"Systems & Technology" renders at 16px/600 above a 400 h1. This is the same site-wide call logged 2026-09-11, and it is still open.

## Overrides — book says X, brand says Y, no change

- **Balance weight and contrast** (p. 48). Every heading computes to 400. Rank is carried by size. No change.
- **Use shadows to convey elevation** (p. 158). Only the button ledge. The step dot's `shadow-[0_0_0_8px_var(--color-scheme-background)]` computes `0 0 0 8px rgb(220, 248, 242)`: zero blur, zero offset, in the section's own background colour. It is a knock-out gap between the dot and the track, not elevation, and draws nothing visible as a shadow. No change.
- **Use fewer borders** (p. 206). Accordion hairlines. No change.
- **Decorate your backgrounds** (p. 198). Flat schemes only. The mint timeline is the one break. No change.
- **Ditch hex for HSL / You need more colours / Define your shades** (pp. 119, 123, 129). N/A by construction. There is no raw hex.

## Passes

**Starting from Scratch.** No raw hex, blurred `shadow-*` or `leading-*`/`tracking-*` override. The remaining arbitrary values are the lg-only vignette and sparkle placements (frame-measured and decorative), the illustration's box heights `h-[26rem]`/`min-h-[32rem]` (documented as the QA overflow fix), and the timeline track geometry (`w-[3px]`, `h-[50vh]`). None is on the type or spacing scale.

**Hierarchy.** The h1 (72/44) clears every h2 (52/40). The FAQ questions sit a step above their answers (22 vs 18 at lg, 18 vs 16 below). No non-light schemes, so grey-on-colour is N/A. The hero sub-copy's echo of the heading was already removed (documented at `layout-134.jsx:19-22`).

**Layout and Spacing.** Scale steps throughout. In the timeline, the numeral is 16px above the title, the title 16px above the body, and step-to-step spacing is 96px, so each step groups cleanly. `layout-564`'s text column stops at 560px rather than filling the half. No `em` units.

**Designing Text.** The scale steps at 992. The hero body is one line of 75 characters at 1440 and 991, exactly at the limit, and 38 cpl at 375. Line-heights are the tokens. Two families only. Nothing long-form is centred. The timeline and "What We Do" are left-aligned.

**Colour.** 20.06:1 on white and 17.91:1 on mint.

**Images.** The envelope (277x254 at 139x127), monitor (291x272 at 146x136) and sparkle (294x194 at 147x97) are all exact 2x. The standing figure (998x1846) is `object-contain` in 713x512 at lg, 976x416 at 991 and 375x320 at 375, so it is never cropped and never scaled up.

**Motion.** The dot fade and the sticky progress bar are opacity and position only. Nothing bounces or scales.

**Hero fold.** It fits at 1440x900 (72 + 658 = 730) and at 375x812 (64 + 466 = 530).

*Not a design finding:* the docblock at `faq-01.jsx:11-16` still says `font-body font-[700]`. The code is correctly 400, per the CLAUDE.md ruling.
