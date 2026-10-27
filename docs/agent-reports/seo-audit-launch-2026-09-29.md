# SEO launch audit: upliftpathwellness.com cutover, 2026-09-29

Agent: seo-auditor. Scope: the whole site, 14-point launch checklist, **production variant**.

## What was audited

- **Build:** `NEXT_PUBLIC_INDEXABLE=true pnpm build` at commit `4ab609f` (master, clean tree). The build finished with no warnings and generated 27 static pages. **`out/` now holds the PRODUCTION variant.** It has `Allow: /`, no site-wide noindex, and every absolute URL on `https://upliftpathwellness.com`. It was not rebuilt afterwards. **Do not `wrangler deploy` this `out/` to workers.dev before DNS cutover.** If you do, staging stops being noindexed and starts pointing canonicals at a domain that still serves Webflow.
- **Ground truth for tags, sitemap, links, headings and alt text:** the emitted HTML in `out/`. I parsed every `.html` file with a script.
- **Ground truth for status codes and redirects:** `curl -sIL` against the live Worker at `https://uplift-path.black-cake-c8c6.workers.dev`. That deployment is the *staging* variant: it serves `Disallow: /`, `noindex, nofollow`, and canonicals on workers.dev. The `html_handling`, `not_found_handling` and `_redirects` rules are identical between the two variants, so the status behaviour carries over to production. Only the host differs.
- **Old site:** `https://upliftpathwellness.com`, currently Webflow (it says `This site was created in Webflow` in its HTML). **`/sitemap.xml` on the old site returns 404** and `robots.txt` is empty. Because there was no sitemap to fetch, I built the old-URL inventory by crawling every internal link from `/` and then probing 50 likely slugs. The Internet Archive CDX API was offline ("Temporarily Offline"), so this inventory is a best effort, not a complete one.
- **Core Web Vitals were not measured.** The `web-perf` skill needs the chrome-devtools MCP (`navigate_page`, `performance_start_trace`), and it is not configured in this session. I found no lab or field numbers, so check 13 is unverified.

## Checklist

| # | Check | Verdict | One-line reason |
|---|---|---|---|
| 1 | Trailing-slash convention | **pass** | `/about-us/` returns 307 and redirects once to `/about-us` (200). Internal links, canonicals and the sitemap all use no slash. |
| 2 | Redirect chains | **pass** | All 7 `_redirects` rules are a single 301 to a 200 on workers.dev. The production www/http combinations are covered under check 11. |
| 3 | Per-page meta tags | **fail** | `og:url` is absent on all 25 emitted pages. Everything else is present and unique on the indexable routes. |
| 4 | sitemap.xml in sync | **pass** | 17 URLs. Each one maps to a file in `out/`, none is noindexed, all are in canonical no-slash form, and all are on upliftpathwellness.com. |
| 5 | robots.txt | **pass** | `Allow: /`, `Sitemap: https://upliftpathwellness.com/sitemap.xml`, and `_next/` is not blocked. There are P2 caveats below. |
| 6 | Orphan pages | **pass** | Every one of the 17 public routes has at least 21 inbound internal links (nav and footer). There are no `href="#"` links left in `out/`. |
| 7 | 301s for changed slugs | **fail** | 3 old Webflow URLs that are live today have no route and no 301 (`/about-uplift`, `/business-consultation`, `/grievance-form`). Slash forms of redirected URLs also return 404. |
| 8 | Custom 404, real 404 | **pass** | `/definitely-not-a-real-path` and `/about-us/nope` both return `404 Not Found` with the branded "We Can't Find That Page" body. |
| 9 | Heading hierarchy | **fail** | Every indexable page has exactly one `<h1>`. `/` skips h3 to h5 and `/about-us` skips h2 to h5. |
| 10 | BreadcrumbList schema | **fail** | No JSON-LD of any kind in any emitted page, and no visible breadcrumb UI. |
| 11 | HTTPS + one canonical host | **unverified** | No mixed content. The production host's www/http behaviour can't be tested until DNS moves: the zone is on Zoho DNS and www is a CNAME to Webflow. |
| 12 | Image alt text | **pass** | 184 `<img>` tags, and all 184 have `alt`. 86 are `alt=""` on decorative art. Placeholder alts appear only on the two noindexed scratch pages. |
| 13 | Core Web Vitals | **unverified** | chrome-devtools MCP not available, so nothing was measured. Static evidence is listed under Performance. |
| 14 | Brand naming | **fail** | The legal entity is written two ways, "Uplift Path Inc." and "Uplift Path, Inc.", across the legal copy. "Webflow logo 1" alt text is left on the scratch pages. |

