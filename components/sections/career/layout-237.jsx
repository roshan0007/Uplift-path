"use client";

import React from "react";

/**
 * Matched to the 2026-09-09 Figma (frame `Career`).
 *
 * Copy, order and the 3-column grid are the frame's already. One change:
 * **the six icons are served from `/svgs` instead of hot-linked off jsdelivr at
 * `@latest`, and they are Viking dark (#41b19a), which is what the frame
 * draws.** Both follow from the same thing: the export set `text-scheme-text`
 * on an `<img>`, which cannot tint anything, so the icons rendered black
 * however the class was written. Tinting needs the file as a mask, and a mask
 * needs a same-origin file. Sampled off the render, the darkest channel triple
 * under the first icon is `65,177,154` — `#41b19a` exactly, the same treatment
 * `how-we-work/layout-254` carries. Pinned at
 * `@material-symbols/svg-500@0.38.0`.
 *
 * The section moves up the page: the frame puts Core Values directly after
 * "Who we are" and before "Growth Acceleration", where the export had it last
 * before the FAQ. Reordered in `app/(site)/career/page.tsx`.
 */

/** One value. The icon is a mask so the fill comes from the palette. */
function Value({ icon, title, children }) {
  return (
    <div className="flex w-full flex-col items-center text-center">
      <div className="mb-5 md:mb-6">
        <span
          aria-hidden="true"
          className="block size-12 bg-viking-dark"
          style={{
            maskImage: `url(/svgs/icon-${icon}.svg)`,
            WebkitMaskImage: `url(/svgs/icon-${icon}.svg)`,
            maskSize: "contain",
            WebkitMaskSize: "contain",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
          }}
        />
      </div>
      {/* Two lines' worth of height whether the heading takes one or two.
          Without it a one-line heading pulls its paragraph up and the row's
          supporting text sits on different baselines. `lh` is the element's own
          line-height, so this holds at both ends of the type scale instead of
          needing a magic rem value. */}
      {/* `mb-2 md:mb-3`, not the icon block's own `mb-5 md:mb-6`. The heading
          belongs to the paragraph under it, but at an equal 20/24px above and
          below it read as floating between the icon and the body rather than
          grouped with either. Same fix as home/layout-237. */}
      <h3 className="mb-2 text-h4 font-bold md:mb-3 md:min-h-[2lh]">{title}</h3>
      <p>{children}</p>
    </div>
  );
}

export function Layout237() {
  return (
    <section className="px-[5%] py-16 md:py-20 lg:py-24 scheme-1 badge-alt">
      <div className="container">
        <div className="flex flex-col items-center">
          <div className="mb-12 w-full max-w-lg text-center md:mb-12 lg:mb-12">
            <h2 className="mb-5 text-h2 font-bold md:mb-6">Our Core Values</h2>
            <p className="text-medium">
              At Uplift Path, we care, we’re honest, and we put people first. We
              keep things easy to follow and believe everyone deserves support
              to grow.
            </p>
          </div>
          <div className="grid grid-cols-1 items-start justify-center gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
            <Value icon="commit" title="Integrity & Trust">
              We honor our commitments and build relationships grounded in
              honesty, transparency, and accountability.
            </Value>
            <Value icon="celebration" title="Collaboration & Inclusion">
              We believe in collective progress — valuing the voices,
              experiences, and ideas of everyone we serve and work alongside.
            </Value>
            <Value icon="power" title="Empowerment & Growth">
              We help people and organizations unlock their strengths, take
              ownership of their journeys, and pursue continuous learning and
              innovation.
            </Value>
            <Value icon="biotech" title="Excellence & Innovation">
              We aim for excellence in every endeavor and remain adaptable,
              using creativity and forward thinking to meet evolving needs.
            </Value>
            <Value icon="design_services" title="Compassion & Service">
              We lead with empathy — recognizing the human experience behind
              every goal, partnership, and decision.
            </Value>
            <Value icon="target" title="Sustainability & Impact">
              We are driven by purpose and long-term outcomes, ensuring our work
              uplifts communities and creates lasting, positive change.
            </Value>
          </div>
        </div>
      </div>
    </section>
  );
}
