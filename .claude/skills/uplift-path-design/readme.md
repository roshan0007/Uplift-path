# Uplift Path — Design System

Uplift Path is a consulting firm serving behavioral health providers, nonprofits, educational institutions and early-stage founders — mostly in Ohio. The tagline the site leads with is "One Path. Two Ways Forward.", referring to its two audiences: **businesses** (operational consulting, advisory services, systems & technology, compliance support, credentialing, resource assistance, AI consultation) and **individuals** (peer coaching, mental health therapy, counseling). Its stated goal is "to impact 100K lives by uplifting the individuals, businesses, and communities we serve by 2036."

There is one product surface: a multi-page marketing website. It has 16 pages — Home, About Us, How We Work, For Individuals, For Businesses, Business Consultation, AI Consultation, Advisory Services, Systems & Technology, Compliance Support, Resource Assistance, Career, Contact Us, plus Accessibility, Privacy Policy and Terms of Use. Every page follows the same spine: navbar → hero → two to four content sections → FAQ accordion → green CTA banner → footer.

## Sources

This system was built from one attached, read-only codebase — a Relume export dated 2026-08-28, mounted locally as:

```
demo-site-design-uplift-design/
├─ DESIGN.md        design tokens as YAML (colours, type scale, radii, 7 colour schemes)
├─ sitemap.md       all 16 pages, section order, component per section, scheme per section
├─ assets.md        exact placement of every logo, image and SVG
├─ react/globals.css  the same tokens as Tailwind v4 @theme custom properties
├─ react/@/components/ui/   13 UI primitives (shadcn/Radix-based)
├─ react/components/        ~70 page sections, one file per section
├─ homepage/        full-page + per-section screenshots of the built homepage
├─ logo/ images/ svgs/ fonts/
└─ README.md
```

No Figma file, GitHub repo or slide deck was provided. The homepage screenshots in `reference/homepage/` were used to resolve places where the code and the rendered result disagree (see the H1 note under Visual Foundations).

## Content fundamentals

**Voice.** Plain, calm, operational. It sells clarity rather than transformation. Sentences are declarative and moderate-length; the copy explains what happens and in what order, and rarely reaches for adjectives. No exclamation marks anywhere on the site.

**Person.** "We" for Uplift Path, "you"/"your" for the reader. Never "I". Never a named author. The reader's organization is "your practice", "your team", "your organisation".

**Casing.** Sentence case in body copy. Headings are inconsistently cased in the source and that inconsistency is real — some are title case ("Create Clear, Sustainable Pathways to Meaningful Growth", "Empowering Success Across Industries"), some sentence case ("Ready to unlock Your growth plan", "Everything under one roof"). Eyebrows above headings are sentence case with a middot separator: "Uplift Solutions · For Businesses". Breadcrumbs use "›": "Home › For Businesses › Advisory Services".

**Signature vocabulary.** "Uplift" is used as a verb and as a product prefix — Uplift Strategy, Uplift Systems, Uplift Growth, Uplift Services, Uplift Solutions. "Pathway" is the core metaphor and appears as a named artifact: *your Pathway Plan*. Recurring nouns: clarity, pathway, progress, sustainable, measurable, co-create, support, systems, milestones. The word "co-create" carries the brand's positioning — the client is a participant, not a recipient.

**Sentence patterns.** Section intros very often end on a payoff clause introduced by "so": "We turn complexity into clear, sustainable pathways co-created so every step is supported and success is measurable." Benefit lists come in threes.

**CTA labels.** Short imperatives, title case: "Get Started", "Book a discovery call", "Book a session", "Schedule a Consultation", "Start", "Learn more", "Submit". Two CTAs sit side by side in the hero, one per audience: "Business" / "Individual".

**Testimonials** are first-person, one sentence, specific about the feeling of relief rather than about ROI: *"The fog lifted. For the first time in years I could see the next step and the one after that."* — Sarah Mitchell, Executive Director, Behavioral Health.

