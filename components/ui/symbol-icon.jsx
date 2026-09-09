import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * A Material Symbol that can actually take a colour.
 *
 * The Relume export renders these as `<img src="…/step.svg" class="size-12
 * text-scheme-text">`. That `text-scheme-text` does nothing: an `<img>` paints
 * the file it points at, and CSS `color` cannot reach inside it. So every one
 * of these icons has always rendered in the SVG's own colour — Material
 * Symbols ship solid black — no matter what text class sits on it. The class
 * looked like it was doing the work, which is why it went unnoticed.
 *
 * This paints the icon with `background-color: currentColor` and uses the SVG
 * purely as a mask, so the glyph finally inherits from `color` and the whole
 * `text-*` / `text-scheme-*` vocabulary works on it like any other text.
 *
 * Not a rewrite of anything in `components/ui/` — there was no icon primitive
 * to compose, only bare `<img>` tags in the sections.
 *
 * Decorative by default. Every call site pairs the icon with a visible heading
 * that carries the same meaning, so it is `aria-hidden` and contributes no
 * accessible name. If you ever use one as the *only* label for a control, pass
 * `aria-hidden={false}` and give it a real label.
 */

/**
 * Pinned, deliberately. The export requested `@latest`, which re-resolves on
 * every visitor's request and can change the glyphs under a static build with
 * no deploy. Bump this on purpose or not at all.
 *
 * Worth knowing this is still a third-party CDN request from a site that is
 * otherwise fully self-hosted — 14 icons across the site come from here. If
 * that matters (offline builds, CDN outage, no third-party requests), the fix
 * is to vendor the seven SVGs into `public/svgs/` and point `SYMBOL_BASE` at
 * them. The mask approach works identically either way.
 */
const SYMBOL_BASE =
  "https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@0.34.0/rounded";

function SymbolIcon({ name, className, ...props }) {
  const url = `url(${SYMBOL_BASE}/${name}.svg)`;
  return (
    <span
      data-slot="symbol-icon"
      aria-hidden="true"
      className={cn("inline-block bg-current", className)}
      style={{
        maskImage: url,
        WebkitMaskImage: url,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        maskSize: "contain",
        WebkitMaskSize: "contain",
      }}
      {...props}
    />
  );
}

export { SymbolIcon, SYMBOL_BASE };
