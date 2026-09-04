---
description: Run the ui-refactor-auditor agent — one page against the Refactoring UI principles. Report only, fixes nothing.
---

Invoke the `ui-refactor-auditor` subagent (Agent tool, `subagent_type:
ui-refactor-auditor`, `run_in_background: false`) to audit a page against the
*Refactoring UI* principles.

Target: whatever page the user named in their arguments. **If they named none,
default to the homepage** — that is the agreed pilot page, and the plan is to
get one page signed off before applying anything across the site.

Wait for it to finish, then in this response:
- Lead with its verdict sentence and the counts (pass / fail / override /
  decision).
- List the fails in fix order, one line each, with the file each lands in.
- Name the DECISION items separately — those need a design call, not a fix.
- Confirm the report file (`refactor-audit-<page>-<date>.md`) at the repo root
  and link it.
- Do not start fixing anything unless explicitly asked.
