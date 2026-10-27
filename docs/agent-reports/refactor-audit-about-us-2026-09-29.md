# Refactoring UI audit — `/about-us`, 2026-09-29

**Verdict:** The page's colour, contrast and section rhythm are right. Two things are broken on phones. In the Board of Advisory tabs, the selected tab looks exactly like the others. Under each advisor's bio, the portrait comes after all of the text. Fix those two first; both are class changes. The rest is line length on tablets and in the green band.

**Counts:** 24 pass · 7 fail · 5 override · 4 decision

Measured with `javascript_tool` (computed styles) at **1440×900** (≥992px), **991×900** (<992px) and **375×812** (mobile). The page was reloaded after every resize. Nothing was changed except this file and the index row. This is the first audit of this route; the 2026-09-11 run was stopped before it finished.

---

## Fails, in fix order

### 1. Don't rely on colour alone (p. 146) — active tab is invisible on phones · **P1**
**Where:** `components/sections/about-us/layout-507.jsx:32`, `:38`, `:44`, `:50` (the four `TabsTrigger`s)
**Seen:** At 375, all four tabs compute to `background rgb(255,255,255)`, weight 400, 18px Lexend Deca, and a 1px bottom border in `rgb(0,10,8)`. Active and inactive are **identical**. `data-[state=active]:bg-scheme-foreground` does nothing on this scheme, because `.scheme-light`'s foreground *is* `--color-white`, the same as its background. At 1440 the only cue is that the active tab's 1px bottom rule goes transparent.
**Why it breaks:** On a phone the visitor taps "Tasha Coppett" and nothing about the tab list says which advisor they're reading. This isn't a colour-only signal; there is no signal at all.
**Fix:** Add `data-[state=active]:font-semibold` to each trigger. Lexend Deca 600 is self-hosted and `font-semibold` isn't pinned the way `font-bold` is. That's a non-colour signal with no new token. Optionally pair it with `data-[state=active]:bg-scheme-text/5`, the hover wash the homepage hero cards already use.
**Scope:** refactor

### 2. Mobile rule: text, then media, then text — portrait trails the bio · **P1**
**Where:** `components/sections/about-us/layout-507.jsx:94` (and the matching image `<div>` in each of the other three `TabsContent`s)
**Seen:** At 375 each tab panel reads eyebrow, h3 (y=5626), a 9-line bio, "Key Expertise", a 3-item list, then the **portrait at y=6429**, 800px after the heading it belongs to. The sequence is text only, then a single image.
**Why it breaks:** This is exactly the pattern the site's mobile rule forbids: all the text, then one lone picture. The team cards directly above get it right (portrait, then name, then bio).
**Fix:** Add `order-first md:order-none` to the `aspect-[4/3]` image wrapper in all four panels. Phones then read portrait, then bio, matching `team-06`. From md the two-column layout is unchanged.
**Scope:** refactor

### 3. Keep your line length in check (p. 99) — hero copy at full tablet width · **P2**
**Where:** `components/sections/about-us/layout-134.jsx:65`
**Seen:** At 991 (single column) the two hero paragraphs span **878px, about 114 characters per line**, over 3 and 4 lines. At 1440 they're 64 (PASS), and at 375, 44 (PASS).
**Fix:** `space-y-6 text-medium lg:text-justify` → add `max-w-md lg:max-w-none` (560px, about 73 characters). No change at lg or on phones.
**Scope:** refactor

### 4. Hierarchy / mobile order — page title pushed below the fold on tablet · **P2**
**Where:** `components/sections/about-us/layout-134.jsx:23`
**Seen:** At 991×900 the 639×564 collage stacks first and the **h1 "Uplift Path" starts at y=804**, so the first screen is photos with no title. At 375 the collage shrinks and the h1 is at y=498 (inside the fold).
**Why it breaks:** The page title is the one element that should win the opening screen. At tablet widths it isn't on it.
**Fix:** `lg:ml-auto lg:w-full` → `order-last lg:order-none lg:ml-auto lg:w-full`. Below lg the page reads title, copy, button, collage. That's text then media at the end of the hero, which the mobile rule allows because the next section starts with text again. lg is unchanged.
**Scope:** refactor

### 5. Align with readability in mind / line length (p. 111, p. 99) — the green band · **P2**
**Where:** `components/sections/about-us/layout-183.jsx:37` (container), `:45` (copy)
**Seen:** White 18px SemiBold, **centred**:
- 1440: **85 characters per line over 4 lines**.
- 991: **96**.
- 375: **9 centred lines**.
**Why it breaks:** Centring works for a heading over short copy. A 4- to 9-line paragraph with no fixed left edge is hard to track, and 85–96 characters is past the band even when left-aligned.
**Fix:**
- `:37`: `max-w-lg` → `max-w-md` (560px, about 62 characters at 18px SemiBold). The h2 is short, so it's unaffected.
- `:45`: add `text-left md:text-center` so the 9-line phone block is ragged-right while the heading stays centred.

No colour change; white on `#05866b` stays at 4.54:1.
**Scope:** refactor

### 6. Keep your line length in check (p. 99) — centred lead-ins overrun · **P2**
**Where:** `about-us/layout-237.jsx:14`, `about-us/layout-507.jsx:22`, `about-us/faq-01.jsx:48`
**Seen:** Lead-ins inside `max-w-lg` (768px):
- 1440: **86–88 characters** at 18px, the Core Values one over 3 centred lines.
- 991: **97–99** at 16px.
- 375: 43 (PASS).
**Fix:** Add `mx-auto max-w-md` to each lead-in `<p>`. The heading wrappers keep `max-w-lg`. This is the same fix as on the homepage and how-we-work.
**Scope:** refactor

