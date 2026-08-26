---
description: Run the seo-auditor agent — the 14-point technical SEO launch checklist. Report only, fixes nothing.
---

Invoke the `seo-auditor` subagent (Agent tool, `subagent_type: seo-auditor`,
`run_in_background: false`) to run the full technical SEO audit: trailing-slash
convention, redirect chains, per-page meta tags, sitemap, robots.txt, orphan
pages, slug 301s, a real HTTP 404, heading hierarchy, BreadcrumbList schema,
HTTPS/canonical host, image alt text, Core Web Vitals, and brand naming —
audited against the built static export in `out/`, the way a crawler sees it,
not just by grepping the source.

Wait for it to finish, then in this response:
- Show the checklist verdict counts (pass / fail / unverified) and the finding
  counts per severity group.
- Call out anything it marked **blocked on a decision** — production domain,
  trailing-slash convention, final slugs — since those need a human answer
  before the rest can be fixed.
- Confirm the report file (`seo-report-<date>.md`) was written at the repo
  root and link it.
- Do not start fixing anything from the report unless explicitly asked to.
