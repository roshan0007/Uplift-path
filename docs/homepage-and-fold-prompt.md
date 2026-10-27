# Homepage overhaul + site-wide height and copy pass

## How to run this

**Work autonomously to completion. Do not stop to ask questions.** The user is
AFK. Every decision point below has a stated default — take it, note the choice
in your final summary, and keep going. If you hit something genuinely ambiguous
that isn't covered, pick the option most consistent with the brand guidelines and
CLAUDE.md, write down what you assumed, and continue. Finish the whole list
before you report back.

**Work on a new branch off master — do not commit to master.**

```bash
git checkout -b homepage-hero-and-fold-fixes
```

Commit in logical chunks as you go. **Do not push. Do not merge. Do not open a
PR.** Leave the branch local for review.

## Read first

- `.claude/skills/uplift-path-design/readme.md` — the design system skill
- `CLAUDE.md` — project rules
- `C:\Users\sarfa\Downloads\Uplift Path Brand Guidelines - Updated-CL.pdf 1.pdf`
  — 31 pages; use the Read tool's `pages` param. Start with 1-10, then 14-20 for
  the logo rules.

Attached for reference:

- Spring Health homepage — trust-signal treatment
- BetterHelp homepage — audience-selector card pattern
- "Care built around your life" (our own `/for-individual-page`)

## Ground rules

- CLAUDE.md says sections are the visual source of truth and must not be
  restyled. This task is a **scoped exception** for: (a) heights only, (b) the
  copy strings listed below, (c) the new homepage selector and trust strip.
  Everything else — layout, borders, hover behaviour, motion, colour — stays
  exactly as it is.
- No new colours, radii, shadows, or fonts. Tokens only. The one shadow in this
  brand is the hard `0 3px 0 0` ledge. No gradients, no emoji, nothing that
  bounces or scales on hover.
- Never white text on the teal/green fill.
- Static export: no API routes, no middleware, no server actions.

---

## TASK 0 — Fix the design skill itself (do this first)

`.claude/skills/uplift-path-design/readme.md` line 3 currently states:

> The tagline the site leads with is "One Path. Two Ways Forward."

**This is wrong**, and it is actively harmful — it is the reason the homepage H1
is confusing, and every future session that reads this skill will re-introduce
the error after we fix the code.

The brand guidelines PDF, page 1, gives the tagline as:

> **UPLIFTING EVERY LIFE WE SERVE**

Correct readme.md so the tagline is stated as "Uplifting every life we serve".
"One Path. Two Ways Forward." is a **positioning line about the two audiences**
(businesses and individuals) — it may be described as such, but it must not be
called the tagline.

While you are in there, verify the rest of that paragraph against the PDF
(vision, mission and purpose are on page 2) and correct anything else that
contradicts the brand doc. This skill is supposed to be the source of truth —
leave it actually true.

---

## TASK 1 — Copy fixes

### 1a. Tagline consistency site-wide

After Task 0, make the code agree with the corrected skill.

- `components/sections/home/header-104.jsx:11` reads "Uplift One Path. Two Ways
  Forward." — this is the confusing string the user flagged. The H1 should lead
  with the real tagline. **Default:** H1 becomes the tagline; if "One Path. Two
  Ways Forward." still earns a place it goes below as a smaller supporting line,
  otherwise drop it.
- Audit and reconcile every other appearance: `app/layout.tsx:21`,
  `components/sections/how-we-work/layout-254.jsx`,
  `components/sections/about-us/layout-134.jsx` (purpose),
  `components/sections/about-us/layout-183.jsx` (who-we-are).
- Grep for: `One Path`, `Two Ways Forward`, `Uplifting every life`.

### 1b. Grammar

`components/sections/home/header-104.jsx:15`
"trusted guidance every step" → **"trusted guidance at every step"**

### 1c. For-Businesses run-on

`components/sections/for-business-page/layout-134.jsx:17` reads
"Expert guidance for founders and leaders Transform challenges into…" — two
sentences fused with no punctuation.

**Default:** repair the punctuation on that hero paragraph. Do NOT replace the
whole paragraph — collapsing it to one short sentence would gut the page. The
short descriptor **"Consulting services for business growth."** is used as the
one-line sub-label under "For Businesses" in the new homepage selector
(Task 2), not as the hero replacement.

`components/sections/business-conusltation/layout-134.jsx:15` carries the same
copy correctly punctuated — reconcile the two.

### 1d. De-duplicate "clarity" / "sustainable pathways"

The homepage says the same thing three times:

- `home/header-104.jsx:14` — "…through clarity, collaboration and trusted guidance…"
- `home/layout-423.jsx:34` — "Create Clear, Sustainable Pathways to Meaningful Growth"
- `home/layout-423.jsx:37` — "We turn complexity into clear, sustainable pathways…"
- `home/layout-237.jsx:15` and `home/layout-254.jsx:15` — repeat it again

Tighten so "clear/sustainable pathways" appears **once** on the homepage. Keep
the hero sub-line (the user likes it) and rewrite the downstream headings so they
add new information rather than restate. List every before/after in your summary.

---

## TASK 2 — Homepage hero + audience selector

`components/sections/home/header-104.jsx` is currently just text and two plain
buttons. That is too thin for a first impression.

Rebuild as:

1. H1 = tagline (per 1a) + the existing sub-line (keep it, it works).
2. **One short prompting line** above the selector — e.g. "Where would you like
   to start?"
