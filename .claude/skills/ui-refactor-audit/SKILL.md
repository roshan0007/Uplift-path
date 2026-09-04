---
name: ui-refactor-audit
description: Audit an Uplift Path page or section against the Refactoring UI principles (Wathan & Schoger) and report which are followed, which are broken, and which the brand deliberately overrides. Use when asked to "run the refactoring guide", "refactor a page", "audit against Refactoring UI", "improve this page's design", or asked why a page looks plain, busy, empty, or unpolished. Reports and refactors within the existing design system — it never redesigns.
user-invocable: true
---

# Refactoring UI audit

Runs one page (or one section) through the *Refactoring UI* principles and
reports what holds, what breaks, and what the brand overrides on purpose.

Commissioned in the 2026-09-03 design review: *"build a skill so that every page
you can run that page through the refactoring guide and let me know what
principles are followed or not, and what actually makes sense according to the
refactoring or not."* That last clause is the job — this is a judgment pass, not
a lint run. A principle that doesn't apply to this brand is a finding too.

## The two files

- **[references/principles.md](references/principles.md)** — the checklist. All
  eight chapters, each check bound to the actual tokens, classes and files in
  this repo. Read it in full before auditing.
- **[references/brand-conflicts.md](references/brand-conflicts.md)** — where
  Uplift Path's rules beat the book's, and why. Read it too. Skipping it
  produces findings that are wrong: "add a shadow", "drop that border", "make
  the heading bolder", "put a texture behind that section" are all
  brand violations that the book would otherwise endorse.

Also load the **`uplift-path-design`** skill — it holds the tokens and component
specs the fixes have to land on.

## The source PDF

`Copy of Refactoring UI v1.0.2.pdf` — 218 pages, ~53 MB, not in this repo. The
page numbers in the checklist refer to it.

**Do not bulk-extract it.** It won't fit in context, and it is a commercial
copyrighted book — do not copy its text or figures into this repo or into a
report. The checklist already carries the principles in our own words, bound to
our own system; that is the artifact to work from. Cite a section by title and
page so a human can go read the original.

If a check genuinely needs the source, read that one page range only:

```bash
pdftotext -f 48 -l 51 "$USERPROFILE/Downloads/Copy of Refactoring UI v1.0.2.pdf" -
```

## Method

Establish the target first. Default to the **homepage** — that is the agreed
pilot page: refactor one page, get sign-off, then apply across the site.

### 1. Mechanical pass — cheap, do it first

Token violations are findings and don't need a browser. This project has **no
linter installed** (`package.json` has only dev/build/start), and the design
skill's `adherence.oxlintrc.json` does not run on current oxlint — it carries an
`x-omelette` key oxlint rejects, and its rules are `no-restricted-syntax`, which
oxlint doesn't implement. Treat that config as documentation of intent, not a
runnable check. The greps below cover the same ground and are verified to work:

```bash
cd components/sections/<page>
echo "### raw hex";      grep -rnoE '#[0-9a-fA-F]{3,8}\b' .
echo "### arbitrary";    grep -rnoE '[a-z-]+-\[[0-9.]+(px|rem)[^]]*\]' . | grep -v 'shadow-\[0_3px_0_0'
echo "### blur shadow";  grep -rnoE 'shadow-(sm|md|lg|xl|2xl)\b' .
echo "### gradient";     grep -rnoE 'gradient[a-z-]*' .
echo "### weight";       grep -rnoE 'font-(bold|semibold|extrabold|black)|font-family' .
echo "### type override";grep -rnoE '\b(leading|tracking)-[a-z0-9[]+' .
echo "### inline style"; grep -rnoE 'style=\{\{' .
echo "### opacity";      grep -rnoE '\bopacity-[0-9]+' .
```

How to read the output:

- **arbitrary** — the real prize. Any `text-[...]` is the type scale being
  bypassed; any `w-[340px]` / `min-h-[22rem]` is a size off-system. The one
  legitimate exception is the button ledge, `shadow-[0_3px_0_0_...]` and its
  `translate-y-[3px]`, filtered out above.
- **weight** — `font-bold` is not a violation, but remember it resolves to
  `400`. Every hit is a place where someone expected weight to create emphasis
  and got none. Cross-check each against *Balance weight and contrast* (p. 48).
- **opacity** — a FAIL only inside a non-light scheme, where it is the grey-on-
  colour problem in disguise (p. 36). Check which `.scheme-*` the file's section
  carries before judging.
- **blur shadow / gradient / raw hex** — straight brand violations, no judgment
  needed.

### 2. Render pass — both sides of 992px

The type scale steps at 992px, so a single viewport audits half the page.

```
mcp__Claude_Browser__preview_start  { name: "uplift-path-dev" }
```

Then for each of desktop (≥992px) and `resize_window` mobile (375px):
screenshot the page in full, and use `javascript_tool` to read **computed**
values — font sizes, gaps, contrast pairs, rendered line length. Do not audit
spacing or contrast from source; the tokens cascade and you will be wrong.

Verify the hero fits in one fold. That is a hard pass/fail on the homepage.

### 3. Chapter walk

Walk `principles.md` in order — Hierarchy, then Layout and Spacing, then Text,
then Colour, then Depth, then Images, then Finishing Touches. **The order is
load bearing:** a hierarchy problem misread as a spacing problem gets "fixed"
with padding and the page gets worse. Fix what a section says before what it
measures.

For every check, record one of: PASS · FAIL · OVERRIDE · N/A · DECISION.

### 4. Report

Write `refactor-audit-<page>-<date>.md` at the repo root, in the format below.

## Scope — refactor, not redesign

The binding constraint, from the same review: *"We don't have to redesign the
page. We have to refactor it, which means improve. Just improve."*

A finding is actionable only if it's a change to existing markup, an existing
token, or an existing class. Anything needing a new layout, a new asset, new
copy, or a new token is a **DECISION**: write it down with what it would cost,
and leave it. Sections are the visual source of truth — they came out of Relume
already styled to this system, and this audit finds what's *broken*, not what
differs from your taste.

Don't duplicate the other audits: `qa-inspector` owns placeholder content, fake
testimonials and dead links (every nav link is still `href="#"` by design);
`seo-auditor` owns the heading outline and meta tags. You may say a heading is
the wrong *size*; you may not renumber it.

## Report format

```markdown
# Refactoring UI audit — <page>, <date>

**Verdict:** <one sentence a non-designer can act on.>
**Counts:** N pass · N fail · N override · N decision

## Fails, in fix order
### 1. <Principle> (p. NN) — <what's wrong in five words>
**Where:** `components/sections/<page>/<file>.jsx:NN`
**Seen:** <the observed value — measured, not inferred>
**Why it breaks:** <one or two sentences>
**Fix:** <the exact token/class change>
**Scope:** refactor

## Decisions — real improvements that need a design call
### <Principle> (p. NN) — <what it would take>

## Overrides — book says X, brand says Y, no change
- **<Principle>** (p. NN). <One line.>

## Passes
<Grouped by chapter, one line each. Keep it short — this section exists to
prove the guide was applied, not to pad the report.>
```

Lead with the verdict sentence. Roshan reads the top and asks for one page at a
time; a report that opens with a table of contents has already failed.

## Applying fixes

Only when asked. Then: fails in report order, hierarchy chapter first,
re-screenshot after each chapter's worth of changes, and stop at the first
finding whose fix would need a token that doesn't exist. Never restyle a section
beyond the specific findings.
