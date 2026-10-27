# Individual intake flow, business page merge, and component fixes

## How to run this

**Work autonomously to completion. Do not stop to ask questions.** Every
decision point below has a stated default — take it, record the choice in your
final summary, and keep moving. If something genuinely ambiguous comes up that
isn't covered here, pick the option most consistent with the brand guidelines
and CLAUDE.md, write down what you assumed, and continue. Finish the entire
list before reporting back.

**Work on a new branch.**

```bash
git checkout -b individual-intake-and-business-merge
```

Branch from the commit that contains the finished homepage/hero work (currently
`homepage-hero-and-fold-fixes`, tip `623658f`). If that work has already landed
on master by the time you start, branch from master instead.

Commit in logical chunks as you go. **Do not push. Do not merge. Do not open a
PR.**

## Read first

- `.claude/skills/uplift-path-design/readme.md` — the design system skill
- `CLAUDE.md` — project rules, especially the route-rename and static-export
  gotchas
- `.claude/skills/uplift-path-design/design-export/sitemap.md` — the page map

## Ground rules

- Tokens only. No new colours, radii, shadows, or fonts. The one shadow in this
  brand is the hard `0 3px 0 0` ledge — never a blurred one.
- No emoji. Nothing bounces, springs, or scales on hover.
- Never white text on the teal/green fill.
- Every section carries exactly one scheme class; children read
  `--color-scheme-*`.
- Static export (`output: 'export'`): no API routes, no middleware, no server
  actions. New pages are real routes under `app/`.
- Cloudflare serves `out/` as static assets with **no Worker script**
  (`wrangler.jsonc` has no `main`). Redirects therefore go in a `_redirects`
  file placed in `public/` so the export copies it to `out/`.

---

## TASK 1 — Replace the broken 3-step process component

### The problem

`layout-486.jsx` is a horizontal scroll-jacking process section with giant
numerals and progress bars. The design is not working. It appears twice:

- `components/sections/for-individual-page/layout-486.jsx` (234 lines)
- `components/sections/business-conusltation/layout-486.jsx` (236 lines)

Both currently read:

> Process / Our simple 3-step consultation process / "Get started in just three
> simple steps. We cut through the noise and get straight to the work that
> matters."

Note the copy says "3-step" but the component renders four cards. That alone is
a bug.

### The fix

Replace both with a **vertical scroll timeline modelled on
`components/sections/systems-&-technology/timeline-05.jsx`** — the sticky rail
with the filling progress line and the dots that solidify as you scroll past
them. That component is the reference implementation; read it first and follow
its structure, its `Circle` sub-component, and its motion approach.

Do not copy its *content*. Each page gets its own steps in its own voice:

- **For Individuals** — the real journey a person goes through to get matched
  with a Peer Coach. This must line up with the four-step intake flow you build
  in Task 6 (Application → Eligibility → Scheduling → Consent). The two should
  tell the same story.
- **Business Consultation** — the real engagement journey for an organisation.

**The copy must not be dummy text.** No lorem, no "we cut through the noise", no
recycled Relume filler. Write it from what each page actually says elsewhere and
from `sitemap.md`. Keep it in the site's existing voice — plain, direct,
unhyped, no marketing superlatives. If a step count changes from three to four
or five, that is fine; make the heading match the number of steps you actually
render.

Delete the old `layout-486.jsx` files and their imports once the replacement is
in. Name the new files after the component they are (`timeline-05.jsx` in each
section folder is consistent with how this repo names sections).

---

## TASK 2 — CARF seal shine animation

Add a subtle **shine/sheen sweep** to the CARF seal so it reads as a highlighted
trust mark rather than a static image. Currently at
`components/sections/footer-04.jsx` and wherever else Task 3 of the previous
pass placed it.

**Important brand tension, read carefully:** CLAUDE.md says the brand has no
gradients. A shine sweep is normally built from a gradient. This is a
**sanctioned, narrowly scoped exception**: the gradient exists only as a moving
specular highlight masked to the seal graphic itself. It is not a brand surface
gradient, it must not bleed onto any background, and it must not be reused
anywhere else. Add a comment at the implementation site saying exactly that, so
a future session doesn't read it as licence to add gradients elsewhere.

Constraints:

- The sweep passes over the seal periodically, slowly, and quietly. It should
  be noticeable on a second look, not on the first. If it reads as flashy or
  "web 2.0 glossy", dial it down.
- Do not distort, recolour, stretch, or crop the accreditation mark. Any
  animation is an overlay on top of it, never a modification of it.
- Honour `prefers-reduced-motion: reduce` — no sweep at all for those users.
- Tailwind v4 animates `scale`/`translate`, not `transform`. Check the project
  memory note on this before writing keyframes.

---

## TASK 3 — Merge the two business pages into one

### The problem

There are two overlapping business pages:

