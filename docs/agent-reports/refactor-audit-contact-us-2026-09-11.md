> Saved verbatim from the `ui-refactor-auditor` agent's hand-back (2026-09-11, route `/contact-us`). The agent
> returned it in chat instead of writing the file, so it was recovered from the
> session transcript. Findings describe the code as it was on that date.

**Verdict:** The page's hierarchy is right — the white card on mint is the correct single focal point — but the form frame is sized with one fixed height for every screen, so at 375 the Submit button falls ~200px below the frame's bottom edge and at 1440 there is ~147px of dead white under it inside the card; fix that first, then the 20px tap targets.

**Counts:** 12 pass · 4 fail · 5 override · 3 decision

**Report file:** not written. A standing instruction in my environment forbids me writing report/summary/findings `.md` files and requires findings inline instead; that collides with the skill's `refactor-audit-<page>-<date>.md` step. The full report body is below in the skill's format — say the word and I'll commit it to `E:\uplift-path-website\refactor-audit-contact-us-2026-09-11.md` verbatim. The working tree is clean; I changed nothing.

Two process notes: the browser tab cap was hit, so `tabs_create` failed repeatedly and I worked in the shared `seed` tab (tab-5 turned out to be another agent's — it navigated out from under me mid-script). I restored `seed` to `http://localhost:3000/` and cleared its viewport emulation. Measurements are computed values at 1440x900 and 375x812, plus the Zoho form loaded standalone at the two widths the page renders it at.

---

# Refactoring UI audit — contact-us, 2026-09-11

## Fails, in fix order

### 1. Not all elements are equal (p. 30) — the Submit button is off-frame on a phone
**Where:** `E:\uplift-path-website\components\sections\contact-us\contact-panel.jsx:146-149`
**Seen:** `h-[58rem]` = 928px, and the iframe measures 928px at *both* viewports even though its column halves — 589px wide at 1440, 286px wide at 375. Loading the form on its own at those widths:

| Form column | Form content | Frame | Result |
|---|---|---|---|
| 589px (page at 1440) | Submit's bottom edge at **781px** | 928px | ~147px empty white inside the card |
| 286px (page at 375) | **1128px** (`scrollHeight` 1127, deepest element bottom 1128) | 928px | **~200px below the frame, Submit included** |

**Why it breaks:** the element the page exists to reach is not visible in its own frame at 375 — reachable only by scrolling inside a cross-origin iframe, which is exactly the inner-scroll-beside-an-outer-scroll the file's comment at line 143 says it is avoiding. That comment's premise ("the height is the whole form measured at this width") holds at desktop and is 200px short on mobile. At 1440 the same constant produces the opposite defect, dead white below the button inside a 2px bordered card — *You don't have to fill the whole screen* (p. 65) read backwards.
**Fix:** make the one constant two, the way `ZOHO_FORMS` already documents measured heights: `className="h-[71rem] lg:h-[52rem] rounded-none border-0"` — 1136px base (clears the measured 1128), 832px from `lg` (clears the ~800 the form ends at once the grid goes two-column at 992px). Re-measure the `md` single-column step before shipping; the card is wider there than at 375.
**Scope:** refactor

### 2. Supercharge the defaults (p. 192) — every link is a 20px tap target at 375
**Where:** `contact-panel.jsx:82-87`, `:90-95`, `:120-128`
**Seen:** at 375x812 the rendered anchor boxes are `info@upliftpathinc.com` 181x20, `+1 (513) 299-4553` 133x20, `Get directions` 134x24. Rows are 82px tall (`py-4`), but the padding is on the row, not the anchor, so none of it is clickable. 20px against a 44px minimum.
**Why it breaks:** the phone number is a `tel:` link whose only real audience is a phone, and it is the smallest hit area on the page. No new token needed — the space exists, it is on the wrong element.
**Fix:** add `inline-block py-3` to the two `<dd>` anchors (20 + 24 = 44px) and change the row on line 159 from `py-4` to `py-1`, so row height is unchanged. Add `py-2` to `Get directions` on line 124 (24 + 16 = 40px); it is already `inline-flex`.
**Scope:** refactor

### 3. Not all elements are equal (p. 30) — the least important link is the loudest
**Where:** `contact-panel.jsx:124` against `:84` and `:92`
**Seen:** `Get directions` computes to `font-weight: 500` plus `underline`. Email and phone compute to `font-weight: 400`, no underline, identical `16px` / `rgb(0, 10, 8)`, same column.
**Why it breaks:** the two links that are the point of a contact page are the silent ones, and the supplementary map link carries weight and a rule. With `--font-weight-bold` at 400 the headings cannot compete on weight, so a stray 500 on a tertiary link is the heaviest non-eyebrow text in the column — *Emphasize by de-emphasizing* (p. 39) in reverse.
**Fix:** drop `font-medium` from line 124. The chevron and underline are already the affordance. Do **not** add weight to email/phone instead — 500 is not a heading-face weight here, and three 500s is worse than none.
**Scope:** refactor

### 4. Avoid ambiguous spacing (p. 83) — the details list has as much air inside it as around it
**Where:** `contact-panel.jsx:80` (`mt-8 md:mt-10`) and `:111` (`mt-8`)
**Seen:** at 375, lead → `<dl>` = 32px, `<dl>` → map = 32px, and internal row-to-row rhythm is also 32px (`py-4` + `py-4`). At 1440 the outer gap is 40px against the same 32px inner — an 8px difference.
**Why it breaks:** intro copy, the three-row contact block and the map read as one evenly spaced column rather than three groups. The 1px hairlines partly rescue it, which is why this is fourth and not first, but the measurement is a tie.
**Fix:** line 80 → `mt-12 md:mt-12` (48px), line 111 → `mt-12`. Both existing scale steps. Do **not** tighten `py-4` instead — that is the padding fail #2 needs.
**Scope:** refactor

## Decisions — real improvements that need a design call

### Accessible doesn't have to mean ugly (p. 142) — the Submit button is white on teal, 1.96:1
Measured on the Zoho form itself: `background-color: rgb(7, 209, 167)`, `color: rgb(255, 255, 255)`, 15px Montserrat, 8px radius, 469x46 at desktop / 206x42 at 286px. White on `#07D1A7` computes to **1.96:1** — numerically the exact pairing `CLAUDE.md` forbids, on the page's primary control. The same frame also brings a third font family (Montserrat), 1px input borders at 4px radius against the brand's 2px/12px, and 13 inputs whose required fields carry a bare `*` with no second signal (4 asterisk marks, zero `[required]` attributes — *Don't rely on colour alone*, p. 146).
**Cost:** either configure the Zoho form theme (button colour, font, radius, border width) to the brand tokens — Zoho-side, no code in this repo — or rebuild the form natively against `components/ui/` and post to Zoho. The first gets most of it cheaply; only the second gets the 2px/12px/no-focus-ring input treatment and the button ledge. Nothing in `contact-panel.jsx` can move this.

### Not all elements are equal (p. 30) — the eyebrow outweighs the h1
`contact-panel.jsx:55` renders "Contact" at 16px / weight **600**. The `h1` below is **400**. At 375 the eyebrow, the lead paragraph and every `<dd>` value all compute to 16px, so the eyebrow is distinguished only by being the heaviest text on the page. Size still gives the `h1` the win (44px / 72px), so hierarchy is not broken — but the loudest weight is on the least important line.
**Cost:** the fix is one class (`text-small`, keeping `font-semibold`), but `mb-3 font-semibold` is the site-wide Relume eyebrow — **17 occurrences** across `components/sections/`. Site-wide call or nothing.

### Labels are a last resort (p. 41) — "Contact" above "Start here" on /contact-us
Route, nav item, page title and eyebrow all say the same word. Same site-wide scope, and removing it is a copy change rather than a class change, so out of refactor scope.

## Overrides — book says X, brand says Y, no change

- **Use fewer borders** (p. 206). Measured card `border-width: 2px`, rows `border-bottom: 1px rgb(0, 10, 8)`. Borders are the structural system. No change.
- **Use shadows to convey elevation** (p. 158). Card measures `box-shadow: none`. Correct — the only shadow here is the button ledge. No change.
- **Balance weight and contrast** (p. 48). `h1` computes 400 despite `font-bold`. Working as designed. No change.
- **Decorate your backgrounds** (p. 198). Measured flat `rgb(220, 248, 242)`, one scheme, no texture. Matches the 2026-09-03 ruling. No change.
- **Ditch hex for HSL / You need more colours / Define your shades** (pp. 119, 123, 129). N/A by construction; no raw hex in the section.

## Passes

**Starting from Scratch.** Grep of the section: no raw hex, no gradient, no blurred shadow, no inline style, no `leading-*`/`tracking-*` override. The one arbitrary value is `h-[58rem]` — fail #1 on behaviour, not on being arbitrary; the file has precedent for measured iframe heights.

**Hierarchy.** The white card is the only white surface on a mint ground and is unambiguously the focal element at both viewports — the file's stated intent, and it holds. `h1` 72px at 1440, 44px at 375, clear of everything else, one line at 375 with `text-balance` inert. Labels correctly subordinate: `<dt>` 14px/600 against `<dd>` 16px/400. One `h1`, no heading used for sizing.

**Layout and Spacing.** Every gap lands on the scale — 12/16/20/24/32/40/64px measured, no off-step values. Grid gap 64px at 1440, section padding 56px at 375 / 64px at 1440. The left column stops at 727px rather than stretching to the card's 996px: *You don't have to fill the whole screen* (p. 65), correctly applied. No `em`.

**Designing Text.** Lead runs **61 characters per line** over 3 lines at 1440 (45–75 band). Line-heights are the tokens untouched: `h1` 86.4px at 72px (1.2), body 27px at 18px (1.5). No third family in our markup. Nothing long-form centred. `sm:items-baseline` aligns the 14px label to the 16px value on the baseline, not the box centre (p. 102).

**Colour.** `rgb(0, 10, 8)` on `rgb(220, 248, 242)` throughout, far above AA. The three `opacity-70` hovers are on a light scheme with dark text and are transitions, not resting de-emphasis — not the p. 36 problem.

**Depth.** *Even flat designs can have depth* (p. 167) satisfied the brand's way: mint section against white navbar and white footer, then white card against mint. No two adjacent sections share a scheme.

**Images.** Map is a responsive iframe, 160px tall in a 2px `rounded-image` frame; no raster scaled off its intended size, so p. 181 does not bite.

---

**Top three fails:** (1) the Zoho frame's single `h-[58rem]` clips the Submit button by ~200px at 375 and leaves ~147px of dead white at 1440; (2) email, phone and directions links are 20–24px tall tap targets at 375 because the row's `py-4` is on the row and not the anchor; (3) `Get directions` is weight 500 + underline while the email and phone links it outranks are plain 400.
