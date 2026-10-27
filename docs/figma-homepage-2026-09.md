# Homepage — 2026-09 Figma pass

Branch `figma-homepage-2026-09`. Homepage only, plus one cross-site footer
change. Built from a Figma export of the `Homepage` frame (1440 × 6431).

The other four pages in that Figma file (About us, How we work, and the two For
Individual frames) are **not** done. Only the shared footer moved on them.

## What changed

| Section | Component | Change |
|---|---|---|
| Hero | `header-104.jsx` | New h1 with an italic clause; "Where would you like to start?" moved below the cards; framing illustrations. Sub-copy **kept as it was** — see below |
| Trust strip | `trust-strip.jsx` | Untouched |
| Three steps | `layout-423.jsx` | **Restructured.** Three image cards → three-column text layout with the lightbulb figure |
| What Actually Changes | `layout-237.jsx` | Heading + sub-copy only; the three items were already correct |
| Who We Work With | `layout-254.jsx` | Heading + sub-copy + all four item bodies; real alt text |
| Testimonial | `testimonial-10.jsx` | **Untouched — see Open question below** |
| FAQ | `faq-01.jsx` | All four Q&As replaced; refactored to a data array |
| CTA | `cta-25.jsx` | Green → white, centred → left-aligned, envelope illustration added |
| Navbar | `navbar-12.jsx` | "How We Work" added between About and Uplift Services. **Cross-site.** |
| Footer | `footer-04.jsx` | Rebuilt as two bands: white logo lockup, torn edge, green nav + legal. **Cross-site.** |

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

### The navbar was missing an item

The Figma navbar reads **Home · About · How We Work · Uplift Services · Careers**.
The code had it without "How We Work", so `/how-we-work` was reachable from the
footer alone — and more so after the Figma redesign, which drops the three
`/how-we-work` links the old three-step cards carried.

`CLAUDE.md` had recorded the design system's own reference homepage as having
drifted from the code on account of an "extra nav item". That was this item,
and the reference was right. Worth correcting that note.

### The footer is two bands, not one

Rebuilt to the Figma rather than just recoloured:

- the **logo and CARF seal moved out of the green** into a white band above the
  tear, centred — which is also the better place for an accreditation mark,
  since it reads against the page rather than against a brand-coloured field;
- the "CARF accredited" text label beside the seal is gone, per the Figma;
- the nav row is **centred** with LinkedIn positioned out at the right, rather
  than sitting in a three-track grid;
- the divider is **narrow and centred** (454px), not full-bleed;
- the torn edge is **two-tone**. The Figma has a darker green shadow under the
  tear; the first pass flattened the source's two greens into one and lost that
  depth. They now map to `caribbean-green` and `caribbean-green-dark`.

Measured against the export: divider within **1px**, nav and legal rows within
**9px**.

This is the one file carrying two scheme classes. The intent behind
one-scheme-per-section still holds — the white band is `scheme-1` throughout,
the green band `scheme-accent` throughout. They are two regions sharing a
`<footer>`, not one region with two minds.

### The hero sub-copy was reverted

The Figma sets it to "Uplift Path helps individuals find whole-person support
and helps organizations build stronger programs. CARF accredited. Based in
Columbus, Ohio." That was built, then reverted on request to the previous line
("Unlock progress and meaningful growth…"). The CARF claim it carried is in any
case made properly by the trust strip directly below, where the seal links to
CARF's provider listing as proof.

### One asset carried a stray fragment

`home-hero-hands-gift.png` came out of Figma with a **detached plant sprout** in
its lower-left corner — a neighbouring layer caught inside the export bounds.
It is not in the design. Removed by connected-component analysis rather than a
blind crop, so the canvas stays 552×894 and the measured geometry still holds.
Worth checking the other eight for the same thing if they are ever re-exported.

## Deliberate departures from the Figma

Two, both flagged rather than silently applied.

**1. Footer text is dark, not white.** The Figma sets white text on the green.
Measured against every green in the brand, white fails WCAG AA for body text at
this size:

| fill | white on it |
|---|---|
| `caribbean-green` `#08d1a7` | **1.96:1** |
| `caribbean-green-dark` `#06a785` | **3.06:1** |
| `viking-dark` `#41b19a` | **2.63:1** |
| the Figma's own green `~#1db35a` | **2.75:1** |

