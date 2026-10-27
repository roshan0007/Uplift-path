# Refactoring UI audit — `/how-we-work`, 2026-09-29

**Verdict:** On desktop and on phones this page is sound. The break is on tablets (640–991px, iPad portrait included): the "What You'll Experience" video runs 1,385px tall below all six values. Capping it is a one-class fix. Everything else is line length.

**Counts:** 23 pass · 4 fail · 5 override · 4 decision

Measured with `javascript_tool` (computed styles) at **1440×900** (≥992px), **991×900** (<992px) and **375×812** (mobile). The page was reloaded after every resize. Nothing was changed except this file and the index row. This is the first audit of this route; the 2026-09-11 run was stopped before it finished.

---

## Fails, in fix order

### 1. Everything has an intended size / mobile rule (p. 181) — 1,385px video on tablet · **P1**
**Where:** `components/sections/how-we-work/layout-254.jsx:162` (wrapper), `:172` (video)
**Seen:** At **991** the video renders **878×1385px**, after all six values (`sm:order-last` puts it at the foot, full width, at the frame's 449:708 aspect). The mint section is **2,133px** tall, 2.4 screens, and ends on 1.5 screens of one picture. At 1440 it's 449×540 (the documented lg crop), and at 375 it's 338×532, correctly between the two groups of values.
**Why it breaks:** The comment at `:149-157` says "below `lg` … the height costs nothing". That's true at 375 and not at 640–991, where the video is both the lone picture after all the text and the tallest thing on the page. The same comment records that the lg crop exists because the section "could not be seen at once on any laptop".
**Fix:**
- `:172`: `lg:aspect-[449/540]` → `sm:aspect-[449/540]`. The crop already chosen for lg then also applies from sm.
- `:162`: add `sm:mx-auto sm:max-w-sm lg:max-w-none`.

At 991 the video becomes 480×577px. Phones are unchanged.
**Scope:** refactor

### 2. Keep your line length in check (p. 99) — centred lead-ins overrun · **P2**
**Where:** `how-we-work/layout-134.jsx:40` (hero), `how-we-work/layout-365.jsx:43`, `how-we-work/layout-254.jsx:123`, `how-we-work/faq-01.jsx:33`
**Seen:** Centred lead-ins inside `max-w-lg` (768px):
- 1440: **85–91 characters per line** at 18px, over 2 lines.
- 991: **97–102** at 16px.
- 375: 43–45 (PASS).
**Fix:** Add `mx-auto max-w-md` (560px, about 62–72 characters) to each lead-in `<p>`. The heading wrappers keep `max-w-lg`. This is the same fix as on the homepage and about-us.
**Scope:** refactor

### 3. Keep your line length in check (p. 99) — Flexibility card copy on tablet · **P3**
**Where:** `components/sections/how-we-work/layout-365.jsx:104`
**Seen:** At 991 the tall card spans the full container and its body runs **810px, about 105 characters per line**. It's 66 at 1440 and 37 at 375.
**Fix:** Add `md:max-w-md lg:max-w-none` to the `<p>`.
**Scope:** refactor

### 4. Avoid ambiguous spacing (p. 83) — value blocks pack tight on md+ · **P3**
**Where:** `components/sections/how-we-work/layout-254.jsx:47`, `:63`, `:130`, `:185`
**Seen:** Each value is icon→h3 **8px** (`md:mb-2`) and h3→p **8px** at md+ (12/8 on phones), and one value sits **20px** (`md:gap-y-5`) from the next. The heading is equidistant between its icon and its body. The whole group is only 2.5× tighter than the gap to the next value, so at 1440 the three values in a column read as one list, not three items.
**Fix:**
- `:47`: `mb-3 md:mb-2` → `mb-3`. The icon keeps 12px everywhere, and the heading now sits closer to its body than to its icon.
- `:130`, `:185`: `gap-y-6 md:gap-y-5` → `gap-y-8`.

That's about 24px taller per column at lg. It's inside the one-view budget the lg crop bought, but re-check the section height if finding 1 has not landed.
**Scope:** refactor

---

## Decisions — real improvements that need a design call

### Everything has an intended size (p. 181) — Flexibility illustration is upscaled
`how-we-work-flexibility.png` is **500×500**, rendered at 604×358 (1440, 1.2× upscale) and **874×518 (991, 1.75× upscale)**. On 2× screens it's 2.4× and 3.5× short. It's the client's own re-supplied original (`layout-365.jsx:20-26`), so the fix is a larger source asset, not markup.

### Measure in the two small pillar cards (p. 99)
At 1440 the Accountability and Kaizen bodies run **33–34 characters** over 4–5 lines, below the 45 floor. That's because the frame splits each 640px card 320/320 between copy and image. Widening the copy share means changing the frame's grid geometry. Cost: one section, visual sign-off.

### Unequal pillars (p. 30)
The third pillar's heading is `text-h3` (44px) while the first two are `text-h5` (28px), so Flexibility reads as the most important of three parallel values. It's the frame's bento composition, and bento layouts are allowed to vary scale. Flagged in case equal weight is what the content means.

### Copy — handed off, not audited here
"Three Simple Steps" heads a lead-in about "three core pillars". The Kaizen body reads "Kaizen making small…" (a missing "means"). The FAQ lead-in is still Relume's default. All three are copy, so qa-inspector owns them.

---

## Overrides — book says X, brand says Y, no change

- **Use shadows to convey elevation** (p. 158). The pillar cards are 2px borders on `rounded-card` with no shadow. Zero blurred shadows. No change.
- **Use fewer borders** (p. 206). Card borders, the video's 1px outline and the accordion hairlines are the system. Kept.
- **Decorate your backgrounds** (p. 198). The `experience-curve` is `--color-plantation` at 20%: flat colour in a shape, no ramp or repeat, and not a third exception (CLAUDE.md, `globals.css [12]`). No change.
- **Accessible doesn't have to mean ugly** (p. 142). No white on green on this page. The footer jade band is **3.14:1**, the sanctioned exception.
- **Ditch hex / more colours / define shades** (p. 119–129). N/A. The raw-hex grep hits (`cta-25.jsx:18`, `layout-254.jsx:11`, `layout-365.jsx:29`) are all in comments. The one inline `style={{}}` (`layout-254.jsx:51`) is the CSS mask that tints the icons from a palette token, which is legitimate because a mask can't be written as a class here.

## Passes

- **Starting from scratch:** two families only. No emoji, no scale or bounce motion. Icons tinted from `bg-viking-dark`, not baked.
- **Hierarchy:** h1 72px beats every h2 (52px) at 1440, and at 375 44px beats 40px. Visual hierarchy is decoupled from the outline correctly (the h1 is `text-h1` though the frame drew 52px, and the reason is documented). Eyebrows "First / Second / Third" are clearly secondary (16px Lexend 600 vs 28–44px Playfair). No grey on colour: mint is a light scheme and all its text is full `text-scheme-text`.
- **Layout & spacing:** every gap is on the scale except the documented `lg:gap-x-[7.3%]`. Eyebrow→h3→body is 8/8, a tight group under the card padding. Hero eyebrow→h1 16, h1→p 24, p→button 32.
- **Text:** no `leading-*` or `tracking-*` overrides. FAQ question 22 vs answer 18 (1440), 18 vs 16 (375). Value bodies 40–42 characters at 1440 and 42–45 at 375.
- **Colour:** text **20.06:1** on white, **17.91:1** on mint.
- **Depth:** white / white / **mint** / white / white. The hero→pillars pair is separated by the pillars' 2px card edges. FAQ→CTA is the documented `cta-25` reversal. The single break is the decided resolution in `layout-254.jsx:93-100`.
- **Images:** pillar illustrations are 640×581 into 318×289 (2×). The video honours `prefers-reduced-motion`.
- **Mobile rule (375):** pillars read text, image, text, image, text, image (each card copy then picture). Values read three values, video, three values. CTA has its small inline envelope. **PASS**.
- **Finishing touches:** the export's duplicated "Clarity" card is resolved to the frame's Kaizen. The curve is clipped by the section instead of spilling.

Out of lane, not reported: heading outline (seo-auditor), copy (qa-inspector).

Files audited: `E:\uplift-path-website\components\sections\how-we-work\` (layout-134, layout-365, layout-254, faq-01, cta-25), composed by `E:\uplift-path-website\app\(site)\how-we-work\page.tsx`.
