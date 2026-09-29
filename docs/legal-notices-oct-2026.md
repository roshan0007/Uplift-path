# Oct 2026 legal notices — implementation record

Source: email from Martha Matthews (Chief Risk Officer), 2026-09-29, plus the six
notice documents and the *Website Tracking and Inquiry Form Build Specification*.
The `.docx` copies in `~/Downloads` (dated 2026-09-29) were used; the Google Docs
links were not opened. Two of the downloads had duplicate copies
(`… (1).docx`); their text is identical.

## What is published

Each notice is its own page because they are legally required to be separate.
None was combined, renamed in the footer beyond its own title, or given a new
version or date.

| Notice | Version | Route | Content module |
|---|---|---|---|
| Website Privacy Policy Notice | 2.0 | `/privacy-policy` | `components/sections/legal/privacy-policy.content.js` |
| Cookies and Tracking Technologies Notice | 2.0 | `/cookies-and-tracking-technologies` | `cookies-tracking.content.js` |
| Consumer Health Data Privacy Notice | 1.0 | `/consumer-health-data-privacy` | `consumer-health-data.content.js` |
| State Privacy Rights Notice | 1.0 | `/state-privacy-rights` | `state-privacy-rights.content.js` |
| Nondiscrimination and Language Access Notice | 1.0 | `/nondiscrimination-and-language-access` | `nondiscrimination.content.js` |
| Website Accessibility Notice (under Advisory Board review) | 2.0 | `/accessibility` | `accessibility.content.js` |
| Website Terms of Use | — | `/terms-of-use` | **Unchanged placeholder** (the Feb 2026 text). Awaiting legal review |

All show **"Version X · Effective October 2026"** — the notices give only a month,
so no day is shown or invented. `/privacy-policy` and `/accessibility` keep their
existing URLs (indexed on the old site); the four new routes are in the sitemap.

**Wording is not ours to edit.** The content modules were generated from the
`.docx` files and checked letter-for-letter against them. Formatting-only changes:
section headings are title-cased (the source is ALL CAPS), bold lead-ins are bold,
line breaks in addresses and phone/TTY pairs are kept, and emails, the office
phone, the contact form (`upliftpathwellness.com/contact` → `/contact-us`), the
HHS pages, and cross-references between the notices are linked. The notice title
"Notice of Nondiscrimination and Availability of Language Assistance and Auxiliary
Aids" is kept as the first line of its page under the shorter H1.

To change a notice: edit its content module, and only on written instruction from
the CRO. Do not touch `VERSION` or `EFFECTIVE`.

## What the notices say the website does — and whether it does

Checked against the code, and the public Zoho form markup, on 2026-09-29.

| The notices say | Status |
|---|---|
| Cookie banner on first visit, per-category choices, decline as easy as accept (CB-1..3) | **NOT BUILT on this branch.** Built and tested on `feat/cookie-banner`, held back pending a decision (open item 1) |
| Banner reopens from a footer link on every page, including the inquiry page (CB-4) | **NOT BUILT** (same branch) |
| Choice persists; withdrawing clears that category's cookies and storage (CB-5, CB-6) | **NOT BUILT** (same branch) |
| Optional categories off by default; nothing non-essential loads before a choice (CAT-2) | **True** — the site loads no non-essential technology at all |
| Advertising/social never load on the inquiry form (FM-1) | **True** — none exists. Needs enforcing in code before any is added |
| GPC honoured for everyone, overrides prior acceptance; legacy Do Not Track not implemented (GPC-1..3) | **Moot today** (nothing to switch off); implemented on `feat/cookie-banner` |
| No sale/sharing of health data, no audiences, no geofencing (PR-1..5) | **True** — no such code exists |
| Form values never reach analytics/ads/social (FM-2, FM-3) | **True** — the form is a cross-origin Zoho iframe and no analytics exists. Re-run the sentinel test when analytics is added |
| Forms hosted under an executed BAA (FM-4, V-1) | **Cannot verify from code** — evidence must be on file |
| "Built-in accessibility tool" with reading mask, contrast, text size, magnifier | **NOT TRUE today.** The old Skynet widget was not carried over |
| Inquiry form is for adults 18+ and says so (FM-8) | **Partly.** Intake step 1 has an 18+/Ohio checkbox. The **Contact form has no age statement** |
| Tracking inventory kept (V-2) | `docs/tracking-inventory.md` |
| `privacy@` and `advocate@upliftpathinc.com` live and monitored (CT-2, go-live gate) | **Not verifiable from code.** The spec itself says `advocate@` did not exist when written |

