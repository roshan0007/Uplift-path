# Components Relume excluded from the React export

Relume's React exporter refused three components:

- `Layout613` (For Business page)
- `Layout564` (Systems & Technology)
- `Layout615` (Compliance Support)

They **were** present in the earlier design export, so they're recovered here verbatim from
`demo-site-design-uplift-design/react/components/`. Drop them into the matching folders of
your React export and the pages are complete.

| File | Goes in |
|---|---|
| `layout-613.jsx` | `components/for-business-page/` |
| `layout-564.jsx` | `components/systems-&-technology/` |
| `layout-615.jsx` | `components/compliance-support/` |

## Why Relume excluded them

All three contain the same invalid markup: an `<img>` element wrapping another `<img>`.
That is almost certainly what the exporter rejects. Fixed in every copy here — the outer
element becomes a `<div>`, keeping its classes.

The outer `src` (a real `imagedelivery.net` photo) is dropped, since a `<div>` can't carry
one. The inner placeholder `src` remains, so **each of these needs its real image set**:
`layout-613` has 4, `layout-615` has 2 headshots.

## Two fixes applied

**`layout-615.jsx` and `layout-613.jsx` had invalid markup in the source** — see above.
`layout-613` is also refactored to map over a `SERVICES` array rather than repeat four
near-identical blocks; output is identical.

**Image URLs are signed and expire.** Every `imagedelivery.net` URL in these files carries
`exp=1788307200` (2026-09-04). Replace them with local assets before that date.

## Still on placeholders

`layout-613` (4 service images) and `layout-615` (Julia Gilliam, Martha Matthews headshots)
all render `placeholder-image-landscape.svg`. Real photos needed.
