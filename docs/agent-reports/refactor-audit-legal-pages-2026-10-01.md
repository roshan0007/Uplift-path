# Refactoring UI audit — legal pages (`/cookies-and-tracking-technologies` + the shared `LegalPage` layout), 2026-10-01

**Verdict:** The page looks plain because it is one unbroken white field with nothing that isn't full-strength black, and its one real bug is that the sticky jump list runs off the bottom of the screen. Fix the sticky behaviour and the line length in `legal-page.jsx` now (small refactors, all 8 routes at once). Then decide whether the title should move into a full-width `.scheme-mint` band. That band is the one brand-approved way to add colour here, and it needs a sign-off.
**Counts:** 17 pass · 4 fail · 4 override · 6 decision

Scope: `components/sections/legal/legal-page.jsx`, which renders all 8 legal and notice routes. All measurements are computed values from the running dev server at 1440x900 and 375x812. I also loaded the other 7 routes at 1440x900 to size the jump list on each. Policy wording is out of scope and I have not touched it.

### Why it reads plain (the diagnosis before the fixes)

1. **No colour event anywhere.** Navbar `scheme-1`, the legal section `scheme-1`, the footer's first band `scheme-1`. That is about 5,000px of `#ffffff` before the jade footer band. The brand's own homepage formula is white plus *one* strong full-scheme block. This page has none, and on a legal page there is no CTA banner to supply one.
2. **Everything is set at full strength.** Every paragraph, bullet, jump-list link and heading is `#000a08` at 20.06:1. Only the version line is quieted (`/60`). With `--font-weight-bold: 400`, size is the only thing left to rank by, and the only size steps are h1 72, h2 36, h3 22 and body 16.
3. **The title is a tower, not a header.** "Cookies and Tracking Technologies Notice" at `text-h1` in a 25rem (400px) column wraps to 4 lines, **346px tall**, which is 38% of a 900px viewport. It wins on volume, and it is also what pushes the jump list off-screen (Fail 1).

The remedy is not decoration. Colour comes from a scheme, not a texture. Quiet the secondary items. Take the title out of the narrow column.

## Fails, in fix order

### 1. Not all elements are equal (p. 30) / sticky layout — the jump list is cut off
**Where:** `components/sections/legal/legal-page.jsx:91` (`<header className="lg:sticky lg:top-24 lg:self-start">`) and `:137` (`max-h-[50vh] overflow-y-auto` on the `<ul>`)
**Seen:** The whole header is sticky: h1, date and nav together. On this route it is **902px tall**, pinned at `top: 96px` in a 900px viewport, so it has only 804px to sit in. The last list item ("Contact") sits at **y = 998px** while sticky and can never be seen until the section ends. Header heights at 1440x900: cookies 902, privacy-policy 902, consumer-health-data 857, state-privacy-rights 836. So **4 of 8 routes clip the jump list**. Separately, the `<ul>` scrolls inside its own 450px (`50vh`) box on privacy-policy (570px of content) and terms-of-use (39 items, **1,275px** of content). The result is a nested scroll area inside a sticky element that is itself too tall. The cookies list (14 items) fills the 450px cap exactly, so it shows a scrollbar at any viewport shorter than 900px.
Also: `lg:top-24` and `scroll-mt-24` both leave 96px for a sticky navbar. The navbar (`navbar-12.jsx:153`) is **`position: static`**, so there is nothing to clear. That is 96px of dead band above the pinned column.
**Why it breaks:** The element that should stay in reach (the list) is pushed out of reach by the one that doesn't need to stay (a 4-line title).
**Fix:** Make only the nav sticky, and let the title scroll away.
- `<header>`: drop `lg:sticky lg:top-24 lg:self-start`. The grid item then stretches to the row height, which gives the nav a track to stick in.
- `<nav aria-label="On This Page">`: add `lg:sticky lg:top-8 lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto`.
- `<ul>`: drop `max-h-[50vh] overflow-y-auto`, keep `space-y-3 border-l border-scheme-border pl-4 text-small`.
- Headings: `scroll-mt-24` to `scroll-mt-8`, so a jump lands 32px under the viewport top rather than 96px.
**Verified by DOM simulation** on this route at 1440x900: the nav pins at top 32px, bottom 519px, all 14 items visible and no inner scrollbar at any scroll depth. Terms and Privacy still scroll inside the nav, but there is now one scroll area sized to the viewport instead of a 50vh box inside an over-tall sticky.
**Scope:** refactor (classes only, one file, all 8 routes)