## Open items for Martha

These need her decision or someone else's action. None was changed unilaterally.

1. **Cookie banner.** The Cookies notice says a banner appears on first visit and
   reopens from the footer; the site has none. It was not in her email, so it is
   not in this PR. A working version (small bottom-right card, per-category
   choices, hide arrow, GPC, footer/intake reopen link) is on the branch
   `feat/cookie-banner`. Build it now, or wait until analytics exists and reword
   the sentence until then?
2. **Timing.** The site went live on `upliftpathwellness.com` today (2026-09-29).
   The email says the notices must be posted before the new site is live, and that
   we are bound by them from the day they are posted to the public. They say
   "Effective October 2026". Merging this PR posts them; is that the intended
   posting date, or should the merge wait until 1 October?
3. **Accessibility widget.** The Accessibility Notice promises a built-in tool that
   the new site does not have. Either the Skynet widget is re-installed (needs the
   account/embed key; it becomes a listed third-party technology) or the sentence
   changes. Same question for "keyboard navigation" — the site is natively
   keyboard-navigable, the widget is what adds the rest.
4. **Grievance email.** The Grievance page (unchanged) says
   `grievances@upliftpathinc.com`; the new Accessibility and Nondiscrimination
   notices say `grievance@upliftpathinc.com`. Which is right, or do both exist?
5. **`advocate@upliftpathinc.com`** must exist and be monitored before the
   notices are true. The build spec says it did not.
6. **Contact form.** (a) No 18+ statement (FM-8). (b) It carries an SMS
   *marketing* consent checkbox that none of the notices mention. Both are edits
   inside Zoho, not in this repo.
7. **HIPAA Notice of Privacy Practices.** Four notices point to it ("Notice of
   Privacy Practices", "Client Notice of Privacy") and it is not among the seven
   documents or on the site. The Website Privacy Notice says to get it from a
   provider or the Client portal. HIPAA generally expects a covered entity with a
   website to post its NPP there — worth confirming it is planned.
8. **Consumer Health Data notice on the homepage.** The Website Privacy Notice says
   it is "linked prominently from the Website homepage". It is linked from the
   footer of every page (including the homepage) and from the intake screens. If a
   more prominent homepage placement is required, that needs a design decision.
9. **GPC wording conflict.** The Cookies Notice (and the build spec) say GPC is
   honoured *wherever you are located*. The State Privacy Rights Notice says GPC is
   honoured *where the law requires it*. The site does the former. The notices
   should say the same thing.
10. **Address.** The notices give "20 E Broad St, 2nd and 3rd Floor"; the footer and
   Contact page say "Suite 225".
11. **Build spec reference.** It says it derives from Cookies Notice "v2.2"; the
    notice is v2.0. Presumably a stale reference, but the spec is meant to be a
    line-by-line contract.
12. **Booking backend.** `/booking` calls a Cloudflare Worker in an individual
    Cloudflare account that carries the intake case id. Whether that needs a BAA is
    for the HIPAA Security Officer.
13. **Terms of Use** is still the Feb 2026 text, untouched, pending legal review.
    The footer calls it "Terms of Service"; the notices say "Terms of Use".
14. **Old Accessibility content is gone** — the Accessibility Plan section, the
    barrier categories, and the national/crisis resource lists (988, NAMI, 211…).
    v2.0 does not include them. Intended per the email, but worth knowing.
15. **Legal citations** in the notices (e.g. 45 CFR 84.84, 91 FR 25496, 45 CFR
    92.201(c)) were carried across as written and not independently checked.
16. **Columbus office posters** use the same notices; not part of this repo.