| Route | Sections |
|---|---|
| `/for-business-page` | layout-134, layout-237, layout-237_1, layout-613, faq-01, cta-25 |
| `/business-conusltation` | layout-134, layout-395, layout-486, layout-353 |

They duplicate each other and neither is complete. Both must become **one
page**.

### What to do

**Default: `/for-business-page` is the surviving URL.** Reason: the new homepage
audience selector points there, and the nav's "For Businesses" column header
points there. It is the audience landing page, which is what this merged page
becomes. `/business-conusltation` is a service page whose content folds into it.

Then:

1. Take the **best sections from both** — keep the stronger hero, the stronger
   service presentation, the FAQ and the CTA. Drop what is redundant. `layout-486`
   is being replaced in Task 1; carry the new timeline over into the merged page.
2. **Add the full business service list to this page** — every service we offer
   an organisation, each linking to its own page:
   - AI Consultation → `/ai-consultation`
   - Advisory Services → `/advisory--services`
   - Systems & Technology → `/systems-&-technology`
   - Compliance Support → `/compliance-support`
   - Business Consultation → (now this page — see note below)
   - Resource Assistance → `/resource-assistance`

   **Exclude Peer Coaching Support** — that is the individual offering and does
   not belong here.

   The canonical descriptions for each already exist in the `BUSINESS_SERVICES`
   array at the top of `components/sections/navbar-12.jsx` (lines 18-66). Reuse
   that copy so the nav and the page agree.
3. **Delete** `app/business-conusltation/page.tsx` and
   `components/sections/business-conusltation/`.
4. **Add a 301** from `/business-conusltation` to `/for-business-page`. Create
   `public/_redirects` (Cloudflare Workers static assets reads it) containing:

   ```
   /business-conusltation /for-business-page 301
   ```

   CLAUDE.md is explicit that the site is indexed and every route rename needs a
   301 — do not skip this.
5. **Update the nav.** `navbar-12.jsx` line ~58 has a `Business Consultation`
   entry pointing at `/business-conusltation`. Decide between pointing it at
   `/for-business-page` or removing the entry as redundant with the column
   header. **Default: point it at `/for-business-page`** so the service name
   stays discoverable in the menu. Say which you chose.
6. Grep the whole repo for any other `business-conusltation` reference —
   footer, sitemap, internal links — and fix them all.

---

## TASK 4 — Fix the testimonial section

We have exactly **one real testimonial**, from **Kylie Smith, owner of LifeBridge
Mentorship (lifebridgementorship.org)**.

`components/sections/home/testimonial-10.jsx` currently renders a two-slide
carousel where **both slides are the identical fake testimonial** attributed to
"Sarah Mitchell, Executive Director, Behavioral Health", with a CloudFront
placeholder avatar and a stock image mislabelled `alt="Webflow logo 1"`.

Fix it:

- **One testimonial, no carousel.** Remove the second slide, the prev/next
  arrows and the dot indicators. A single centred quote.
- Attribute it to **Kylie Smith, Owner, LifeBridge Mentorship**.
- **Remove the photo section entirely** — both the round avatar and the
  logo image beside it. Name and title only.
- Write **clearly-marked placeholder review text**. The user will supply the
  real words later. Wrap it in a comment like
  `{/* PLACEHOLDER — awaiting real testimonial copy from Kylie Smith */}` so it
  is trivially findable. Keep it short, plausible, and in the site's voice.
- Keep the five stars.
- The same file is duplicated at
  `components/sections/faq-for-test/testimonial-10.jsx` and
  `components/sections/page-20/testimonial-10.jsx`. Those are Relume scratch
  pages carrying `robots: { index: false }` — **leave them alone**, but note in
  your summary that they still contain the fake testimonial.

---

## TASK 5 — Footer alignment

`components/sections/footer-04.jsx` looks off. The top row is a
`lg:grid-cols-[0.25fr_1fr_0.25fr]` with the logo + CARF block on the left, nav
links centred, socials right — but the columns are not visually balanced, and
the CARF seal sitting under the logo leaves a lopsided gap.

Fix the alignment so the three columns read as deliberate: consistent vertical
alignment across the row, the nav links genuinely optically centred, and the
CARF lockup sitting in a sensible relationship to the logo rather than dangling
below it. Check the bottom bar (line ~68) too — its
`flex-col-reverse items-start` with `md:justify-center` produces inconsistent
alignment between breakpoints.

Do not redesign the footer. Alignment and spacing only.

---

## TASK 6 — Individual intake flow — HIGHEST PRIORITY

Build a **four-step intake flow** for individuals seeking a Peer Coach. Every
form in this flow is a **Zoho form that the user will embed later** — your job
is to build the shell, the navigation, and a clearly-marked empty slot in each
step where the Zoho embed drops in.

### Shared structure

Every step shares the same layout:

1. A **heading** (per-step, below).
2. A **breadcrumb / step indicator**: `Application → Eligibility → Scheduling →
   Consent`, with the current step marked as active and completed steps marked
   as done. Build this as one reusable component — do not copy it four times.
3. **A Zoho form slot** — an empty, clearly-commented container sized to hold an
   embedded form. Something like:

   ```jsx
   {/* ZOHO FORM EMBED SLOT — paste the Zoho iframe/script here.
       Step: Application. Nothing else in this file needs to change. */}
   ```

   Give it a sensible min-height so the page doesn't collapse while empty, and a
   visible "form loads here" state during development that is trivial to remove.

Use the design system throughout: 2px borders, `rounded-card`, no shadow except
the ledge, one scheme class per section.

### Step 1 — Application (a modal, not a page)

- Triggered by the **"Get started" button on the individual side**. Those
  currently live at:
  - `components/sections/for-individual-page/layout-134.jsx:21`
  - `components/sections/for-individual-page/layout-504.jsx:66, 94, 122`
  - `components/sections/for-individual-page/cta-25.jsx:19`

  All five currently point at `/contact-us`. Rewire them to open the modal.
- **The URL does not change.** Step 1 is a popup over the individual page.
- Heading, verbatim:

  > **Find The Right Peer Coach For You**
  >
  > The details you share below are confidential and help our team make a
  > thoughtful match with a Peer Coach who best fits your unique goals and
  > needs.

- Breadcrumb with **Application** active.
- Zoho form slot.
- On submit → navigate to `/cmps`.

  Since the Zoho form isn't embedded yet, wire the "continue" path so it is
  obvious where the submit handoff goes. A plainly-marked temporary continue
  control is acceptable and should be commented as such.
- Use the existing dialog primitive in `components/ui/` if there is one — check
  before building a new modal. Do not rewrite a primitive; compose it.
- Standard modal hygiene: focus trap, Escape to close, scroll lock, accessible
  labelling.

### Step 2 — Eligibility → `/cmps`

- A real page at `app/cmps/page.tsx`.
- Same structure. Heading should be a variation on the step 1 heading, adapted
  to eligibility — write something that fits the site's voice and explains what
  this step is checking. Do not reuse the step 1 paragraph verbatim.
- Breadcrumb with **Eligibility** active, Application marked complete.
- Zoho form slot.
- Continue → `/booking`.

### Step 3 — Scheduling → `/booking`

- A real page at `app/booking/page.tsx`.
- **Heading and breadcrumb only for now.** A calendar wired to Zoho APIs comes
  later.
- Breadcrumb with **Scheduling** active.
- Leave a clearly-commented placeholder region for the future calendar:
  `{/* CALENDAR — Zoho Bookings API integration pending. */}`
- Continue → `/consent-form`.

### Step 4 — Consent → `/consent-form`

- A real page at `app/consent-form/page.tsx`.
- Same structure. Heading appropriate to a consent step.
- Breadcrumb with **Consent** active, all prior steps complete.
- Zoho form slot — the consent form is also a Zoho form.

### Flow notes

- All four steps must be reachable and navigable without any Zoho form present.
- These are intake pages, not marketing pages: give them
  `robots: { index: false }` so they don't get indexed mid-funnel. Follow the
  pattern already used by `faq-for-test` and `page-20`.
- Steps 2-4 render the site chrome (navbar and footer) like any other route.
- The step names in the breadcrumb must match the timeline you write for the
  individual page in Task 1 — one story, told twice.

---

## Verification — required, do not skip

Use the Browser pane tools to run the dev server. Never use Bash for this.

1. `preview_start` the dev server.
2. Walk the full intake flow: individual page → open modal → `/cmps` →
   `/booking` → `/consent-form`. Confirm the breadcrumb state is correct at
   every step and every Zoho slot is present and obvious.
3. Screenshot at **1440×900** and **375×812**: the merged business page, the two
   new timelines, the fixed testimonial, the footer, and each intake step.
4. Confirm the previous pass's above-the-fold work still holds on any page you
   touched — no section should require mid-section scrolling on desktop.
5. Confirm the CARF shine is subtle and that it disappears under
   `prefers-reduced-motion`.
6. Check `read_console_messages` for errors.
7. Confirm `/business-conusltation` no longer resolves to a page and that
   `public/_redirects` made it into `out/`.
8. `npm run build` must pass.

## Report back

- The step copy you wrote for both timelines, in full.
- Which business page survived, which sections you kept from each, and what you
  deleted.
- The nav decision for the "Business Consultation" entry.
- Every route added, and confirmation each is noindexed.
- Exactly where each Zoho embed slot is, by file and line, as a checklist the
  user can work through when the forms arrive.
- The placeholder testimonial text, flagged as placeholder.
- How you implemented the CARF shine and why it does not violate the
  no-gradients rule.
- Anything you deliberately did not change, and why.
- The branch name and the commits on it.

Do not push, merge, or open a PR.
