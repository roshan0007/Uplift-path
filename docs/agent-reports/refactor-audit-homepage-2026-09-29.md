# Refactoring UI audit — `/` (homepage), 2026-09-29

**Verdict:** Most of the 2026-09-10 audit has been fixed and the page is on-system. The one hard failure is the hero: it fits one fold at 1440×900 but not at 1366×768, the most common laptop screen. After that come a label that sits equally far from the text above and the cards below, a section heading with loose leading, and lead-ins that run past a comfortable line length. All of them are class changes.

**Counts:** 27 pass · 7 fail · 6 override · 5 decision

Measured with `javascript_tool` (computed styles, not source) at **1440×900** and **1366×768** (≥992px), **991×900** (<992px), and **375×812** (mobile). The page was reloaded after every resize: resizing without a reload left stale computed values in this browser, e.g. the FAQ trigger read 22px at 991 until reloaded (true value 18px). Nothing was changed except this file and the index row.

### Since 2026-09-10 (checked, now PASS)
The h1 is back above every h2 at every width (44/52/60/70 against h2 40/52). The FAQ question is one step larger than its answer (18 vs 16 on mobile, 22 vs 18 on desktop). Step titles are `text-h5`. Justification and `lg:leading-[1.21]` are gone from the step bodies. `testimonial-10` is `scheme-mint`. The `layout-237` heading gaps are 24/12. Carousel dots carry shape. The `layout-237` icons share one hue. `--text-small` is 14px flat. CARF.webp is now 288px for an 80px slot.

---

## Fails, in fix order

### 1. Hero must fit one fold (brand ruling 2026-09-03) — fails at 1366×768 · **P1**
**Where:** `components/sections/home/header-104.jsx:37`, `:104`, `:108`, `:126`
**Seen:** At 1440×900 it passes: cards end at y=844, scroll cue 852–892. At **1366×768** it fails: the "Start Here" rows end at **y=817**, the cards at **831** and the cue at **879**, against a 768px fold. The cards fall 63px short and the cue 111px.
**Why it breaks:** One-fold fit is a hard pass/fail on this page, and 1366×768 is the laptop size this audience is most likely to have. The card CTA is the part that falls off.
**Fix:** Three class changes, about 56px back:
- `header-104.jsx:37`: `lg:pt-[3.6875rem]` → `lg:pt-10` (saves 19px).
- `header-104.jsx:126`: `aspect-[5/2]` → `aspect-[5/2] lg:aspect-[3/1]`. The band is 224px at a 560px card; 3:1 makes it 187px (saves 37px). The illustrations are `object-contain`, so nothing is cropped.
- Finding 2's spacing swap nets 0px.

That brings the CTA row to about y=761, inside the fold. The cue would still sit below it, which makes full clearance a DECISION.
**Scope:** refactor (partial). Full fit including the cue is a decision.

### 2. Avoid ambiguous spacing (p. 83) — lead-in floats between blocks · **P2**
**Where:** `components/sections/home/header-104.jsx:104` (lead-in `<p>`), `:108` (card grid)
**Seen:** "Where Would You Like to Start?" sits **24px** below the paragraph above it and **24px** above the cards it introduces. It's equidistant at 1440, 991 and 375.
**Why it breaks:** The comment at `:99-103` says it is meant as the question the cards answer, but equal gaps attach it to neither.
**Fix:** `mt-6 … lg:mt-6` → `mt-8` on `:104`, and `mt-6` → `mt-4` on the grid at `:108`. That's 32 above and 16 below, net 0px of fold.
**Scope:** refactor

### 3. Line-height is proportional (p. 105) — 50px heading at 1.333 · **P2**
**Where:** `components/sections/home/layout-423.jsx:64` (h2), `:135` (step h3s)
**Seen:** At 1440 the h2 is **50px / 66.65px** (1.333). Every other h2 on the page is 52/62.4 (1.2). The step h3s are 28px / 37.3px (1.333, where the token is 1.4).
**Why it breaks:** Large type wants tighter leading. `header-104.jsx:55-59` already removed the same `lg:leading-[1.333]` from the h1 for this reason, calling it "the wrong direction".
**Fix:** Delete `lg:leading-[1.333]` from `:64`. `text-h2`'s own 1.2 then applies, giving 60px. Delete `leading-[1.333]` from `:135` so `--text-h5--line-height` applies. Keep `lg:text-[3.125rem]`, which is documented.
**Scope:** refactor

