# Refactoring UI audit — For Individual (`/for-individual`), 2026-09-29

**Verdict:** All five fixes from the 2026-09-24 hero audit held, and the hero still fits on the first screen. What's left is three small class changes lower on the page: shorten the timeline's line length, stop the video stack filling more than a whole tablet screen, and make the selected tab easier to see. There is also one removal (the timeline's two fade gradients) that has to be done on three pages together.

**Counts:** 16 pass · 4 fail · 8 override · 3 decision

Measured in a dedicated browser tab at 1440x900, 992x800, 991x800 and 375x812 (mobile emulation). All values are computed values read with `getComputedStyle`, `getBoundingClientRect` and text `Range` rects. The Browser pane was hidden for the whole session, so there are no screenshots; every finding comes from measured numbers. Device pixel ratio in the emulated tab is 1.

## The 2026-09-24 hero fixes: all held

| # | Fix | Now |
|---|---|---|
| 1 | Width cap on the `<p>`, not the container | Container 768px. At 992 the h1 is two lines (glyphs 127–850 / 249–728) and ends 45px above the top-right photo (h1 bottom 267, photo 08 top 312). |
| 2 | Next heading `lg:pt-12` | "Meet From Anywhere in Ohio" starts 112px below the strip at 1440 (798 → 910) and 24px above its paragraph, so there's no ambiguity. |
| 3 | Paragraph `max-w-md` | 560px, 3 lines of about 53 characters at 1440 and 992. At 992 the paragraph ends at x=757, 62px clear of the right column (819). |
| 4 | `-mt-[19px]` → `-mt-5` | `layout-134.jsx:108` is `lg:-mt-5`, and the header comment was rewritten. |
| 5 | `text-pretty` on the hero `<p>` | In place (`:91`). At 375 the paragraph is 4 lines of about 40 characters, with no single-word last line. |

**One-fold check:** the strip bottom is at y=798 at 1440x900 and 710 at 992x800. Nothing from the 09-24 decisions (no collage below 992, growth above 1440, baked-in radii, outline hero button, 44/40 below 992) is re-reported.

## Fails, in fix order

### 1. You don't have to fill the whole screen (p. 65) / Everything has an intended size (p. 181): the card stack fills more than a tablet screen (P2)
**Where:** `components/sections/for-individual-page/layout-395.jsx:140` (`w-full max-w-[606px]`)
**Seen:** Between 768 and 991 the grid is one column and the stack grows to its full 606x887 cap. At 991x800 the video card alone is 522x824 (y 1803–2627), taller than the 800px viewport, so on a tablet you can't see the whole video card and the text beside it on one screen. At 375 it is 338x494 and at 1440 522x824 beside the copy, and both are fine.
**Why it breaks:** On one column the stack is decoration taking up more height than the whole screen, between "Care Built Around Your Life" and the two services it introduces. It is the reason the section is 1,692px tall at 991 against 1,111 at 1440.
**Fix:** `max-w-[606px]` → `max-w-xs lg:max-w-[606px]` (25rem = 400px, so 400x585 below 992). Phones are unchanged (338 < 400). Desktop is unchanged.
**Scope:** refactor

### 2. Keep your line length in check (p. 99): the timeline step bodies run long (P2)
**Where:** `components/sections/for-individual-page/timeline-05.jsx:137` (`<p>{step.body}</p>`)
**Seen:** 688px wide at 16px from 768 up: Application 86 characters a line, Eligibility 88, Consent 87, Scheduling 63. At 375 they are 31–35.
**Fix:** `<p>` → `<p className="max-w-md">` (560px, about 70 characters). Do the same change in `for-business-page/timeline-05.jsx:88` so the shared rail stays identical.
**Scope:** refactor

### 3. Emphasize by de-emphasizing (p. 39) / Don't rely on colour alone (p. 146): the selected tab barely stands out (P3)
**Where:** `components/sections/for-individual-page/layout-504.jsx:59`, `:65`, `:71` (`border-0 border-b … data-[state=active]:border-scheme-text`)
**Seen:** Active and inactive tabs are both `rgb(0,10,8)`, weight 400, 16px. The only difference is a 1px bottom border (`rgb(0,10,8)` when active, transparent when not). On three short labels in a row, 1px is the entire signal that one of them is selected.
**Why it breaks:** Weight isn't available in this brand and there is no muted text token for the inactive labels, so the rule under the active one has to do all the work. At 1px it's too faint to.
**Fix:** `border-b` → `border-b-2` on all three triggers. 2px is the system's card and input border width, so nothing new is introduced. The inactive `border-transparent` keeps the labels from shifting.
**Scope:** refactor

### 4. Brand rule, no gradients: the timeline rail fades with two gradients (P3)
**Where:** `timeline-05.jsx:116` and `:119`
**Seen:** Same two `bg-gradient-to-b` fade masks as the For Business and Systems & Technology rails. CLAUDE.md permits two gradients, both on the homepage.
**Fix:** Delete `:116` and `:119`, together with the matching lines in `for-business-page/timeline-05.jsx:71,74` and `systems-&-technology/timeline-05.jsx`, so the three rails stay identical.
**Scope:** refactor

## Decisions: real improvements that need a design call

### Keep your line length in check (p. 99): "Care Built Around Your Life" runs to three lines from 992 to about 1340px
At 992 the display heading is 80px in a 416px half-column. "Around " measures 264px and "Your Life" 314px, so the frame's second line needs about 578px, which the column only reaches near 1340px. Below that it breaks "Care Built / Around / Your Life", a 288px-tall block with about 9 characters a line. The break still reads (the italic clause gets a line to itself), so this is not a fail. Fixing it means changing either where `--text-display` steps up or the column split, and both are token or layout calls.

### Not all elements are equal (p. 30): the CTA speaks to businesses
`cta-25.jsx` on this page reads "Ready to Unlock Your Growth Plan" / "Book your discovery call for personalized, actionable strategies tailored to your goals", the For Business copy, while its button opens the Peer Coach intake. The visual hierarchy is fine. The message it ranks first is for the wrong audience. That's a copy change for the client.

### Everything has an intended size (p. 181): the video is at 1.5x
The video is 800x1422, shown at 522x824 at desktop, so it's sharp at 1x and soft at 2x (it would need 1044px wide). A higher-resolution encode is an asset decision and weighs against the 0.47 MB budget the section's comment records.

## Overrides: book says X, brand says Y, no change

- **Not all elements are equal** (p. 30). The book would keep every heading below the page title. "Care Built Around Your Life" is `--text-display`, 80px at desktop and 48px below 992, against the h1's 72 / 44, so a section heading outranks the page title on both sides of 992. CLAUDE.md sanctions that token for this heading alone (`globals.css` [14]). No change.
- **Balance weight and contrast** (p. 48). Headings stay Playfair 400. No change.
- **Italic heading** (p. 48). "Your Life" uses `.font-heading-italic` (the real Playfair 500 italic, not a synthesised slant). No change.
- **FAQ questions** (p. 48). Lexend Deca 400 by the site-wide ruling, at 18/22px against 16px answers. No change.
- **Use shadows to convey elevation** (p. 158). Tab card, photos and video stay flat. The only shadow is the `0 3px 0 0` ledge on the buttons. No change.
- **Use fewer borders** (p. 206). The 2px tab card, the 1px outlines of the two decorative cards and the 1px rules between the two services all stay. No change.
- **Decorate your backgrounds** (p. 198). White, white, mint, white, mint, white, flat scheme colour only. The hero collage is photos in position, not a texture. No change.
- **Palette construction** (pp. 119–129). Fixed tokens. The service icons use `bg-caribbean-green-dark` as a mask fill, an existing token. No change.

## Passes

- **Personality / limit choices:** only Playfair and Lexend. No `text-[…]`, no raw hex outside comments, no `leading-*`/`tracking-*`, no blurred shadow utilities. The arbitrary values are the frame-derived collage and stack geometry and the 3px rail.
- **Hierarchy:** the h1 (72px) leads the hero. In the tab card the h3 (44px) outranks the body (16px). The service titles (36px) outrank their three body lines. The icons sit on the title's first line (`mt-1`).
- **Grey on colour:** N/A. White and mint only, no `opacity-*`.
- **Labels:** "Ohio Residents:" is a qualifier the h1 needs, and the pane taglines ("Video", "Schedule") are sentence-case eyebrows at 16px/600, 12–16px above their h3.
- **Spacing:** tagline to h1 16px, h1 to paragraph 24px, paragraph to button 32px. Section head to tabs 48px, tabs to card 40–48px. In `layout-395` the h2 sits 24px above its standfirst and 48px above the list, and each list item has 24–28px padding between its rules. No equidistant labels.
- **Hero one-fold:** see the table above.
- **Line length elsewhere:** hero 53 characters a line, "Meet From Anywhere" intro 54, card body 54, standfirst 65, service lines 35–69, CTA 44. FAQ intro is one line of 79 at desktop, one line only, so not a fail.
- **Type scale:** steps at 992 (h1 44→72, h2 40→52, display 48→80, h3 32→44, h4 24→36).
- **Line-height:** from tokens only.
- **Alignment:** centred copy is the section heads and the hero, none over 3 lines at desktop. The service list and card copy are left-aligned.
- **Contrast:** body on white 20.06:1, on mint 17.91:1. The CTA's white label on black is 20.06:1. No white on green.
- **Depth:** no run of more than two same-scheme sections. The strip's flat bottom edge separates hero from tabs at desktop.
- **Images:** hero photos at 2x (07-hands 930 → 437 at 1440), tab illustrations 1080px at 590 (1.83x), CTA envelope 924 at 400.
- **Mobile text-media-text rule:** `layout-395` reads heading, video, services at 375 (y 1780 / 2103 / 2668). `layout-504` reads heading, tabs, illustration, pane copy. The CTA puts its envelope on the button's row. The hero has no media below 992 (by the 09-24 decision). No section ends with a lone picture.
- **Motion:** the video honours `prefers-reduced-motion` in JS. Nothing scales or bounces on hover.
- **No horizontal scroll:** `scrollWidth` equals the viewport at 375, and the viewport minus the scrollbar at 1440.
