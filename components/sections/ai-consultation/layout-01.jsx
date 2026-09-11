"use client";

import React from "react";

/**
 * Matched to the 2026-09-09 Figma (frame `AI Consultancy`). Three changes.
 *
 * 1. **The media is the frame's own line-art illustration**, a figure with a
 *    lit bulb for a head, not the stock photo the export shipped
 *    (`ai-consultation-about-section.png`). It is drawn 222x642 in the frame --
 *    a tall, narrow figure rather than the wide 3:2 crop the photo filled -- so
 *    it is given its own column width rather than stretched to fill.
 *
 * 2. **The body is two paragraphs, which is what the frame draws.** The export
 *    ran them together into one block. The frame's break falls after
 *    "productivity and profitability." -- measured as a 54px gap against the
 *    27px line pitch either side of it, i.e. exactly one blank line.
 *
 * 3. **The heading is an <h2>.** It was an <h1> on a page whose hero heading
 *    was an <h2>; the hero now carries the page's only <h1>.
 *
 * Type is unchanged and already matched the frame: 52/62.4 Playfair 400 for the
 * heading, 18/27 for the copy.
 */
export function Layout1() {
  return (
    // `scheme-mint`, not `scheme-1`.
    // /ai-consultation ran five consecutive white sections and has no faq-01 to
    // break them with. This one and layout-423 alternate it: white MINT white
    // MINT white.
    // This brand has exactly two depth cues -- a scheme change and the button
    // ledge -- so the remedy for a same-background run is the scheme, never a
    // texture or a blurred shadow. `.scheme-mint` is the light neutral already
    // used this way on home/testimonial-10; cta-25's white is a documented
    // deliberate reversal and is left alone everywhere.
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-mint badge-alt">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <h2 className="mb-5 text-h2 font-bold md:mb-6">
              Your Partner in Practical AI Implementation
            </h2>
            <p className="text-medium">
              Is your business ready to harness the power of artificial
              intelligence but unsure where to start? Many companies struggle to
              move beyond the hype and implement AI in a way that drives
              real-world productivity and profitability.
            </p>
            <p className="mt-6 text-medium">
              We provide end-to-end AI consulting and implementation services
              designed to make your workforce more efficient, productive, and
              prepared for the future.
            </p>
          </div>
          {/* Decorative: the heading and the two paragraphs carry the meaning.
              Centred in the right column, which is where the frame puts it once
              this block's hand-placed offset is removed: the frame draws the
              whole section 62px right of the container edge (copy at x=142.5,
              illustration at 1012-1234), and centring in the 760-1360 column
              lands it at 949-1171 -- the same place, container-aligned. The
              design skill flags these pasted blocks' absolute coordinates as
              not design intent. */}
          <div className="flex justify-center">
            <img
              src="/images/ai-consultation-bulb-figure.png"
              alt=""
              aria-hidden="true"
              className="h-auto w-full max-w-[222px] select-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