3. **Audience selector cards** — in the spirit of BetterHelp's three-card chooser
   and Spring Health's clear paths, but rendered entirely in OUR system: 2px
   border, `rounded-card`, no shadow, scheme classes only.
   - "For Businesses" → `/for-business-page`, sub-line
     **"Consulting services for business growth."**
   - "For Individuals" → `/for-individual-page`, sub-line clarifying coaching,
     therapy and counselling.

   **Default: two cards, not three.** The user floated "individual / couple /
   team", but we have no couples route and no team route — inventing them creates
   dead links. Two real destinations beat three broken ones.
4. Must fit above the fold at 1440×900 (see Task 4).

**Motion:** subtle entrance only — a small opacity + translate fade on the cards,
staggered, roughly 200–300ms. Tailwind v4 animates `scale`/`translate`, not
`transform`. Nothing springs, bounces or scales on hover. If the animation draws
attention to itself it is wrong — the user asked for "not too animaty".

**Imagery:** the user will source final photography themselves. Use the best
available from `public/images/` and list in your summary which slots want real
photos later.

---

## TASK 3 — CARF trust signal — HIGH PRIORITY

`public/brand/CARF.webp` already exists in the repo and is referenced
**nowhere**. The only mention anywhere on the site is prose in
`components/sections/compliance-support/layout-134.jsx:15`.

CARF accreditation is a primary trust factor and must be visibly prominent —
compare how Spring Health surfaces its trust claims right in the hero.

- Place the seal on the **homepage**, visible without scrolling far — in the hero
  or in a slim trust strip immediately below it.
- Also place it in **`components/sections/footer-04.jsx`** so it appears
  site-wide.
- Also on the compliance-support page, where it is contextually strongest.
- Real alt text. Do not stretch or recolour it — accreditation marks have usage
  rules. Respect any clear-space guidance in the brand PDF's logo section
  (pages 15-20).

---

## TASK 4 — Above-the-fold height fixes — HIGH PRIORITY

**This is a height problem, not a design problem.**

Several sections are taller than one viewport, so the section's own content gets
cut off and the visitor has to scroll *within* a section to see the rest of it.
That breaks the reading rhythm and is what the user means by "above the fold".

### What to change and what NOT to change

**Change:** heights, image heights, aspect ratios, and internal padding — only as
much as it takes to make the section fit.

**Do not change:** each component's design or behaviour. These are different
components with genuinely different jobs — `layout-423` has a hover-reveal with
motion, `layout-395` is a static card grid. **Do not unify them.** Do not port
one's styling onto the other, do not strip the hover animation from `layout-423`
to make it resemble `layout-395`, and do not add animation to the static grids.
Leave the visual language of each component exactly as it is.

`for-individual-page/layout-395.jsx` ("Care built around your life") is a useful
reference **only for how tall a card should end up** — roughly the vertical
budget that reads well. It is not a design template to copy.

### The target

At **1440×900** desktop, each section below should present its heading, subhead
and full card row within roughly one screen, with the section's normal breathing
room intact at top and bottom. Never crop an image so badly that the subject is
unrecognisable — if a height reduction ruins the image, reduce less and take the
remainder out of padding or type scale.

### Sections to fix

| File | Symptom |
|---|---|
| `components/sections/home/layout-423.jsx` | `min-h-[70vh]` on lines 56, 117, 178 — far too tall |
| `components/sections/ai-consultation/layout-423.jsx` | same `min-h-[70vh]` on lines 56, 115, 174 |
| `components/sections/about-us/team-06.jsx` | "Our team" — bios cut off, requires scrolling |
| `components/sections/about-us/layout-507.jsx` | "Board of Advisory" — needs only a **small** reduction |
| `components/sections/for-individual-page/layout-504.jsx` | "Meet from anywhere in Ohio" — the illustration below the tabs needs scrolling |
| `components/sections/career/layout-359.jsx` | "Why Uplift Path — Hear from Our Team" |
| `components/sections/career/layout-469.jsx` | `aspect-[2/3]` portraits — check whether these also overflow |

Notes:

- The two `layout-423` files are the same component used twice. `min-h-[70vh]` is
  the whole problem in both — apply the same corrected value to both, and keep
  the hover-reveal exactly as it works today.
- For `team-06`, the constraint is bio length, not just portrait height. Either
  reduce the portrait height, or shorten the visible bio with the full text
  revealed on expand. **Default: reduce portrait height first**, and only touch
  the bio if that alone does not fit. Say which you did.

Then sweep the rest of the site for the same overflow and fix any other section
that does it. Grep for `min-h-`, `h-[…vh]`, and `aspect-[`.

---

## Verification — required, do not skip

Use the Browser pane tools to run the dev server. Never use Bash for this.

1. `preview_start` the dev server.
2. For each of `/`, `/about-us`, `/for-individual-page`, `/for-business-page`,
   `/ai-consultation`, `/career`, `/compliance-support`: screenshot at
   **1440×900** and confirm no section requires mid-section scrolling.
3. Re-check at **mobile (375×812)**. The height reductions must not squash
   mobile — stacking and vertical scrolling between sections is expected and fine
   there. The above-the-fold rule is a desktop rule.
4. Check `read_console_messages` for errors.
5. `npm run build` must pass.

## Report back

- What you corrected in the design skill, and what else in it you found wrong.
- Every copy string changed, before → after.
- Where the CARF seal landed, and why there.
- The height values you settled on per section, and what each was before.
- Confirmation that no component's design or hover behaviour was altered.
- Any image slot that needs real photography from the user.
- Anything you deliberately did not change, and why.
- The branch name and the commits on it.

Do not push, merge, or open a PR.
