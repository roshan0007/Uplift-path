---
name: "Demo site design uplift"
theme: "light"

colors:
  neutral:
    shade-0: "#FFFFFF"
    shade-1: "#F2F2F2"
    shade-2: "#D8DAD9"
    shade-3: "#B2B5B4"
    shade-4: "#7F8483"
    shade-5: "#4C5352"
    shade-6: "#192220"
    shade-7: "#000A08"
    white: "#FFFFFF"
  caribbean-green:
    shade-1: "#E6FAF6"
    shade-2: "#CDF5ED"
    shade-3: "#52DEC1"
    shade-4: "#08D1A7"
    shade-5: "#06A785"
    shade-6: "#035342"
    shade-7: "#023E32"
  pickled-bluewood:
    shade-1: "#E9EBED"
    shade-2: "#D4D8DC"
    shade-3: "#6B7784"
    shade-4: "#2C3E50"
    shade-5: "#233140"
    shade-6: "#111820"
    shade-7: "#0D1218"
  cerulean:
    shade-1: "#E5F5FA"
    shade-2: "#CCEBF5"
    shade-3: "#4DBBDE"
    shade-4: "#019ED0"
    shade-5: "#007EA6"
    shade-6: "#003F53"
    shade-7: "#002F3E"
  black:
    shade-1: "#E5E5E5"
    shade-2: "#CCCCCC"
    shade-3: "#4C4C4C"
    shade-4: "#000000"
    shade-5: "#000000"
    shade-6: "#000000"
    shade-7: "#000000"
  viking:
    shade-1: "#EDFBF8"
    shade-2: "#DCF8F2"
    shade-3: "#85E7D3"
    shade-4: "#52DEC1"
    shade-5: "#41B19A"
    shade-6: "#20584D"
    shade-7: "#184239"

typography:
  heading:
    fontFamily: "Playfair Display"
    fontWeight: 400
  body:
    fontFamily: "Lexend Deca"
    fontWeight: 400
  sizes:
    desktop:
      h1: 72px
      h2: 52px
      h3: 44px
      h4: 36px
      h5: 28px
      h6: 22px
      text-large: 22px
      text-medium: 18px
      text-regular: 16px
      text-small: 14px
      text-tiny: 12px
    mobile:
      h1: 44px
      h2: 40px
      h3: 32px
      h4: 24px
      h5: 20px
      h6: 18px
      text-large: 18px
      text-medium: 16px
      text-regular: 12px
      text-small: 12px
      text-tiny: 10px

ui:
  style: "bubble"
  buttonRadius: 12px
  tagRadius: 6px
  inputRadius: 12px

cards:
  style: "edgy"
  borderWidth: 2px
  dividerWidth: 2px
  radiusLarge: 8px
  radiusMedium: 8px
  radiusSmall: 8px

