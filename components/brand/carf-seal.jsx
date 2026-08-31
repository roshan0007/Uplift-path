"use client";

import { cn } from "@/lib/utils";
import React from "react";

/**
 * Uplift Path's entry in CARF's public provider directory — the page that
 * proves the seal rather than asserting it.
 *
 * Every place the seal appears links here. That is the point of an
 * accreditation mark: it is a claim someone else stands behind, and a visitor
 * who wants to check it should be one click from the issuer's own record, not
 * from our page about the seal.
 */
export const CARF_PROVIDER_URL =
  "https://carf.org/provider/uplift-path-inc-409426/";

/**
 * The CARF "Aspire to Excellence" accreditation seal, with a slow specular
 * sweep across it.
 *
 * ---------------------------------------------------------------------------
 * SANCTIONED GRADIENT EXCEPTION — READ BEFORE COPYING THIS ANYWHERE ELSE.
 *
 * CLAUDE.md is correct that this brand has no gradients. This is the one
 * narrowly-scoped exception, agreed for this element only. The gradient here is
 * not a brand surface: it is a moving specular highlight, and it is masked by
 * the seal's own alpha channel (`mask-image: url(/brand/CARF.webp)`), so it can
 * only ever paint on pixels the seal itself occupies. It cannot bleed onto a
 * section background, a card, or a button.
 *
 * This is NOT licence to add gradients elsewhere. Backgrounds, buttons, cards
 * and text stay flat colour. If you find yourself reaching for
 * `bg-gradient-to-*` on anything that is not this seal, the answer is no.
 * ---------------------------------------------------------------------------
 *
 * The mark itself is never modified: no recolouring, no cropping, no stretch.
 * It renders at its native 1:1 and the sweep is a sibling overlay on top of it.
 *
 * `motion-reduce:hidden` removes the overlay entirely under
 * `prefers-reduced-motion: reduce` — not just the animation. Pausing it would
 * leave a static white band frozen across the seal, which is worse than no
 * effect at all.
 *
 * @param {string} className - sizing utilities for the seal (e.g. "size-10").
 */
export function CarfSeal({ className = undefined }) {
  return (
    <span
      className={cn("relative inline-block shrink-0 align-middle", className)}
    >
      <img
        src="/brand/CARF.webp"
        alt="CARF accredited — Aspire to Excellence seal"
        width={900}
        height={900}
        className="size-full"
      />
      {/* The mask lives on this wrapper and the animation on the child, so the
          mask stays pinned to the seal while the highlight travels under it.
          Put both on one element and the mask would slide along with the
          gradient and nothing would be contained. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden"
        style={{
          maskImage: "url(/brand/CARF.webp)",
          WebkitMaskImage: "url(/brand/CARF.webp)",
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      >
        <span
          className="absolute inset-0 animate-carf-sheen"
          style={{
            background:
              "linear-gradient(105deg, transparent 42%, rgba(255,255,255,0.55) 50%, transparent 58%)",
          }}
        />
      </span>
    </span>
  );
}