### 2. Keep your line length in check (p. 99) — body measure runs long
**Where:** `legal-page.jsx:153` (`<div className="max-w-[45rem]">`)
**Seen:** At 1440 the body column is 720px of 16px Lexend Deca. The first paragraph averages **76 characters per line** and the longest (503 chars) **84**, over the 75 ceiling. `45rem` is also not a token (the file comment says it sits between `--container-md` 35rem and `--container-lg` 48rem on purpose).
**Why it breaks:** Long legal sentences at 84 characters make the eye lose the next line, and that is most of this page.
**Fix:** `max-w-[45rem]` to **`max-w-md`** (35rem, the system's text-column token). Simulated: 560px wide, **50–70 characters per line** across every paragraph over 200 characters. The extra right-hand whitespace is correct ("You don't have to fill the whole screen", p. 65). Mobile is unaffected (338px column, ~38 characters per line).
**Scope:** refactor

### 3. Emphasize by de-emphasizing (p. 39) — the jump list competes with the policy
**Where:** `legal-page.jsx:133`, `:142`
**Seen:** 14 links at 14px, `rgb(0,10,8)` full strength, all at the same weight as the body copy beside them. Only the version line uses `text-scheme-text/60`, at 5.36:1 on white, which passes AA.
**Why it breaks:** Weight can't lift the h2s (400 by rule), so the only way to let the policy headings lead is to quiet the navigation around them.
**Fix:** On each jump-list `<a>`, add `text-scheme-text/60` and replace `hover:opacity-70` with `hover:text-scheme-text` (the same token the date already uses, 5.36:1 AA). Keep the "On This Page" label at full strength with `font-semibold` so it reads as the list's head. This is a light scheme, so alpha text is allowed here (p. 36 applies only to coloured schemes).
**Scope:** refactor

### 4. Supercharge the defaults (p. 192) — the OS scrollbar in the jump list
**Where:** `legal-page.jsx:137` (and the nav after Fix 1)
**Seen:** The browser's default grey scrollbar shows inside the list on terms-of-use and privacy-policy, and on cookies below 900px of viewport height.
**Fix:** After Fix 1, on the scrolling `<nav>`: `[scrollbar-width:thin] [scrollbar-color:var(--color-scheme-border)_transparent]`. This uses the scheme's own border token, so there is no new colour, and the thumb reads as a hairline that matches the `border-l` beside it. Low priority. Fix 1 removes the scrollbar entirely on 6 of 8 routes.
**Scope:** refactor

## Decisions — real improvements that need a design call

### A. Even flat designs can have depth (p. 167) / Decorate your backgrounds (p. 198) — a `.scheme-mint` title band *(recommended first)*
Split the one `<section>` into two: a title band `<section className="px-[5%] py-16 md:py-20 lg:py-24 scheme-mint">` holding `<h1 className="text-h1 text-balance font-bold max-w-lg">` and the version/date line, then the existing `scheme-1` section with the jump list and body. This is exactly the client's 2026-09-03 ruling: one full scheme colour across a whole section, with no texture and no grey band. Contrast was computed: `#000a08` on `#dcf8f2` is 17.91:1, and the `/60` date line on mint is 5.16:1, both AA. It uses no new tokens. `scheme-mint` is already in use on the faq-01 and layout sections site-wide.
What it buys: the page gets its colour event. The title is one or two lines at 72px in a 48rem measure instead of a 4-line tower. The `longestWord(title) > 15 ? "text-h2"` workaround at `:114` can go, so "Nondiscrimination…" stops being the one route whose h1 is 52px while the other seven are 72px. The sidebar can shrink back from 25rem, which was only widened to fit the h1 (`minmax(0,20rem)`, the `--container-xxs` width).
Cost: about 20 lines of markup in one file. It changes the layout of 8 routes, so it needs sign-off.

### B. Mobile has no jump list at all
`nav` is `hidden lg:block`. At 375 the cookies notice is **8,692px** long with 14 sections and no way to reach one. Terms has 39. Option: compose the existing `components/ui/accordion` as a collapsed "On This Page" above the Introduction, below lg only. Cost: one composed primitive, no new component. Showing the plain list open would cost about 480px of scroll before the first word of policy.

### C. Don't rely on colour alone (p. 146) / Accent borders (p. 195) — no "you are here" state
The list has no current-section indicator. The on-brand mark would be a 2px left edge in `border-scheme-border` on the active item, sitting over the existing 1px hairline. It needs an IntersectionObserver scroll-spy (new behaviour), so this is a decision.

### D. A hairline above each h2
`border-t border-scheme-border pt-12` on every h2 except the first would echo the FAQ accordion rules. I do not recommend it by default. Spacing already separates the sections cleanly (56px above against 16px below), and the book's surviving advice here is to prefer spacing over a new border (p. 206). It would add rhythm, not fix a defect.

### E. 2px cards for lettered subsections
"Categories We Use" A–D (and privacy-policy's 28 h3s) could each sit in `border-2 border-scheme-border rounded-card p-6`. That needs grouping logic in `LegalPage` (an h3 and its blocks up to the next heading). At 28 cards on privacy-policy it would get busy, which is the failure the client rejected on 2026-09-03. If wanted, scope it to one content flag per route rather than all h3s.

### F. The bottom boundary
The body (`scheme-1`) runs straight into the footer's first band (`scheme-1`, no top rule) with 96px between. Other routes end in a `cta-25` on `scheme-accent`. A CTA on a legal page is new content, so this is not recommended here. Decision A doesn't fix the bottom either. Noted only.

## Overrides — book says X, brand says Y, no change
- **Balance weight and contrast** (p. 48). The book would bolden the h2s. They stay Playfair 400 (`--font-weight-bold: 400`), and emphasis comes from Fail 3 instead.
- **Shadows / elevation** (pp. 150–163). No card or panel shadow for the sticky nav. The brand has only the button ledge.
- **Use fewer borders** (p. 206). The 1px `border-l` on the jump list stays. Hairlines are system.
- **Decorate your backgrounds — patterns/textures** (p. 198). No texture or grey band behind the title or between sections. The only permitted move is a full scheme (Decision A).

## Passes
- **Starting from scratch:** the personality is consistent (Playfair/Lexend, no emoji, no motion beyond a 200ms opacity). No raw hex, blurred shadow or gradient in the file. `px-[5%]` is the system section pattern.
- **Hierarchy:** the date line is quieted by colour, not size (5.36:1). "Version 2.0 · Effective October 2026" carries no redundant label. Visual hierarchy is separate from document hierarchy: h2s render at `text-h4` (24/36px) and h3s at `text-h6` (18/22px) under an h1 at 44/72px, a clean ratio on both sides of 992.
- **Layout:** generous whitespace. Every margin is on the scale (`mt-12 md:mt-14 mb-4`, h3 `mt-8 mb-3`). Spacing is unambiguous: h2 **56px above / 16px below**, h3 **32 / 12**, so each heading sits clearly with its own copy. The sidebar is a fixed track, not a stretching one. The canvas isn't padded to fill the screen.
- **Text:** the scale steps correctly at 992 (h1 44 to 72, h2 24 to 36, h3 18 to 22). Body is 16px on both sides, so the mobile regular/small collapse doesn't bite here. No `em` sizes, no `leading-*` overrides (h2 1.3, body 1.5). Inline links are underlined, and copy is left-aligned. No all-caps runs.
- **Colour:** body 20.06:1, date 5.36:1, both AA. No coloured scheme, so no grey-on-colour risk. The palette-construction checks are N/A.
- **Images, empty states, overlap:** N/A. There are no images or empty states, and nothing to overlap.

Out of lane, not audited: heading outline and h-levels (seo-auditor), link targets and placeholder content (qa-inspector). Side note for whoever edits the file: the doc comment at `legal-page.jsx:6` still says "Accessibility, Terms of Use, Privacy Policy and Grievance". It now serves 8 routes.
