---
name: uplift-path-design
description: Use this skill to generate well-branded interfaces and assets for Uplift Path, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for protoyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Working in an existing Next.js + Tailwind codebase

**Read `production.md` first.** The `components/*.jsx` files in this skill are inline-styled for a browser sandbox with no build step — do not copy them into a Next.js app. That project's own `@/components/ui/*` (from the Relume React export) is the component layer to use. This skill supplies the rules, tokens and assets.

Before writing any page, check it against the sanity checklist at the end of `production.md`.
