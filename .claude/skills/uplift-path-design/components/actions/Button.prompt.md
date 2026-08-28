Uplift Path's action primitive — a bubble-radius button sitting on a 3px hard ledge that presses down on hover.

```jsx
<Button>Get Started</Button>
<Button variant="secondary">Individual</Button>
<Button size="sm">Start</Button>
<Button variant="link" size="link" iconRight={<Icon name="chevron_right" />}>Learn more</Button>
```

Variants: `default` (caribbean green, dark label — the site's main CTA), `secondary` (transparent with a 2px scheme-coloured border, paired next to the primary in hero button rows), `secondary-alt` (white border for dark sections), `alternate` (white fill on coloured sections), `dark` (black fill, used for the CTA button on green `.scheme-accent` banners), `link` / `link-alt` (inline text action with a chevron), `ghost`, `none`.

Sizes: `default`, `sm` (navbar), `link` (no padding), `icon` (2.5rem square, used by the carousel arrows).

Notes: never add a blurred shadow. The ledge colour follows the variant — accent-dark under the primary, `--color-scheme-border` under secondary. On a green section, force the black treatment with `variant="dark"` (the source does this via a `.btn-dark` section class).
