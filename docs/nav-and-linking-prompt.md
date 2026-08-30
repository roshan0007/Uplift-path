# Uplift Path — navbar mega-menu + site-wide interlinking

Two jobs on the current `master` (`1df10d7`, the v2 Relume import):

1. **Rebuild the "Uplift Services" mega-menu** — centred, shorter, wider, split
   Business / Individual, with the real service list.
2. **Wire every link on the site.** Nothing navigates today. Not one link, not
   one button.

Read `CLAUDE.md` first, then `.claude/skills/uplift-path-design/readme.md`. The
design rules there are binding: don't restyle sections, don't invent colours,
radii or shadows, one scheme class per section, no emoji, no gradients.

Everything below marked **MEASURED** was taken from the running site at
1440 × 900 on 2026-08-28. Those are facts, not guesses — don't re-derive them,
but do re-measure after you change things.

---

## Job 1 — the mega-menu

### Where it lives

`components/sections/navbar-12.jsx`. The panel is the `ConditionalRenderedCard`
inside `<AnimatePresence>`, roughly lines 190–350. Its className today:

```
bg-scheme-background py-4 lg:absolute lg:right-[186px] lg:z-50 lg:max-w-[640px]
lg:border lg:border-scheme-border lg:p-6 lg:[--y-close:25%]
```

`ConditionalCard` swaps the element between `motion.nav` (mobile) and
`motion.create(Card)` (desktop) — leave that mechanism alone, it was fixed
during the import and there are comments explaining why.

### What's wrong with it now

**MEASURED at 1440 × 900:**

| | Now | Target |
|---|---|---|
| Panel width | 640 px | wider — see below |
| Panel x-range | 599 → 1239 (right-anchored via `right-[186px]`) | horizontally centred |
| Panel height | **400 px**, spanning y 56 → 456 | **≤ 320 px**, bottom at or above y 400 |
| Columns | 2 | Business / Individual split |
| Items | 9, with wrong labels and mismatched descriptions | 6 business + 1 individual |

### The height constraint, precisely

This is the bit the request was most specific about: *"when hovered it should
just cover the h1 heading — the subtext should still be visible."*

**MEASURED on the homepage at 1440 × 900:**

- navbar bottom edge: **y = 72**
- hero `<h1>`: y 184 → **376** (two lines, 192 px)
- hero supporting paragraph: **y = 400** → 427

So the panel opens at y ≈ 72 and **must end above y = 400**. That is a hard
ceiling of **328 px of panel height**; build to **≤ 320 px** so there is a
visible gap above the paragraph. Verify by measuring, not by eye.

That ceiling is what forces the layout change. The current panel is 9 items in
2 columns (5 + 4) at 400 px including `p-6` (48 px vertical padding), so a row
costs roughly 70 px. Six business items stacked in a single column would be
~420 px + padding — too tall. **Put the six business items in a 2 × 3 grid** and
the tallest column becomes 3 rows ≈ 210 px + 48 px padding ≈ 260 px. That fits
with room to spare.

### Layout

Centred under the navbar, inside the existing 80 rem (1280 px) container.
Suggested shape — three columns, `Business` taking two of them:

```
┌────────────────────────────────────────────────────────────┐
│  For Businesses                          For Individuals   │
│  ┌──────────────────┬──────────────────┐ ┌───────────────┐ │
│  │ AI Consultation  │ Compliance Supp. │ │ Peer Coaching │ │
│  │ Advisory Serv.   │ Business Consult.│ │ Support       │ │
│  │ Systems & Tech.  │ Resource Assist. │ │ (Telehealth)  │ │
│  └──────────────────┴──────────────────┘ └───────────────┘ │
└────────────────────────────────────────────────────────────┘
```

Width: aim for **900–1040 px** at `lg`, capped by the container — wide enough
that the three-line descriptions don't wrap more than twice. Drop
`lg:right-[186px]` and centre it instead (`lg:left-1/2 lg:-translate-x-1/2`, or
anchor it to the container — either is fine, pick the one that survives a
1280 px viewport without touching the edges).

Keep: the 1 px hairline border (`lg:border lg:border-scheme-border`) — the
design system specifies a hairline for the nav dropdown sheet, not the 2 px card
border. Keep `bg-scheme-background`, the 200 ms transition, and the
`--y-close: 25%` slide.

Two column headings, styled like the section headings the export already uses in
nav sheets: `text-small leading-[1.3] font-semibold`.

### The content

Replace all 9 current items. The labels and descriptions below are what the site
owner asked for; the descriptions match `design-export/sitemap.md`'s own page
subheadings almost verbatim, so they are correct copy, not filler.

**For Businesses**