### 4. Keep your line length in check (p. 99) — lead-ins and step list overrun · **P2**
**Where:** `home/layout-237.jsx:54`, `home/layout-254.jsx:18`, `home/faq-01.jsx:61`, the hero paragraph `home/header-104.jsx:92` below lg, and the step list `home/layout-423.jsx:101`
**Seen:** Centred lead-ins inside the `max-w-lg` (768px) wrapper:
- 1440: **87–88 characters per line** at 18px.
- 991: **97–99** at 16px.
- The hero paragraph is 97 at 991 (and 79 at 1440, where its `lg:max-w-[53.5rem]` is documented).
- The three step bodies run **100–111** at 768–991, because the `<ol>` spans the full single-column container there.

At 375 everything is 40–45 (PASS).
**Why it breaks:** The readable band is 45–75 characters. Centred text makes long lines worse, because the eye has no fixed left edge to return to.
**Fix:**
- Add `mx-auto max-w-md` (35rem = 560px, about 62–72 characters) to each lead-in `<p>` listed.
- On `header-104.jsx:92`: `max-w-lg` → `max-w-md`, leaving the `lg:max-w-[53.5rem]` alone.
- On `layout-423.jsx:101`: add `max-w-md lg:max-w-none` to the `<ol>`.

The heading wrappers keep `max-w-lg`.
**Scope:** refactor

### 5. Everything has an intended size (p. 181) — lightbulb dominates mobile · **P2**
**Where:** `components/sections/home/layout-423.jsx:97`
**Seen:** At 375 the decorative lightbulb renders **204×538px**, which is 66% of an 812px screen, between the heading and the steps. At 991 it is 204×534.
**Why it breaks:** A decorative figure outweighs the three steps it illustrates. The mobile order (text, then image, then text) is correct. The problem is the image's size. The 2026-09-29 mobile pass shrank the CTA envelope for the same reason (`cta-25.jsx:56-59`).
**Fix:** `max-w-[204px]` → `max-w-32 lg:max-w-[204px]`. That gives 128px wide and about 337px tall on phones, unchanged at lg.
**Scope:** refactor

### 6. Line-height is proportional (p. 105) — hero body at 1.21 · **P3**
**Where:** `components/sections/home/header-104.jsx:92`, `:104`
**Seen:** At 1440 the hero paragraph is **22px / 26.62px (1.21)** over 2 lines of 79 characters, and the lead-in is 22/26.62. `--text-large` is exactly 22px at ≥992px with a 1.5 line-height.
**Why it breaks:** Body copy at a long measure wants looser leading, not tighter.
**Fix:** `lg:text-[1.375rem] lg:leading-[1.21]` → `lg:text-large` on both lines. Same size, now on the scale. **This costs about 19px of fold**, so apply it only after finding 1.
**Scope:** refactor

### 7. Choose a personality / consistency (p. 17) — one icon off-hue · **P3**
**Where:** `components/sections/home/layout-254.jsx:30`
**Seen:** Four parallel audience blocks. Icon 1 is `text-caribbean-green-dark` and icons 2–4 are `text-viking-dark`.
**Why it breaks:** This is the same defect `layout-237.jsx:62-65` fixed. A hue difference across a parallel set implies a distinction the content doesn't have.
**Fix:** `text-caribbean-green-dark` → `text-viking-dark`.
**Scope:** refactor

---

## Decisions — real improvements that need a design call

### Hero one-fold — the scroll cue (p. 65 / brand ruling)
Even after finding 1, the cue lands about 40px below a 768px fold. Clearing it means changing the card composition (image band beside the text instead of above it, or a smaller card). That's a layout change: one section, needs sign-off.

### Hero one-fold on phones
At 375×812 the hero is **1,125px** tall. h1, paragraph, lead-in and card 1 show; card 2 starts at y≈900. Stacked cards can't fit one phone screen without a different selector design (e.g. two compact rows with no illustration). Cost: a new mobile composition.

### Type scale — the h1 ladder and the 50px h2 (p. 24, p. 88)
`header-104.jsx:69` uses 44/52/60/70px arbitrary steps, and `layout-423.jsx:64` uses 50px. Both are documented trades against the Figma. There is no 60px or 70px token, so putting them on the scale means adding a token or accepting `text-h1` (72px) at lg. No action unless a token is wanted.

