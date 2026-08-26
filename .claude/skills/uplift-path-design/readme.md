# Uplift Path — Design System

Uplift Path is a consulting and support practice with two audiences held in one brand: **organizations** (behavioral health providers, educational institutions, nonprofits, startups) and **individuals** (telehealth peer coaching, therapy, counseling). The organizational side sells operational consulting, advisory services, systems & technology, compliance support, credentialing, resource assistance and AI consultation. The individual side sells confidential, remote care.

The brand's job is to make a heavy subject feel steady. Deep-green and near-black type on white and mint, one saturated green for action, photography of real people in real rooms with a dark scrim over it, and a serif that reads calm rather than corporate.

There is one product surface: the **marketing website**. No app, no dashboard, no docs site appears in the source.

## Sources

Everything here was derived from one attached read-only codebase:

- `demo-site-design-uplift-design/` — a design bundle exported from **Relume** (relume.io) on 2026-08-26.
  - `DESIGN.md` — machine-readable tokens (colors, type scale, radii, the eight section schemes)
  - `react/globals.css` — the same tokens as Tailwind v4 `@theme` custom properties
  - `react/@/components/ui/*.jsx` — 13 shadcn/Radix-style primitives; **this is the component inventory**
  - `react/components/**` — ~70 page-section components across 16 pages
  - `sitemap.md`, `assets.md` — page structure, scheme per section, asset placement
  - `homepage/*.png` — full-page and per-section screenshots (copied to `reference/homepage/`)
  - `fonts/`, `logo/`, `images/`, `svgs/`

No Figma file, no live URL, no slide deck was provided.

**One source conflict, flagged:** `DESIGN.md` defines eight schemes; `react/globals.css` defines only four `@utility scheme-*` rules with different colour assignments. `DESIGN.md` is the document the export tells you to read first, and its eight schemes are what `sitemap.md` references, so `tokens/schemes.css` implements the DESIGN.md eight. If the CSS is actually authoritative, tell me and I'll swap them.

---

## Content fundamentals

**Voice.** Plain, declarative, unhurried. Sentences are short and complete; there is very little hedging and no exclamation. The register sits between a clinician and an operator — competent, unsentimental, warm at the edges.

**Person.** Second person for the reader, first-person plural for the company. "Whether **you're** seeking compassionate mental-health support…", "**We** turn complexity into clear, sustainable pathways". Never "I". The company also appears by name where reassurance matters: "Uplift Path pairs you with experienced guidance."

**Casing.** Sentence case is the default and the safest choice. The site is genuinely inconsistent above it — "Carry less alone" and "The difference is clear" sit alongside Title Case headings like "Create Clear, Sustainable Pathways to Meaningful Growth" and "Our Simple 3-Step Consultation Process". Eyebrows are sentence case ("For individuals", "How we help organizations thrive"). Buttons are Title Case more often than not: "Get Started", "Schedule a Consultation", "Book a discovery call" (that last one sentence case — the inconsistency is in the source).

**Structure of a section.** Almost every section is the same three-part block, centred, max 48rem: semibold eyebrow → Playfair heading → one supporting sentence. Then the content grid. Copy the rhythm, not just the styles.

**Headlines.** Two modes. Emotional and short for the individual-facing sections — "Carry less alone", "Find a clear path through the fog of uncertainty", "Build a foundation that holds steady under pressure". Descriptive and functional for the business-facing ones — "Consulting that turns plans into progress", "Everything under one roof", "Industries we serve".

**Body copy.** One idea per sentence, 15–30 words. Outcome-led: "so your practice can grow while staying true to its mission", "so every step is supported and success is measurable". The word *clear* / *clarity* recurs deliberately, as do *sustainable*, *measurable*, *systems*, *pathway*, *steady*, *support*.

**Testimonials** are first-person, single-sentence, and about relief rather than ROI: *"The fog lifted. For the first time in years I could see the next step and the one after that."*

**Links and CTAs.** "Explore", "Learn more", "Read more", "About" for in-page links; "Contact", "Get Started", "Book a discovery call", "Schedule a Consultation", "Book Your AI Strategy Session", "Sign up", "Subscribe", "Submit" for actions. Never "Click here", never "Learn More →" with a typed arrow — trailing chevrons are icons.

**Legal/microcopy** is small, plain and unapologetic: "By clicking Sign Up you're confirming that you agree with our Terms and Conditions." / "We respect your privacy and only send valuable content to help your organization thrive."

**Emoji: none.** Not in headings, not in cards, not in nav. Do not introduce them.

**Spelling** mixes US and UK forms in the source (*optimization* and *optimise*, *behavioral* and *behavioural*). Write US English for new copy.

---

## Visual foundations

**Colour.** One saturated brand green — Caribbean Green `#08d1a7` — used almost exclusively for the primary button. Everything else is quiet: white and Viking Lighter `#dcf8f2` for page bands, Pickled Bluewood `#2c3e50` for the dark CTA banner and dark form sections, near-black `#000a08` for all body text. Viking Dark `#41b19a` is the sub-page hero band. Two backgrounds per page is the norm: white plus one mint or navy band. Full palette in `tokens/colors.css`.

