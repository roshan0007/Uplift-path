# QA report: launch readiness, every public route (2026-09-29)

**Agent:** qa-inspector. Read-only; the only files changed are this report and the README index row.
**Build tested:** `pnpm dev` at localhost:3000, HEAD `4ab609f`. I also checked the `out/` export (built 2026-09-29 00:19): it is a production build, with canonicals, `robots.txt` and the sitemap all pointing at `https://upliftpathwellness.com`.
**Routes (22):** `/`, `/about-us`, `/how-we-work`, `/for-business`, `/for-individual`, `/advisory-services`, `/ai-consultation`, `/compliance-support`, `/resource-assistance`, `/marketing`, `/systems-technology`, `/careers`, `/contact-us`, `/accessibility`, `/privacy-policy`, `/terms-of-use`, `/grievance`, `/thank-you`, `/booking`, `/consent-form`, `/cmps`, and 404 (`/this-does-not-exist`).
**Widths:** 1440px (desktop) and 375px (mobile, device-emulated). Every route was loaded at both widths.

## How it was checked

- **Links, images, overflow, fonts.** A script inside each page, at both widths, collected every link, every image's `naturalWidth`, and every failed network request. It also measured `scrollWidth` against `clientWidth` for horizontal scroll, looked for text within 12px of the screen edge or clipped by its box, and read the computed `font-family` on headings and body text.
- **Contrast.** I computed the colour contrast of every text element against its background on all 22 routes.
- **External links.** Checked with curl: the Zoho forms, the CARF listing, the LinkedIn profiles, the jobs portal, the booking Worker and Magnific.
- **Menus.** The mobile menu and its "Uplift Services" sub-menu were opened and closed. The desktop mega-menu was opened and its position measured.
- **Copy.** I read every page's full text.
- **Screenshots are limited.** The Browser pane was hidden for most of the session. Screenshots mostly failed, and entrance animations did not run. Visual judgements therefore come from DOM measurements plus opening the image files directly.

## Clean results (no action needed)

- **Images and requests:** no broken images and no 404s for images or fonts on any route. The only 404 is the 404 page itself.
- **Mobile layout:** no horizontal scroll on any route at a real 375px mobile viewport. No text within 12px of the edge, and no clipped text.
- **Fonts:** headings compute to Playfair Display and body text to Lexend Deca on every route. No heading falls back to the browser's default size.
- **Expiring Relume images:** no `imagedelivery.net` URL is left anywhere in `components/`, `app/` or `public/`. Nothing expires on 2026-09-04.
- **Placeholder links and text:** no `href="#"` on any public route, and none of "Lorem", "Medium length", "Name Surname" or "Placeholder" appears in visible copy.
- **Contact details:** the phone number `(513) 299-4553` is the same everywhere, with correct `tel:+15132994553` links. The email `info@upliftpathinc.com` has correct `mailto:` links. Copyright reads "© 2026 Uplift Path Inc.".
- **Menus:** the mobile menu opens, the sub-menu expands, and the menu closes. The desktop mega-menu stays within the viewport, from x=162 to x=1263 at 1440px.
- **Forms:** the Zoho forms embed and render on `/contact-us` (880px tall) and `/grievance` (2636px tall). All Zoho form URLs, the CARF listing and the jobs portal return 200.
- **Contrast in page content:** no failures inside page sections. The footer fails (P1-6), and one image overlay is borderline (P2-12).

---

## P0: blocks launch

**P0-1. Homepage testimonial is an invented quote credited to a real, named person.**
- Where: `/`, the testimonial section.
- The quote shown with "Kylie Smith, Owner, LifeBridge Mentorship" was written by us. The source says so: `// PLACEHOLDER — awaiting real testimonial copy from Kylie Smith`.
- For a healthcare provider, putting made-up words in a real client's mouth is a trust problem and a compliance problem.
- Fix: `components/sections/home/testimonial-10.jsx:39-46`. Replace the `quote` with her approved words, or empty `TESTIMONIALS` so the section does not render.