**Spelling** mixes US and UK forms in the source ("optimize" and "optimise", "organization" and "organisation"). Prefer US spelling in new copy; do not "fix" existing strings.

**No emoji.** Not in copy, not in UI, not in headings. Icons do that job.

## Visual foundations

**Colour.** A near-white page, black-ish text (`#000A08`, never pure black), and one loud accent: Caribbean Green `#08D1A7`. Pickled Bluewood `#2C3E50` is the dark counterweight; Cerulean and Viking (mint) are supporting tints used for washes and occasional full-bleed sections. The homepage runs almost entirely on the white scheme, then hits the green CTA banner at the bottom — that single colour block is the page's only strong colour event. Sections carry exactly one scheme class (`.scheme-light`, `.scheme-accent`, `.scheme-navy`, `.scheme-mint`, `.scheme-deep-teal`, `.scheme-cerulean-deep`, `.scheme-black`), which sets background, text, border and accent together, and children read from `--color-scheme-*`. Never more than one dark section adjacent to another.

**Type.** Two families, split by job. Playfair Display for headings — a high-contrast serif carrying all the warmth: weight 400 for section headings h2–h6, weight 600 for the hero H1. Lexend Deca for everything else: body, nav, buttons, labels, eyebrows. Weight 400 is default; 500 on buttons, 600 on eyebrows, FAQ questions and footer nav. Note the source sets `--font-weight-bold: 400`, so a "bold" section heading is still regular weight — h2–h6 never actually bolden. The hero H1 is the exception: Playfair Display SemiBold at 4.5rem, tight (-0.02em). Type scale doubles up at 992px (h1 2.75rem → 4.5rem).

**Spacing.** Every section is `padding-inline: 5%` with `padding-block` stepping 4rem → 6rem (768px) → 7rem (992px). The page shell is an 80rem centred container; heading blocks cap at 48rem; text columns at 35rem. A section heading block sits 3rem above its content (5rem at desktop), and a heading sits 1.25–1.5rem above its supporting paragraph. Grids use 2rem gaps, 3rem at desktop.

**Backgrounds.** Flat colour only. No gradients anywhere — not in sections, not in buttons, not behind text. No repeating patterns, no textures, no noise. Where an image sits behind type it gets a flat 50% darkest-neutral scrim, never a directional protection gradient.

**Imagery.** Two distinct kinds. (1) Loose hand-drawn line illustrations — black ink outlines with flat Caribbean Green / dark-teal fills, figures mid-gesture, on a plain grey or white ground. These carry the conceptual sections. (2) Straight photography for hero and feature slots, warm and mid-contrast, no filter, no duotone, no grain. Both get an 8px radius; illustrations are often `object-fit: contain` on their grey ground, photos `cover`.

**Borders.** The system is drawn, not shadowed. 2px solid borders on buttons, cards, inputs and select triggers; 1px hairlines for accordion rules, the footer divider, the nav dropdown sheet and carousel arrows. Borders always take the scheme colour — dark on light sections, white on dark ones.

**Shadows.** Zero blur, ever. The only shadow in the system is a hard 3px ledge under a control (`0 3px 0 0 <edge colour>`). Hovering translates the control down 3px and removes the ledge, so the button visibly presses into the page. There are no soft drop shadows on cards, modals or dropdowns.

**Hover and press.** Buttons: translate down onto the ledge (200ms ease-in-out). Inputs and select triggers: wash with 5% of the text colour (10% white on dark). Links: reduce opacity. Image cards on the homepage grow their flex basis and darken by 50% while the description slides up from 50px. Ghost buttons invert to dark background / white text. There is no separate press state — hover and press look identical, which is why the ledge reads as a press.

**Motion.** Restrained and short: 200ms for controls, 300ms for dropdowns and reveals, 400ms for the mobile menu height, 600ms `cubic-bezier(0.4,0,0.2,1)` for tab content fades. Reveals are opacity + a small y-translate. Accordions animate height. Chevrons rotate 180°. Long marquee/loop keyframes exist in the source for logo strips (20–50s linear infinite). Nothing bounces, nothing springs, nothing scales on hover.