**Schemes, not ad-hoc colours.** Every section carries exactly one `.scheme-N` class, and children read `--color-scheme-background / -foreground / -text / -accent / -border`. Never hardcode a section colour — switch the scheme. Scheme 4 (white) is the default; 5 (mint) is the alternate band; 2 (navy) is the CTA; 8 (Viking Dark) is the sub-page hero.

**Type.** Playfair Display for every heading, always weight 400 — the source explicitly remaps `--font-weight-bold` to 400, so "bold" headings are regular weight with a `-1%` tracking. Lexend Deca for everything else, 400 body / 500 buttons / 600 eyebrows and nav / 700 FAQ triggers. Desktop h1 72px, h2 52px, h3 44px, h4 36px; mobile 44/40/32/24. Body 18px desktop, 16px mobile.

**Layout.** `padding: 7rem 5%` on desktop sections (`4rem` mobile, `6rem` tablet), content centred at `max-width: 80rem`. Text blocks cap at 48rem and centre. Card grids are 2-up or 3-up with 2rem gaps. The navbar is sticky, 4.5rem tall, and the only fixed element.

**Backgrounds and imagery.** Photography, never illustration; no patterns, no textures, no gradients anywhere in the source. Images are warm-neutral documentary photographs of people at work — laptops, offices, telehealth calls, handshakes — with natural colour, no filter, no grain, no duotone. Any image that carries text over it gets a flat 50% near-black scrim (`--scrim`) across the whole image, not a bottom-up gradient. Text sits bottom-left over the scrim.

**Cards.** "Edgy" style: 2px solid border in the scheme border colour, 8px radius, scheme foreground fill, and **no shadow at all**. There is no elevation system in this brand — depth comes from borders and scrims. Image tiles (`BackgroundCard`) drop the border entirely and just clip to 8px.

**Corner radii.** Buttons 6px, cards 8px, images 8px, form fields 6px, badges 6px, carousel controls 4px, checkbox 2px. Nothing is fully rounded except avatars and carousel dots.

**Borders.** 2px is the brand's border weight (cards, buttons, dividers, input underlines). 1px hairlines appear only inside data structures — comparison-table rows, accordion rules, dropdown panels.

**Forms.** Underline-only. Inputs, textareas and selects draw a single 2px bottom border (`--color-neutral-darkest-15` on light, `--color-white-10` on dark) with a transparent fill. No boxes, no filled fields, no focus rings — focus is `outline: none`.

**Animation.** Restrained and functional. 200ms `ease-in-out` for hover/colour changes; 300ms for dropdown and disclosure reveals; 400ms for the mobile menu height. Chevrons rotate 180°. Accordions animate height. Feature cards expand their flex basis to 70% on hover over 200ms while their body copy fades and slides up 50px. Tabs cross-fade over 600ms `cubic-bezier(0.4,0,0.2,1)`. Marquee loops (20–50s linear) exist for logo strips. No bounce, no spring, no scroll-triggered reveals.

**Hover states.** Filled buttons darken (`#08d1a7` → `#06a785`); white buttons go to `#d8dad9`. Outlined buttons pick up a 5% near-black wash. Image cards darken by 50% and grow. Links do not change colour — they reveal or expand instead.

**Press states.** None. No transform, no scale, no active colour. Disabled is `opacity: 0.5` with pointer events off.

**Transparency and blur.** Blur appears in exactly one place: `backdrop-filter: blur(10px)` on the secondary button, so it stays legible over photography. Otherwise transparency is used only for hairlines, hover washes and placeholder text, through the `--color-white-N` / `--color-neutral-darkest-N` ramps.

**Protection.** Flat scrims, never capsules or protection gradients. Logo protection is handled by inverting the mark (`.logo-alt`) rather than by placing it on a plate.

---

## Iconography

**One system: Material Symbols Rounded, weight 500**, loaded per-glyph as SVG from `https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/<name>.svg`. This is exactly what the exported site does — it writes `<img src="…/rounded/work.svg">` inline. The `Icon` component wraps that URL in a CSS mask so the glyph inherits `color` from the current scheme, which the raw `<img>` version could not do.

The source also imports a handful of glyphs from a private `relume-icons` package (`Check`, `Close`, `ChevronRight`, `KeyboardArrowDown/Up`, `ArrowBack/Forward`, `StarFull`, `CircleFull`, `Mail`, `Call`, `LocationOn`, `ProgressActivity`, `FacebookLogo`, `InstagramLogo`, `XLogo`, `LinkedinLogo`, `RelumeIcon`). **That package is not in the bundle**, so those are substituted with the equivalent Material Symbols Rounded names — a like-for-like swap in stroke weight and corner treatment, except for the four social logos, which Material Symbols does not carry. Those currently render as a generic `public` glyph in the UI kit and need real brand marks. **Flagged for you below.**

