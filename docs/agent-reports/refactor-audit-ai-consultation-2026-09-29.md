# Refactoring UI audit — /ai-consultation, 2026-09-29

**Verdict:** Two things on this page are visibly broken at laptop and tablet widths, so fix them first. Between 992 and about 1270px the hero's two line-art pictures sit on top of the headline and the body copy. Between 768 and about 1100px the three service cards cut off their own label and part of their title. Both are class changes; the fix for the first is already written on the Advisory page.

**Counts:** 17 pass · 4 fail · 7 override · 4 decision

Measured in a dedicated tab at 1440x900, 1280x800, 1024x768, 992x768, 768x1024 and 375x812, with a reload after every resize. Computed values only; text-over-photo contrast was sampled from the rendered image pixels under each text line box. The page was not edited.

---

## Fails, in fix order

### 1. Not all elements are equal (p. 30) — hero art collides with the H1
**Where:** `components/sections/ai-consultation/layout-134.jsx:31`, `:36`, `:41`
**Seen:** the vignettes switch on at `lg` (992) at fixed offsets from the viewport edges (`left-[112px]`, `right-[127px]`), while the text column is centred and slides outward as the viewport narrows. Measured overlap of the image box with the rendered text line boxes:

| Viewport | Notepad (left) | Monitor (right) |
|---|---|---|
| 992 | over the H1 by **127px** and 49px | over the body copy by **138px** |
| 1024 | over the H1 by **111px** and 33px | over the body copy by **122px** |
| 1280 | 1px clear | 6px clear |
| 1440 | 81px clear | 86px clear |

**Why it breaks:** decoration is drawn over the one element the page most needs read. The H1 is no longer the clear winner; it shares its space with a picture. The Advisory hero had exactly this defect, and its comment (`advisory-services/layout-134.jsx:36-60`) records the fix.
**Fix:** copy Advisory's anchoring:
- line 31: `lg:block` → `min-[1280px]:block`;
- line 36: `left-[112px]` → `right-[calc(50%+416px)]`;
- line 41: `right-[127px]` → `left-[calc(50%+416px)]`.

Each picture then starts 32px outside the `max-w-lg` column at every width, and never shows where it can't clear. At 1440 the notepad lands at 138–304 (frame 112–278) and the monitor at 1136–1282 (frame 1167–1313). Both are within ~30px of the frame and neither can touch the text. Leave the `top-[...]` values alone.
**Scope:** refactor

### 2. Everything has an intended size (p. 181) — service cards clip their own copy
**Where:** `components/sections/ai-consultation/layout-423.jsx:88` and `:99`
**Seen:** the card is `md:aspect-[405/470]` inside `BackgroundCard`, which is `overflow: hidden` (it clips the photo to the radius). A fixed aspect ratio only grows to fit its content when overflow is visible, so here the card stays at its ratio. The bottom-anchored text block (`justify-end`) then overflows upward and gets cut off. Distance from the card's top edge to the top of the "AI Consulting" eyebrow:

| Viewport | Card | Card 1 | Card 2 | Card 3 |
|---|---|---|---|---|
| 768 | 205x237 | **−104px** | **−25px** | **−104px** |
| 992 | 272x315 | −1px | 46px | **−25px** |
| 1024 | 281x327 | 10px (against 28px padding) | 57px | 10px |
| 1280 | 358x416 | 170px | 170px | 123px |

At 768 the eyebrow and the first line or two of the title are outside the card on two of three cards. At 1024 the text is jammed 10px from the top edge.
**Why it breaks:** the box has one size, the frame's 405x470. The content does not, because the title wraps to 3 lines at 36px in 225px. Below ~1100 the box is smaller than what it holds.
**Fix:**
- line 88: `md:aspect-[405/470]` → `min-[1280px]:aspect-[405/470]`;
- line 99: `md:min-h-0` → `min-[1280px]:min-h-0`.

From 768 to 1279 the card is then at least `min-h-[18rem]` (288px) and grows to fit its text. From 1280 it is the frame's ratio, measured at 1280 with 123–170px of headroom.
**Scope:** refactor

### 3. Site mobile rule (text, then media, then text) — a 642px lone figure closes "Your Partner in Practical AI"
**Where:** `components/sections/ai-consultation/layout-01.jsx:38-70`
**Seen:** at 375 the section reads **T×3 → IMG(642)**. The bulb figure renders at its full 222x642, 79% of an 812px screen, after all the text. The section is 1246px tall on a phone, and half of that is one decorative picture.
**Why it breaks:** the site's phone rule, and *You don't have to fill the whole screen* (p. 65) in reverse. The figure is decoration (`aria-hidden`), yet at 375 it is the largest thing on the page.
**Fix:**
- Split the text `<div>` into two children. Child 1 is the h2 and the first `<p>`, with `md:col-start-1 md:row-start-1`. The image `<div>` gets `md:col-start-2 md:row-span-2 md:row-start-1`. Child 3 is the second `<p>`, with `md:col-start-1 md:row-start-2`.
- The second paragraph's `mt-6` becomes `md:mt-6`, so the phone gap is the grid's alone.
- Add `md:gap-y-0` to the grid on line 38.
- Shrink the figure on phones: line 68, `max-w-[222px]` → `max-w-28 md:max-w-[222px]` (112x324 at 375). This is the same move `cta-25` made for its envelope on 2026-09-29.

The phone then reads heading and problem, figure, answer. Desktop is unchanged.
**Scope:** refactor

