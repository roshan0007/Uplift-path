"use client";

import React from "react";

/**
 * Matched to the 2026-09-09 Figma (frame `Career`).
 *
 * **The two overlapping stock photographs are gone.** The export drew this
 * right-hand column as an absolutely-positioned square photo behind a 3:4
 * portrait one, offset `ml-[30%]`. The frame draws a single line-art vignette
 * instead -- a figure thinking, with a lightbulb in the thought bubble --
 * 310x293 at the frame's own scale, in keeping with every other illustration on
 * this page. `career-feature-section-2.png` and `career-feature-section-3.jpg`
 * are left unreferenced; see the import record.
 *
 * The art was replaced 2026-09-10. The first cut was taken straight off the 2x
 * reference render and un-composited off white with a min-channel alpha key,
 * which trimmed the bounding box to the ink -- 620x586 with the figure's back
 * touching the right edge, so the drawing read as cropped at every width. The
 * client supplied the original 500x500 asset, which carries its own margin;
 * nothing is clipped now, at the cost of the figure rendering a little
 * smaller inside the same 310px box.
 *
 * Copy is the frame's, word for word. Two things about it are noted in the
 * import record rather than changed here: the frame sets the body justified,
 * which nothing else on the site does and which opens visible rivers at this
 * measure, so it stays ragged-right; and the "Operations" tagline is the same
 * string `layout-359` uses two sections later, which is the Relume fixture
 * eyebrow appearing twice rather than two real categories.
 */
export function Layout469() {
  return (
    // `scheme-mint`, not `scheme-1`.
    // See the note in layout-213: second of the three breaks in /careers'
    // seven-section white run.
    // This brand has exactly two depth cues -- a scheme change and the button
    // ledge -- so the remedy for a same-background run is the scheme, never a
    // texture or a blurred shadow. `.scheme-mint` is the light neutral already
    // used this way on home/testimonial-10; cta-25's white is a documented
    // deliberate reversal and is left alone everywhere.
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-mint badge-alt">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-x-16">
          <div>
            <p className="mb-3 font-semibold md:mb-4">Operations</p>
            <h2 className="mb-5 text-h2 font-bold md:mb-6">
              Growth Acceleration
            </h2>
            <p className="text-medium">
              Discover how we navigate strategic growth with purpose, clear
              strategy, and shared vision. Join us in fostering a culture that
              values self-starters, autonomy, and the confidence to adapt and
              overcome challenges. At Uplift Path, we're not just expanding;
              we're building a future where business transformation and impact
              remain at the heart of everything we do. Explore what working in a
              high-growth consulting environment looks like, and see why being a
              builder and problem solver is the key to thriving here.
            </p>
          </div>

          {/* Decorative -- the heading and body carry the meaning. 310px is the
              width the frame draws it at. */}
          <img
            src="/images/career-growth-thinking.png"
            alt=""
            aria-hidden="true"
            className="mx-auto w-full max-w-[310px] select-none"
          />
        </div>
      </div>
    </section>
  );
}
