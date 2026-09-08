"use client";

import React, { useEffect, useRef } from "react";

/**
 * Matched to the 2026-09-08 Figma (node 10214-103297, children 5-9 plus the
 * `Vector 5` curve at 10286:1391).
 *
 * Three changes from the v2 export:
 *
 * 1. **The icons are Viking dark (#41b19a), which is what the frame draws**,
 *    and they are served from `/svgs` rather than hot-linked off jsdelivr.
 *    Both follow from the same thing: the export set `text-scheme-text` on an
 *    `<img>`, which cannot tint anything, so the icons rendered black however
 *    the class was written. Tinting needs the file as a mask, and a mask needs
 *    a same-origin file. The six SVGs are the same Material Symbols the export
 *    named, saved into the repo.
 *
 * 2. **The centre media is a video.** Its Figma fill carries an `imageRef`
 *    *and* a `gifRef`; the `imageRef` is only the poster frame. Searching the
 *    node tree for `VIDEO` or `videoRef` finds nothing, which is how this kind
 *    of node has shipped as a still before.
 *
 * 3. **The decorative curve behind the foot of the section** is new. See
 *    `[12]` in `globals.css` for the colour and `@utility experience-curve`
 *    for the placement.
 *
 * What the frame asks for and this section does *not* do: the frame lists
 * "The people behind it" twice, once per column, with two rewordings of the
 * same sentence about leadership experience. That is the Relume export's own
 * duplication carried into the design file, and it leaves a section headed
 * "six core values" showing five - one of which is not a value but an About Us
 * line. The two slots keep the pillars an earlier pass put there: Collaboration
 * (the U in UPLIFT) and Inclusion (the I). Flagged in the import record.
 *
 * Geometry the frame draws: columns 322 / video 449 / columns 322 across the
 * 1280 container, so the two gaps are 93 and 94 - 7.3% of the container, which
 * is how `lg:gap-x-[7.3%]` is derived. Items are 64px apart vertically. The
 * video is 449x708 at r20 with a 1px outline. Type is 28/39.2 Playfair for the
 * headings and 16/24 for the copy, both of which are the existing tokens.
 */

/** One value. The icon is a mask so the fill comes from the palette. */
function Value({ icon, title, children }) {
  return (
    <div className="flex flex-col items-center text-center">
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
      <h3 className="mb-3 text-h5 font-bold md:mb-4">{title}</h3>
      <p>{children}</p>
    </div>
  );
}

export function Layout254() {
  const videoRef = useRef(null);

  // No CSS pauses a video, so the reduced-motion preference is honoured in JS:
  // the poster stays and playback never starts. `autoPlay` stays on the element
  // so the common case needs no JS at all.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (mq.matches) {
        el.pause();
        el.removeAttribute("autoplay");
      } else if (el.paused) {
        el.play().catch(() => {});
      }
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <section className="relative overflow-hidden px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      {/* The frame's `Vector 5`, verbatim: its own path in its own 1563.5x749
          box, so nothing is re-drawn by hand. Behind everything, and the
          section clips the part that runs off-canvas to the right. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1563.4979 748.9818"
        className="experience-curve"
      >
        <path
          d="M1446 132.982C1233.2 547.382 393.333 601.648 0 576.982L0 748.982L1446 748.982C1534.67 370.982 1658.8 -281.418 1446 132.982Z"
          fill="var(--color-plantation)"
          fillOpacity="0.2"
        />
      </svg>

      <div className="relative container">
        <div className="mb-12 md:mb-12 lg:mb-12">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="mb-5 text-h2 font-bold md:mb-6">
              What You'll Experience
            </h2>
            <p className="text-medium">
              At Uplift Path, we believe in uplifting every life through six
              core values that guide everything we do
            </p>
          </div>
        </div>
        <div className="grid place-items-center gap-x-8 gap-y-12 sm:grid-cols-2 md:gap-y-16 lg:grid-cols-[322fr_449fr_322fr] lg:gap-x-[7.3%]">
          <div className="grid w-full grid-cols-1 gap-y-8 md:gap-y-16">
            <Value icon="share" title="Psychological Safety">
              Share ideas. Admit mistakes. Try imperfect solutions. We've got
              you.
            </Value>
            <Value icon="groups" title="Collaboration">
              We work the problem together. No one carries a decision alone, and
              no one is left out of one.
            </Value>
            <Value icon="menu_open" title="Transparency">
              Open goals, open data, and open decisions—transparency drives
              every step forward.
            </Value>
          </div>

          {/* 449x708 at r20 in the frame. The radius is in `cqw` against the
              media's own box rather than px, so it holds its proportion as the
              column narrows instead of creeping towards a pill. */}
          <div className="@container order-last w-full sm:col-span-2 lg:order-none lg:col-span-1">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/images/how-we-work-experience-poster.jpg"
              aria-label="A woman turning with her arms outstretched under a blossoming tree against a blue sky"
              className="aspect-[449/708] w-full rounded-[4.454cqw] border border-scheme-border object-cover"
            >
              <source
                src="/videos/how-we-work-experience.webm"
                type="video/webm"
              />
              <source
                src="/videos/how-we-work-experience.mp4"
                type="video/mp4"
              />
            </video>
          </div>

          <div className="grid w-full grid-cols-1 gap-y-8 md:gap-y-16">
            <Value icon="experiment" title="Autonomy">
              Make decisions. Own your work. Experiment freely.
            </Value>
            <Value icon="diversity_3" title="Inclusion">
              Every life we serve, and everyone who serves them, belongs in the
              room where the work is decided.
            </Value>
            <Value icon="self_improvement" title="Growth">
              Monthly improvement goals. Continuous learning. Progress over
              perfection.
            </Value>
          </div>
        </div>
      </div>
    </section>
  );
}
