Uplift Path's action control — solid green for the single primary action in a section, `secondary` (bordered, transparent) for everything else.

```jsx
<Button>Contact</Button>
<Button variant="secondary">Get Started</Button>
<Button variant="link" size="link" iconRight={<Icon name="chevron_right" />}>Explore</Button>
```

Variants: `default` (green fill, near-black label), `alternate` (white fill), `secondary` (2px border, transparent, 10px backdrop blur), `secondary-alt` (white border on dark), `link` / `link-alt` (no chrome, 8px gap for a trailing chevron), `ghost`, `none`. Sizes: `default`, `sm` (navbar/footer), `link`, `icon` (40px square, carousel arrows). Borders are always 2px; radius 6px. Hover darkens the fill; there is no press transform.
