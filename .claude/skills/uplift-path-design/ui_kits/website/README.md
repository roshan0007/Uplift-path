# Uplift Path — website UI kit

A click-through recreation of the Uplift Path marketing site, built from the section components in the source export (`react/components/`) and cross-checked against the homepage screenshots in `reference/homepage/`.

Open `index.html`. Navigation works: the navbar links and every CTA move between the three screens, and "Uplift Services" opens the real two-column dropdown on hover.

## Screens

| File | Screen | Source sections |
|---|---|---|
| `HomeScreen.jsx` | Home | `home/header-104`, `home/layout-423`, `home/layout-237`, `home/layout-254`, `home/testimonial-10`, `home/faq-01`, `home/cta-25` |
| `BusinessScreen.jsx` | For Businesses | `for-business-page/layout-134`, `layout-237`, `layout-613`, `business-conusltation/layout-353` |
| `ContactScreen.jsx` | Contact Us | `contact-us/contact-09`, `contact-us/contact-06` |
| `Chrome.jsx` | Navbar, footer, section heading, CTA banner, FAQ block | `navbar-12`, `footer-04`, `home/faq-01`, `home/cta-25` |

## Interactions that are real

- Navbar "Uplift Services" dropdown — opens on hover, chevron rotates 180°, panel slides down from -25% and fades in
- Home Pathway cards — hovering expands the card's flex basis and reveals its description and "Learn more" link
- Testimonial carousel — arrows and dots, looping
- FAQ accordion — multiple items open at once
- Contact form — select, radio group, checkbox and a submitted state

## What is abbreviated

Only three of the site's sixteen pages are built; the remaining thirteen reuse the same section vocabulary. Repeated content is trimmed (two testimonials instead of a full set). Nothing submits anywhere.

## Notes

Social logos in the footer come from Simple Icons via jsDelivr — the source imported them from the private `relume-icons` package, which was not readable. All other glyphs are Material Symbols Rounded 500, matching the source.
