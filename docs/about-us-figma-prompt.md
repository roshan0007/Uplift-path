# Prompt — About Us page, 2026-09 Figma

Paste everything below the line into a new Claude Code session in this repo.

---

Rebuild the **About Us** page (`/about-us`) to the 2026-09 Figma. The homepage
and the shared footer/navbar are already done on branch
`figma-homepage-2026-09`; branch off that, don't start from `master`.

## Read first

1. `CLAUDE.md` — the rules are real and several of them are load-bearing.
2. The `uplift-path-design` skill (`.claude/skills/uplift-path-design/`).
3. **`docs/figma-homepage-2026-09.md`** — the record of the homepage pass. It
   documents the method, the traps, and the four decisions still open. Read it
   before touching anything; it will save you the mistakes I already made.

## Inputs

- **Page export:** `C:\Users\sarfa\Downloads\Uplift Path about us\About us@2x.png`
  — 2880 × 13596, i.e. **2x** of a 1440 canvas. Already copied to
  `figma-inbox/pages/about-us.png` and sliced into
  `figma-inbox/pages/sliced/about-us-01..08.png`.
- **Assets:** three PNGs in the same Downloads folder (details below).

## Method — measure, don't eyeball

This is the part that mattered most on the homepage. Do the same:

- **Never read a full-page export as one image.** A 13596px-tall PNG downsamples
  to unreadable. `python figma-inbox/slice.py <file>` cuts it into ~2000px
  overlapping strips normalised to a 1500px long edge, which reads cleanly.
- **The assets exported at 2x, so native size ÷ 2 is the true size on the 1440
  canvas.** Set widths from that, not from taste.
- **Find positions by correlating each asset's silhouette against the page
  export**, then verify in the browser with `getBoundingClientRect` against the
  Figma coordinate. The homepage landed within 11px horizontally and 0px
  vertically that way. Guessing put some elements 45% out.
- Sample colours out of the export with Pillow and match them to a token in
  `globals.css`. Do not eyedrop a screenshot. On the homepage this turned up two
  distinct greens (`caribbean-green-dark` and `viking-dark`) where I had assumed
  one.

## Section map

Figma order, against what the page composes today
(`app/(site)/about-us/page.tsx`):

| # | Figma section | Component |
|---|---|---|
| 1 | Hero — "Uplift Path" + intro, hands illustration | `layout-134.jsx` |
| 2 | "Our Core Values" — 6 items, teal icons | `layout-237.jsx` |
| 3 | "Why Uplift Path" — **dark band** | `layout-183.jsx` |
| 4 | "Our team" — 3 headshots, bios, social icons | `team-06.jsx` |
| 5 | "Board of Advisory" — Regina Wooten, Tasha Coppett, Teresa Guerin, Tia Glaspie | `layout-507.jsx` |
| 6 | "Where We're Headed — and How We Get There" | `layout-54.jsx` |
| 7 | "Frequently Asked Questions" | `faq-01.jsx` |
| 8 | CTA "Ready to unlock Your growth plan" | `cta-25.jsx` |

Verify that mapping against the strips before editing — I inferred it from
section order, not from reading every component.

## Assets supplied — and what they are

Figma exported them under stock-library filenames; rename on the way into
`public/images/` to match the existing convention (`about-us-*`).

| File | Size (2x) | What it is |
|---|---|---|
| `18880313_v911-a-01-b 1-1.png` | 1026×420 | hands passing a small wrapped gift |
| `18880313_v911-a-01-b 1.png` | 642×510 | hands passing a heart |
| `hand-drawn-sparkling-star-collection 4.png` | 426×340 | star / sparkle cluster |

**Filename collision — watch this one.** That third file has the *same name* as
a homepage asset but **different content**: the homepage's
`hand-drawn-sparkling-star-collection 4.png` was 264×262 and became
`public/images/home-audience-starburst.png`. Give this one a distinct
`about-us-*` name or you will clobber the homepage's starburst.

**The core-values icons are not in that list and don't need to be.** All six are
teal Material Symbols. Use the existing `components/ui/symbol-icon.jsx` and
sample the export for the exact token — the homepage used
`caribbean-green-dark #06a785` and `viking-dark #41b19a`, so check rather than
assume.

## What is missing — ask, don't invent

- **The three team headshots** (Julia Gilliam, Devyani Balladin, Martha
  Matthews). Not supplied. The page cannot be finished without them.
