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
        {/* Three children, not two, so a phone reads text, image, text: the
            heading and the problem, the figure, then the answer (2026-09-29).
            From md up the two text children stack in the left column and the
            figure spans both rows on the right, the same picture as before;
            `md:gap-y-0` plus the second paragraph's `md:mt-6` keep the
            desktop column's 24px paragraph gap. Same pattern as
            advisory-services/layout-28. */}
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 md:gap-y-0 lg:gap-x-20">
          <div className="md:col-start-1 md:row-start-1 md:self-end">
            <h2 className="mb-5 text-h2 font-bold md:mb-6">
              Your Partner in Practical AI Implementation
            </h2>
            <p className="text-medium">
              Is your business ready to harness the power of artificial
              intelligence but unsure where to start? Many companies struggle to
              move beyond the hype and implement AI in a way that drives
              real-world productivity and profitability.
            </p>
          </div>
          {/* Decorative: the heading and the two paragraphs carry the meaning.
              Centred in the right column, which is where the frame puts it once
              this block's hand-placed offset is removed: the frame draws the
              whole section 62px right of the container edge (copy at x=142.5,
              illustration at 1012-1234), and centring in the 760-1360 column
              lands it at 949-1171 -- the same place, container-aligned. The
              design skill flags these pasted blocks' absolute coordinates as
              not design intent.

              `max-w-28` on a phone (2026-09-29): at its drawn 222px the figure
              ran 642px tall, 79% of an 812px screen, the largest thing on the
              page for a decorative picture. Same move as cta-25's envelope. */}
          <div className="flex justify-center md:col-start-2 md:row-span-2 md:row-start-1">
            <img
              src="/images/ai-consultation-bulb-figure.png"
              alt=""
              aria-hidden="true"
              className="h-auto w-full max-w-28 select-none md:max-w-[222px]"
            />
          </div>
          <p className="text-medium md:col-start-1 md:row-start-2 md:mt-6 md:self-start">
            We provide end-to-end AI Consulting and implementation services
            designed to make your workforce more efficient, productive, and
            prepared for the future.
          </p>
        </div>
      </div>
    </section>
  );
}