**Totals: 7 pass, 5 fail, 2 unverified.**

---

## P0: blocks launch

### P0-1. Three live old-site URLs will 404 at cutover (check 7)

| Old URL (live on Webflow today, 200) | New route | Covered by `public/_redirects`? | Status today on workers.dev |
|---|---|---|---|
| `/about-uplift` | `/about-us` | **no** | `404 Not Found` |
| `/business-consultation` (correct spelling) | `/for-business` | **no**. Line 7 handles the Relume typo `/business-conusltation`, a different URL. | `404 Not Found` |
| `/grievance-form` | `/grievance` | **no** | `404 Not Found` |
| `/our-culture` | `/how-we-work` | yes, line 29 | 301 → 200 |
| `/`, `/ai-consultation`, `/careers`, `/contact-us`, `/accessibility`, `/terms-of-use`, `/privacy-policy`, `/how-we-work`, `/booking`, `/cmps`, `/consent-form`, `/thank-you` | same slug | n/a | 200 |
| `/about-us` (old site: 301 to `/about-uplift`) | `/about-us` | n/a | 200 |

`/about-uplift` and `/business-consultation` are in the nav of every old page. The 2026-09-11 status note lists all three as P0 with the backlink risk, but the redirects were never added.

- **Fix:** `public/_redirects`. Append after line 29.
- **Plain English:** add three permanent redirects so the old About, Business Consultation and Grievance links land on the new pages instead of an error.

### P0-2. The domain's DNS is not on Cloudflare yet (check 11, launch prerequisite)

- **Observed:** `NS upliftpathwellness.com` resolves to `ns11.zns-53.com`, `ns21.zns-53.net`, `ns31.zns-53.com` and `ns41.zns-53.net`, with SOA `hostmaster.zohodns.com`. The apex A record is `198.202.211.1` and `www` is a CNAME to `cdn.webflow.com`. The `Server: cloudflare` header on the old site comes from Webflow's own CDN, not from your account.
- **Why it blocks:** a static-assets Worker can only take a Custom Domain on a zone that is active in the Cloudflare account. Until that is done, nothing in this repo can serve upliftpathwellness.com.
- **Records that must come across unchanged:** `openings.upliftpathwellness.com` (CNAME to `recruit.cs.zohohost.com`; the Careers page links to it three times) and the `google-site-verification=jg36y_49zDDsBXYto_kSE3CogMiecUGWBXNAmYTcNxM` TXT record. That TXT record is what keeps Search Console access, and you need Search Console to submit the new sitemap. I found no MX record via 8.8.8.8. Confirm where mail for this domain actually lives before you change nameservers.
- **Fix:** Cloudflare dashboard and the registrar. There is nothing to change in the repo.
- **Plain English:** move the domain's DNS to Cloudflare, copying every existing record, before trying to point the site at it.

---

## P1: weakens ranking or attribution

### P1-1. `og:url` missing sitewide: one config gap, all 25 pages (check 3)

- **Observed:** every emitted page has `og:title`, `og:description`, `og:type=website`, `og:image`, `twitter:card=summary_large_image`, `twitter:title`, `twitter:description` and `twitter:image`. **No page has `<meta property="og:url">`.**
- **Why:** the comment at `app/layout.tsx:49-51` says `metadataBase` plus each canonical "already resolve the absolute URL". The build shows that Next does not derive `og:url` from `alternates.canonical`.
- **Fix:** `app/layout.tsx:60` (the `openGraph` block) and each page's `metadata` in `app/(site)/*/page.tsx`. Each page needs its own `openGraph.url`.
- **Plain English:** share cards and AI citations have no authoritative page address, so link previews may attribute a shared page to the wrong URL.

### P1-2. Trailing-slash forms of old URLs 404 (check 7)

- **Observed:** the old Webflow site 301s `/about-uplift/`, `/careers/` and `/our-culture/` to their no-slash forms, so any backlink written with a slash works today. On workers.dev, `/our-culture/` returns `404 Not Found` because the `_redirects` rule only matches the exact path. `/careers/` still works (307 → `/careers`, 200) because the route exists. Uppercase variants (`/OUR-CULTURE`, `/About-Us`) also 404.
- **Fix:** `public/_redirects`. Every old-slug rule, including the three from P0-1, needs its trailing-slash form as well.
- **Plain English:** a backlink to an old page that ends in "/" will hit an error instead of being redirected.