| Label | Description | Links to |
|---|---|---|
| AI Consultation | Leverage AI-driven strategies to streamline operations and decision-making. | `/ai-consultation` |
| Advisory Services | Strategic guidance tailored for behavioral health, nonprofit, education, and growing organizations. | `/advisory--services` |
| Systems & Technology | Build scalable systems, streamline operations, and improve organizational efficiency. | `/systems-&-technology` |
| Compliance Support | Support operational readiness and compliance processes. | `/compliance-support` |
| Business Consultation | Expert guidance to grow, optimize, and scale your business. | `/business-conusltation` |
| Resource Assistance | Helping organizations access tools, systems and operational support resources. | `/resource-assistance` |

**For Individuals**

| Label | Description | Links to |
|---|---|---|
| Peer Coaching Support (Telehealth) | Help navigating difficulties of life. | `/for-individual-page` |

Two notes on that copy:

- **The Resource Assistance description arrived truncated** in the request
  ("…access tools, systems, an"). The full sentence above is taken from
  `design-export/sitemap.md`, which is the source of the other five. Flag it in
  your summary so the owner can confirm.
- Make the two column headings link too: **For Businesses** →
  `/for-business-page`, **For Individuals** → `/for-individual-page`.

### Icons

Each item keeps a 24 px Material Symbols glyph, same `<img>` pattern the file
already uses (`https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/<name>.svg`).
Reuse glyphs already on the site where one fits; the design system's
`guidelines/iconography.html` lists the approved set. A workable mapping:

`business_messages` (AI Consultation), `medical_services` (Advisory Services),
`devices` (Systems & Technology), `more_time` (Compliance Support),
`add_business` (Business Consultation), `support` (Resource Assistance),
`chat_info` (Peer Coaching Support).

Icons are monochrome and inherit the scheme text colour. **Never colour them
green.**

### Mobile

Below 992 px the panel is a plain stacked `motion.nav` inside the burger menu —
the height ceiling and the centring are desktop-only concerns. Just make sure
the two groups still read as two labelled groups when stacked, and that the
burger menu still opens (see the warning at the bottom of this file).

### One ambiguity, with a default

The request opens with *"make the nav bar in middle, correct height"*. Read in
context — the next sentences are about the split and the hover height — this is
about the **dropdown panel**, and that is what this prompt specifies.

It could also mean the navbar's own links should be centred. Today they sit at
x 805–1139 with the logo left and the Contact button right, which matches
Relume's own `design-export/screenshots/01-navbar.png`.

**Default: change only the dropdown.** If you think the nav row itself was
meant, do the dropdown first, then ask — don't do both silently. Centring the
row is a one-line flex change and is trivially reversible either way.

---

## Job 2 — interlink the whole site

Every link and every button on this site is inert. **MEASURED:** 40
`href="#"` attributes and 36 `<Button>` elements that render a bare `<button>`
with no navigation at all. There is **not a single real href anywhere in
`components/sections/`**. This is the largest functional gap on the site.

### The routes

18, all live and indexed. Do not change a slug — the typos are load-bearing
because the site is indexed and a rename needs a 301.

```
/                        /about-us              /how-we-work
/for-business-page       /for-individual-page   /career
/contact-us              /business-conusltation /ai-consultation
/advisory--services      /systems-&-technology  /compliance-support
/resource-assistance     /accessibility         /privacy-policy
/terms-of-use            /faq-for-test *        /page-20 *
```

`*` noindex Relume scratch pages — never link to them.

### Navbar (`navbar-12.jsx`, 13 dead hrefs)

| Item | → |
|---|---|
| Logo | `/` |
| Home | `/` |
| About | `/about-us` |
| Uplift Services ▾ | the table above |
| Careers | `/career` |
| Contact (button) | `/contact-us` |

### Footer (`footer-04.jsx`, 12 dead hrefs)

| Item | → |
|---|---|
| Logo | `/` |
| Home | `/` |
| Services | `/for-business-page` |
| About | `/about-us` |
| Contact | `/contact-us` |
| Get started | `/contact-us` |
| Accessibility | `/accessibility` |
| Terms of service | `/terms-of-use` |
| Privacy Policy | `/privacy-policy` |
| **Grievance** | **no such page exists** — see below |
| Facebook, LinkedIn | real profile URLs, or remove |

**Grievance has no route and never did.** Don't invent a page and don't leave it
pointing at `#`. Default: leave the link exactly as it is and flag it — adding or
removing a footer item is the owner's call. The two social icons are the same
situation: the URLs aren't in the repo, so leave them and flag them rather than
guessing.

### In-page CTAs (36 buttons)

`components/ui/button.jsx` supports `asChild`, so a button becomes a link
without restyling:

```jsx
<Button asChild title="Get Started">
  <a href="/contact-us">Get Started</a>
</Button>
```

Use that. Do **not** add `onClick={() => router.push(...)}` — this is a static
export and a real `<a>` is what crawlers and middle-click need.

Destinations by label:

| Label | Where it appears | → |
|---|---|---|
| Get Started / Get started | all 11 `cta-25` banners, several `layout-134` heroes, `contact-09` | `/contact-us` |
| Book a discovery call | `advisory--services`, `compliance-support`, `resource-assistance`, `systems-&-technology` heroes | `/contact-us` |
| Book your AI strategy session | `ai-consultation/layout-134` | `/contact-us` |
| Business | `home/header-104` | `/for-business-page` |
| Individual | `home/header-104` | `/for-individual-page` |
| Explore Opportunities / Explore opportunities / Apply | `career/*` | `/career` for now — flag that there is no jobs board or ATS link in the repo |
| Explore | `business-conusltation/layout-353` | `/business-conusltation` |
| Learn more (×3) | `business-conusltation/layout-395` | the matching service page |
| Learn more (×3) | `home/layout-423`, `ai-consultation/layout-423` | see below |
| Submit | `contact-us/contact-06` | **leave alone** — it's a form submit, not a link |

For the three homepage `layout-423` cards (Discovery & Listening / Your Pathway
Plan / Measurable Progress) the whole card is already wrapped in an `<a href="#">`.
Point all three at `/how-we-work` — they describe the process — and give the
inner "Learn more" no separate href, so the card stays one link target. Same
pattern for `ai-consultation/layout-423`.

### Cross-links worth adding

Only if they need no new markup:

- `for-business-page/layout-237`'s three cards (Expert Advice / … / Access
  Tools) have no links at all, though `sitemap.md` describes this section as
  *"6 clickable service cards … each with a 'Learn more' link"*. The export
  shipped three unlinked cards instead. **Don't rebuild the section** — flag the
  gap and move on.
- `about-us/team-06` has 9 dead hrefs, all social icons on team-member cards.
  No profile URLs exist in the repo. Leave and flag.

### Gotchas

- **`/systems-&-technology` contains a literal `&`.** Test that route by
  clicking, not just by reading the code — verify it resolves both from
  `pnpm dev` and from the static build in `out/`. If it misbehaves, encode as
  `/systems-%26-technology` rather than renaming the route.
- **No `trailingSlash` is set** in `next.config.mjs`, and `wrangler.jsonc` uses
  `html_handling: "auto-trailing-slash"`. Write hrefs **without** a trailing
  slash and keep it consistent across all 18 routes, or you'll create redirect
  chains on a live indexed site.
- Use plain `<a href>` throughout, matching the export. Don't introduce
  `next/link` in some places and not others — pick one and be consistent. Plain
  `<a>` is the safer default here: every section is already written that way and
  the site is a static export.

---

## Definition of done

- `pnpm build` passes clean; 18 routes still prerender.
- Mega-menu: **measure it.** Panel bottom above y = 400 at 1440 × 900 with the
  homepage behind it, panel horizontally centred, 6 + 1 items with the copy
  above, all 7 pointing at real routes.
- Check the menu at 1280, 1440 and 1920 — it must not touch the viewport edges
  or overflow the container at any of them.
- **Zero `href="#"` left** in `components/sections/`, except the ones explicitly
  flagged as owner decisions (Grievance, social icons, team-member socials).
- Every route reachable from the homepage in at most two clicks.
- No console errors, no hydration errors, on desktop **and** at 375 px.
- No horizontal scrollbar at any width.
- Slugs unchanged. `faq-for-test` and `page-20` still noindex and still unlinked.

## Before you start

Read `docs/import-v2-report.md`, especially sections 6 and 7. Two things there
bear directly on this work:

- **The navbar dropdown and mobile menu were never verified with real input.**
  The import session couldn't drive real clicks or hover. Programmatic toggling
  flipped state correctly but Motion didn't animate either panel — and the live
  site behaved the same way under the same test, so it was inconclusive. **Drive
  both by hand before you change anything**, so you know whether you're fixing a
  pre-existing bug or introducing one. If the hover menu genuinely doesn't open,
  that is job zero and everything above depends on it.
- The v2 export shipped the mega-menu with mismatched labels and descriptions
  ("Business Consultation / About", "Advisory Services / Resources", "Contact /
  How we work"). Job 1 replaces all of it, so don't try to preserve any of it.

Work on a branch off `master`. **Push to the `collaborator` remote
(`roshan0007/Uplift-path`), not to `origin`.** Don't merge to `master` — merging
triggers `.github/workflows/deploy.yml` and changes the live site.