- **The Board of Advisory photo** (Regina Wooten appears with a portrait).
- **`playfair-display-italic-400.woff2`** — still outstanding from the
  homepage pass. Any italic heading clause renders as a synthesised slant until
  it lands. See marker `[6]` in `globals.css`.

## Raise these before building — they are not yours to decide

**1. The three team headshots look AI-generated.** Uniform grey studio backdrops,
very smooth symmetric faces, identical framing and wardrobe. They are captioned
with real names, real job titles (Chief Compliance Officer, Chief Operating
Officer, Chief Risk Officer) and detailed biographies. Publishing generated
faces as a named leadership team on a CARF-accredited behavioral-health site is
a misrepresentation problem, not a design preference. **Flag it and get an
answer before wiring them in.** There is precedent in this repo: the homepage
testimonial was left untouched for the same reason — see the "Open question" in
`docs/figma-homepage-2026-09.md` and the comment at `testimonial-10.jsx:6`.

**2. Each team member carries LinkedIn, X and Dribbble icons.** Dribbble for a
behavioral-health COO is Relume boilerplate, and these almost certainly point at
`"#"`. `CLAUDE.md` notes every nav and footer link is still `href="#"`, and
`footer-04.jsx` records the rule already applied once: *a dead icon is worse
than no icon* — the Facebook mark was removed for exactly this. Ask which
accounts actually exist and drop the rest.

**3. The stock filenames.** `18880313_v911-a-01-b` is a stock-library ID. The
homepage's torn-paper asset arrived as a watermarked *preview* — "Torn Paper"
in white serif over Lorem ipsum baked into the pixels — and had to be cropped
and re-toned. **Open every asset and look at it before use.** Also check for
stray content: `home-hero-hands-gift.png` shipped with a detached plant sprout
caught inside its export bounds that is not in the design.

**4. The "Why Uplift Path" band is a dark neutral grey**, not one of the seven
schemes' obvious fills. Sample it and find the matching token before assigning a
scheme class. Do not invent a colour; if it isn't in `globals.css` it isn't in
the brand.

## Traps that already cost time on the homepage

- **`.btn-dark` on any scheme except `scheme-accent` renders an invisible
  label.** Every other scheme carries a nested default-button colour rule at
  `0-3-0` that beats `.btn-dark`'s `0-2-0` white label, so you get black text on
  a black fill. Pair it with `.btn-dark-on-light`. The CTA on this page will hit
  this if it moves off green.
- **Turbopack silently drops newly-defined utilities on HMR.** If a brand-new
  `@utility` looks like it isn't applying, restart the dev server before
  debugging the CSS.
- **`max-w-*` is remapped in this design system.** `max-w-md` is 35rem/560px,
  not Tailwind's 448px — `globals.css` points the `max-w` scale at its own
  container tokens. Check before using one for a measured width.
- **A negative margin on a grid item in an `items-center` row shifts its
  siblings.** It shortens the row and re-centres everything; on the homepage it
  dragged a heading 42px out of place. Use `translate` for a purely visual
  offset.
- **Don't render an empty grid track** where an asset is missing. A hole between
  two text columns reads as a broken section. Collapse the grid and leave a
  comment saying what to restore.
- **Decorative art needs `overflow-hidden` on its section**, `alt=""`,
  `aria-hidden`, and `pointer-events-none`. Without the first, a bleeding
  illustration widens `document.scrollWidth` and gives the whole site a
  horizontal scrollbar.

## Verify

The Browser pane's screenshots only paint reliably at `scrollY: 0` when the
pane is hidden, and they crop under viewport emulation if the real pane is
narrower than the emulated width. Prefer `read_page`, `get_page_text` and
`javascript_tool` geometry reads — they are accurate regardless.

Before you call it done:

- every element within ~10px of its Figma coordinate at 1440;
- **zero WCAG AA contrast failures** — sweep every text node against its
  computed background, don't spot-check;
- no horizontal scroll at 375, 768, 1024, 1440 and 1920;
- no broken images;
- `pnpm build` clean across all 23 routes.

## Scope

About Us only. The navbar and footer are done and shared — don't re-do them. If
something in shared chrome is genuinely wrong, say so and commit it separately
rather than folding it into a page commit.

Do not restyle sections that didn't change. `CLAUDE.md`: the sections came out
of Relume already styled to this system, and the job is to change what the Figma
changed and nothing else.

Write the record to `docs/figma-about-us-2026-09.md` in the same shape as the
homepage one — what changed, deliberate departures with measured numbers, what's
still outstanding, and any open questions.
