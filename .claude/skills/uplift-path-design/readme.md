# Uplift Path — Design System

Uplift Path is a consulting firm serving behavioral health providers, nonprofits, educational institutions and early-stage founders. The business consulting practice is national in scope; the individual services (peer coaching, mental health therapy, counseling) are delivered in Ohio. The tagline is **"Uplifting every life we serve"** — page 1 of the brand guidelines sets it in caps as UPLIFTING EVERY LIFE WE SERVE, and it is the line the site leads with. **"One Path. Two Ways Forward." is not the tagline.** It is a positioning line about the two audiences: **businesses** (operational consulting, advisory services, systems & technology, compliance support, credentialing, resource assistance, AI consultation) and **individuals** (peer coaching, mental health therapy, counseling). Describe it that way, never as the tagline.

The brand guidelines give vision, mission and purpose on page 2. They are the wording to defer to:

- **Vision** — "A future where uplifting every life we serve is at the heart of every system we build, where clear and sustainable pathways unlock potential through trusted collaboration, holistic support, and the resources needed for everyone to thrive and create meaningful growth."
- **Mission** — "To empower individuals, businesses and communities to navigate change and foster growth by providing strategic consulting, coaching services, access to essential resources, and personalized support."
- **Purpose** — "To uplift every life we serve by unlocking true potential through clear and sustainable pathways to meaningful growth."

The stated goal is **to uplift 100,000 lives nationwide by 2036**. The site renders it as "To impact 100K lives by uplifting the individuals, businesses, and communities we serve by 2036" — same commitment, and the brand doc is the authority on the number and the reach.

The six core values are **UPLIFT**: Unity Through Collaboration, Pathways with Clarity, Lead with Compassion, Inclusion for All, Foster Hope, Total Person Care. "Client" is the wrong noun in mission copy — the brand says "every life we serve", not "every client we serve".

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

## Versions

**v2 — 2026-08-28.** The Relume export described under Sources. Everything below is v2 unless a line says otherwise.

**v3 — 2026-09-08.** A Figma homepage redesign (file `vbs2QJkAZE0ahMaKTa0Z46`, frame `Homepage`, node `10264-1164`, 1440x6558), pulled via the Figma REST API. It is a homepage-scoped update plus one deliberate cross-site change, not a re-skin — the type scale, spacing rhythm, radii, borders and the one-ledge shadow rule are all unchanged, and v2's h2/h4/h5 tokens already matched the new frame exactly.

What v3 changed:

| | Change |
|---|---|
| Hero | Pale mint wash (`.hero-fade`) behind the whole first screen; the two framing hand illustrations removed; sub-copy replaced with the Figma's own line at 22px. "Where would you like to start?" sits **above** the two cards, not below as the frame has it |
| Italic headings | The real Playfair Display Medium Italic (500) is now self-hosted. It was not before, so all four italic clauses were browser-synthesised slants of the 400 roman |
| Three steps | Heart and two sparkle decoratives removed; heading down to 50px on the Figma's own track proportions; step titles are Playfair 25px/**700**; the three step bodies are the only justified text on the site |
| What Actually Changes | Now sits on a full-bleed pale-green pattern band |
| Who We Work With | Starburst removed; the centre illustration replaced by a **looping video** in a stadium mask with two offset 1px outlines. Figma carries it as a placed GIF on a `gifRef`, not a video fill — the node's `imageRef` is only a poster frame |
| Testimonial | Restored to a carousel, but driven off a data array — controls render only when there is more than one entry |
| Footer *(cross-site)* | Band moved from `.scheme-accent` `#08D1A7` to `.scheme-jade` `#01A66E` with white text; torn edge re-exported in the new green; nav rebuilt from 5 links to four headed, left-aligned columns carrying the Figma's 13 destinations |

Two things in the v3 frame were deliberately **not** taken:

- **Body type.** The frame sets the hero sub-copy and the three step bodies in Inter. The navbar and every other body run in the same frame specify Lexend Deca, so Inter is an inconsistency in the design file, not a type change. Lexend Deca stands; the hero measure was widened from the Figma's 839px to 856px so the design's two-line break survives the wider face.
- ~~**White text on the footer green.**~~ Raised, then explicitly asked for, and now **taken**: the band is white on `#01A66E`, which is 3.14:1 against the 4.5:1 its 14px links need. A known, scoped exception — see `tokens/schemes.css` for the two routes back to AA.

The footer's link **grouping** is ours, not the frame's: the Figma stacks all seven service links in the middle of the band under one "Uplift Services" heading, which reads as an undifferentiated block. Same thirteen destinations, regrouped into Company / Start here / Services and left-aligned across the band, with "Company", "Start here" and "Follow" added as headings the frame does not have.

**v3 — About Us, 2026-09-08.** Same file, frame `About us`, node `10358-8178`, 1440x7563. An *incremental* pass: four of the page's eight sections already matched the frame and were left alone (Our Core Values, Our team, Board of Advisory, and the team portraits, which are byte-identical to the shipped files). What changed:

| | Change |
|---|---|
| Hero | Rebuilt from a centred single column into the frame's two-column opener: a four-tile collage left, tagline / heading / two justified paragraphs / button right. The bottom-left tile is a **video** (again a `gifRef`, again with the `imageRef` as poster). Tile radii are the frame's literal 71/80/68px — unlike the homepage montage these are *under* Figma's clamp, so they are not `rounded-full`; they are expressed in `cqw` so they hold their proportion as the collage scales |
| Why Uplift Path | Was a full-bleed **Relume placeholder video** under a black scrim. The frame draws a flat green band and no imagery. Now `.scheme-green-deep`; heading is Playfair 44px/**700** |
| Vision & Mission | Gains the media it was missing: a tall 60px-radius **video** with two offset 1px outlines, same composition pattern as the homepage montage |
| FAQ | Replaced with the frame's About-specific questions — but only the two the frame actually answers. Its other two answers are authoring notes ("Needs your answer — founding year"), so those are **not** shipped; two of the export's generic answers stand behind them |
| CTA | Re-skinned to match the homepage's v3 CTA, which is what this frame also draws: white rather than green, copy left-aligned, envelope illustration beside it |

Deliberate departures on this page:

- **The green band's fill.** The frame draws white on `#06A785`, which is 3.06:1 and fails AA for its 18px SemiBold body. Raised, and the decision was route 1 of the two `tokens/schemes.css` already lists: keep the white, darken the fill. `#05866B` is the same hue at the same saturation, and white on it is 4.54:1. **This is not a second contrast exception** — `.scheme-jade` remains the only one.
- **Team card portraits** stay 3:2 with a "Read more" clamp rather than the frame's square portraits and full bios, which is the pre-existing documented departure, re-confirmed rather than reverted.
- **The frame's wordmark + CARF lockup above the torn edge is the footer's own first band**, not a page section — `footer-04.jsx` already renders it on every route. Worth knowing before building one: it is easy to read as a separate pre-footer element from the node list, because it sits outside the footer group in the frame.
- **Justification** on the hero copy is held to `lg`. The frame only specifies it at the 554px measure; justifying the full-width mobile column tears rivers through it.

Two answers are still outstanding on this page and are blocked on the client, not on the build: the founding year, and how "100,000 lives uplifted" is counted. Both are questions the frame asks and does not answer.

Also not taken: the frame's testimonial placeholders (a grey CloudFront avatar, a node named "Placeholder Logo", and two invented attributions), and its two footer typos ("AI Conosultatin", "Advisory  services").

**v3 — How We Work, 2026-09-08.** Same file, frame `How we work`, node `10214-103297`, 1440x5223. Also *incremental*: the frame's 22 top-level children flatten to the same five sections the page already had, and the hero and the FAQ's four questions and answers matched verbatim. What changed:

| | Change |
|---|---|
| Three simple steps | The second pillar is **Kaizen**, which is what the frame calls it. The Relume export had shipped this card as a byte-identical copy of the first, so the section promised three pillars and showed two; an earlier pass patched the gap by writing one called "Clarity". The frame resolves it properly. Cards also take the frame's uneven 640/608 columns rather than two equal halves, which is what makes the small cards split 320/320 between copy and image |
| What You'll Experience | Icons are **Viking dark** `#41B19A`, which is what the frame draws, and are self-hosted and applied as CSS masks — the export set `text-scheme-text` on an `<img>`, which cannot tint anything. The centre media is a **video** (a third `gifRef`, poster again on the `imageRef`), 449x708 at r20. A new decorative curve sits behind the foot of the section |
| FAQ *(found here, applies site-wide)* | Questions are Lexend Deca **700**, not Playfair 400 |
| CTA | Re-skinned to the same v3 CTA as the homepage and About Us |
| Hero | Its heading was an `<h2>`, leaving the route with no `<h1>`. Promoted; the type is unchanged |

The FAQ finding is the one worth carrying off this page: **all nineteen frames in the Figma file** — the v2 desktop set and the v3 rebuilds alike — set FAQ questions in Lexend Deca 18/27 weight 700, and the build renders them in Playfair Display 400 on all eleven routes that carry an FAQ. Two causes compound: Radix's `AccordionPrimitive.Header` renders an `<h3>`, which the base `h1–h6` Playfair rule catches, and the trigger's `font-bold` resolves through `--font-weight-bold`, which this brand pins to 400 on purpose. Fixed by composing `font-body font-[700]` at the call site — two classes, because `cn()` is tailwind-merge and only drops `font-bold` when a real font-weight utility lands beside it. Applied on `/how-we-work`, `/for-individual-page`, `/for-business-page`, `/advisory-services` and `/systems-&-technology`; the other six are a site-wide change awaiting a decision.

Deliberate departures on this page:

- **The duplicated value.** The frame lists "The people behind it" twice, once per column, with two rewordings of the same sentence — the export's own duplication carried into the design file, leaving a section headed "six core values" showing five, one of which is an About Us line rather than a value. The two slots keep Collaboration and Inclusion, the U and the I in UPLIFT, which an earlier pass put there.
- **Section rhythm.** The frame's five inter-section gaps run 197px to 332px with no pattern — the signature of hand-placed blocks, not a designed rhythm. Rather than hard-code four different paddings, `layout-365` and `layout-254` were moved onto the brand's standard `py-16 md:py-24 lg:py-28`, which the page's other three sections already use. That lands every gap at 224px, inside the frame's own spread.
- **The CTA's horizontal inset.** This frame puts the CTA heading at x=171, and so does the About Us frame; both pages ship it at the container edge, x=80. Left consistent with the two pages already under review rather than changed on one of three.

The curve is `--color-plantation` `#274D40` at 20% opacity — flat colour in a shape, so it is **not** a third gradient/texture exception. Its path is the frame's own vector, inlined so nothing is redrawn by hand, sized in percentages of the viewport so it holds its relationship to the page at every width.

A caution when measuring against this frame: several blocks in it — both hero cards, the CARF strip, and the CTA illustration — are **pasted screenshots of the built site**, placed with non-uniform `STRETCH` scaling (the cards are 594x392 in the frame against a real 624x407). Their absolute y-positions therefore carry error that is not design intent. Match the designed values and the gaps between elements, not those blocks' box geometry.

**v3 — For Business, 2026-09-09.** Same file, frame `For Business`, node `10214-104878`, 1440x5203. The most *incremental* pass yet: four of the page's six sections already matched the frame, and the two that did not are ones the frame is wrong about rather than ones the build is. What changed:

| | Change |
|---|---|
| `layout-134` Hero | Gains two decorative line-art vignettes — a target struck by arrows left, a lit bulb right. Type was already exact. Promoted from `<h2>` to `<h1>`: the route had none, the same gap How We Work and For Individual had |
| `faq-01` | Question face corrected to Lexend Deca 700, and the "Which industries" answer replaced — see below |
| `cta-25` | Re-skinned to the same v3 CTA as the other four pages: white rather than green, copy left-aligned, envelope illustration beside it |
| `services-list`, `timeline-05` | **Left alone by decision.** The frame does not contain them; it contains two three-up icon grids in their place |

**The frame's two icon grids were refused.** It draws "Business Consultation That Fuels Your Growth" (Expert Advice / Process To Improve / Access Tools) and "Our Simple 3-Step Consultation Process" (Submit Request / Discovery Call / Expert Guidance) where the build has `services-list` and `timeline-05`. Those two sections were written when `/business-conusltation` was merged into this page, and the merge dropped `layout-237` and `layout-237_1` — these exact two grids — as redundant. The frame predates or ignores that merge. Taking it literally would trade six real, linked service cards (the same array the navbar mega-menu renders, and the target of the `/business-conusltation` 301) for three generic icon columns, and four specific engagement steps for Relume filler. The giveaway: the frame's grid standfirst is **word-for-word** `services-list`'s own. Raised and settled before building.

**The "Which industries" answer was replaced.** The frame answers it with untouched Relume boilerplate — "across all industries, from startups and SaaS ventures to retail, manufacturing, and professional services" — a claim this company cannot support and one that contradicts the CARF and behavioural-health positioning the rest of the site sells. Replaced with the answer `ui_kits/website/Chrome.jsx` already carries. The frame's other three answers and all four questions ship verbatim.

Two frame typos were fixed rather than reproduced, both in the hero: "for Businesses Growth", and a body sentence running "…for founders and leaders Transform challenges…" with no full stop.

**The Figma API was unusable on this pass and the reference render carried it.** `/v1/files/:key?ids=…&geometry=paths` — the endpoint the previous four passes relied on — now 429s alongside `/v1/files/:key/nodes` and `/v1/images`, all three with `x-figma-plan-tier: starter`, `x-figma-rate-limit-type: low` and a `Retry-After` of 322k–334k seconds (~3.8 days). That is the account quota, not a throttle, and no backoff reaches it; `/v1/me` still returns 200, so it is not auth. Only `/v1/files/:key/images` survives. Everything on this page was therefore measured off the 2x reference render, which is pixel-accurate, and the two vignettes were cut from it directly and un-composited off the white page with a min-channel alpha key (round-trips over white to a mean channel difference of 0.04). **Plan for this: the geometry endpoint should be assumed gone for the remaining frames.**

**No new tokens.** Every value the frame asked for already had one: `--text-h2` 52/62.4, `--text-h4` 36/46.8, 18/27 and 16/24 body, the 1280 container, the 12px control radius. No new colour, shadow, radius or scheme, and no new gradient — the page is flat white end to end apart from the footer's jade band.

**v3 — the three service pages, 2026-09-09.** Frames `AI Consultancy` (1440x4467), `Advisory Services` (1440x5229) and `System & Technology` (1440x5010), each an incremental pass onto the page that already existed. Recorded in full in `docs/figma-ai-consultation-v3-2026-09-09.md`, `docs/figma-advisory-services-v3-2026-09-09.md` and `docs/figma-systems-technology-v3-2026-09-09.md`. **No new tokens on any of the three.**

The pattern across all three: every hero gained two line-art vignettes and was promoted to `<h1>`, every FAQ took the Lexend Deca 700 question face, and every CTA took the v3 re-skin. What differed was how much was broken underneath.

| | The real finding |
|---|---|
| AI Consultation | All three service cards were **byte-identical** — one service listed three times under a standfirst promising "a full suite". The frame's three distinct cards ship. Also: five `<h1>`s on one route, icons hot-linked off jsdelivr at `@latest` and rendering black because `text-scheme-text` was set on an `<img>` |
| Advisory Services | Three lists were **not lists** — items jammed into one `<p>` with "1." and "- " typed as literal characters, rendering as walls of text with no list semantics. Now real `<ol>`/`<ul>`. The tab set around them went too: each trigger held its own body, so all three were always visible and clicking only swapped a photo |
| Systems & Technology | Timeline step 05 "Hand over" carried step 01's body verbatim — **and the frame carries it too**, so the frame does not fix everything |

Three techniques from this batch worth reusing:

- **Isolating a vignette that shares rows with text.** On both Advisory and Systems a naive bounding box swallowed the centred copy and over-reported a vignette's width by 150-230px. Measure the x-extent over only the y bands the neighbouring text leaves free, then take the y-extent within that x. Every vignette on these three pages lands at Δ0 against the frame that way.
- **Matching a frame photo to a file already in the repo.** Centre-crop each candidate to the frame region's aspect, thumbnail both to 48x48, compare. On Advisory the correct match scored 2-18 and every wrong one 68+ — an unambiguous gap. It found that the feature card's photo was not the file the export had there, and that two files in `public/images` are the same photograph at 5x different sizes.
- **Comparing against an RGBA file.** `Image.open(...).convert("RGB")` composites transparency onto **black**, which made a correct match read 208. Composite onto white first; the same comparison then reads 21.8.

The `--color-caribbean-green-dark` `#06A785` already in the palette is what the AI Consultancy frame draws its approach icons in, so those icons are self-hosted from `/svgs` and applied as CSS masks — the treatment `how-we-work/layout-254` established, and the reason no new colour was needed.

## Content fundamentals

**Voice.** Plain, calm, operational. It sells clarity rather than transformation. Sentences are declarative and moderate-length; the copy explains what happens and in what order, and rarely reaches for adjectives. No exclamation marks anywhere on the site.

**Person.** "We" for Uplift Path, "you"/"your" for the reader. Never "I". Never a named author. The reader's organization is "your practice", "your team", "your organisation".

**Casing.** Sentence case in body copy. Headings are inconsistently cased in the source and that inconsistency is real — some are title case ("Create Clear, Sustainable Pathways to Meaningful Growth", "Empowering Success Across Industries"), some sentence case ("Ready to unlock Your growth plan", "Everything under one roof"). Eyebrows above headings are sentence case with a middot separator: "Uplift Solutions · For Businesses". Breadcrumbs use "›": "Home › For Businesses › Advisory Services".

**Signature vocabulary.** "Uplift" is used as a verb and as a product prefix — Uplift Strategy, Uplift Systems, Uplift Growth, Uplift Services, Uplift Solutions. "Pathway" is the core metaphor and appears as a named artifact: *your Pathway Plan*. Recurring nouns: clarity, pathway, progress, sustainable, measurable, co-create, support, systems, milestones. The word "co-create" carries the brand's positioning — the client is a participant, not a recipient.

**Sentence patterns.** Section intros very often end on a payoff clause introduced by "so": "We turn complexity into clear, sustainable pathways co-created so every step is supported and success is measurable." Benefit lists come in threes.

**CTA labels.** Short imperatives, title case: "Get Started", "Book a discovery call", "Book a session", "Schedule a Consultation", "Start", "Learn more", "Submit". The homepage hero does not use plain side-by-side CTAs: it presents an audience selector — two bordered cards, "For Businesses" and "For Individuals", each with a one-line descriptor — which is the one place the "One Path. Two Ways Forward." positioning is expressed.

**Testimonials** are first-person, one sentence, specific about the feeling of relief rather than about ROI: *"The fog lifted. For the first time in years I could see the next step and the one after that."* — Sarah Mitchell, Executive Director, Behavioral Health.

**Spelling** mixes US and UK forms in the source ("optimize" and "optimise", "organization" and "organisation"). Prefer US spelling in new copy; do not "fix" existing strings.

**No emoji.** Not in copy, not in UI, not in headings. Icons do that job.

## Visual foundations

**Colour.** A near-white page, black-ish text (`#000A08`, never pure black), and one loud accent: Caribbean Green `#08D1A7`. Pickled Bluewood `#2C3E50` is the dark counterweight; Cerulean and Viking (mint) are supporting tints used for washes and occasional full-bleed sections. The homepage runs almost entirely on the white scheme, then hits the green CTA banner at the bottom — that single colour block is the page's only strong colour event. Sections carry exactly one scheme class (`.scheme-light`, `.scheme-accent`, `.scheme-navy`, `.scheme-mint`, `.scheme-deep-teal`, `.scheme-cerulean-deep`, `.scheme-black`), which sets background, text, border and accent together, and children read from `--color-scheme-*`. Never more than one dark section adjacent to another. v3 adds an eighth scheme, `.scheme-jade` (`#01A66E`), used by the footer band only, and a ninth, `.scheme-green-deep` (`#05866B`), used by the About Us green band only — four palette entries in all: `--color-viking-faintest` `#F0FFFC` for the hero wash, `--color-jade`, `--color-caribbean-green-deep`, and `--color-plantation` `#274D40`, the How We Work curve, which is a decorative shape rather than a scheme.

**Type.** Two families, split by job. As of v3 the Playfair **italic** (Medium, 500) is self-hosted too, and `.font-heading-italic` sets style *and* weight — registered at 500, so style alone falls back to a synthesised slant of the roman. Playfair Display for headings — a high-contrast serif carrying all the warmth: weight 400 for section headings h2–h6, weight 600 for the hero H1. Lexend Deca for everything else: body, nav, buttons, labels, eyebrows. Weight 400 is default; 500 on buttons, 600 on eyebrows, FAQ questions and footer nav. Note the source sets `--font-weight-bold: 400`, so a "bold" section heading is still regular weight — h2–h6 never actually bolden. The hero H1 is the exception: Playfair Display SemiBold at 4.5rem, tight (-0.02em). Type scale doubles up at 992px (h1 2.75rem → 4.5rem). v3 adds one step **above** h1: `--text-display`, 3rem → **5rem** (80/96 at -1%), introduced by the For Individual page's "Care built around *your life*" heading and used nowhere else. Two utilities reach a family by name, and both exist because the family is otherwise only reachable through the base `h1–h6` rule: `.font-body` (Lexend Deca, for the FAQ questions) and `.font-heading` (Playfair Display, for the For Individual step numerals — decorative, `aria-hidden`, and deliberately not headings).

**Spacing.** Every section is `padding-inline: 5%` with `padding-block` stepping 4rem → 6rem (768px) → 7rem (992px). The page shell is an 80rem centred container; heading blocks cap at 48rem; text columns at 35rem. A section heading block sits 3rem above its content (5rem at desktop), and a heading sits 1.25–1.5rem above its supporting paragraph. Grids use 2rem gaps, 3rem at desktop.

**Backgrounds.** Flat colour, with two named v3 exceptions and no others. No gradients in buttons, in cards, or behind text; no noise. Where an image sits behind type it gets a flat 50% darkest-neutral scrim, never a directional protection gradient. The exceptions, both introduced by the 2026-09-08 homepage and both scoped to it: `.hero-fade`, a pale mint wash behind the first screen (see `tokens/effects.css` for why it is nine stops and not two), and a full-bleed pale-green **pattern** band behind the "What Actually Changes" section — the one place a repeating texture is allowed. Neither is a licence to add a third; a new gradient or texture still needs a design decision behind it.

**Motion imagery.** v3 introduces the first moving asset on the site: a silent, looping, autoplaying video in the homepage's "Who We Work With" mask. Self-hosted MP4 + WebM under `public/videos/`, never a GIF (the Figma source was a 30MB GIF; transcoded it is under 1MB), always with a poster frame that is the video's own first frame unmasked, and always suppressed under `prefers-reduced-motion`. Masks and outlines go in CSS, not baked into the asset.

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