### P1-3. No structured data anywhere (check 10)

- **Observed:** zero `<script type="application/ld+json">` in any of the 25 emitted pages. There is no BreadcrumbList on the 16 non-home indexable routes, no Organization or LocalBusiness on `/`, and no FAQPage, even though the FAQ accordions are on the page. The site has no visible breadcrumb UI either. If BreadcrumbList schema is added, a matching visible breadcrumb should ship with it, or the schema falls outside Google's guidelines.
- **Fix:** `app/layout.tsx:95-104` for Organization, and each `app/(site)/*/page.tsx` for BreadcrumbList. `docs/seo-status-2026-09-11.md` already tracks the schema tab as pending.
- **Plain English:** Google and AI tools get no machine-readable facts about the business (name, location, logo, FAQs).

---

## P2: performance, hygiene, consistency

### P2-1. Core Web Vitals unmeasured (check 13)

Nothing was measured, so there are no LCP, INP or CLS numbers to gate on. The old site measured LCP 8.1 s on mobile, which makes a real run worth doing before anyone claims the rebuild is faster. Static evidence from `out/`:

- Fonts: all 10 `@font-face` blocks set `font-display: swap` (`app/globals.css:29-96`). **No woff2 is preloaded.** `out/index.html` has 0 `as="font"` preloads, so the heading face swaps in late on the LCP heading.
- JS: the homepage loads 15 script chunks, 841 KB raw (1.2 MB of chunks in total).
- Images: most `<img>` tags have no `width`/`height` attributes. For example, 8 of 10 on `/` and 17 of 18 on `/for-business` have none, so they rely on CSS aspect classes for CLS.
- Dead weight in `out/images/` that no page references: `career-feature-section-1.png` (2.46 MB), `career-feature-section-2.png` (2.25 MB), `home-benefits-section.png` (1.08 MB), `resource-assistance-staff.png` (823 KB), `how-we-work-how-it-works-section-new-0.png` (749 KB). They are not a page cost, but they ship and they are crawlable.
- `out/brand/og-image.png` is 812 KB. That works, but it is heavy for a share card.
- **Plain English:** measure speed on the live build before launch sign-off; the fonts are the most likely drag.

### P2-2. Heading level skips on 2 routes (check 9)

- `/`: h3 → h5, from the testimonial quote at `components/sections/home/testimonial-10.jsx:99`.
- `/about-us`: h2 "Our Team" → h5 member name → h6 role, from `components/sections/about-us/team-06.jsx:51-52`.
- Plain English: the page outline skips levels. This is a minor accessibility and structure issue.

### P2-3. Weak or run-together H1 text (check 9)

- The `/about-us` H1 is just "Uplift Path" (`components/sections/about-us/layout-134.jsx:54`), and the `/contact-us` H1 is "Start Here". Neither describes its page.
- Three H1s split onto two lines with a `<span class="block">` and no space between the parts, so the text extracts as "Consulting Servicesfor Business Growth" (`components/sections/for-business-page/layout-134.jsx:72-75`), "Individualized Supportfor Ohio Adults" (`components/sections/for-individual-page/layout-134.jsx:82-85`) and "Uplifting Every LifeWe Serve" (`components/sections/home/header-104.jsx:69-71`).
- Plain English: the main headline reads to a crawler as a run-on word, or says nothing about the page.

### P2-4. robots.txt: Disallow hides the noindex (check 5)

- **Observed:** `Disallow: /faq-for-test`, `/page-20`, `/booking`, `/cmps` and `/consent-form`, generated from `lib/site.ts:53-59` via `app/robots.ts:27`. `/booking`, `/cmps` and `/consent-form` are live 200 pages on the old site. If Google already indexed them, a Disallow stops it from ever re-crawling and seeing the new `noindex`, and they can linger as "Indexed, though blocked by robots.txt".
- `Host:` (`app/robots.ts:29`) is a Yandex-only directive. Google ignores it, and it does no harm.
- **Fix:** `app/robots.ts:27`.
- Plain English: let Google see the "don't index" tag on the intake pages instead of blocking it outright.

### P2-5. Title length (check 3)

- `/resource-assistance`: "Grant Writing & Medicaid Enrollment Support Ohio | Uplift Path" is 62 characters and will likely truncate in results. Fix at `app/(site)/resource-assistance/page.tsx:15`.
- The other 16 indexable titles are 50–59 characters. All 17 descriptions are 145–160 characters once decoded. There are no duplicate titles or descriptions among indexable routes. The only duplicates are the default title and description on noindexed pages: 404, the scratch pages and the intake routes.
- Separately, `/how-we-work` has the title "Our Culture at Uplift Path…" while the H1 and nav say "How We Work". This is already tracked as a copy decision in the status note.

