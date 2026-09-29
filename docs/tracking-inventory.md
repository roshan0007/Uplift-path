# Tracking technology inventory

The build spec (`WebsiteTracking_InquiryFormBuildSpec_Oct2026_v1.0`, line **V-2**)
requires a written inventory of every tracking technology on the site — name,
vendor, category, purpose, retention — kept current. This is it.

**Keep it current in the same change that adds or removes a tag.** A new
non-essential technology also needs the HIPAA Security Officer's approval recorded
in the Monitoring Audit Register *before* it ships (V-3), and must sit behind a
consent gate (`<ConsentGate>` on `feat/cookie-banner`). Nothing on the
inquiry-form routes (contact, grievance, intake, consent form, thank-you) may ever
carry advertising or social technology (FM-1), and session replay, heatmap and
form-analytics tools are prohibited there in every category (FM-5).

Last reviewed: 2026-09-29, against the code on `legal/oct-2026-notices`. The consent
banner and `<ConsentGate>` referred to below exist only on `feat/cookie-banner`.

## Non-essential technologies (Analytics, Functionality, Advertising and Social)

**None.** The site loads no analytics, advertising, social, session-replay,
heatmap or accessibility-widget script. Searched `app/`, `components/`, `lib/` and
`hooks/` for Google Analytics/Tag Manager, Meta pixel, Clarity, Hotjar, UserWay,
Skynet and `next/script`: no matches.

> The Website Accessibility Notice says the site has a "built-in accessibility
> tool" (reading mask, contrast, text size, magnifier). The previous site used a
> Skynet Technologies widget. **It has not been carried over**, so that sentence
> is not yet true. When it is added it is a third-party script and needs a
> category (likely Functionality) and an entry below.

## Strictly Necessary

| Item | Set by | Purpose (why the site cannot run without it) | Lifetime |
|---|---|---|---|
| `zalb_*` cookie (`Secure`, `HttpOnly`) | Zoho, on `forms.zohopublic.com` | Load-balancer affinity so a form request reaches the same Zoho server. Set when an embedded form is displayed | Session |

## Third parties the site talks to

| Host | Vendor | Where | What it receives | Notes |
|---|---|---|---|---|
| `forms.zohopublic.com` (iframe) | Zoho Forms | `/contact-us`, `/grievance`, `/cmps`, `/consent-form`, intake step 1 | Whatever the visitor types into the form, plus the page URL as a `referrername` field (see `withReferrer` in `components/forms/zoho-form-slot.jsx`) | The notices state this platform operates under an executed BAA (FM-4, V-1). **Not verifiable from the repo — evidence must be on file.** |
| `static.zohocdn.com` | Zoho | Same pages | Static assets for the form | |
| `uplift-api.sarfarazsiddiqui199.workers.dev` | Cloudflare Workers (fronting Zoho Bookings / CRM) | `/booking` | Case id, chosen date/time, staff id | Runs in an individual Cloudflare account, not the organization's. Whether a BAA covers it is a question for the HIPAA Security Officer |
| `openings.upliftpathwellness.com` | Zoho Recruit | Link from Careers | Job applications (leaves this site) | |
| `www.magnific.com`, CARF, LinkedIn, Google Maps | — | Footer / accreditation links | Nothing — plain outbound links, no embeds | |

Fonts are self-hosted (`/fonts`); there is no Google Fonts request.