### 4. Text needs consistent contrast (p. 176) — the scrim is at the AA edge
**Where:** `components/sections/ai-consultation/layout-423.jsx:98`
**Seen:** white 16px body over the photo under `bg-neutral-darkest/50`. Sampling every 4th pixel under each rendered text line gives a mean contrast of 13.5–16:1. The **worst sample is 4.11:1** on card 1 at 1440 (4.21 at 375); card 3 is 4.48 and card 2 is 4.58. 4.5:1 is the floor for 16px text.
**Why it breaks:** the photo's lightest highlights under the body copy drop below AA. The mean is comfortable, so this is lowest priority, but it is a fixed overlay with no margin.
**Fix:** `bg-neutral-darkest/50` → `bg-neutral-darkest/60`. This is the same token at a different opacity, so no new colour, and the same `object-top` crop. Estimated worst case at 60% is about 5.8:1.
**Scope:** refactor

---

## Decisions — real improvements that need a design call

### Page spine — AI Consultation is the one service page without an FAQ
Advisory and Compliance both run hero → content → `faq-01` (mint) → `cta-25`. This page goes from the services grid straight to the CTA. That is faithful to the sitemap (`design-export/sitemap.md:135-146` lists no FAQ), so it is not a defect. It is the main cross-page inconsistency, though. **Cost:** three new questions and answers (copy), and a `faq-01` composed like the others. The scheme rhythm would need rechecking: it alternates cleanly now (W M W M W).

### Labels are a last resort (p. 41) — "AI Consulting" above every card
All three service cards carry the same eyebrow, "AI Consulting" (16px/600, white), on a page titled AI Consultation, under an h2 that says "AI Consulting". It labels nothing the reader doesn't already know. The frame draws it. **Cost:** removing line 100 is trivial, but it departs from the frame, which is a design call.

### Everything has an intended size (p. 181) — service photos are exactly 1x
The three service photos are 405x630 and render at 405x470 CSS px at 1440. Nothing is upscaled at 1x, but on a 2x display they are stretched to double. **Cost:** 2x exports of the three photos (new assets).

### Align with readability in mind (p. 111) — the hero sub-copy is centred across 3 lines at 375
This is the site-wide `layout-134` pattern; see the Advisory report's same entry. It is a site-wide call.

---

## Overrides — book says X, brand says Y, no change

- **Balance weight and contrast** (p. 48). Every heading computes to 400. Working as designed.
- **Use shadows to convey elevation** (p. 158). The service cards measure no shadow and no border (`BackgroundCard`). Depth is the photo and the scrim. No change.
- **Even flat designs can have depth → solid shadows** (p. 167). The hero's secondary button carries the `0 3px 0 0` ledge. The CTA's black button drops it via `.btn-dark`, which is deliberate.
- **Use fewer borders** (p. 206). N/A in the direction the book means. No border was added or needs removing.
- **Decorate your backgrounds** (p. 198). Flat white and mint only.
- **Ditch hex for HSL / You need more colours / Define your shades** (pp. 119, 123, 129). N/A by construction. The grep's two raw-hex hits (`cta-25.jsx:20`, `layout-253.jsx:16`) are inside comments. The icon fill is `bg-caribbean-green-dark`, an existing token.
- **Accessible doesn't have to mean ugly** (p. 142), brand-stricter. The approach icons are `#06A785` on white, about 3:1. They are `aria-hidden` decoration, so the non-text 3:1 floor applies at most, and it is the frame's own colour. No change.

---

## Passes

**Starting from Scratch.** One personality, no emoji, no motion beyond the brand's. No gradient, blurred shadow, `leading-*`/`tracking-*` or `opacity-*`. The one inline style (`layout-253.jsx:41`) is the CSS mask for the icon, the documented `how-we-work/layout-254` treatment. No `text-[...]`.

**Hierarchy.** h1 is 72 against h2 at 52 (≥992) and 44 against 40 (375). The hero fits the fold at 1440x900 (bottom 671px). `layout-253`'s four 36px h3s outrank their 16px bodies, and the 52px h2 outranks them. The service-card title (36px) outranks its eyebrow and body.

**Layout and Spacing.** All gaps on the scale. `layout-253` puts the icon 24px above its h3 and the body 12px below, so the heading groups with its copy. That is the fix recorded in the file's own comment, and it holds. Section padding is a uniform 64/96/112px. The bulb figure is capped at its drawn 222px rather than stretched (desktop).

**Designing Text.** The scale steps at 992 as tokenised. Measures: hero 53 cpl (1440) and 35 (375); about-section 51–57 cpl (1440) and 38 (375); approach bodies 32–41; service intro 47. Two families. No `em`. Long copy is left-aligned. The only centred runs are short intros under centred h2s.

**Working with Colour.** Dark on white is 20.06:1 and dark on mint 17.91:1. No white on green anywhere.

**Creating Depth.** Schemes alternate W M W M W, so no two adjacent sections share a background: the cleanest rhythm of the three service pages.

**Working with Images.** Hero vignettes are 331x308 and 291x272 sources at 166x154 and 146x136, so crisp at 2x. The bulb figure is 444x1284 at 222x642, which is 2x.

**Finishing Touches.** Icons are tinted masks in a palette colour, not default glyphs.

**Mobile rule.** `layout-423` (T → IMG → T per card) and `cta-25` pass. `layout-253` has no media. Only `layout-01` fails (fail 3).

---

## Across the three service pages

See the comparison table in `refactor-audit-advisory-services-2026-09-29.md`. On this page: the hero vignettes use the edge-pinned pattern that Advisory had already fixed (fail 1). This is the only service page with no FAQ (decision). It has the only fixed-aspect card with bottom-anchored copy on the three pages (fail 2), and it shares the text-then-lone-picture phone defect with Advisory's `layout-19` and Compliance's `layout-16` (fail 3).
