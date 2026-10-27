> Saved verbatim from the `ui-refactor-auditor` agent's hand-back (2026-09-10, route `/`). The agent
> returned it in chat instead of writing the file, so it was recovered from the
> session transcript. Findings describe the code as it was on that date.

**Verdict:** The homepage's structure, colour and contrast are sound — the damage is a hierarchy inversion on mobile (the h1 is the fourth-largest heading on the page), a FAQ where question and answer are typographically identical, and a four-section run of unbroken white; all three are one-class fixes and none need decoration added.

**Counts:** 15 pass · 11 fail · 6 override · 4 decision

Nothing was changed. No report file written (per harness instruction to return findings inline).

---

## Fails, in fix order

### 1. Not all elements are equal / Establish a type scale (p. 30, p. 88) — h1 is dwarfed on mobile
**Where:** `components/sections/home/header-104.jsx:47`
**Seen (375px):** h1 = **28px**. Every section h2 = **40px** (`text-h2`). Step h3s = 25px. The hero card titles are 20px. So the page's largest type below 992px is a *section* heading, 43% larger than the page title.
**Why it breaks:** the h1 opts out of the scale with `text-[1.75rem] sm:text-[2.5rem] md:text-[3.25rem] lg:text-[4.375rem]` while every sibling heading uses `text-h*` tokens, which step at 992px. The hero stops winning at the width most visitors arrive on. Weight can't rescue it (`--font-weight-bold: 400`).
**Fix:** put the h1 back on the scale — `text-h2 sm:text-h1` (or at minimum raise the base step above 40px). Desktop is also off-scale: measured 70px vs `--text-h1` 72px.
**Scope:** refactor

### 2. Balance weight and contrast (p. 48) — FAQ question reads as its own answer
**Where:** `components/sections/home/faq-01.jsx:69`
**Seen:** trigger = 16px Lexend Deca 400 `rgb(0,10,8)`; answer body = 16px Lexend Deca 400 `rgb(0,10,8)`. Identical size, family, weight and colour; only the chevron separates them.
**Why it breaks:** `text-medium font-body font-[400]` is correct per the not-bold ruling, but it leaves the question with *no* differentiator. Weight is unavailable by brand rule, so the compensation has to be size or contrast — and neither is applied.
**Fix:** `text-large` on the trigger (18px mobile / 22px desktop), keeping `font-body font-[400]`. One token step, no weight change, ruling intact.
**Scope:** refactor

### 3. Establish a type scale (p. 88) — step titles frozen across the breakpoint
**Where:** `components/sections/home/layout-423.jsx:126`
**Seen:** `text-[1.5625rem]` = **25px at both 375px and 1440px**, while the h2 beside it goes 40px → 50px. 25px is between `--text-h5` (20/28) and `--text-h4` (24/36).
**Why it breaks:** a hard-coded step doesn't respond to the 992px scale, so on desktop the three step titles collapse toward the body copy and on mobile they *outrank* the 20px hero card titles.
**Fix:** `text-h5` (or `text-h4` if the Figma weight is wanted); keep the explicit `font-[700]`, which is a documented exception.
**Scope:** refactor

### 4. Align with readability in mind / Line-height is proportional (p. 111, p. 105) — justified text in a 35-character measure
**Where:** `components/sections/home/layout-423.jsx:132`
**Seen (1440px):** three paragraphs, `text-align: justify`, rendered width **343px**, **35 characters** per line, line-height **21.78px on 18px type (1.21)**.
**Why it breaks:** 35 characters is half the 45–75 band, and justification at that measure forces visible word-space rivers. The `lg:leading-[1.21]` also overrides the token's 1.5 on body copy, which is the wrong direction — small text wants *looser* leading.
**Fix:** drop `lg:text-justify` and `lg:leading-[1.21]`; let `--text-large-line-height` (1.5) apply. Same leading override on the hero paragraph and lead-in, `header-104.jsx:70` and `:82` (22px at 1.21).
**Scope:** refactor