**P0-2. The Zoho form redirects must point at the production domain. This cannot be checked from the code.**
- Where: the intake funnel (`/for-individual` → `/cmps` → `/booking` → `/consent-form`) and `/contact-us` → `/thank-you`.
- Each step hands off to the next through a redirect that is set inside Zoho, not in this repo. The code comments say so: `components/intake/get-started-button.jsx:130-132`, `app/cmps/page.tsx:22-23`, `app/(site)/thank-you/page.tsx:18-20`.
- If those redirects still point at `uplift-path.black-cake-c8c6.workers.dev`, anyone who applies after cutover is sent to the staging host.
- Fix: in the Zoho Forms admin, update the post-submit redirect on the "Find the Right Peer Coach for You", "CMPS" and "Contact Us" forms. Then run one full application on the live domain as a test.

**P0-3. Booking depends on a developer's personal Cloudflare Worker.**
- Where: `/booking`.
- Every slot lookup and booking goes to `https://uplift-api.sarfarazsiddiqui199.workers.dev`, which returned 400 to a bare GET, as expected. It is on a personal account, not the organisation's.
- Its CORS allow-list also has to include `https://upliftpathwellness.com`, or the booking step fails on the live domain.
- Fix: `lib/booking-api.js:25-27`, or set `NEXT_PUBLIC_BOOKING_API_URL` at build time. Also confirm the Worker's allowed origins.

## P1: fix before or immediately after launch

**P1-1. The legal pages send people to `upliftpathwellness.com/contact`, which does not exist.**
- The route is `/contact-us`, and `public/_redirects` has no `/contact` rule, so that address 404s.
- It appears 6 times across 3 pages:
  - `components/sections/legal/privacy-policy.content.js:97, 114, 122, 133`
  - `components/sections/legal/accessibility.content.js:74`
  - `components/sections/legal/terms-of-use.content.js:286`
- Fix: change the text to `/contact-us`, or add `/contact /contact-us 301` to `public/_redirects`.

**P1-2. The Privacy Policy describes things the site does not have.**
- It tells visitors to "manage cookie preferences via the cookie banner" (`privacy-policy.content.js:47` and `:118`). There is no cookie banner, and no analytics are installed.
- It names JotForm as the forms provider (`privacy-policy.content.js:55`). The site uses Zoho Forms.
- Fix: correct lines 47, 55 and 118. This is a legal/owner decision.

**P1-3. The Privacy Policy address differs from every other page.**
- Privacy Policy: "20 E Broad St, 2nd & 3rd Floor, Columbus, Ohio 43215".
- Footer, `/contact-us`, Terms and Accessibility: "Suite 225".
- Fix: `components/sections/legal/privacy-policy.content.js:136`.

**P1-4. Relume boilerplate FAQ is still live on `/for-business`.**
- "What is business consulting?" and "Why should we work with a business consultant?" are the Relume questions that `home/faq-01.jsx:14` already calls boilerplate. Their answers are generic ("proven methodologies, and industry insights that accelerate innovation").
- The last answer is garbled: "address complex business challenges through integration, and growth strategy delivering disciplined improvements".
- Fix: `components/sections/for-business-page/faq-01.jsx` lines 60-105 (questions and answers).

**P1-5. The Relume FAQ subtitle "Find answers to your questions about us." is on 9 live pages.**
- It was replaced on the homepage but survives on the rest.
- Fix, one line per file:
  - `about-us/faq-01.jsx:49`
  - `how-we-work/faq-01.jsx:34`
  - `for-business-page/faq-01.jsx:50`
  - `advisory-services/faq-01.jsx:36`
  - `compliance-support/faq-01.jsx:35`
  - `resource-assistance/faq-01.jsx:35`
  - `marketing/faq-01.jsx:39`
  - `systems-&-technology/faq-01.jsx:27`
  - `career/faq-01.jsx:36`
- All paths are under `components/sections/`.

**P1-6. The CTA band says the same thing on 12 pages, including pages where it makes no sense.**
- Every page carries "Ready to Unlock Your Growth Plan … Book your discovery call for personalized, actionable strategies".
- On `/for-individual` (free Medicaid peer support for individuals) and `/careers` (hiring) it reads as the wrong audience.
- The heading has a "?" on the homepage and no "?" anywhere else.
- Fix, lines 41-49 in each: `components/sections/for-individual-page/cta-25.jsx` and `components/sections/career/cta-25.jsx`. Use the `?` consistently across all `*/cta-25.jsx` files.

