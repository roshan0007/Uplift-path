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
| 2026-09-29 | seo-auditor | Whole site, 14-point launch checklist, production (`NEXT_PUBLIC_INDEXABLE=true`) build | [seo-audit-launch-2026-09-29.md](seo-audit-launch-2026-09-29.md) |
| 2026-09-29 | qa-inspector | All 22 public routes + 404, desktop and mobile, launch readiness | [qa-report-launch-2026-09-29.md](qa-report-launch-2026-09-29.md) |
| 2026-09-29 | ui-refactor-auditor | `/advisory-services` (1440/1280/1024/991/375) | [refactor-audit-advisory-services-2026-09-29.md](refactor-audit-advisory-services-2026-09-29.md) |
| 2026-09-29 | ui-refactor-auditor | `/ai-consultation` (1440/1280/1024/992/768/375) | [refactor-audit-ai-consultation-2026-09-29.md](refactor-audit-ai-consultation-2026-09-29.md) |
| 2026-09-29 | ui-refactor-auditor | `/compliance-support` (1440/1024/375) | [refactor-audit-compliance-support-2026-09-29.md](refactor-audit-compliance-support-2026-09-29.md) |
| 2026-09-29 | ui-refactor-auditor | `/resource-assistance` (1440, 991, 375) | [refactor-audit-resource-assistance-2026-09-29.md](refactor-audit-resource-assistance-2026-09-29.md) |
| 2026-09-29 | ui-refactor-auditor | `/marketing` (1440, 991, 375) | [refactor-audit-marketing-2026-09-29.md](refactor-audit-marketing-2026-09-29.md) |
| 2026-09-29 | ui-refactor-auditor | `/systems-technology` (1440, 991, 375) | [refactor-audit-systems-technology-2026-09-29.md](refactor-audit-systems-technology-2026-09-29.md) |
| 2026-09-29 | ui-refactor-auditor | `/contact-us` re-audit: 2026-09-11 fails verified fixed, new and still-open items only | [refactor-audit-contact-us-2026-09-29.md](refactor-audit-contact-us-2026-09-29.md) |
| 2026-09-29 | ui-refactor-auditor | `/` (1440, 1366x768, 991, 375; re-check of the 2026-09-10 audit) | [refactor-audit-homepage-2026-09-29.md](refactor-audit-homepage-2026-09-29.md) |
| 2026-09-29 | ui-refactor-auditor | `/about-us` (1440, 991, 375) | [refactor-audit-about-us-2026-09-29.md](refactor-audit-about-us-2026-09-29.md) |
| 2026-09-29 | ui-refactor-auditor | `/how-we-work` (1440, 991, 375) | [refactor-audit-how-we-work-2026-09-29.md](refactor-audit-how-we-work-2026-09-29.md) |
| 2026-09-29 | ui-refactor-auditor | `/for-business`, 1440 / 992 / 991 / 375 | [refactor-audit-for-business-2026-09-29.md](refactor-audit-for-business-2026-09-29.md) |
| 2026-09-29 | ui-refactor-auditor | `/for-individual`, whole page, 1440 / 992 / 991 / 375; confirms the 2026-09-24 hero fixes held | [refactor-audit-for-individual-2026-09-29.md](refactor-audit-for-individual-2026-09-29.md) |
| 2026-09-29 | ui-refactor-auditor | `/careers`, 1440 / 992 / 768 / 375 | [refactor-audit-careers-2026-09-29.md](refactor-audit-careers-2026-09-29.md) |

`docs/seo-status-2026-09-11.md` is a status note written by hand, not agent
output. The first `seo-auditor` report is the 2026-09-29 launch audit above.

On 2026-09-11, audits of eleven other routes were started and then stopped
before they finished, so there are no reports for them. Those routes are
for-individual, about-us, careers, for-business, how-we-work,
advisory-services, ai-consultation, compliance-support, systems-technology,
resource-assistance, and the legal pages. systems-technology and
resource-assistance were audited on 2026-09-29 (rows above).
