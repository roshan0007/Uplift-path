# Uplift Path website: QA and design status (2026-09-29)

For Roshan. This covers what is confirmed good to go, from the 2026-09-29 QA
report, the SEO launch audit, the 13 Refactoring UI audits, and the commits
that acted on them.

Sources: `docs/agent-reports/` (qa-report-launch, seo-audit-launch, 13 refactor-audit-*-2026-09-29)
and commits `afc9c18`, `862b458`, `7f48f89`, `d0bde67`, `3dc7c1d`, `bb710e8`, `62f8396`, `ae238a6`.

---

## 1. QA report: good to go

Tested: all 22 public routes plus the 404, at 1440px desktop and 375px mobile.

**Layout and rendering**
- No broken images on any route. No failed requests for images or fonts.
- No horizontal scroll on any route at 375px. No text near the screen edge and no clipped text.
- Headings render in Playfair Display and body text in Lexend Deca on every route.
- No expiring Relume image URLs remain anywhere in the code.

**Content and links**
- No `href="#"` on any public page. No Lorem, "Name Surname" or other placeholder text in visible copy.
- Phone `(513) 299-4553` and email `info@upliftpathinc.com` are identical everywhere, with working `tel:` and `mailto:` links.
- Copyright reads "© 2026 Uplift Path Inc." on every page.
- Nav and footer are identical on every route.
- The Zoho forms load on `/contact-us` and `/grievance`. Every Zoho form URL, the CARF listing and the jobs portal return 200.
- The 404 page is branded and returns a real 404 status.

**Menus**
- The mobile menu opens and closes, and its "Uplift Services" sub-menu expands.
- The desktop mega-menu stays inside the viewport (x=162 to 1263 at 1440px).

**Accessibility**
- No contrast failures inside page content on any of the 22 routes.

**Fixed since the QA run**
| QA finding | Fix | Commit |
|---|---|---|
| Legal pages linked to a `/contact` page that does not exist | Copy now points at `/contact-us`, and `/contact` also 301s to it | `afc9c18` |
| Footer LinkedIn icon pointed at a personal profile | Now the Uplift Path company page | `d0bde67` |
| Three H1s read as one run-together word to crawlers | Spaces added | `afc9c18` |
| "Kaizen making" typo on How We Work | Now "Kaizen means making" | `3dc7c1d` |
| For Individual copy | Client's copy review applied; the Therapy & counseling wording is corrected on the page, the homepage card, the intake bar and the meta description | `862b458` |
| Homepage first-screen fit at 1366x768 | Hero CTAs now fit on one screen | `3dc7c1d` |

## 2. SEO launch audit: good to go

- One trailing-slash convention. `/about-us/` redirects once to `/about-us`.
- No redirect chains. Every redirect is a single 301 to a 200.
- Every indexable page has unique title, description, canonical, Open Graph, Twitter and robots tags.
- `sitemap.xml` lists 17 URLs, each mapped to a real page, none noindexed, all on `upliftpathwellness.com`.
- `robots.txt` reads `Allow: /` and points at the sitemap. `_next/` is not blocked.
- No orphan pages. Every public route has at least 21 inbound internal links.
- Custom 404 returns a real HTTP 404.
- Every indexable page has exactly one H1.
- All 184 images have `alt` attributes. The 86 empty ones are decorative art.
- 301s are in place for every old Webflow URL found in the crawl (`/about-uplift`, `/business-consultation`, `/grievance-form`, `/our-culture`, the typo slugs, and their trailing-slash forms), all added in `afc9c18`.
- The scratch pages `faq-for-test` and `page-20` are noindexed and out of the nav.

## 3. Design refactor reports: good to go

Thirteen pages were audited against the Refactoring UI principles: `/`, `/about-us`,
`/how-we-work`, `/for-business`, `/for-individual`, `/advisory-services`, `/ai-consultation`,
`/compliance-support`, `/resource-assistance`, `/marketing`, `/systems-technology`,
`/careers` and `/contact-us`. The fixes landed in `3dc7c1d` across 49 files.

**Fixed on every page or several pages**
- Hero line art no longer overlaps the H1 on For Business, AI Consultation and Compliance Support between 992px and about 1400px.
- AI Consultation service cards no longer clip their own copy at 768 to 1280px.
- Phone layout rule (text, media, text) applied on Careers, Marketing, Systems & Technology, the three service pages and the About Us advisor bios. `7f48f89` covers Home, For Individual, Advisory Services and Resource Assistance.
- Centred intros and body copy are capped to a readable line length site-wide.
- FAQ questions left-align when they wrap, on every FAQ.
- The Systems & Technology timeline numerals sit below the step titles. The timeline fades and backdrop blur are removed on all three timelines.
- About Us: the active Board tab reads as selected, and the H1 comes before the collage.
- How We Work: the tablet video went from 878x1385 to 480x577.
- Marketing: the figure now sits between the capabilities on phones (`bb710e8`).
- CTA banner (all 12 pages): below `lg` the envelope is a small mark beside the button instead of a 400px image under the text (`7f48f89`).
- Footer: an even 2x2 layout on phones (`7f48f89`).

**Confirmed holding in the re-audits**
- The 2026-09-11 Contact Us fixes were verified fixed in the 2026-09-29 re-audit.
- The 2026-09-24 For Individual hero fixes held in the whole-page audit.
- The brand rules the audits checked came out intact: Playfair for headings and Lexend Deca for body, flat colour, one hard ledge shadow, 2px card borders, and no emoji.

**Booking scheduler**
- Redesigned as two stages (pick a day, then a time), and the card holds the calendar's height with the times scrolling inside it (`ae238a6`, `62f8396`).

---

## 4. Good on both the QA report and the design refactor report

These points are confirmed by both reports:

| Area | QA report | Design refactor reports |
|---|---|---|
| Mobile layout at 375px | No horizontal scroll, no clipped or edge-hugging text on any route | Phone layouts reordered to text, media, text; CTA art and footer tightened |
| Typography | Playfair headings and Lexend Deca body on every route | Type scale holds across the 992px breakpoint; line lengths capped |
| Nav, footer and CTA band | Identical on every route; footer LinkedIn corrected | Footer even on phones; CTA banner art resized on all 12 pages |
| Homepage | No placeholder text, links or images broken | Hero fits the first screen at 1366x768 |
| Contact Us | Zoho form renders; phone and email links correct | Earlier fixes verified; frame height deliberately kept so Zoho's validation errors have room |
| For Individual | Copy review applied | Hero collage fixes held |
| Marketing, Systems & Technology, Careers, service pages | Load cleanly at both widths | Phone order and timeline fixes applied |
| Brand rules | Fonts, contrast and images in page content pass | Flat colour, single ledge shadow, card borders and no-emoji rules intact |