**P1-7. Footer text fails WCAG AA contrast on every page.**
- White 14px text on `#01a66e` is 3.14:1; AA needs 4.5:1.
- CLAUDE.md records this as a deliberate exception. It still contradicts the WCAG 2.1 AA commitment in `/accessibility` (`accessibility.content.js:9-10, 56`).
- Flagged so the owner signs off on it knowingly.
- Fix: the `.scheme-jade` block in `app/globals.css` ([10] lists the two ways back to AA).

**P1-8. FAQ questions show no keyboard focus indicator, on every FAQ on the site.**
- The accordion trigger sets `focus-visible:ring-0 focus-visible:outline-none`, so a keyboard user cannot see which question is focused.
- Fix: the call sites in each `*/faq-01.jsx` (pass a focus-visible class). CLAUDE.md forbids rewriting the primitive itself (`components/ui/accordion.jsx:17`).

**P1-9. The homepage "For Businesses" / "For Individuals" cards start invisible.**
- They are the first-screen choice, and the server HTML renders them at `opacity:0; transform:translateY(12px)` until JavaScript animates them in.
- If JavaScript is slow, blocked or fails, the site's main entry point is invisible. It also ignores `prefers-reduced-motion`.
- Fix: `components/sections/home/header-104.jsx:110-118`, the `motion.div` `initial` prop.

**P1-10. The footer LinkedIn icon goes to a personal profile named "uptech-support".**
- The link is `https://www.linkedin.com/in/uptech-support`, which is a personal `/in/` URL named for a different brand, not an Uplift Path company page.
- LinkedIn blocks automated checks (HTTP 999), so it needs checking by hand.
- Fix: `components/sections/footer-04.jsx:259`.

## P2: polish

**Copy and typos**

1. **`/about-us`:**
   - "unlocks true growth for Founders, and organizations": stray comma and capital F. Fix: `about-us/layout-134.jsx:67`.
   - The "Our Core Values" intro talks about leadership ("guide our mission with steady hands"), not values. Fix: `about-us/layout-237.jsx:15-18`.
   - Heading "Board of Advisory" should be "Advisory Board". Fix: `about-us/layout-507.jsx:21`.
2. **`/how-we-work`:**
   - "Kaizen making small, ongoing improvements" is missing "means". Fix: `how-we-work/layout-365.jsx:83`.
   - Heading "Three Simple Steps" sits over three culture pillars, not steps. Fix: `how-we-work/layout-365.jsx:41`.
   - Page title "Our Culture at Uplift Path" does not match the H1 "How We Work".
3. **British spellings mixed with American:**
   - `/advisory-services`: "organisation", "programmes", "Organisational".
   - `/compliance-support`: "organisation", "enrolment".
   - `/resource-assistance`: "Payer Enrolment", "enrolment".
   - `/for-business` FAQ: "behavioural" (`for-business-page/faq-01.jsx:89`).
   - The rest of the site uses American spelling.
4. **`/resource-assistance` hero overclaims.** "The funding is available, the right staff are in place, and strong partners are ready…" promises things the page cannot. Fix: `resource-assistance/layout-134.jsx:62`.
5. **`/for-business`:** "drive measurable impact to business" is awkward.
6. **`/ai-consultation` reads as generic** "harness the power of AI" copy.
   - All three service cards carry the same eyebrow, "AI Consulting". Fix: `ai-consultation/layout-423.jsx:100`.
   - It is the only service page without an FAQ.
7. **`/careers` is generic.**
   - "Why Uplift Path — Hear from Our Team" promises team voices, but none follow. Fix: `career/layout-359.jsx:42`.
   - The eyebrow "Operations" is used twice. Fix: `career/layout-469.jsx:45` and `career/layout-359.jsx:67`.
   - The mission copy ("elevate businesses") ignores the individual-care side of the business.
8. **`/systems-technology`:**
   - "Implementations fail on adoption, not technology" appears twice on one page.
   - Section heading "How We Work" repeats a nav page name.
