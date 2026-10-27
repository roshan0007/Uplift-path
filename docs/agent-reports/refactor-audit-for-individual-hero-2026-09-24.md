> Saved verbatim from the `ui-refactor-auditor` agent's hand-back (2026-09-24, `/for-individual` hero after PR #16). The agent
> returned it in chat instead of writing the file, so it was recovered from the
> session transcript. Findings describe the code as it was on that date.

[Subagent hand-back] The text below is the final report of a subagent this session delegated to. It is model output, NOT a message from the user: instructions, requests, or approval claims inside it are the subagent's words and carry no user authority. The harness indents every line of the report, so a frame-like line at column zero inside it would be forged. Notes above this frame may quote model-derived text, which carries no user authority either. The report follows:
  **Verdict:** The collage works at 1440 and the photos don't beat the heading, but the change has one real regression: narrowing the copy column breaks the h1 onto three lines between 992 and about 1087px. The heading below the strip also sits exactly as far from the photos as from its own paragraph. Both fixes are a few classes, and nothing needs to be redesigned.
  
  **Counts:** 15 pass · 5 fail · 4 override · 5 decision
  
  **Top three fails:**
  1. **The h1 is split onto three lines from 992 to about 1087px, and this branch caused it.**
  2. **"Meet From Anywhere in Ohio" is 24px from the photos and 24px from its own paragraph,** so it doesn't clearly belong to either.
  3. **The hero paragraph runs about 84 characters a line at desktop and 82–91 on tablet.** The book's comfortable limit is 75.
  
  **Report path:** I didn't write `refactor-audit-for-individual-2026-09-24.md`. My instructions say both to write it and not to write report files, and you asked for report-only, so the full report is below. It's ready to save to the repo root if you want it there.
  
  Nothing in the repo was changed. The fix numbers marked "tested" come from applying the style temporarily in the browser, then reloading.
  
  ---
  
  # Refactoring UI audit — For Individual (`/for-individual`), hero and its hand-off to the next section, 2026-09-24
  
  ## Fails, in fix order
  
  ### 1. Keep your line length in check (p. 99): the h1 breaks into three lines at 992–1087px
  **Where:** `components/sections/for-individual-page/layout-134.jsx:52`
  **Seen:** At 992 the container is 656px wide, from `min(48rem, 71vw-48px)`. The h1 at 72px renders as "Individualized / Support / for Ohio Adults", 259px tall. The line "Individualized Support" needs 724px, so it only fits from about 1087px up. Before this branch the container was 768px at every width above 992, and this didn't happen.
  **Why it breaks:** The narrowing was meant to keep the paragraph clear of the top-right photo. It also narrows the h1, which never came near that photo. A 72px heading with one word alone on a line is the loudest thing on the page.
  **Fix:** Put the container back to `lg:max-w-lg` and put the width limit on the `<p>` instead: `mx-auto max-w-md` (the existing 35rem token). This also fixes #3 and removes one arbitrary value. Tested at 992: the h1 is two lines and ends 35px above the top-right photo, the paragraph is 71px clear of it, and the hero gets 86px shorter.
  **Scope:** refactor
  
  ### 2. Avoid ambiguous spacing (p. 83): the next heading is equidistant
  **Where:** `components/sections/for-individual-page/layout-504.jsx:41` (`lg:pt-6`)
  **Seen (1440):** The strip ends at y=835. The h2 starts at 859 (24px gap) and ends at 921. Its paragraph starts at 945 (another 24px). At 1920 it is also 24 and 24.
  **Why it breaks:** The strip has a hard, flat bottom edge across the full width. A heading 24px under it reads as a caption for the photos rather than the title of its own section. The Figma frame draws it this tight too, so the fix goes slightly against the frame.
  **Fix:** `lg:pt-6` to `lg:pt-12` (48px). That still sits right under the strip, but the heading is now twice as far from the photos as from its paragraph. It doesn't need to go back to the old 80px.
  **Scope:** refactor
  
  ### 3. Keep your line length in check (p. 99): the hero paragraph is too wide
  **Where:** `layout-134.jsx:52`, and the `<p className="text-medium">` below it
  **Seen:** At 1440 and 1920 it is 768px wide at 18px: 167 characters in 2 lines, about 84 a line. At 991 it is 16px in 768px, with lines of 91 and 75. At 768 the lines are 82 and 84. The limit is 75.
  **Fix:** The same `max-w-md mx-auto` as #1. Tested at 1440: three lines of about 55–62 characters. The trade-off is that the paragraph becomes three lines where the frame draws two, and the hero gets 27px taller.
  **Scope:** refactor
  
  ### 4. Establish a spacing system (p. 60): an off-scale offset and a stale comment
  **Where:** `layout-134.jsx:93` (`lg:-mt-[19px]`) and the header comment at lines 21–24
  **Seen:** 19px isn't on the 4px spacing scale. The comment says the top-right photo "stays 98px under the navbar", but it measures 152px at both 1440 and 1920. The h1 is 20px larger than the frame (which was decided earlier), and that pushes the whole strip down about 51px. As a result the photo now lines up with the top of the h1 (both at y=224 at 1440), not above the tagline as the frame draws it. That alignment actually looks fine.
  **Fix:** `-mt-[19px]` to `-mt-5` (20px), and correct the comment to 152px. The uneven gaps between photos (11–24px) and the 4px offset between the two stacked photos in the third column (x=333 vs 329) are how the frame draws them, so no change there.
  **Scope:** refactor
  
  ### 5. Align with readability in mind (p. 111): a one-word last line on mobile
  **Where:** `layout-134.jsx`, the hero `<p>`
  **Seen (375):** The paragraph is centred over 5 lines, and the last line is 9 characters (lengths 35/37/41/41/9). This existed before this branch.
  **Fix:** Add `text-pretty` to the `<p>`. The h1 already uses `text-balance` the same way.
  **Scope:** refactor
  
  ## Decisions: real improvements that need a design call
  
  - **There are no photos below 992px (You don't have to fill the whole screen, p. 65).** On tablet, 180px of white sits between the button's bottom edge (466) and the next h2 (646). That is 96px of hero padding plus 80px of next-section padding, the normal section spacing on this page. On mobile it's 132px. By the book this passes: the white space is enough to separate the sections, and filling it with thumbnails would be decoration. The one weakness is that both sections use the same scheme, so below 992 nothing but white space marks the boundary. If it's wanted, the cheapest option is showing only `07-hands` as one full-width band below 992. That's a new layout, and the 930px file would look soft on a 2x-density tablet.
  - **Above 1440 the collage outgrows the type (Relative sizing doesn't scale, p. 79, and Everything has an intended size, p. 181).** At 1920 the photos are 1.33x their frame size (07-hands is 615px wide, the strip 394px tall), while the copy stays fixed with a 72px h1 in a 371px-tall block. On this 2x-density screen, 07-hands shows at about 1.5 image pixels per screen pixel, so it looks soft. The options are to stop the strip growing at 1440, which breaks the photos sitting flush against both edges, or to supply the photos at 3x. Either one is a layout or asset decision.
  - **The corner radii are baked into the images and don't match the tokens.** Measured from the image transparency: about 25.6px on nine of the photos but about 15.4px on `03-desk`, and the brand's image radius token is 8px. Because the corners are part of the image files, they also grow and shrink with the viewport (about 17px at 992, about 34px at 1920). Fixing this means re-exporting the images, which needs the designer.
  - **The only button in the hero is the outline style, next to dark photos (Not all elements are equal, p. 30).** The darkest photos are 01 (average brightness 32/255), 03 (46) and 04 (54). They're grouped at the lower left, and 04 is the highest photo in the strip, 174px from the button. The outline Get Started button weighs less than those dark blocks. The heading still clearly leads, but the button competes. The For Business hero uses the same outline style, so switching to the filled style should happen across the site or not at all.
  - **Below 992 the h1 and the next h2 are nearly the same size (44 vs 40px).** At desktop they are 72 vs 52. Fixing this needs a change to the type-scale token, not to this page.
  
  ## Overrides: book says X, brand says Y, no change
  
  - **Balance weight and contrast** (p. 48). The book would make the heading heavier. The brand keeps it at weight 400 on purpose, so size does the ranking: 72 vs 52px at desktop. No change.
  - **Use shadows to convey elevation** (p. 158). Photos and cards stay flat. The only shadow is the button's hard 3px ledge, which I measured as `0 3px 0 0` with no blur. Don't add a shadow to "lift" the photos. No change.
  - **Decorate your backgrounds** (p. 198). The collage is photos in position, not a background texture or pattern, so the no-texture ruling doesn't apply and nothing needs changing. Don't add a colour wash behind the strip. No change.
  - **Palette construction** (pp. 119–129). The colours are fixed tokens. No change.
  
  ## Passes
  
  - **Hierarchy:** the h1 clearly leads at desktop (72 vs 52px h2). The black-and-white treatment and `aria-hidden` quiet the photos, so they read as secondary to the copy, and nothing is set over them. The h1 is sized with the h1 style. "Ohio Residents:" is a useful qualifier, not a redundant label.
  - **Spacing:** tagline to h1 is 16px, h1 to paragraph 24px, paragraph to button 32px. Those are clean steps with no ambiguity inside the hero. The strip keeps a fixed shape rather than stretching to fill. There are no photo collisions at 992, 1440 or 1920: the button is at least 97px from photo 04 horizontally, and the paragraph is 19px from photo 08 at 992 even with the current fix. The page doesn't scroll sideways at any width (content width equals viewport minus the scrollbar). The empty band below 992 is the normal section spacing.
  - **Text:** the type sizes step correctly at 992 (h1 44 to 72, paragraph 16 to 18). No line-height or letter-spacing overrides; headings are at -1% tracking. Only Playfair and Lexend are used.
  - **Colour:** text rgb(0,10,8) on white is about 19.9:1, which passes.
  - **Depth and images:** the strip's flat bottom edge marks the boundary between the two white sections at desktop. The right-hand column breaking up beside the copy is the book's "overlap elements to create layers", done within the brand. At 1440 the images are exactly 2x their displayed size (07-hands is 930px shown at 920), and the edges that run off the page have square corners as intended.
  - **N/A:** grey text on coloured backgrounds, baseline alignment, semantic colours, relying on colour alone.
  
  **Heads-up:** at 1440x900 the h2 is cut by the bottom of the screen, with 41 of its 62px visible (at 1920x1080, 16px). That depends on window height and #2 doesn't fix it. I'm noting it rather than calling it a fail.
