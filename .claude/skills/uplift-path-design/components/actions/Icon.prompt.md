Renders a Material Symbols Rounded glyph (weight 500) as an `<img>` — the icon set the source site pulls from jsDelivr, loaded the same way the source loads it.

```jsx
<Icon name="step" size={48} />
<Icon name="keyboard_arrow_down" />
<Icon name="chevron_right" size={20} />
<Icon name="mail" invert />   {/* on a dark scheme */}
```

Glyphs used on the live site: `step`, `settings`, `progress_activity`, `psychology_alt`, `work`, `edit`, `partner_reports`, `add_business`, `business_messages`, `chat_info`, `medical_services`, `support`, `devices`, `assistant_device`, `more_time`, `keyboard_arrow_down`, `chevron_right`, `arrow_back`, `arrow_forward`, `check`, `close`, `mail`, `call`, `location_on`, `star`.

Intentional addition — the source imports these glyphs from a private `relume-icons` package plus raw jsDelivr `<img>` tags. This wrapper renders the same public Material Symbols set the same way, so glyphs survive image and PDF export. Glyphs are black by default; on dark sections pass `invert` (the `brightness(0) invert(1)` filter the source's `.logo-alt` utility uses). Ten of the exact SVGs shipped with the export live in `assets/svgs/` and can be referenced locally instead of the CDN.
