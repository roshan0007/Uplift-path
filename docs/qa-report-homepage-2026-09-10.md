# QA report — Uplift Path homepage

**Scope: the homepage only (`/`).** This is not the all-routes sweep. It covers
`app/(site)/page.tsx` and the nine sections it composes, plus the shared navbar
and footer as they render on `/`.

- **Branch/commit audited:** `master` @ `3c3c75c`
- **Date:** 2026-09-10
- **Breakpoints:** desktop (1440x1000) and mobile (375x812), reloaded after each resize
- **Server:** `next dev` on `localhost:3000`

Cross-page findings appear only where a homepage asset or block could be shown
by grep to be reused elsewhere in `components/sections/`.

### Environment caveat (read before acting on anything below)

The Browser pane repeatedly stopped painting during this session. While it is
not painting, Chrome suspends `requestAnimationFrame` **and stops delivering
`IntersectionObserver` callbacks entirely** — verified directly: a freshly
created `IntersectionObserver` on `#uplift-outcomes` never fired once, not even
its initial callback.

Three things therefore **could not be verified live and are not reported as
defects**:

- the hero audience cards' fade-in (`header-104.jsx`)
- the hero scroll-cue's retire-on-CARF-strip behaviour (`header-104.jsx`)
- the sticky **IntakeBar** appearing/hiding (`intake-bar.jsx`) — it never
  mounted at any scroll position in this session

An earlier draft of this audit had "mobile menu does not open" and "IntakeBar
never appears" as top findings. Both were artifacts of the above. The mobile
menu **does** open correctly once the pane is fronted and painting (confirmed by
screenshot, including the Uplift Services sub-list). Anyone re-running this
should confirm the IntakeBar in a real browser.

---

## 1. Broken

### 1.1 White card text is invisible over the pathway illustrations — `Layout423`
`components/sections/home/layout-423.jsx`, section "Create Clear, Sustainable
Pathways to Meaningful Growth" (3rd section down, both breakpoints).

The 50%-black scrim div is written **before** the `<img>` inside the same
absolutely-positioned wrapper, and neither carries a `z-index`, so the image
paints on top of the scrim. The scrim does nothing. The white eyebrow, heading
and body copy sit directly on illustrations that have a near-white ground.

Measured contrast of the white heading against the actual pixels behind it
(sampled by re-rendering each image with the same `object-cover` mapping):

| Card | Image | Median contrast | Worst |
|---|---|---|---|
| Discovery & Listening | `home-who-we-help-0.png` | 3.69:1 | 1.00:1 |
| Your Pathway Plan | `home-who-we-help-1.jpg` | **1.04:1** | 1.03:1 |
| Measurable Progress | `home-who-we-help-2.jpg` | **1.04:1** | 1.03:1 |

Cards 2 and 3 are effectively white-on-white — the words "Your Pathway Plan" and
"Measurable Progress" are unreadable for most of their length. Card 1 only
scrapes by because its PNG is transparent and lets the scrim show through; its
16px eyebrow and body copy still fail AA there too. Fix: the scrim has to render
above the image.

### 1.2 No focus indicator on any button, including the page's primary CTA
`components/ui/button.jsx` (base class), visible on `/` at the green CTA band
`Cta25` and the navbar Contact button.

The Button base class contains `focus-visible:outline-none` and nothing replaces
it. Tabbing to the "Get Started" button in the green banner sets
`:focus-visible` but computed `outline-style` is `none` and `box-shadow` is fully
transparent — there is no visible indicator at all. A keyboard user cannot see
where they are on the page. Same for the navbar Contact button and the three
"Learn more" buttons.

### 1.3 The "Uplift Services" mega-menu is unreachable by keyboard
`components/sections/navbar-12.jsx` line ~212.

The trigger is a `<p role="button">` with **`tabIndex` of -1**, no `aria-expanded`
and no `aria-haspopup`, and it opens only on `onMouseEnter` (desktop) or
`onClick` (mobile). The panel itself is `display: none` when closed, so its links
are not in the tab order either. Result: the seven service pages behind that
menu (AI Consultation, Advisory Services, Systems & Technology, Compliance
Support, Business Consultation, Resource Assistance, Peer Coaching Support)
cannot be reached from the navbar by keyboard on any page of the site.

### 1.4 The mobile hamburger button has no accessible name
`components/sections/navbar-12.jsx` line ~129.

`<button class="-mr-2 flex size-12 ...">` contains only three decorative
`<span>` bars. No `aria-label`, no text, no `aria-expanded`. Screen readers
announce it as an unlabelled "button" — on mobile that is the only way into the
whole site's navigation.

