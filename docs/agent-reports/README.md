# Agent reports

Every report produced by the three audit agents in `.claude/agents/` lives
here: `qa-inspector`, `seo-auditor`, and `ui-refactor-auditor`. Each one
describes the code as it was on its date, so check the date before acting on
a finding.

The agents are told to write here. When one hands its report back in chat
instead, the session that ran it saves the hand-back here verbatim.

| Date | Agent | Scope | File |
|---|---|---|---|
| 2026-08-26 | qa-inspector | `/` (v1 design, **superseded**) | [qa-report-homepage-2026-08-26.md](qa-report-homepage-2026-08-26.md) |
| 2026-09-10 | qa-inspector | `/` | [qa-report-homepage-2026-09-10.md](qa-report-homepage-2026-09-10.md) |
| 2026-09-10 | ui-refactor-auditor | `/` | [refactor-audit-homepage-2026-09-10.md](refactor-audit-homepage-2026-09-10.md) |
| 2026-09-11 | ui-refactor-auditor | `/contact-us` | [refactor-audit-contact-us-2026-09-11.md](refactor-audit-contact-us-2026-09-11.md) |
| 2026-09-24 | ui-refactor-auditor | `/for-individual` hero (PR #16) | [refactor-audit-for-individual-hero-2026-09-24.md](refactor-audit-for-individual-hero-2026-09-24.md) |

No `seo-auditor` run has produced a report yet. `docs/seo-status-2026-09-11.md`
is a status note written by hand, not agent output.

On 2026-09-11, audits of eleven other routes were started and then stopped
before they finished, so there are no reports for them. Those routes are
for-individual, about-us, careers, for-business, how-we-work,
advisory-services, ai-consultation, compliance-support, systems-technology,
resource-assistance, and the legal pages.
