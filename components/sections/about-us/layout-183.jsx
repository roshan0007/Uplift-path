"use client";

import React from "react";

/**
 * Rebuilt to the 2026-09-08 Figma (node 10358-8178).
 *
 * What this section was: a full-bleed **Relume placeholder video** —
 * `d22po4pjz3o32e.cloudfront.net/placeholder-video.mp4` — under a 50% black
 * scrim, with white text over it. That is stock export scaffolding, not
 * content, and it was shipping on a live page.
 *
 * What the frame actually draws: a flat green band, no imagery at all. The
 * frame node does carry an image fill, but a solid #06a785 sits above it in the
 * fill stack, so the image never renders — the band is flat colour, which is
 * also what the reference render shows.
 *
 * Padding is the frame's own: content runs 2128–2394 inside a section spanning
 * 2016–2506, i.e. 112px top and bottom, which is `lg:py-28` exactly.
 *
 * The fill is #05866b, not the frame's #06a785, and that was a decision rather
 * than a slip. White on the frame's own green measures 3.06:1: the 44px heading
 * clears the 3:1 large-text bar, but this band's body is 18px SemiBold, which
 * does not qualify for that allowance (24px, or 18.66px bold), so it needs
 * 4.5:1 and fails. Raised, and the answer was to keep the white and darken the
 * fill — the same hue at the same saturation, dropped in value until white
 * clears AA at 4.54:1. That is route 1 of the two the footer's `[10]` note
 * already lists, and it is the one that costs the design least. The token and
 * the full working are at `[11]` in globals.css.
 *
 * So this band does **not** repeat the footer's white-on-green override. It is
 * the one green surface on the site where white text passes AA outright.
 */
export function Layout183() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-green-deep badge-alt">
      <div className="container max-w-lg text-center">
        {/* Playfair 700, not the brand's usual 400. `--font-weight-bold` is 400
            on purpose across the site, so `font-bold` would render this at
            regular weight; the frame sets a genuine 700 here and the 700 face
            is self-hosted. Same treatment as the homepage's step titles. */}
        <h2 className="text-h3 font-[700]">Why Uplift Path</h2>
        {/* SemiBold body, which is the frame's own weight for this block — it
            is a pull-quote of sorts rather than running text. */}
        <div className="mt-5 space-y-6 text-medium font-semibold md:mt-6">
          <p>
            These values aren’t just words on a page—they’re the foundation of
            everything we do at Uplift Path. They reflect what our clients, our
            team, and our partners have told us matters most. They’re backed by
            research, required by accreditation standards, and, most
            importantly, they’re what truly make a difference in people’s lives.
          </p>
          <p>
            When you work with Uplift Path, you can trust that we’ll UPLIFT
            you—through partnership, clarity, compassion, inclusion, hope, and
            whole-person care.
          </p>
        </div>
      </div>
    </section>
  );
}