### 1.5 Invalid nesting: `<button>` inside `<a>` — `Layout423`
`components/sections/home/layout-423.jsx`, all three cards.

Each "Learn more" is a real `<button>` nested inside the card's
`<a href="/how-we-work">`. Invalid HTML, and the button has no handler of its own
— clicking it just bubbles to the link. It looks like a second, separate action
and is not one.

*Note on things that are fine:* zero console errors, zero failed network
requests, zero images with `naturalWidth === 0`, no horizontal overflow at
375px, all 15 link destinations from `/` return 200, and the
`/for-business-page#business-consulting` anchor target exists.

---

## 2. Fake or placeholder content

Ordered by how far up the page a visitor meets it.

### `Layout423` — "Create Clear, Sustainable Pathways" (3rd section)
`components/sections/home/layout-423.jsx`

1. **All three card `alt` attributes are literally `"Relume placeholder image 1"`,
   `"...2"`, `"...3"`.** The images themselves are Uplift's own brand
   illustrations, so only the alt text is unedited — but a screen reader user is
   told three times that they are looking at a Relume placeholder.
2. **The three eyebrow labels are leftover Relume category tags that don't match
   the headings under them.** "Operational consulting" sits above "Discovery &
   Listening", "Process optimization" above "Your Pathway Plan", "Leadership and
   strategy" above "Measurable Progress". The eyebrow and the heading are
   describing two different taxonomies stacked on top of each other.
3. **All three cards link to the same destination** (`/how-we-work`), and all
   three "Learn more" buttons are dead. Three cards that go to one page reads as
   a template that was never re-pointed.

### `Layout237` — "Uplift Outcomes Across Your Organization" (4th section)
`components/sections/home/layout-237.jsx`

4. **Three generic Material Symbols icons pulled live from a public CDN**
   (`step.svg`, `settings.svg`, `progress_activity.svg` from
   `cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/`). These are
   Relume's default icons, not brand marks. A gear icon for "Uplift Systems" and
   a spinner icon for "Uplift Growth" are stock choices, not chosen ones.
5. **The "Uplift Growth" body copy is not a description of Uplift Growth.** It
   reads "To impact 100K lives by uplifting the individuals, businesses, and
   communities we serve by 2036." That is the company mission statement dropped
   into a service-description slot — it starts with an infinitive, doesn't
   parse as a sentence in context, and sits beside two cards that do describe
   their practice. The "100K by 2036" figure is also the kind of round number
   that reads as invented unless it is sourced somewhere.

### `Layout254` — "Empowering Success Across Industries" (5th section)
`components/sections/home/layout-254.jsx`

6. **`alt="Relume placeholder image"`** on the large centre illustration
   (`/images/home-benefits-section.png`). The image is a real brand illustration;
   the alt was never written.
7. **Four more CDN Material Symbols icons** (`psychology_alt`, `work`, `edit`,
   `partner_reports`). Same issue as above — `edit.svg` (a pencil) for
   "Educational Institutions" is a stock stand-in, not a considered choice.
8. **All four industry blurbs are unspecific capability-speak.** "Strategic
   advisory for education leaders to enhance operational performance, boost
   faculty engagement, and achieve academic excellence" could be pasted onto any
   consultancy's site. No named engagement, no result, no Ohio/behavioral-health
   specificity — which is odd given the CARF seal three sections above is the
   real, specific credential.

### `Testimonial10` — the single testimonial (6th section)
`components/sections/home/testimonial-10.jsx`

9. **The quote is an explicit, self-declared placeholder.** The source carries a
   comment at line 38: `PLACEHOLDER — awaiting real testimonial copy from Kylie
   Smith. Swap the sentence below for her actual words; the attribution
   underneath is real and stays.` So the site is currently publishing
   *invented words attributed by name to a real, named person* — Kylie Smith,
   Owner, LifeBridge Mentorship — under a five-star rating. This is the most
   serious trust problem on the page: it is not generic Relume filler that
   nobody is harmed by, it is a fabricated quotation with a real person's name
   on it. It should come down or be replaced before anything else in section 2.
10. The five stars are hard-coded `StarFull` icons with no rating source.

### `Faq1` — "Frequently Asked Questions" (7th section)
`components/sections/home/faq-01.jsx`

11. **The whole FAQ block is a near-duplicate of the For Business page's FAQ.**
    Same four questions in a different order, with lightly reworded answers.
    See section 4.
12. **The intro line is unedited Relume filler:** "Find answers to your questions
    about us."