**Radii.** Buttons, inputs and select triggers 12px (the source calls this the "bubble" style). Cards and images 8px ("edgy"). Tags 6px, checkboxes 4px, avatars and dots fully round. Carousel arrows are 48px squares at 8px — the one control that isn't a bubble.

**Cards.** Flat: 2px border in the scheme colour, 8px radius, no shadow, no fill beyond the scheme foreground. Content slots pad 24px. Image cards drop the border entirely (`BackgroundCard`) so the photo runs to the corner. On dark sections the card becomes a 1px white outline on transparent.

**Transparency and blur.** No backdrop blur anywhere. Transparency appears only as flat alpha: the 50% image scrim, the 90% modal overlay, 5–15% hover washes, 20% inactive carousel dots, and the 60% placeholder text.

**Fixed elements.** The navbar is the only one — sticky at the top with a `z-index: 999`, 64px tall on mobile and 72px at desktop. No sticky CTAs, no floating buttons, no cookie bar in the source.

**Layout rules.** Centred, symmetrical, generous. Section heading blocks are centred; two-column hero splits are 1:1 with the image on the right; feature rows are 3-up; the "Empowering Success Across Industries" section is a 1 / 1.5 / 1 grid with an illustration in the middle. Content is never full-width — the 5% inline padding and 80rem container always hold.

## Iconography

**Material Symbols Rounded, weight 500** is the icon system. The source loads individual glyph SVGs straight from jsDelivr (`@material-symbols/svg-500@latest/rounded/<name>.svg`) as `<img>` tags, and imports React versions of the same glyph set from a private `relume-icons` package. Ten of the actual SVGs shipped in the export and are in `assets/svgs/` (`navbar-0.svg` … `navbar-9.svg`) — all Material Symbols with `viewBox="0 -960 960 960"` and `fill="currentColor"`.

There is no custom icon font, no sprite sheet, and no hand-drawn icon set. Icons are used at exactly two sizes: **48px** for section feature icons (the three "Uplift Outcomes" glyphs, the four industry glyphs) and **24px** for UI (chevrons, checks, closes, contact glyphs, dropdown items). They are monochrome, inheriting the scheme text colour, and never coloured green.

Glyphs the live site uses: `step`, `settings`, `progress_activity`, `psychology_alt`, `work`, `edit`, `partner_reports`, `add_business`, `business_messages`, `chat_info`, `medical_services`, `support`, `devices`, `assistant_device`, `more_time`, `keyboard_arrow_down`, `keyboard_arrow_up`, `chevron_right`, `arrow_back`, `arrow_forward`, `check`, `close`, `mail`, `call`, `location_on`, `star`.

Unicode characters do double duty as typographic marks, not icons: `›` in breadcrumbs, `·` in eyebrows, `—` in body copy. No emoji.

**Substitutions, flagged:**
- `relume-icons` is a private package and could not be read. The `Icon` component pulls the same glyphs from the public Material Symbols Rounded 500 set on jsDelivr, which is what the source's own `<img>` tags do. Glyph shapes should match; if any Relume icon is bespoke, it will differ.
- The footer's five social logos (Facebook, Instagram, X, LinkedIn, YouTube) came from `relume-icons` too. The UI kit renders them from **Simple Icons** via jsDelivr — same filled-brand-mark style as the screenshot, but not byte-identical.

## Logo

One file was provided: `assets/logo/logo-light.png` (996×345, transparent) — a mark of a figure rising from a leaf beside a two-line "UPLIFT PATH" wordmark. The mark is teal, the wordmark near-black. There is no dark variant; `assets.md` points both light and dark slots at the same file, and dark sections knock it out to solid white with `filter: brightness(0) invert(1)` (the `.logo-alt` utility). No SVG version was supplied.

## Fonts