### P2-6. Legal-entity name written two ways (check 14)

"Uplift Path, Inc." appears at:
- `components/sections/legal/grievance.content.js:7, 11`
- `components/sections/legal/privacy-policy.content.js:6, 125, 128, 152`
- `components/sections/legal/terms-of-use.content.js:6, 294`

Everywhere else, including titles, descriptions, the footer and `accessibility.content.js`, it is "Uplift Path Inc.". This is copy taken from the old site, so it is a client decision. I found no `UpliftPath`, `Uplift path`, or `LLC` variants in visible copy.

### P2-7. Scratch-page leftovers (checks 12, 14)

- The `alt="Webflow logo 1"` value appears 4× (`components/sections/faq-for-test/testimonial-10.jsx:83, 119` and `components/sections/page-20/testimonial-10.jsx:83, 119`).
- "Testimonial avatar 1" pointing at the Relume CDN (`d22po4pjz3o32e.cloudfront.net/placeholder-image.svg`) appears on the same two pages.
- Both routes are `noindex, nofollow`, have no H1, and are disallowed in robots, but they are still public URLs.

### P2-8. Minor staging and redirect hygiene (checks 1, 4, 7)

- Trailing-slash and `.html` normalisation is a **307** (temporary), not a 301 or 308. That is Cloudflare `auto-trailing-slash` behaviour (`wrangler.jsonc:9`). Canonicals cover it.
- `/systems-%26-technology`, the encoded form the staging auditors actually found, returns 404. Only the literal `&` form is redirected (`public/_redirects:22`). This URL was staging-only.
- `sitemap.xml` `lastmod` is the build time for every URL (`app/sitemap.ts:43`), so it tells crawlers nothing.

---

## Blocked on a decision (the short list for the meeting)

1. **DNS move to Cloudflare**, carrying every record (see P0-2). The www/http checks below can't run until this is done.
2. **Once the domain is on the Worker, test each of these with `curl -sIL` and expect a single 301 hop to `https://upliftpathwellness.com/…` with the path kept:**
   - `http://upliftpathwellness.com/about-us`
   - `http://www.upliftpathwellness.com/about-us`
   - `https://www.upliftpathwellness.com/about-us`

   The old site does this today as a **2-hop chain** (`http://www` → `https://www` → `https://apex`).
3. **Yes, www → apex has to be configured in Cloudflare.** Nothing in this repo can do it: there is no server, `_redirects` only matches paths, and the Worker only answers for hosts it is bound to. You need a proxied `www` DNS record plus a Redirect Rule (www to apex, 301, preserve path and query), and "Always Use HTTPS". **Do not** add `www` as a second Custom Domain on the Worker, because that serves the whole site twice with a 200. For reference, plain `http://` on workers.dev currently returns 200 with no upgrade to https.
4. **Old-URL inventory is a best effort.** There is no old sitemap, and Wayback was offline. Ask for a Webflow or GSC export and diff it against the table in P0-1. Two password-protected old pages, `/ap` and `/consent` (401), have no new equivalent and will 404. Confirm that is intended.

## Verified OK for the production build (the specific asks)

- `out/robots.txt`: `Allow: /` and `Sitemap: https://upliftpathwellness.com/sitemap.xml`.
- No indexable route carries noindex. The 17 sitemap routes have no robots meta. `noindex` appears only on 404, `faq-for-test`, `page-20`, `booking`, `cmps`, `consent-form` and `thank-you`.
- All 17 canonicals are `https://upliftpathwellness.com/<route>` (the homepage is bare `https://upliftpathwellness.com`). No `workers.dev` string appears in any HTML, XML or TXT file in `out/`.
- `og:image` = `https://upliftpathwellness.com/brand/og-image.png`, and that file exists as `out/brand/og-image.png` (1200×630 declared). It returns 200 on workers.dev today.
- Every sitemap URL has a matching file (`out/<route>.html`, and `out/index.html` for `/`). No noindexed route is in the sitemap.
- Every indexable page has exactly one H1.
- Titles and descriptions are present and unique on every indexable page.
- All 184 images have `alt`.
- The 404 page is real: status 404, branded body, and `noindex`.
- No `http://` asset or link references. The only one is the sitemaps.org XML namespace.
