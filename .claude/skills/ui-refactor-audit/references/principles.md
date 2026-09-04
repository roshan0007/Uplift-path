# The checklist

Every check below is one section of *Refactoring UI* (Adam Wathan & Steve
Schoger, v1.0.2), restated as something you can verify on a rendered Uplift
Path page. Page numbers are for the human reading the source PDF — cite them,
don't quote the book.

Work the chapters **in this order**. It is the book's order and it is load
bearing: a hierarchy problem read as a spacing problem gets "fixed" with
padding, and the page ends up worse. Fix what a section is *saying* before you
touch what it *measures*.

Verdicts: **PASS** · **FAIL** (fix it) · **OVERRIDE** (brand wins — see
[brand-conflicts.md](brand-conflicts.md)) · **N/A** · **DECISION** (a real
improvement that needs redesign, not refactor — log it, don't do it).

---

## 1. Starting from Scratch (p. 6)

Mostly greenfield process. Two checks survive into a refactor.

| Check | How to verify here |
|---|---|
| **Choose a personality** (p. 17) — font, colour, radius and language should agree on one character | Playfair Display headings + Lexend Deca body, `--radius-card` 8px / `--radius-button` 12px, a teal-and-navy palette. The personality is *calm, institutional, credible*. Flag anything playful: bouncy motion, exclamation marks, emoji, a rounder radius than the tokens, a second accent hue. |
| **Limit your choices** (p. 24) — decide the system in advance, then pick from it | Every colour, size, radius and space must resolve to a token in `app/globals.css`. Any raw hex, raw `px`, or one-off `text-[...]` / `p-[...]` arbitrary value is a FAIL. `adherence.oxlintrc.json` in the design skill catches most of these mechanically — run it before reading pixels. |

## 2. Hierarchy is Everything (p. 29)

The highest-value chapter for this site, and the one most likely to explain a
page that "looks plain" without needing decoration added to it.

| Check | How to verify here |
|---|---|
| **Not all elements are equal** (p. 30) | Per section, name the one element that should win. If two things tie, that's the finding. Typical offender: an eyebrow label set at the same visual weight as the h2 under it. |
| **Size isn't everything** (p. 32) | Emphasis should come from colour and weight before size. On this site colour does most of the work — `text-scheme-text` against a muted sibling. Reaching for a bigger `--text-*` step first is usually the wrong fix. |
| **Don't use grey text on coloured backgrounds** (p. 36) | On `.scheme-navy`, `.scheme-deep-teal`, `.scheme-cerulean-deep` and `.scheme-accent`, de-emphasis must come from a colour mixed **toward that section's own background**, never from grey and never from `opacity`. Grep for `text-neutral-*` and `opacity-` inside a non-light scheme. |
| **Emphasize by de-emphasizing** (p. 39) | If the primary element can't be made louder — and with `--font-weight-bold: 400` it often can't — quiet its neighbours instead. This is the main lever available on this site. |
| **Labels are a last resort** (p. 41) | Look for "Email: x@y.com", "Service: Credentialing" patterns where the value already says what it is. Drop the label, or make it clearly secondary. |
| **Separate visual hierarchy from document hierarchy** (p. 46) | The `h1`–`h6` a section needs for SEO and the size it should *look* are independent. A section's `h2` may correctly render at `--text-h3`. Do not renumber headings to change appearance, and do not resize a heading to fix an outline problem — the seo-auditor owns the outline. |
| **Balance weight and contrast** (p. 48) | **Read this one before any other type check.** `--font-weight-bold` is `400` on purpose, so a "bold" heading is still regular weight. Extra weight is not available as an emphasis tool for h2–h6; compensate with contrast and size. Anything that looks under-emphasised and would normally be fixed with `font-bold` needs a colour or step change instead. |
| **Semantics are secondary** (p. 52) | Destructive and warning colour are not in this palette. Intake-form errors should read as quiet and helpful, not alarming. |

## 3. Layout and Spacing (p. 55)

| Check | How to verify here |
|---|---|
| **Start with too much white space** (p. 56) | White space gets *removed*, never added. If a section feels cramped, the first question is what to delete. |
| **Establish a spacing and sizing system** (p. 60) | Already satisfied — Tailwind's 4px-based scale plus `--spacing-18` (72px) and `--spacing-30` (120px). The check is **usage**: every gap must land on a scale step. Flag `gap-[13px]`, `mt-[27px]`, and any inline `style={{ margin: ... }}`. |
| **You don't have to fill the whole screen** (p. 65) | A short section does not need stretching to fill the fold, and a wide container does not need filler to justify itself. **This is the correct diagnosis for most "the page looks empty" complaints** — shrink the canvas rather than decorate the emptiness. |
| **Grids are overrated** (p. 72) | Not everything should be fluid percentages. Cards with fixed content should size to their content and stop. Check the service-card rows: do they hold shape, or stretch to fill? |
| **Relative sizing doesn't scale** (p. 79) | Padding and type inside a card should not scale with the card. Check that nested elements use absolute token steps, not `em`. |
| **Avoid ambiguous spacing** (p. 83) | The single most common real defect. A heading must sit closer to its own body copy than to the block above it. Measure it in the browser; don't eyeball the source. Where a label floats equidistant between two blocks it reads as belonging to neither. |

## 4. Designing Text (p. 87)

| Check | How to verify here |
|---|---|
| **Establish a type scale** (p. 88) | The scale is the `--text-*` tokens, and **it steps at the 992px breakpoint** — `--text-h1` goes 2.75rem to 4.5rem. Audit both sides of 992px, always. **Known defect:** below 992px, `--text-regular` and `--text-small` are both `0.75rem`, so that step of the scale is collapsed and the two are indistinguishable on mobile. Anything relying on regular-vs-small to signal hierarchy fails there. |
| **Avoid em units** (p. 88) | Grep for `em` in font-size positions. There should be none. |
| **Use good fonts** (p. 94) | Settled: Playfair Display + Lexend Deca, self-hosted. The book's "at least five weights" screen is moot after the fact — do not act on it. Check only that no third family has crept in, and that the `@font-face` block in `globals.css` is still the only place a family is declared. |
| **Keep your line length in check** (p. 99) | 45–75 characters. Measure the rendered measure in the browser on a full-width `.scheme-*` section — that is where full-bleed sections most often fail. |
| **Baseline, not center** (p. 102) | Text of different sizes on one row aligns on its baseline. Check eyebrow-plus-heading rows and stat blocks. |
| **Line-height is proportional** (p. 105) | Large text wants tighter leading, small text looser. The tokens already encode this (h1 at 1.2, body at 1.5) — the check is that nothing overrides it with a `leading-*` utility. |
| **Not every link needs a colour** (p. 109) | Inside a dense block of body copy, inline links can carry weight instead of colour. |
| **Align with readability in mind** (p. 111) | Long-form copy is never centred. A centred *heading* over centred short copy is fine; a centred paragraph running over three lines is not. |
| **Use letter-spacing effectively** (p. 115) | Headings already carry `-1%` tracking. Check any all-caps run — the tagline is set in caps and needs *positive* tracking to stay legible. |

## 5. Working with Colour (p. 118)

| Check | How to verify here |
|---|---|
| **Ditch hex for HSL** (p. 119), **You need more colours than you think** (p. 123), **Define your shades up front** (p. 129) | All three are **N/A by construction.** The palette is fixed and complete in `globals.css`. Never invent a shade, never mix a new one, never convert a token. If a value you need isn't there, it isn't in the brand — that's a DECISION, not a fix. |
| **Don't let lightness kill your saturation** (p. 133) / **Greys don't have to be grey** (p. 139) | Diagnostic reading only. Do not retune tokens. |
| **Accessible doesn't have to mean ugly** (p. 142) | **Enforce hard.** White on the teal/green fill is 1.96:1 and fails WCAG AA — never ship it. Dark text on green is the only approved pairing, and every scheme sets `--color-scheme-btn-text` to the dark neutral. On the green CTA banner the button goes black-with-white-label via the section's `.btn-dark` class. Check every text/background pair against AA (4.5:1 body, 3:1 large) using computed values from the browser, not source guesses. |
| **Don't rely on colour alone** (p. 146) | Form validation, active nav state and any status indicator need a second signal — weight, icon, border or position. |

## 6. Creating Depth (p. 149)

Read [brand-conflicts.md](brand-conflicts.md) first. Most of this chapter is
overridden.

| Check | How to verify here |
|---|---|
| **Emulate a light source** (p. 150) / **Use shadows to convey elevation** (p. 158) / **Shadows can have two parts** (p. 163) | **OVERRIDE.** One shadow exists in this brand: a hard `0 3px 0 0` ledge under a control, zero blur. There is no elevation system and no blurred shadow. A finding that asks for one is wrong, and adding one is a brand violation, not an improvement. |
| **Even flat designs can have depth** (p. 167) | **This is the chapter's applicable section, and the book's own "solid shadows" advice is exactly the brand's ledge.** Depth here comes from two places only: the flat colour of a `.scheme-*` section against its neighbour, and the button ledge. Check that adjacent sections don't carry the same scheme — two `.scheme-light` sections in a row lose the boundary, and that is the real cause of "everything dissolves into white". |
| **Overlap elements to create layers** (p. 170) | Available and currently unused. An image breaking a section boundary is on-brand and cheap. A legitimate suggestion, but usually a DECISION. |

## 7. Working with Images (p. 173)

| Check | How to verify here |
|---|---|
| **Use good photos** (p. 174) | The 44 referenced images in `public/images/` are brand-approved. Flag anything that reads as stock — but the qa-inspector owns placeholder hunting, so don't duplicate its report. |
| **Text needs consistent contrast** (p. 176) | Text over a photo needs an overlay, a colourised treatment, or lowered image contrast — never a bare text shadow as the only measure. Check the hero and any full-bleed image band. |
| **Everything has an intended size** (p. 181) | **Weighted heavily here:** `output: 'export'` means `next/image` optimization is **off**, so nothing resizes for you. Icons must never be scaled up, screenshots never scaled down. Compare each `next/image` `width`/`height` against the asset's true pixel dimensions in `public/`, and check the SVGs in `public/svgs/` render at their designed size. |
| **Beware user-uploaded content** (p. 187) | Only the intake flow and any logo strip. Fix the container's shape and size; prevent background bleed. |

## 8. Finishing Touches (p. 191)

| Check | How to verify here |
|---|---|
| **Supercharge the defaults** (p. 192) | Replace default bullets, a default `<hr>`, default checkbox ticks with brand marks. Bounded by: no emoji, no gradients, and nothing bounces, springs or scales on hover. |
| **Add colour with accent borders** (p. 195) | Strongly on-brand — the system is already border-led (2px cards, 1px hairlines). A 2px accent edge in a scheme colour is the cheapest legitimate lift available. |
| **Decorate your backgrounds** (p. 198) | **Constrained by a client ruling — read [brand-conflicts.md](brand-conflicts.md) before proposing anything from this section.** The permitted move is one full scheme colour across a whole section. Repeating patterns and per-section textures are rejected. |
| **Don't overlook empty states** (p. 203) | Intake flow, search, any zero-result view. |
| **Use fewer borders** (p. 206) | **OVERRIDE, and inverted.** The book says trade borders for shadows or background steps. Here the borders *are* the system: cards get 2px and no shadow; accordion rules, the footer divider and the nav dropdown sheet get 1px hairlines. Do not remove them. The part that does apply: prefer a background-colour step or extra spacing over adding a *new* border that isn't already in the system. |
| **Think outside the box** (p. 210) | Let an element break its container. Same note as "Overlap elements" — usually a DECISION. |

---

## Scope discipline

Roshan's constraint, from the 2026-09-03 design review: *"We don't have to
redesign the page. We have to refactor it, which means improve. Just improve."*

A finding is **in scope** only if it can be expressed as a change to existing
markup, an existing token, or an existing class. If acting on it needs a new
layout, a new asset, new copy, or a new token, it is a **DECISION** — write it
down with what it would cost, and move on. Do not build it.

Two more boundaries, so this audit doesn't duplicate work that already has an
owner:

- **Placeholder content, fake testimonials, dead links, broken images** →
  `qa-inspector`. Every nav and footer link is still `href="#"` exactly as
  Relume exported it; that is a known outstanding task, not an audit finding.
- **Heading outline, meta tags, indexability** → `seo-auditor`. You may note
  that a heading's *size* is wrong; you may not renumber it.

And the standing rule from `CLAUDE.md` that outranks every principle above:
**sections are the visual source of truth.** They came out of Relume already
styled to this system. This audit exists to find what is broken against the
book's principles — not to restyle a section that merely differs from your
taste.