Both families are self-hosted from the export's woff2 files in `assets/fonts/` — Lexend Deca 300–800 and Playfair Display 400–700. No substitution was needed. The source's own `globals.css` also imports them from the Google Fonts CDN, but its README says to use the bundled files; `tokens/fonts.css` does that.

## Index

Root files:

| File | What it is |
|---|---|
| `readme.md` | This guide |
| `SKILL.md` | Agent-Skills front matter for use outside this project |
| `styles.css` | Global CSS entry point — `@import` lines only |
| `thumbnail.html` | Project tile |
| `tokens/` | `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `radius.css`, `effects.css`, `schemes.css`, `base.css` |
| `guidelines/` | 22 foundation specimen cards (Colors, Type, Spacing, Brand) |
| `assets/` | `logo/`, `fonts/`, `images/` (49 illustrations and photos), `svgs/` (10 Material Symbols) |
| `components/` | Reusable primitives, grouped below |
| `ui_kits/website/` | Click-through recreation of the marketing site |
| `reference/homepage/` | Source screenshots kept for comparison |
| `design-export/` | The Relume export this system was built from, kept for this repo: `DESIGN.md`, `sitemap.md`, `assets.md`, `RELUME-README.md`, `globals.original.css` (what `app/globals.css` is derived from) and `screenshots/` |

### Components

Built to match the source's own inventory in `react/@/components/ui` — 13 families, nothing added beyond the `Icon` wrapper.

`components/actions/` — **Button**, **Icon**
`components/forms/` — **Input**, **Textarea**, **Label**, **Select**, **Checkbox**, **Radio**, **RadioGroup**
`components/surfaces/` — **Card** (+ `BackgroundCard`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`), **Accordion**, **Tabs**, **Carousel**, **Dialog**, **VideoEmbed**

Each directory has a `.d.ts` props contract, a `.prompt.md` usage note, and one `@dsCard` HTML showing states side by side.

**Intentional additions.** `Icon` — the source has no Icon component; glyphs arrive as raw `<img>` tags or from the unreadable `relume-icons`. A wrapper was needed so glyphs inherit scheme colour on dark sections.

**Deliberate omissions.** No Badge, Tag, Toast, Tooltip, Avatar, Breadcrumb or Pagination component — the source defines none, even though `--radius-badge` and `--radius-tag` tokens exist. Breadcrumbs and eyebrows are plain paragraphs on the live site; keep them that way.

### UI kit

`ui_kits/website/` recreates three screens with working navigation:

- **Home** — hero, the three expanding Pathway cards, Uplift Outcomes, Empowering Success Across Industries, testimonial carousel, FAQ, green CTA banner
- **For Businesses** — breadcrumb hero, six service cards, "Why founders choose us" on the mint scheme, four consulting services on the navy scheme, FAQ, CTA
- **Contact Us** — hero, and the full contact form on the navy scheme with a submitted state

`Chrome.jsx` holds the navbar (with the hover dropdown), footer, section heading, CTA banner and FAQ block; one file per screen alongside.

### Colour scheme numbering

`DESIGN.md` lists seven schemes numbered 1–7, and `react/globals.css` defines three utilities numbered 1–3 — with different meanings (DESIGN.md's scheme 4 is white; globals' scheme-1 is white). This system uses **named** classes to avoid the collision, with `.scheme-1/2/3` kept as aliases matching the code, since the code is what the site actually renders:

| Named class | Background | DESIGN.md | globals.css |
|---|---|---|---|
| `.scheme-light` | `#FFFFFF` | 4 | `.scheme-1` |
| `.scheme-accent` | `#08D1A7` | 1 | `.scheme-2` |
| `.scheme-navy` | `#2C3E50` | 2 | `.scheme-3` |
| `.scheme-mint` | `#DCF8F2` | 5 | — |
| `.scheme-deep-teal` | `#035342` | 7 | — |
| `.scheme-cerulean-deep` | `#003F53` | 6 | — |
| `.scheme-black` | `#000000` | 3 | — |