9. **`/marketing`:** the H1 ends with a full stop; no other H1 does. Fix: `marketing/header-01.jsx:49`.
10. **Homepage "What Actually Changes":** the third item, "Uplift Growth", holds the mission statement ("To impact 100K lives … by 2036") rather than a service description like its two siblings. Fix: `home/layout-237.jsx:105`.
11. **Legal pages:**
    - Stray space in "(513) 299-4553 ." at `privacy-policy.content.js:116` and `accessibility.content.js:141`.
    - "including, but is not limited to" (drop "is") at `privacy-policy.content.js:11, 13, 16`.
    - "EST" should be "ET" at `grievance.content.js:38`.
    - Email addresses in the body copy (`privacy@`, `grievances@`) are plain text, not `mailto:` links. On `/grievance` that is the page's main contact.
    - The Privacy Policy refers to a "separate Notice of Privacy Practices document" that is not linked anywhere.
12. **Contact details are formatted differently:**
    - `/contact-us` shows "+1 (513) 299-4553" and "20 E Broad Street". The footer shows "(513) 299-4553" and "20 E Broad St".
    - Fix: `contact-us/contact-panel.jsx:41, 103`.

**Design and technical**

13. **White text over photos on `/ai-consultation`.** On the service cards, white 16px text sits on the photo under a `bg-neutral-darkest/50` overlay. Over the lighter parts of the photos this is about 4:1, below AA. Fix: `ai-consultation/layout-423.jsx:98-102`.
14. **Tabs on `/for-individual` cause a small sideways scroll on desktop browsers with classic scrollbars.** The row uses `w-screen` (100vw includes the scrollbar), giving about 7px of horizontal scroll below the `md` breakpoint. Real phones are not affected. Fix: `for-individual-page/layout-504.jsx:56`.
15. **Nav icons load at runtime from the jsDelivr CDN.** 15 `@material-symbols` SVGs come from `cdn.jsdelivr.net` on every page. If the CDN is slow or blocked, the menu icons disappear. They could be self-hosted like `/svgs/`. Source: `components/ui/symbol-icon.jsx`.
16. **Footer and nav labels differ:**
    - Footer says "Career", nav says "Careers". Fix: `footer-04.jsx:85`.
    - Footer says "Terms of Service", the page is "Terms of Use". Fix: `footer-04.jsx:324`.
    - The footer "Services" list omits "Business Consultation", which the mega-menu includes.

**Fake or unverifiable imagery**

17. **AI-generated and stock photography stands in for real people and places:**
    - `/ai-consultation` service cards: `ai-consultation-services-section-0/1/2.png`. These are AI-generated "professional in a server room" figures that a visitor may take for staff.
    - `/for-business`: `for-business-page-benefits-section-3.jpg` is generic office stock.
    - `/about-us` hero photos and the `/advisory-services` card photos are generic stock.
    - Martha Matthews' portrait (`about-us-award-logos-list-section-2.jpg`, and the same photo as `compliance-support-feature-section-2.jpg`) looks generated. `compliance-support/layout-615.jsx:13-17` already says the portraits "read as generated" and are unconfirmed.
    - An owner should confirm the leadership portraits are real photos.

## Reused content across pages

- **Same image under different names:**
  - `home-who-we-help-0.png` and `ai-consultation-about-section.png` are the same file.
  - `about-us-award-logos-list-section-0.jpg` and `compliance-support-feature-section-1.jpg` are the same file (Julia Gilliam; acceptable).
  - The two Martha Matthews images are the same photo at different resolutions.
- **Same image on more than one page:** `ai-consultation-hero-monitor.png` is used on both `/ai-consultation` and `/systems-technology`. `home-cta-envelope.png` is in all 12 CTA bands (by design).
- **Same text on more than one page:** the CTA band copy (12 pages) and the FAQ subtitle (9 pages), covered in P1-5 and P1-6.
- **CTA labels differ for the same destination.** Every one of these goes to `/contact-us`:
  - "Get Started" (all CTA bands, plus the `/about-us`, `/how-we-work` and `/for-business` heroes)
  - "Book a Discovery Call" (`/advisory-services`, `/compliance-support`, `/resource-assistance`, `/systems-technology`)
  - "Book Your AI Strategy Session" (`/ai-consultation`)
  - "Book a Marketing Review" (`/marketing`)
  - "Contact" and "Contact Us" (nav and 404)
- **Nav and footer** are the same on every route.

## Expiring assets

None. No `imagedelivery.net` URL remains, so nothing is affected by the 2026-09-04 expiry.

## Summary counts

P0: 3 · P1: 10 · P2: 17 · Reused-content groups: 4 · Expiring assets: 0