schemes:
  - name: "Scheme 1"
    background: "chromatic1-shade-4"
    backgroundHex: "#08D1A7"
    foregroundHex: "#08D1A7"
    textHex: "#000a08"
    accentHex: "#000a08"
    borderValue: "#000a08"
    useLogoVariant: light
    cssClass: "scheme-1"
  - name: "Scheme 2"
    background: "chromatic2-shade-4"
    backgroundHex: "#2C3E50"
    foregroundHex: "#2C3E50"
    textHex: "#ffffff"
    accentHex: "#08D1A7"
    borderValue: "#ffffff"
    useLogoVariant: dark
    cssClass: "scheme-2"
  - name: "Scheme 3"
    background: "chromatic4-shade-4"
    backgroundHex: "#000000"
    foregroundHex: "#000000"
    textHex: "#ffffff"
    accentHex: "#08D1A7"
    borderValue: "#ffffff"
    useLogoVariant: dark
    cssClass: "scheme-3"
  - name: "Scheme 4"
    background: "neutral-shade-0"
    backgroundHex: "#FFFFFF"
    foregroundHex: "#FFFFFF"
    textHex: "#000a08"
    accentHex: "#000a08"
    borderValue: "#000a08"
    useLogoVariant: light
    cssClass: "scheme-4"
  - name: "Scheme 5"
    background: "chromatic5-shade-2"
    backgroundHex: "#DCF8F2"
    foregroundHex: "#DCF8F2"
    textHex: "#000a08"
    accentHex: "#000a08"
    borderValue: "#000a08"
    useLogoVariant: light
    cssClass: "scheme-5"
  - name: "Scheme 6"
    background: "chromatic3-shade-6"
    backgroundHex: "#003F53"
    foregroundHex: "#003F53"
    textHex: "#ffffff"
    accentHex: "#08D1A7"
    borderValue: "#ffffff"
    useLogoVariant: dark
    cssClass: "scheme-6"
  - name: "Scheme 7"
    background: "chromatic1-shade-6"
    backgroundHex: "#035342"
    foregroundHex: "#035342"
    textHex: "#ffffff"
    accentHex: "#ffffff"
    borderValue: "#ffffff"
    useLogoVariant: dark
    cssClass: "scheme-7"
---

# Demo site design uplift — Design Specification

This file contains machine-readable design tokens in the YAML frontmatter above, and human-readable guidance below.

## Colors

The design uses a **light** theme with a neutral palette and 5 chromatic palettes.

- **Neutral shades** range from shade-0 (darkest) to shade-7 (lightest), plus white
- **Caribbean Green** — primary shade: `#08D1A7`
- **Pickled Bluewood** — primary shade: `#2C3E50`
- **Cerulean** — primary shade: `#019ED0`
- **Black** — primary shade: `#000000`
- **Viking** — primary shade: `#52DEC1`

Use the CSS custom properties from `react/globals.css` for all colors (e.g. `--color-neutral-darkest`, `--color-blue-ribbon`).

## Typography

Headings use **Playfair Display** at weight 400. Body text uses **Lexend Deca** at weight 400.

The type scale has desktop and mobile sizes. Apply mobile sizes at smaller breakpoints. All values are in `react/globals.css`.

## UI Elements

UI style is **bubble** with button radius 12px. Cards use the **edgy** style with border-width 2px.

## Color Schemes

Sections use color schemes to control their visual appearance. Each scheme is derived from a single background color — all other colors (text, foreground, accent, border) are automatically computed for optimal contrast.

| Scheme | Background | Text | Accent | Logo | CSS class |
|--------|-----------|------|--------|------|-----------|
| Scheme 1 | Caribbean Green (#08D1A7) | #000a08 | #000a08 | light | `.scheme-1` |
| Scheme 2 | Pickled Bluewood (#2C3E50) | #ffffff | #08D1A7 | dark | `.scheme-2` |
| Scheme 3 | Black (#000000) | #ffffff | #08D1A7 | dark | `.scheme-3` |
| Scheme 4 | Neutral White (#FFFFFF) | #000a08 | #000a08 | light | `.scheme-4` |
| Scheme 5 | Viking Lighter (#DCF8F2) | #000a08 | #000a08 | light | `.scheme-5` |
| Scheme 6 | Cerulean Darker (#003F53) | #ffffff | #08D1A7 | dark | `.scheme-6` |
| Scheme 7 | Caribbean Green Darker (#035342) | #ffffff | #ffffff | dark | `.scheme-7` |

Apply a scheme by adding its CSS class to the section element. See `sitemap.md` for which scheme each section uses.

### Tweaking Schemes

To create visual variation, you can change which scheme a section uses. When switching schemes:

- Swap the CSS class (e.g. change `.scheme-1` to `.scheme-2`)
- All child elements automatically inherit the correct text, accent, and border colors
- Use the matching logo variant (`logo-light.png` or `logo-light.png`) based on the scheme's `useLogoVariant`
- Alternate between light and dark schemes to create visual rhythm
