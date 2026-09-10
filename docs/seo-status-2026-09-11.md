# SEO status — what is done, what is pending

Recorded 2026-09-11, branch `seo`.

## The two sources

1. **The page-table** pasted into chat on 2026-09-10 — current vs new title and
   meta description for 16 rows, plus H1 counts and word counts.
2. **`Uplift Path Inc. - SEO Report.xlsx`** (vendor workbook, 22 tabs, saved
   2026-09-11 00:57, in Downloads). Not committed here — it holds client NAP
   data and a 439-row backlink export.

### How to read them — they describe three different sites

This tripped us up once already and will again:

| Artifact | Which site it describes |
|---|---|
| Page-table, `Website Content`, `Website Schema`, `GSC Indexing Status`, `Website Performance`, `Domain Redirection` | **Old** live `upliftpathwellness.com` |
| `SEO Audit - New Website` | A **Webflow** rebuild, `uplift-path-wellness-new-6f3652.webflow.io` — *not this repo* |
| `URL List` | **This repo**, on the workers.dev staging host |

So the page-table's H1 column ("0 H1s on privacy-policy", "5 on the homepage")
is the old site's defect list, not ours — every page here has exactly one H1,
verified in `out/`. Likewise every P0 in `SEO Audit - New Website` should be
re-checked against this codebase before being treated as a bug; several are
already false here, and one of its fixes is literally "Set the site language in
Webflow (Site Settings -> General)".

`URL List` is the tab that actually audits us.

---

## Done (commits `21b1bb2`, `8c81189`)

- **Titles + meta descriptions** on all 16 routes, verbatim from the page-table.
- **Four slug renames** from `URL List`, with 301s: `/for-business`,
  `/for-individual`, `/systems-technology`, `/careers`.
- **Redirect chain flattened** — `/business-conusltation` now points straight at
  `/for-business` instead of hopping via `/for-business-page`.
- **`metadataBase` + self-referencing canonicals** on all 16 public pages.
- **`sitemap.xml`** — 11 public routes; scratch and intake routes excluded.
- **`robots.txt`**.
- **Staging index lock** — see `lib/site.ts`. Ships `Disallow: /` plus site-wide
  `noindex, nofollow` until `NEXT_PUBLIC_INDEXABLE=true` is passed to the build.

Nothing below is blocked by anything above except where stated.

---

## Pending — ours to build

### P0, blocks launch

- [ ] **Old-slug -> new-slug 301 map.** The single highest-risk item. The old
      domain is indexed and carries 33 backlinks (11 rated quality). Four slugs
      change and one page disappears:

      /about-uplift          -> /about-us
      /careers               -> /careers          (unchanged)
      /business-consultation -> /for-business
      /grievance-form        -> /grievance
      /our-culture           -> RETIRED, needs a decision (see below)

      **Blocked on**: a full URL inventory of the old site. `GSC Indexing
      Status` lists only 7 indexed pages and `Website Content` 11 — neither is
      likely to be complete. Ask for a crawl export or the old sitemap.
      Without this, every one of those links 404s on cutover.

- [ ] **Decide what `/our-culture` becomes.** It is indexed on the old site and
      has a written title/description in the page-table, but the vendor's own
      `URL List` omits it, so their intent is that it goes away. It therefore
      needs *either* a page here *or* a 301 to the nearest equivalent
      (`/careers` is the closest — it already carries Core Values and Why
      Uplift Path). Currently it would 404.

- [ ] **`Speakable` / `WebPage` and the rest of the schema tab.** Unblocked now
      that slugs are frozen. Remap to our routes, `@id`s to the real domain,
      logo to our own `/brand/` asset rather than the Webflow CDN URL the sheet
      hardcodes. Note the sheet specifies `FAQPage` on one page only, though
      eleven of our routes ship a `faq-01` — more opportunity than they asked
      for.

### P1

- [ ] **Open Graph + Twitter tags.** Absent site-wide. `og:description` and
      `og:image` called out specifically. Needs an OG image asset designed.
- [ ] **Image alt text.** Flagged site-wide. `Images List` tab has 43 rows;
      cross-check against what we actually render before trusting the count.
- [ ] **Internal linking.** "Link equity and crawl flow don't pass between
      pages." Our sections are the visual source of truth, so contextual
      in-content links need a design decision, not a find-and-replace.
- [ ] **GTM events.** `Tracking Setup` tab specifies three:
      `email_click` (mailto), `phone_click` (tel:), and `booking_submission`
      — the last fires on a **`/thank-you` page view, which does not exist
      here**. Either build that route into the booking flow or the event can
      never fire.

### P2

- [ ] **`llms.txt`** for AI crawlers.
- [ ] **Core Web Vitals.** The old site measured mobile perf 62, **LCP 8.1s**.
      Ours is a static export and should be far better, but it has never been
      measured — needs a real run before anyone claims the rebuild fixed it.

---

## Pending — not ours

Tracked here only so nobody assumes the dev side covers it: ongoing content
strategy, backlink building, Google Business Profile, keyword-rank monitoring,
and the outreach tabs (`Cold Email`, `LinkedIn`, 439-row `AHREFs` list).

The workbook's `SEO Activity Checklist` still shows "Configure XML sitemap",
"Configure robots.txt", "Verify canonicalization" and "Establish SEO-friendly
URL structure" as *Not Started* — all four are done as of `8c81189` and should
be marked off on their side.

---

## Launch sequence

1. Get the old-site URL inventory; build the 301 map; settle `/our-culture`.
2. Schema, OG tags, alt text.
3. `NEXT_PUBLIC_INDEXABLE=true npm run build` — the only step that makes the
   site indexable. **Do not run it before DNS cutover**, or staging competes
   with the client's live site for its own keywords.
4. DNS cutover to `upliftpathwellness.com`.
5. Confirm `www` and `http` redirect to the apex (`Domain Redirection` tab).
6. Submit the new sitemap in GSC; watch for 404s against the old URL set.