`CLAUDE.md` names dark-on-green as the only approved pairing, and the brief was
to follow the brand guidelines where the Figma's colours disagree. So the fill
is the brand green and the text is the dark neutral, at **10.21:1**.

If white text is wanted, the fix is the fill and not the label: swap
`scheme-accent` for `scheme-deep-teal` on the green band
(`caribbean-green-darker` `#035342`), which carries white at **9.05:1** and is a
real brand scheme — DESIGN.md's scheme 7. The torn edge would want re-toning to
match. Never pair white with `scheme-accent`.

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

## Assets — done

All nine illustrations are in `public/images/`, renamed from Figma's layer names
(`Rectangle 1.png`, `7.png`, `9833802_27050 1.png`) to match the existing
convention:

| Figma export | In repo |
|---|---|
| `Rectangle 1.png` | `home-hero-hands-envelope.png` |
| `Rectangle 2.png` | `home-hero-hands-gift.png` |
| `Rectangle 5.png` | `home-steps-hand-heart.png` |
| `7.png` | `home-steps-lightbulb.png` |
| `hand-drawn-sparkling-star-collection 2.png` | `home-steps-sparkle-a.png` |
| `hand-drawn-sparkling-star-collection 3.png` | `home-steps-sparkle-b.png` |
| `Rectangle 3.png` | `home-changes-hands-flowers.png` |
| `hand-drawn-sparkling-star-collection 4.png` | `home-audience-starburst.png` |
| `Screenshot 2026-08-27 170613 1.png` | `home-cta-envelope.png` |
| `9833802_27050 1.png` | `footer-torn-edge.png` (processed — see below) |

### Geometry was measured, not eyeballed

The batch exported at 2x, so each asset's native size ÷ 2 is its true size on
the 1440 canvas. Positions were found by correlating each asset's silhouette
against the 2x page export. Every element is now within 11px horizontally and
0px vertically of the Figma; the residual 9–11px is the browser scrollbar,
which the Figma canvas does not have.

Three findings that a by-eye pass would have got wrong:

- The middle column of `layout-423` is the **narrowest** of the three
  (~413 / 342 / 371), not the widest. The grid is `1.1fr 0.9fr 1fr`.
- The lightbulb figure is **right-aligned in its track and 84px above the row's
  vertical centre**, not centred in either axis. The lift is a `translate`: a
  negative margin shortens the `items-center` row and drags the heading 42px
  with it.
- The heart and both sparkles **belong to no column**. They are anchored to the
  section at percentages of the 1440 canvas (10%, 21.7%, 72.9%), and
  `lg:pt-56` on the section buys the top room the Figma gives them so they do
  not reach up into the CARF strip.

### The footer asset was a watermarked stock preview

`9833802_27050 1.png` had **"Torn Paper"** set in large white serif over a Lorem
ipsum paragraph, baked into the pixels from y≈260 down. The top 250px were
clean, so the file is cropped to those and every opaque pixel recoloured to
`--color-caribbean-green`, discarding the stock file's own green (which was not
a brand colour).

**This needs a licensing check.** The filename is a stock-library ID pattern and
the source was a preview render. If the project has a license, drop the clean
download in at `public/images/footer-torn-edge.png` and neither the crop nor the
recolour is needed. If it does not, this asset should be replaced.

### Icon colours came from the file, not a guess

The seven section icons are Material Symbols masked to `currentColor` (see
`components/ui/symbol-icon.jsx`). Sampling the page export gave two exact brand
tokens, confirmed against the user's own icon PNGs:

- **first icon in each section** → `--color-caribbean-green-dark` `#06a785`
- **every other icon** → `--color-viking-dark` `#41b19a`

That one-of-four asymmetry repeats identically in both sections. It is
reproduced as-is since both are brand tokens, but it looks like copy-paste
drift rather than intent — worth confirming.

## Still outstanding

- **`playfair-display-italic-400.woff2`.** Five headings set an italic clause
  and no italic face is self-hosted, so they render as a synthesised slant. Drop
  the file into `public/fonts/` and uncomment block `[6]` in `globals.css`.
- **The "Who We Work With" centre image.** The 2x page export has the speech-
  bubble line illustration, which is what is in place
  (`home-benefits-section.png`). A later screenshot of the live Figma showed a
  **photograph** there instead, so the design moved after the export. If the
  photo is current, it needs supplying — and it is a real person, so it also
  needs a release.

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