### 5. Even flat designs can have depth (p. 167) — four consecutive white sections
**Where:** `layout-254.jsx:8`, `testimonial-10.jsx:65`, `faq-01.jsx:53`, `cta-25.jsx:33`
**Seen:** measured `backgroundColor: rgb(255, 255, 255)` on all four, with no border, scheme change or scheme-coloured band between them — 2,671px of continuous white out of a 6,095px page.
**Why it breaks:** the only depth cues this brand has are a scheme change and the button ledge. With neither present, the bottom half of the page has no section boundaries at all — this is exactly the "sections dissolve" diagnosis, and the sanctioned remedy is a scheme swap, **not** a texture or a shadow.
**Fix:** give one of the middle two a different existing scheme (`.scheme-mint` on `testimonial-10` is the cheapest — one class, and its text/border tokens follow automatically). Note the `cta-25` whitening is a documented deliberate reversal (`cta-25.jsx:15-24`) — leave that one alone.
**Scope:** refactor

### 6. Avoid ambiguous spacing (p. 83) — card heading equidistant from icon and body
**Where:** `components/sections/home/layout-237.jsx:67`, `:82`, `:95`
**Seen (1440px):** icon→heading **24px**, heading→body **24px**, measured for all three cards (icon block `mb-6`, h3 `mb-6`).
**Why it breaks:** the heading belongs to the paragraph under it, and equal gaps make it read as floating between the two.
**Fix:** `mb-2 md:mb-3` on the three h3s (keeps the icon gap at 24px).
**Scope:** refactor

### 7. Limit your choices (p. 24) — the type scale is bypassed nine times in two files
**Where:** `header-104.jsx:47,70,82`; `layout-423.jsx:64,126,132`
**Seen:** `text-[1.75rem] / [2.5rem] / [3.25rem] / [4.375rem] / [1.375rem] / [3.125rem] / [1.5625rem] / [1.125rem]` plus `leading-[1.2] / [1.333] / [1.21]`. Nine off-token font sizes; measured 70px, 50px, 25px, 22px — none of which is a `--text-*` value at any breakpoint.
**Why it breaks:** each is individually defensible against the Figma (and the comments say so), but together they mean two of the nine homepage sections are not on the scale, which is what produces findings 1, 3 and 4.
**Fix:** map each to its nearest token (70→`text-h1`, 50→`text-h2`, 25→`text-h5`, 22→`text-large`) and delete the `leading-*` overrides. Where the Figma genuinely wants a step that doesn't exist, that's a token DECISION, not an arbitrary value.
**Scope:** refactor (per-site type-token addition would be a decision)

### 8. Don't rely on colour alone (p. 146) — carousel dot state is colour-only
**Where:** `components/sections/home/testimonial-10.jsx:119`
**Seen:** active `bg-scheme-text`, inactive `bg-scheme-text/20`; both `size-2`. Only the fill differs.
**Fix:** widen the active dot (`w-6 rounded-full` on the active branch) so shape carries the state too. No new colour, no motion.
**Scope:** refactor

### 9. Choose a personality / consistency (p. 17) — one of three parallel icons is a different hue
**Where:** `components/sections/home/layout-237.jsx:64` (`text-caribbean-green-dark`) vs `:78`, `:92` (`text-viking-dark`)
**Seen:** three visually identical cards; icon 1 green, icons 2–3 teal.
**Why it breaks:** a colour difference across a parallel set implies a distinction the content doesn't have.
**Fix:** one class — make all three `text-viking-dark` (or all three the green).
**Scope:** refactor

### 10. Establish a type scale (p. 88) — 12px substantive body copy on mobile
**Where:** `layout-423.jsx:132`, `trust-strip.jsx:48`, `intake-bar.jsx:118`
**Seen (375px):** `text-small` computes to **12px / 18px line-height** — and `--text-regular` is *also* 0.75rem below 992px, so regular and small are indistinguishable. Three multi-line paragraphs of real copy render at 12px.
**Fix (per-section, in scope):** promote these to `text-medium` (16px mobile) and keep the desktop step. The token collapse itself is a decision below.
**Scope:** refactor

### 11. Hero must fit one fold (brand ruling, 2026-09-03) — misses by 113px
**Where:** `components/sections/home/header-104.jsx:37`
**Seen (1440×900):** navbar 72px + hero section to **y = 1013**. Audience cards' bottom edge at **y = 899** — flush with the fold — and the scroll cue at y = 949, below it. At 1440×800 the cards' CTA row is cut.
**Why it breaks:** it's a hard pass/fail on this page, and the cue that exists specifically to say "there is more" is the part that falls off.
**Fix:** trim `lg:pb-16` → `lg:pb-10` and the pre-card `mt-8 lg:mt-10` → `mt-6`; ~40px of the shortfall also disappears if finding 4's leading overrides go. Full clearance may need the card aspect ratio touched — flag rather than force.
**Scope:** refactor (partial); full fit may be a decision

