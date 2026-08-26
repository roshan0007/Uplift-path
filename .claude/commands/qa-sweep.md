---
description: Run the qa-inspector agent — a full human-eye QA pass over every page. Report only, fixes nothing.
---

Invoke the `qa-inspector` subagent (Agent tool, `subagent_type: qa-inspector`,
`run_in_background: false`) to perform a complete visual and content QA sweep
of every route in this site — placeholder content, fake testimonials, stock
logos, broken links/images, font and alignment mistakes, all checked live in
the browser the way a real visitor would experience the site, not just by
grepping the codebase.

Wait for it to finish, then in this response:
- Show the summary counts it reports (broken / fake-or-placeholder / design /
  reused / expiring).
- Confirm the report file (`qa-report-<date>.md`) was written at the repo
  root and link it.
- Do not start fixing anything from the report unless explicitly asked to.
