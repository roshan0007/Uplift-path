# Homepage — 2026-09 Figma pass

Branch `figma-homepage-2026-09`. Homepage only, plus one cross-site footer
change. Built from a Figma export of the `Homepage` frame (1440 × 6431).

The other four pages in that Figma file (About us, How we work, and the two For
Individual frames) are **not** done. Only the shared footer moved on them.

## What changed

| Section | Component | Change |
|---|---|---|
| Hero | `header-104.jsx` | New h1 with an italic clause; new sub-copy; "Where would you like to start?" moved below the cards |
| Trust strip | `trust-strip.jsx` | Untouched |
| Three steps | `layout-423.jsx` | **Restructured.** Three image cards → two-column text layout |
| What Actually Changes | `layout-237.jsx` | Heading + sub-copy only; the three items were already correct |
| Who We Work With | `layout-254.jsx` | Heading + sub-copy + all four item bodies; real alt text |
| Testimonial | `testimonial-10.jsx` | **Untouched — see Open question below** |
| FAQ | `faq-01.jsx` | All four Q&As replaced; refactored to a data array |
| CTA | `cta-25.jsx` | Green → white, centred → left-aligned |
| Footer | `footer-04.jsx` | Light → green. **Cross-site.** |

### `layout-423` lost three placeholder images

It was three `BackgroundCard`s, each a full-bleed photo behind a 50% black
scrim with copy revealed on hover. The photos were `home-who-we-help-0/1/2`
with alt text `"Relume placeholder image 1/2/3"` — export placeholders that
were never replaced. The Figma has none of it, so the images, the `useRelume`
hover state, the `AnimatePresence` reveal and the three "Learn more" links are
gone.

**Consequence:** this section no longer links to `/how-we-work`. Each card used
to be an anchor. The route is now reached from the nav and footer only. The
three images are still in `public/images/` and are now unreferenced by the
homepage.

### The green moved down

The homepage used to carry two green bands: the CTA banner (`scheme-2`) and the
sticky `IntakeBar`. The Figma puts the CTA on white and the footer on green.
`IntakeBar` still hides itself when `#home-cta` is reached — that behaviour was
about not covering the final call to action, not about the colour, so it stays.

## Deliberate departures from the Figma

Two, both flagged rather than silently applied.

**1. Footer text is dark, not white.** The Figma sets white text on the green
footer. Measured against `--color-caribbean-green` (#08d1a7) that is **1.96:1**
— it fails WCAG AA for normal *and* large text, and `CLAUDE.md` names
dark-on-green as the only approved pairing. The fill is the Figma's green; the
text is the dark neutral, at **10.21:1**.

If white text is genuinely wanted, fix the fill and not the label: swap
`scheme-accent` for `scheme-deep-teal` (`--color-caribbean-green-darker`,
#035342), which carries white at **9.05:1**. It is a real brand scheme —
DESIGN.md's scheme 7, unused by the export until now. Never pair white with
`scheme-accent`.

**2. The italic headings are synthesised.** Five headings now set an italic
clause. No italic Playfair Display face is self-hosted — every `@font-face` in
`globals.css` is `font-style: normal` — so the browser mechanically slants the
roman. On a high-contrast didone that is visibly wrong: the true italic has
different letterforms, not just a slant.

One-line fix: drop `playfair-display-italic-400.woff2` into `public/fonts/` and
uncomment block `[6]` at the top of `globals.css`. Every call site already
carries `.font-heading-italic`.

## New in `globals.css`

- `[6]` — the commented-out italic `@font-face`, with instructions.
- `.font-heading-italic` — the italic clause utility. Named rather than a bare
  `italic` class so swapping in the real face is one line here.
- `.btn-dark-on-light` — **required** wherever `.btn-dark` sits on a scheme
  other than `scheme-accent`. `.btn-dark`'s white label is `0-2-0`; every
  scheme except the green one carries a nested default-button colour rule at
  `0-3-0` that beats it, painting black text on the black fill. This re-points
  the token that rule reads instead of fighting specificity.

## Pending — the assets pass

Nine line-art pieces are in the Figma and in neither `public/images/`,
`public/svgs/` nor the design system's `assets/images/`. Every insertion point
is marked `ASSET SLOT` in a comment giving the exact markup.

| # | Asset | Goes in |
|---|---|---|
| 1 | Hands passing an envelope | `header-104.jsx` — hero, top-left, bleeding |
| 2 | Hands holding a wrapped gift | `header-104.jsx` — hero, top-right |
| 3 | Hand holding a heart | `layout-423.jsx` |
| 4 | Standing figure, lightbulb head | `layout-423.jsx` — centre column |
| 5 | Two teal sparkle clusters | `layout-423.jsx` |
| 6 | Two hands holding flowers | `layout-237.jsx` — above the heading |
| 7 | Starburst mark | `layout-254.jsx` — above the heading |
| 8 | Opened envelope, pen, sparkles | `cta-25.jsx` — right half |
| 9 | Torn-paper top edge | `footer-04.jsx` — full-bleed at the top edge |

Plus `playfair-display-italic-400.woff2` for `public/fonts/`.

Two layouts are deliberately one column short until their asset lands, because
an empty grid track between two text columns reads as a missing section rather
than as space:

- `layout-423` is `lg:grid-cols-2`; the Figma is `1fr 1.1fr 1fr`.
- `cta-25` has no grid; the Figma is two columns.

Both comments say exactly what to change.

## Open question — the testimonial

**Not touched, and it needs a decision before launch.**

The Figma shows *Sarah Mitchell, Executive Director, Behavioral Health*, with an
avatar, a photo beside it, carousel arrows and a dot indicator.

The comment at `testimonial-10.jsx:6` records that all of this was deliberately
deleted: the Relume export shipped a two-slide carousel where both slides were
the *same invented quote* from that name, with a CloudFront placeholder avatar
and a stock photo whose alt text was `"Webflow logo 1"`. It was replaced with a
real attribution — *Kylie Smith, Owner, LifeBridge Mentorship* — and a note that
her actual words are still pending.

So the Figma appears to have been mocked up on the old placeholder data, and
building it as drawn would put a fabricated testimonial from a named executive
back onto a CARF-accredited healthcare site. The live version was left in place.

Resolve as one of:

- **Sarah Mitchell is real** → supply the quote and her photo, build as drawn.
- **Still placeholder** → keep the current version; swap in Kylie Smith's words
  when they arrive.
- **Build as drawn anyway** → needs an explicit decision and a hard commitment
  to replace the content before launch.

The same fake testimonial is still duplicated in `faq-for-test/` and `page-20/`,
which are `robots: { index: false }` scratch pages and were left alone.

## Copy transcription — please verify

The body copy was transcribed from a screenshot, not from the Figma file, so
these strings should be diffed against the source before launch. Headings and
short labels are high-confidence; the longer bodies are the ones to check. The
FAQ answers matter most — two of them make claims about clinical scope and
accreditation.