Glyph names in active use: `work`, `star_shine`, `stars`, `computer`, `support_agent`, `science`, `support`, `overview`, `enterprise`, `design_services`, `api`, `strategy`, `handshake`, `bar_chart`, `category_search`, `check`, `close`, `chevron_right`, `keyboard_arrow_down`, `keyboard_arrow_up`, `arrow_back`, `arrow_forward`, `mail`, `call`, `location_on`, `star`, `verified`, `progress_activity`.

Icons render at 24px inline, 40–48px as feature-card marks. **No emoji. No unicode glyphs used as icons.** There is no icon font and no sprite sheet.

The three SVGs the export pulled off the homepage are copied to `assets/svgs/` as-is.

---

## Assets

- `assets/logo/logo-light.png` — the Uplift Path wordmark and leaf/figure mark (996×345, transparent). The export ships **one** logo file; the dark-background variant is this same file inverted via `.logo-alt` (`filter: brightness(0) invert(1)`), which is what the source does. There is no standalone mark-only lockup and no SVG version — worth requesting.
- `assets/fonts/` — Playfair Display 400–900 and Lexend Deca 300–700, woff2, self-hosted. Do not load these from the Google Fonts CDN.
- `assets/images/` — 16 of the 60 photographs in the export, chosen to cover the homepage, one sub-page hero, the CTA banner and the contact header. The rest stay in the source bundle; ask if you need more.
- `assets/svgs/` — the three inline homepage SVGs.
- `reference/homepage/` — the source screenshots, for layout comparison.

---

## Index

| Path | What it is |
|---|---|
| `production.md` | **How to use this in a Next.js app** — component map, setup, sanity checklist |
| `styles.css` | Entry point — `@import`s only. Link this one file. |
| `tokens/colors.css` | Palette, transparency ramps, semantic aliases |
| `tokens/typography.css` | Font families, weights, responsive type scale |
| `tokens/spacing.css` | Spacing scale, section rhythm, containers, breakpoints |
| `tokens/shape.css` | Radii, border widths, durations, easings, keyframes |
| `tokens/schemes.css` | The eight `.scheme-N` section schemes |
| `tokens/fonts.css` | `@font-face` for the bundled woff2 files |
| `tokens/base.css` | Element defaults (headings, body, links) |
| `tokens/tailwind-theme.css` | The same tokens as a Tailwind v4 `@theme` block (not imported — for your app) |
| `guidelines/*.card.html` | Foundation specimen cards (Colors, Type, Spacing, Brand) |
| `components/core/` | Card, BackgroundCard, Accordion, Tabs, Carousel, Dialog, Icon, VideoIframe |
| `components/forms/` | Button, Input, Textarea, Label, Checkbox, RadioGroup, Select |
| `ui_kits/website/` | Click-through recreation of the marketing site |
| `reference/` | Source screenshots |
| `SKILL.md` | Agent Skills entry point |

### Components

Mirrors the 13 primitives in `react/@/components/ui/`, one for one:

**Core** — `Accordion` (with `AccordionItem`, `AccordionTrigger`, `AccordionContent`), `Card` (with `BackgroundCard`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`), `Carousel` (with `CarouselContent`, `CarouselItem`, `CarouselPrevious`, `CarouselNext`, `CarouselDots`), `Dialog` (with `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`), `Icon`, `Tabs` (with `TabsList`, `TabsTrigger`, `TabsContent`), `VideoIframe`.

**Forms** — `Button`, `Checkbox`, `Input`, `Label`, `RadioGroup` (with `RadioGroupItem`), `Select`, `Textarea`.

#### Intentional additions

- **`Icon`** — the source has no icon component, just inline `<img>` tags and imports from the unavailable `relume-icons`. A single wrapper gives every glyph the scheme's text colour and one place to swap the icon set later.
- **`CarouselDots`** — the source builds dot pagination inline inside `testimonial-10.jsx` rather than in the Carousel file. Lifted into the component so kits don't re-derive it.

Nothing else was invented. There is no Toast, Avatar, Badge, Tooltip or Breadcrumb component here because the source defines none.

### UI kit

`ui_kits/website/index.html` — Home, For Businesses and Contact, with working nav mega-menus, page switching, hover-expanding image cards, the FAQ accordion, the testimonial carousel and all form controls. See `ui_kits/website/README.md` for the section-by-section mapping back to the source components.

---

## Known gaps

1. **Social logos.** Facebook, Instagram, X and LinkedIn marks came from `relume-icons`, which is not distributable. The footer currently uses a placeholder glyph. Real SVGs needed.
2. **Logo formats.** One PNG, light variant only, no SVG, no mark-only lockup.
3. **Scheme conflict.** `DESIGN.md` (8 schemes) vs `react/globals.css` (4, different). DESIGN.md implemented.
4. **Images.** 16 of 60 copied; `layout-419` and `layout-613` in the UI kit reuse photos from neighbouring sections (the source points those at Relume CDN URLs that aren't in the export).
5. **`for-business-page/cta-40.jsx` not read.** The business page's CTA uses the headline `sitemap.md` states for it. Everything else on that page is verbatim from the section components.
6. **Mobile.** The kit is a desktop recreation at 1440. The mobile type scale is in the tokens; the mobile layouts are not built.
