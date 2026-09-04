# Where the brand outranks the book

*Refactoring UI* is general advice for designers starting from defaults. Uplift
Path is a finished design system with deliberate, documented decisions — several
of which are the exact opposite of what the book recommends.

**A brand rule beats a book principle every time.** Report the conflict as an
OVERRIDE and move on. Do not "fix" anything on this page. Every one of these
has been decided already, and re-litigating them is how an audit turns into the
redesign Roshan explicitly ruled out.

---

## 1. Decoration and backgrounds — decided by the client, 2026-09-03

The book's **"Decorate your backgrounds"** (p. 198) sanctions three moves:
change the background colour, use a repeating pattern, add a shape or
illustration. Only the first is permitted here.

This was litigated directly in the 2026-09-03 design review. The designer had
added textured and grey per-section backgrounds, reasoning that the page was
"very plain white" and sections were "getting dissolved" into each other — which
is a correct diagnosis and the book would back the instinct. Roshan rejected the
execution, repeatedly and unambiguously:

- "It's looking very busy right now. It was better without the backgrounds."
- "We just don't need designs for the sake of design. We need design that makes
  sense and has a purpose behind the design."
- "Remove it. I like it to be clean, better."

And gave the shape of the approved alternative:

- "If you look at Headway, they have a full background colour. Even footer and
  all. It looks so stable and good and clean. The backgrounds you have added
  look busy."

**The ruling:** one full background colour across a whole section, footer
included. Not per-section texture, not a repeating pattern, not a decorative
grey band to separate two blocks.

This is already the design system's own mechanism — every section gets exactly
one `.scheme-*` class and children read `--color-scheme-*`. So the fix for
"sections dissolve into each other" is **assign a different scheme to the
adjacent section**, never add a texture behind one. Two `.scheme-light` sections
in a row is the actual defect; a texture is a workaround for it.

Two further constraints from the same review, both on the approved side:

- **The hero must fit in one fold.** Roshan said so twice — "Not busy and fits
  in one fold… The new one you created doesn't really." Treat one-fold fit as a
  hard pass/fail on the homepage hero.
- **Motion is decorative-minimal.** A shine on the CARF seal was approved over a
  360° rotation. Consistent with the standing rule: nothing bounces, springs or
  scales on hover.

## 2. Shadows and elevation

| The book | This brand |
|---|---|
| Build an elevation system: several blurred shadows at increasing sizes, small for slightly-raised, large for modals (**"Use shadows to convey elevation"**, p. 158) | **One shadow exists: a hard `0 3px 0 0` ledge under a control, zero blur.** No elevation system. Never add a blurred shadow. |
| Shadows have two parts — a tight ambient shadow plus a larger direct one (p. 163) | Not applicable. The ledge is a single hard offset. |
| Combine shadows with interaction — press moves the element down and shrinks the shadow | **This one the brand already does, and more literally.** Buttons translate down 3px onto their ledge on hover and the ledge goes away. Hover and press are the same state by design; there is no separate press treatment to add. |

The book's **"Even flat designs can have depth" → "Using solid shadows"**
(p. 167) is the section that actually describes this brand. Cite that, not the
elevation chapter.

Cards carry 2px border, `rounded-card`, **no shadow.** Do not give a card a
shadow to "lift" it.

## 3. Borders

The book's **"Use fewer borders"** (p. 206) says borders add noise — reach for a
box shadow, two background colours, or extra spacing instead.

Inverted here. Borders are the brand's primary structural device:

- Cards: 2px border, `rounded-card`, no shadow
- 1px hairlines: accordion rules, the footer divider, the nav dropdown sheet
- Inputs and select triggers: 2px border all round, transparent fill, 12px
  radius, **no focus ring**

Removing a border to reduce noise is a brand violation. The only part of the
principle that survives: when you need a *new* separation that the system
doesn't already have, prefer a background-colour step or extra spacing over
inventing another border.

## 4. Type weight

The book's **"Balance weight and contrast"** (p. 48) assumes weight is a free
variable — go heavier to emphasise, lighter to recede.

`--font-weight-bold` is **`400`** in this system, on purpose. A "bold" section
heading (h2–h6) is therefore still regular weight; Playfair Display 400 carries
the headings. **Do not "fix" this.**

Consequence for the audit: weight is not an available emphasis tool for
headings. Everything the book would solve with `font-bold` must instead be
solved with contrast (a scheme colour against a muted sibling) or a size step.
That makes **"Emphasize by de-emphasizing"** (p. 39) the workhorse principle on
this site.

## 5. Colour construction

The book spends three sections on building a palette — **"Ditch hex for HSL"**
(p. 119), **"You need more colours than you think"** (p. 123), **"Define your
shades up front"** (p. 129).

All N/A. The palette is fixed, complete, and generated: `app/globals.css` is
**derived** from
`.claude/skills/uplift-path-design/design-export/globals.original.css`, with
four deviations marked `[1] [2] [3] [4]` in the file header. Never hand-edit a
token value — re-derive if the export changes.

Never invent colours, shadows or radii. If a value isn't in the tokens, it isn't
in the brand.

## 6. Contrast — the brand is *stricter* than the book

The book's **"Accessible doesn't have to mean ugly"** (p. 142) is advice. Here
it is a hard rule with a specific known failure:

**Never white text on the teal/green fill. It is 1.96:1 and fails WCAG AA.**

Dark text on green is the only approved pairing. Every scheme sets
`--color-scheme-btn-text` to the dark neutral. On the green CTA banner the
button goes black-with-white-label via the section's `.btn-dark` class.

Related trap, and a real one: `.scheme-accent` / `.scheme-2` **deliberately
omits** the nested default-button colour rule that the other six schemes carry.
It would out-specify `.btn-dark`'s white label and paint black text on the black
CTA button. There is a comment in `globals.css` saying so. Do not "restore" it
for symmetry — an audit finding that flags this as an inconsistency is wrong.

## 7. Things with no equivalent in the book

Standing brand rules that no principle here can override:

- No emoji.
- No gradients — the brand has none.
- Nothing bounces, springs or scales on hover.
- Headings are Playfair Display; body is Lexend Deca. The `@font-face` block at
  the top of `globals.css` is the only place a font-family is declared.
- Never rewrite a primitive in `components/ui/` — compose it. The one deviation
  from the export is documented in a comment in `button.jsx`.
- Prefer the named scheme classes in new work. Don't renumber anything —
  `.scheme-1/2/3` are aliases of `.scheme-light/accent/navy` and are what the
  exported sections actually write.

---

## Reporting a conflict

When a check lands on one of these, the finding is still worth writing down —
it shows the guide was applied rather than skipped. Format it as:

> **OVERRIDE** — *Use fewer borders* (p. 206). Book would drop the 2px card
> border for a background step. Brand keeps it: borders are the structural
> system here. No change.

That is the whole entry. One line, no proposal.