13. **Every question is about business consulting.** "What is business
    consulting?", "Which industries do you specialize in?", "Why should we work
    with a business consultant?", "How do your consulting services create value
    for clients?" — on a homepage whose hero gives *equal billing* to
    individuals seeking peer coaching and mental-health support, and whose
    sticky bar targets Ohio Medicaid recipients. The individual audience is
    given zero answers. A visitor who clicked "For Individuals" in the hero and
    scrolled back has nothing here.
14. Question 1's answer — "expert advice, actionable strategies, and hands-on
    support to help organizations solve complex challenges" — is a dictionary
    definition of consulting, not information about Uplift Path.

### `Cta25` — the green CTA banner (8th section)
`components/sections/home/cta-25.jsx`

15. **Typo in the heading:** "Ready to unlock **Your** growth plan" — mid-sentence
    capital Y, and no terminal punctuation. This is the last thing a visitor
    reads before the footer.
16. The body copy ("personalized, actionable strategies tailored to your goals")
    is generic and, again, business-only on a two-audience page.

### Footer
`components/sections/footer-04.jsx`

17. **The LinkedIn link points at a personal profile, not a company page:**
    `https://www.linkedin.com/in/uptech-support`. `/in/` is the personal-profile
    path, and the slug reads "uptech support" rather than anything to do with
    Uplift Path. Worth verifying this is the intended destination — a visitor
    clicking the company's only social icon currently lands on an individual's
    profile with an unrelated name.

---

## 3. Design / alignment mistakes

1. **FAQ questions render in the wrong typeface — `Faq1`.**
   `components/sections/home/faq-01.jsx`. The `AccordionTrigger` is missing the
   `font-body font-[400]` pair that CLAUDE.md requires on every `faq-01`. Radix
   wraps the trigger in an `<h3>`, so the base `h1–h6` rule catches it and the
   question renders **Playfair Display 400** — a display serif at 18px, and
   neither bold (because `--font-weight-bold` is 400) nor the body face it is
   supposed to be. Measured: `font-family: "Playfair Display"`, `font-size: 18px`,
   `font-weight: 400`. *Not homepage-specific:* all eleven `faq-01` files on
   `master` are missing it (`grep -c font-body` returns 0 for every one), so this
   is one fix applied in eleven places, not a homepage drift.
2. **The green CTA button has no hover state at all — `Cta25`.** The button
   composes `btn-dark:shadow-none btn-dark:hover:translate-y-0`, so on the green
   banner it has no ledge to press into and no translate on hover, and nothing
   else changes (no colour, no border). The design system says the 3px translate
   onto the ledge *is* the press affordance; the page's single primary CTA is the
   one button that has neither. Contrast with the navbar Contact button, which
   correctly shows `box-shadow: rgb(6,167,133) 0 3px 0 0`.
3. **`text-scheme-text` is applied to seven `<img>` icons, where it does
   nothing.** `layout-237.jsx` and `layout-254.jsx`. An `<img>` cannot inherit
   `currentColor`; the SVG's own fill wins. The icons render at the material-
   symbols default black regardless of the section's scheme, so any future
   re-skin of these sections silently leaves the icons black.
4. **Icons are 48px squares next to 16px body copy in a centred column** —
   `layout-254.jsx`. In the two outer columns the icon/heading/body stack is
   centred and the icon is 3x the cap height of the heading below it, which
   makes the four industry blocks read as icon-first rather than text-first.
   Worth a look beside the tighter rhythm of `layout-237`.
5. **Heading level skip: `<h3>` → `<h5>`.** The testimonial quote is an `<h5>`
   inside the `<blockquote>` (deliberate, per the file comment, to keep Playfair),
   but it follows `<h3>` headings with no `<h4>` between. Also the two hero cards
   use `<h2>` for "For Businesses"/"For Individuals" at 28px, competing with the
   52px section `<h2>`s below them — same level, very different weight in the
   page outline.
6. **Two Material Symbols icon sets are loaded from `@latest` on a public CDN.**
   Seven external requests on a page that is otherwise fully self-hosted, on a
   site that ships as a static export. `@latest` is unpinned, so the icons can
   change under you, and if jsdelivr is unreachable the two capability sections
   lose all their icons.
7. **The hero audience cards are server-rendered at `opacity: 0`.** Their inline
   SSR style is `opacity:0;transform:translateY(12px)`, and they only become
   visible when Motion's animation runs. If JS fails or is slow, the homepage's
   primary above-the-fold call to action — the entire two-card audience selector
   — is invisible. (Observed live at computed `opacity: 0` and `0.335` while the
   pane was not painting; see the environment caveat — this is a progressive-
   enhancement observation, not a confirmed in-browser bug.)
