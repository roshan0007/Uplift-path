# UI kit — Uplift Path marketing website

Click-through recreation of the exported Relume site. Open `index.html`.

| File | Source components recreated |
|---|---|
| `Chrome.jsx` | `navbar-05` (sticky bar + two mega-menus), `footer-09`, plus `Section` / `SectionHeader` layout helpers |
| `HomeScreen.jsx` | `home/layout-422`, `home/layout-423`, `home/comparison-09`, `home/testimonial-10`, `home/faq-01`, `home/cta-40` |
| `BusinessScreen.jsx` | `for-business-page/layout-134`, `layout-237`, `layout-237_1`, `layout-419`, `layout-613`, `faq-01`, `cta-40` |
| `ContactScreen.jsx` | `contact-us/contact-09`, `contact-us/contact-06` |

All headings and body copy are lifted verbatim from those source files.

Interactions that work: nav mega-menus on hover, page switching via nav / Contact / Get Started / Book a discovery call, hover-expanding image cards, the `layout-419` sticky scroll-stack, accordions, testimonial carousel, and every form control (newsletter, signup, both contact forms acknowledge submit).

Deliberate gaps:

- Images are the 16-photo subset copied into `assets/images/`, so `layout-419` and `layout-613` reuse photos from neighbouring sections rather than their own (the source points those at Relume CDN URLs).
- The comparison table's two Relume placeholder logos are replaced with the Uplift Path mark and a plain "Going it alone" column label.
- The `cta-40` on the business page uses the sitemap's stated headline ("Let's Build More Effective Systems Together"); the shipped `for-business-page/cta-40.jsx` was not read.
- Mobile breakpoints are not implemented — this is a desktop recreation at 1440.