### 7. Limit your choices (p. 24) — off-scale gap · **P3**
**Where:** `components/sections/about-us/layout-134.jsx:22`
**Seen:** `gap-x-[63px]`, the one arbitrary spacing value on the page. It's 1px off the scale's `gap-x-16` (64px).
**Fix:** `gap-x-[63px]` → `gap-x-16`. Visually identical, and it's back on the system. (`max-w-[639px]` / `max-w-[513px]` are media boxes taken from the frame's geometry, which is legitimate.)
**Scope:** refactor

---

## Decisions — real improvements that need a design call

### Centred 4-line bios in the team cards (p. 111)
`team-06.jsx:54`: the bios are centred, 4 lines at 51 characters (1440) and 43 (375). Left-aligning just the bio inside an otherwise centred card would create a mixed-alignment card, which is worse. Doing it properly means re-composing the card (left-aligned throughout). Cost: one section, visual sign-off.

### Six 36px value headings over one-line bodies (p. 30)
`layout-237.jsx:38` onward: six `text-h4` headings (36px at 1440) over 16px single-line bodies, directly under a 52px h2. It holds (the h2 still wins), but the section is heading-dense. Stepping to `text-h5` would quiet it. It's the homepage's `layout-237` treatment, though, so change both or neither. Cost: a cross-page consistency call.

### Copy — handed off, not audited here
The Core Values lead-in (`layout-237.jsx:14`) is about "our leadership", not values. The FAQ lead-in (`faq-01.jsx:48`) is still Relume's default "Find answers to your questions about us.", which the homepage replaced. Both are copy, so qa-inspector owns them.

### Everything has an intended size (p. 181) — oversized sources
`about-hero-couple.jpg` is 1200×800 delivered into a 298×379 tile (4.0×), and `about-hero-field.jpg` is 900×600 into 298×232 (3.0×). Nothing is upscaled; they just over-download, because `next/image` optimization is off. Needs resized assets, not markup.

---

## Overrides — book says X, brand says Y, no change

- **Use shadows to convey elevation** (p. 158). The Board card is a 2px border with no shadow. Zero blurred shadows on the page. No change.
- **Use fewer borders** (p. 206). The 2px Board card, 1px tab rules, 1px montage outlines and 1px accordion hairlines are the structural system. Kept.
- **Balance weight and contrast** (p. 48). `font-bold` h2s compute to 400. The "Why Uplift Path" h2's explicit `font-[700]` is the documented frame exception (`layout-183.jsx:38-41`).
- **Accessible doesn't have to mean ugly** (p. 142). The brand is stricter, and it holds. The green band is white on `.scheme-green-deep` at **4.54:1** (measured), the darkened fill from `globals.css [11]`, not a second exception. The footer's jade band is **3.14:1**, the one sanctioned exception.
- **Ditch hex / more colours / define shades** (p. 119–129). N/A. The six raw-hex grep hits (`cta-25.jsx:18`, `layout-183.jsx:14,21`, `layout-54.jsx:33`) are all inside comments.

## Passes

- **Starting from scratch:** Playfair + Lexend only. Radii from tokens (collage radii in `cqw` of the frame's own values). No emoji, no scale or bounce motion.
- **Hierarchy:** h1 72px beats every h2 (52px) at 1440, and at 375 44px beats 40px. `layout-54`'s h2 renders at `text-h3`, and the Board h3s at `text-h3`, which is visual hierarchy correctly decoupled from the outline. Team name (22px Playfair 600) beats role (18px). No label-value redundancy. No grey on colour: the only coloured scheme is the green band, whose copy is white, not white-at-opacity.
- **Layout & spacing:** zero inline `style={{}}`. `layout-237` icon→h3 24 / h3→p 12, with `min-h-[2lh]` holding the row baselines. `layout-54` h3→p 16 inside a 24 gap. Hero eyebrow→h1 0 and h1→p 24. All gaps other than finding 7 are on the scale.
- **Text:** no `leading-*` or `tracking-*` overrides on the page. Hero justification held to lg, where the measure is 64 characters. FAQ question 22 vs answer 18 (1440), 18 vs 16 (375). Board bio at 71 characters (1440) and 48 (991).
- **Colour:** body text **20.06:1** on white, **17.91:1** on mint.
- **Depth:** section run is white / white / **green** / **mint** / white / white / **mint** / white. The two white pairs are the decided resolution recorded in `team-06.jsx:84-92`. The second pair (Board to Vision) is separated by the Board's 2px card edge.
- **Images:** team portraits and the Board portrait are within 1.7–2.6× of their rendered size, and none are upscaled. Every video honours `prefers-reduced-motion`. Decoratives are `aria-hidden`.
- **Mobile rule (375):** hero is collage then text. Team is portrait, text, portrait, text, portrait, text. Vision is montage then text. CTA has its small inline envelope. **PASS** everywhere except finding 2.
- **Finishing touches:** the export's dead X and Dribbble icons are removed, leaving LinkedIn only. Bios are clamped at 4 lines behind a real Read More toggle.

Out of lane, not reported: heading outline (seo-auditor), copy and team social links (qa-inspector).

Files audited: `E:\uplift-path-website\components\sections\about-us\` (layout-134, layout-237, layout-183, team-06, layout-507, layout-54, faq-01, cta-25), composed by `E:\uplift-path-website\app\(site)\about-us\page.tsx`.