### Tablet (640–991px) — the audience montage sits after all four text blocks
`layout-254.jsx:64` `sm:order-last`: at 991 the 507×735 video lands below all four audience blocks. The site's mobile rule is written for phones, and at 375 the order is correct (text, video, text). But on iPad portrait this is "all the text, then one tall picture". Fixing it needs a different tablet grid (e.g. video spanning a row between the pairs). Cost: one grid change, needs sign-off.

### Overlap elements to create layers (p. 170)
Still available and unused (the lightbulb's −84px translate could break the section edge). Composition change, needs sign-off. Unchanged from 2026-09-10.

---

## Overrides — book says X, brand says Y, no change

- **Use shadows to convey elevation / Shadows can have two parts** (p. 158, p. 163). No blurred shadow anywhere (grep: zero `shadow-sm…2xl`). The ledge is the only shadow. No change.
- **Use fewer borders** (p. 206). 2px hero-card borders, 1px trust-strip and accordion hairlines, 1px montage outlines. The borders are the system. No change.
- **Balance weight and contrast** (p. 48). Every `font-bold` h2 computes to weight 400, and that's deliberate. The step h3s' explicit `font-[700]` is the documented exception.
- **Decorate your backgrounds** (p. 198). `hero-fade` and the `layout-237` pattern band behind its 62% white veil are the two sanctioned homepage exceptions (grep hit `layout-237.jsx:28` is the comment saying the veil is *not* a gradient). No third.
- **Accessible doesn't have to mean ugly** (p. 142). The brand is stricter, and it holds: intake bar dark-on-green **10.21:1**, and the green is never under white text. The footer's white on `.scheme-jade` measures **3.14:1**. That's the one sanctioned exception, not a break.
- **Ditch hex for HSL / You need more colours / Define your shades** (p. 119–129). N/A by construction. Grep found zero raw hex in `components/sections/home/`.

## Passes

- **Starting from scratch:** two families only, both from the single `@font-face` block. No emoji, no bounce/scale motion (card hover is `bg-scheme-text/5`, the scroll cue fades).
- **Hierarchy:** h1 70px beats h2 52px at 1440, and at 375 44px beats 40px. One winner per section. Hero card titles are `h2` rendered at `text-h5` (visual and document hierarchy correctly decoupled). No grey or opacity de-emphasis in a coloured scheme (the only `opacity-*` hits are hover states and the intake-bar dismiss icon, measured **4.20:1** on green, above the 3:1 non-text bar). No redundant labels.
- **Layout & spacing:** zero inline `style={{}}`, and every gap lands on the 4px scale. Heading→body is tighter than block→block everywhere except finding 2 (`layout-237` icon→h3 24 / h3→p 12, `layout-254` 24/16, steps h3→p 8 within a 24 gap). Cards size to content. No `em` sizing.
- **Text:** FAQ question 22px vs answer 18px at 1440 (18 vs 16 at 375). No justified text left. 375px measures are all 35–45 characters. Every italic uses `.font-heading-italic`. No all-caps runs.
- **Colour:** all body and heading text measured **20.06:1** on white and **17.91:1** on mint. `.scheme-accent`'s omitted button rule correctly left alone. The CTA button uses `.btn-dark` + `.btn-dark-on-light`.
- **Depth:** section run at 1440 is fade / fade / fade / pattern / white / **mint** / white / white. The final white pair (FAQ → CTA) is the documented `cta-25` reversal.
- **Images:** hero illustrations are now 600 and 800px sources for about 201px of figure (no longer 2.4× apart). Lightbulb, flowers and envelope are all exact 2× assets. Decoratives are `alt=""` + `aria-hidden`. Montage and cue respect `prefers-reduced-motion`.
- **Mobile rule (375):** hero reads text, card image, text, card image, text. `layout-423` reads heading, lightbulb, steps. `layout-254` reads two audiences, video, two audiences. `cta-25` moves the envelope onto the button row. **PASS**. The only sequence that ends on media is the CTA, where it is a small inline mark.
- **Finishing touches:** brand dot instead of list bullets (`layout-423.jsx:108`). Carousel controls hidden when there's only one slide.

Out of lane, not reported: heading outline (seo-auditor), copy and links (qa-inspector).

Files audited: `E:\uplift-path-website\components\sections\home\` (header-104, trust-strip, layout-423, layout-237, layout-254, testimonial-10, faq-01, cta-25, intake-bar), composed by `E:\uplift-path-website\app\(site)\page.tsx`.