8. **"CARF accredited" appears twice on the page** — once in the trust strip
   under the hero and once in the footer, both linking to the same carf.org
   provider URL. Not wrong, but the repeat is noticeable on a single scroll.

**Checked and clean:** fonts resolve correctly everywhere else (`h1` 72px /
`h2` 52px / `h3` 36px Playfair Display 400; body Lexend Deca 16px). No inherited
default sizes. The green CTA band uses dark text on `rgb(8,209,167)` — the
approved pairing, not the banned white-on-teal. No horizontal overflow at 375px.
Section vertical rhythm is a consistent 64px top/bottom on mobile, with the two
documented exceptions (hero 48px, `uplift-pathways` 40px top). Desktop
mega-menu is `lg:w-[min(72rem,90vw)]` centred and does not clip. Mobile menu
opens, expands the services sub-list, and closes.

---

## 4. Reused-content signal

Only what a grep of `components/sections/` proves about homepage content.

1. **The homepage FAQ is a reordered copy of the For Business page FAQ.**
   `components/sections/home/faq-01.jsx` vs
   `components/sections/for-business-page/faq-01.jsx` — same four questions,
   questions 2 and 3 swapped, answers reworded by a few words. The same four
   questions also appear in the scratch page `faq-for-test/faq-01.jsx`. This is
   one Relume FAQ block pasted three times, and it is why the homepage FAQ
   answers business questions only.
2. **The homepage testimonial section is a stripped copy of a Relume
   `testimonial-10` that still ships fake content elsewhere.** The homepage
   version's own header comment records that the export contained a two-slide
   carousel with an invented quote from "Sarah Mitchell, Executive Director,
   Behavioral Health", a CloudFront placeholder avatar, and a stock photo with
   `alt="Webflow logo 1"`. That original is still live in
   `components/sections/faq-for-test/testimonial-10.jsx` and
   `components/sections/page-20/testimonial-10.jsx` — both still contain
   "Sarah Mitchell" and both still carry `alt="Webflow logo 1"` twice. Those two
   are `robots: { index: false }` scratch pages, but they are reachable.
3. **The `alt="Relume placeholder image"` string appears on 4 homepage images
   and on 20 more across 12 other section files** (about-us, ai-consultation,
   career, compliance-support, for-business-page, for-individual-page,
   how-we-work, resource-assistance). It is a single unedited default, not a
   homepage oversight.
4. **The Material Symbols CDN icon pattern spans 8 section files site-wide**,
   7 instances of it on the homepage alone.
5. **Homepage images are not reused elsewhere.** `home-who-we-help-0/1/2` and
   `home-benefits-section` are referenced only by `components/sections/home/`.
   The two hero illustrations are homepage-only too. None of the homepage's
   photography is shared stock — the images are genuinely Uplift's own line
   illustrations. Only their alt text is template leftover.

### CTA wording inconsistency (same destination, different labels)

Four different labels on one page point at `/contact-us`:

| Label | Where | Destination |
|---|---|---|
| "Contact" (green button) | navbar | `/contact-us` |
| "Get Started" (green-band button) | `Cta25` | `/contact-us` |
| "Contact" (plain link) | footer | `/contact-us` |
| "Get started" (plain link) | footer | `/contact-us` |

The footer lists "Contact" and "Get started" as two separate items that go to the
same page. And "Get Started" is overloaded: on the CTA band it navigates to
`/contact-us`, while the sticky IntakeBar's "Get Started" opens the individual
application modal — same words, two different actions on one screen. The hero
cards use a fifth verb, "Start here".

Navbar and footer content is otherwise consistent with the rest of the site (both
are mounted once from `app/layout.tsx`). Note that CLAUDE.md's claim that "every
nav and footer link is still `href="#"`" is **out of date on `master`** — there
are zero `href="#"` links on the homepage; everything is wired.

---

## 5. Expiring assets

**No surviving `imagedelivery.net` URLs on the homepage, or anywhere in shipped
code.** A repo-wide grep (excluding `.git` and `node_modules`) returns matches in
exactly two files, both documentation:

- `.claude/agents/qa-inspector.md`
- `docs/import-v2-report.md`

Neither is served to a visitor. The 2026-09-04 signed-URL expiry has therefore
already passed with no impact on this page.

The homepage's closest equivalent third-party dependency is the seven
`https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/*.svg`
icons in `layout-237.jsx` and `layout-254.jsx` — no expiry date, but unpinned
(`@latest`) and off-site, which is the same class of risk on a static export.
Listed under Design (item 6) rather than here since nothing about them expires.