---

## Decisions — need a design call, not a refactor

- **Establish a type scale (p. 88) — the collapsed mobile step.** `--text-regular` and `--text-small` are both `0.75rem` below 992px. Anything using regular-vs-small for hierarchy has none on mobile. Fixing it means editing a generated token (`--text-small` → 0.6875rem, or `--text-regular` → 0.875rem) and re-deriving from `globals.original.css`; it changes every page. Cost: one token + a site-wide visual regression pass.
- **Everything has an intended size (p. 181) — oversized assets.** `CARF.webp` is **900×900 delivered into an 80px seal** (and 64px in the footer); `next/image` optimization is off under `output: 'export'`, so the full file ships twice. Needs a resized asset, not a markup change.
- **Everything has an intended size (p. 181) — mismatched hero card images.** `home-audience-for-business.png` is 600×600 and `home-audience-for-individual.png` is 1442×1069, both rendered into the same **588×214** box (scale factors 0.98 and 0.41). One is at native resolution, the other downscaled 2.4×, so the pair don't match in apparent line weight. Needs the two illustrations re-exported at one size.
- **Overlap elements to create layers (p. 170).** Available and unused; the `layout-423` lightbulb already translates −84px and could break the section edge. Cheap visually, but it is a composition change — needs sign-off.

## Overrides — book says X, brand says Y, no change

- **Use shadows to convey elevation / Shadows can have two parts** (p. 158, p. 163). Measured `box-shadow: none` on every card and section. Brand has exactly one shadow, the hard `0 3px 0 0` ledge. No elevation system to add.
- **Use fewer borders** (p. 206). 2px card borders, 1px accordion and trust-strip hairlines, 1px decorative outlines in `layout-254.jsx:160-164`. The borders *are* the structural system. Not removed.
- **Balance weight and contrast** (p. 48). `font-bold` on all seven h2s computes to `font-weight: 400`. Deliberate; `font-semibold` on body runs computes to 600 and is fine. Not "fixed".
- **Decorate your backgrounds** (p. 198). The `hero-fade` mint wash and the `layout-237` pattern band (knocked back behind `bg-white/62`) are the two sanctioned homepage exceptions. No third proposed.
- **Accessible doesn't have to mean ugly** (p. 142) — brand is stricter and it holds. Intake bar measured **10.21:1** dark-on-green; its button **20.06:1** white-on-black via `.btn-dark`. No white-on-green anywhere on this page.
- **Ditch hex for HSL / You need more colours / Define your shades up front** (p. 119–129). N/A by construction — grep found **zero raw hex** in `components/sections/home/`.

## Passes

- **Hierarchy:** one clear winner per section below the hero; no grey-on-colour de-emphasis in any coloured scheme; no label-value redundancy; document and visual hierarchy correctly decoupled (hero card titles are `h2` at `text-h5`).
- **Layout & spacing:** every gap lands on the 4px scale (no `gap-[13px]`-class violations); **zero inline `style={{}}`**; cards size to content rather than stretching; no `em` sizing; heading→body gaps tighter than section gaps everywhere except finding 6.
- **Text:** two families only, both from the single `@font-face` block; hero measure 71 chars, lead-ins 78, trust strip 73 — all at or near the band except finding 4; no all-caps runs needing positive tracking; italics all use `.font-heading-italic` (5 occurrences, no hand-set `italic`).
- **Colour:** all body text measured `rgb(0,10,8)` on white/mint — 20.06:1; `.scheme-accent`'s omitted button rule correctly left alone.
- **Depth:** no blurred shadow anywhere; hover states are colour-only (`hover:bg-scheme-text/5`, `hover:opacity-70`) — nothing bounces, springs or scales.
- **Images:** `object-contain` on the transparent-ground illustrations (correctly not `cover`); decoratives carry `alt=""` + `aria-hidden`; the montage respects `prefers-reduced-motion`.
- **Finishing touches:** list bullets replaced with the brand dot (`layout-423.jsx:117`); no emoji; no gradient outside the two sanctioned exceptions; carousel controls suppressed when there's only one slide.

Files audited: `E:\uplift-path-website\components\sections\home\` (header-104, trust-strip, layout-423, layout-237, layout-254, testimonial-10, faq-01, cta-25, intake-bar), composed by `E:\uplift-path-website\app\(site)\page.tsx`.
