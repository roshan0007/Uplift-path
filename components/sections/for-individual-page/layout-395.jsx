"use client";

import React, { useEffect, useRef } from "react";

/**
 * Rebuilt to the 2026-09-08 Figma (node 10214-103875). This section is
 * *replaced*, not revised: the export shipped a three-up grid of bordered cards
 * each with a photo above a heading, and the frame draws something structurally
 * different -- a display heading over a staggered cascade of three text blocks
 * on the left, and a diagonal stack of three tall rounded cards on the right,
 * the middle one a video.
 *
 * The three items keep the export's copy, which the frame keeps verbatim too.
 *
 * ## The media is a video, and only the `gifRef` says so
 *
 * `Rectangle 14` (10302:1451) carries an `imageRef` **and** a `gifRef`. The
 * `imageRef` is only the poster frame; searching the node tree for `VIDEO` or
 * `videoRef` finds nothing. Source is 800x1422, 103 frames at 10fps (10.3s),
 * 45MB raw. It is a montage, not a single shot -- five scenes in 10.3s: a
 * sunset over the water, a flower held up in a field, bubbles in golden light,
 * a woman on a swing, a woman laughing. The `aria-label` names all five,
 * because the poster shows only the first and a viewer who never sees the
 * video would otherwise be told the wrong thing. Shipped at 0.47MB MP4 (x264 crf 35) and 0.24MB WebM (VP9 crf 52), both
 * silent. It is not any clip already in the repo: against every existing poster
 * the nearest mean channel difference is 53.
 *
 * The poster is the video's own first frame, unmasked: the Figma `imageRef` and
 * GIF frame 0 are byte-for-byte identical (mean difference 0.00), so nothing
 * shifts when playback starts. No CSS pauses a video, so `prefers-reduced-motion`
 * is honoured in JS.
 *
 * ## Geometry
 *
 * Heading 80/96 Playfair at -0.8 tracking, with "your life" in italic --
 * `--text-display`, the token this page added (globals.css [14]). Standfirst
 * 20/30. Item headings 36/46.8 = `text-h4`; item bodies 16/24.
 *
 * The three cards are each 522x824 at r86, offset diagonally by (49,32) and
 * (84,63) from the backmost -- a 606x887 bounding box. Positions and sizes are
 * percentages of that box so the stack scales as one object, and the radius is
 * `cqw` against the stack's own box (86/606 = 14.191%) rather than px, so it
 * holds its proportion as the column narrows instead of creeping towards a
 * pill. Same technique as the How We Work video.
 *
 * The two outer cards are empty 1px outlines in the frame -- pure decoration,
 * so `aria-hidden`.
 */
/**
 * The three services. `icon` is a Material Symbol already in `/svgs`, applied
 * as a CSS mask so the fill comes from the palette -- the treatment
 * `how-we-work/layout-254` and `ai-consultation/layout-253` both use.
 */
const ITEMS = [
  {
    icon: "groups",
    title: "Peer coaching support",
    body: "Guidance from someone who has walked a similar path.",
  },
  {
    icon: "self_improvement",
    title: "Mental health therapy",
    body: "Build the skills to navigate life with greater resilience.",
  },
  {
    icon: "diversity_3",
    title: "Counseling",
    body: "A steady space to untangle your thoughts and feel heard.",
  },
];

export function Layout395() {
  const videoRef = useRef(null);

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
    // `scheme-mint`, not `scheme-1`.
    // /for-individual ran six consecutive white sections. This one and faq-01
    // break it into white white MINT white MINT white.
    // This brand has exactly two depth cues -- a scheme change and the button
    // ledge -- so the remedy for a same-background run is the scheme, never a
    // texture or a blurred shadow. `.scheme-mint` is the light neutral already
    // used this way on home/testimonial-10; cta-25's white is a documented
    // deliberate reversal and is left alone everywhere.
    <section className="overflow-hidden px-[5%] py-16 md:py-24 lg:py-28 scheme-mint badge-alt">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-x-12 gap-y-16 lg:grid-cols-2">
          <div>
            {/* The frame breaks this as "Care built / around your life" and
                italicises the last two words, so the break is a <span> rather
                than left to the container width. `.font-heading-italic` is the
                only sanctioned way in: the real italic face is self-hosted at
                weight 500, and `font-style: italic` without the matching weight
                silently synthesises a slanted roman. */}
            <h2 className="text-display font-bold">
              Care built
              <span className="block">
                around{" "}
                <span className="font-heading-italic">your life</span>
              </span>
            </h2>
            <p className="mt-5 text-medium md:mt-6">
              Professional support that adapts to your schedule and your needs.
            </p>

            {/* **The frame's diagonal stagger is gone, and this is a
                departure by request.**

                The frame runs these down a diagonal -- item 1 at the left
                edge, item 2 indented 309px and lower, item 3 back at the left
                -- on the argument that it mirrors the card stack opposite.
                Built, it does not read that way. Each item is capped at 341px
                inside a 650px column, so nothing shares a left edge, the three
                headings land on three different measures, and the middle one
                floats in open space with its body copy orphaned under it. The
                cascade the frame draws needs the eye to follow a line; three
                unequal text blocks at three indents just look misaligned.

                So they are one list on one axis: full column measure, each item
                on a hairline rule, an icon carrying the rank the stagger was
                trying to imply. That is a pattern this site already has --
                the masked-icon treatment is `layout-254`'s and `layout-253`'s
                -- so it reads as part of the system rather than as a fourth
                idea about how to present three things. The copy is unchanged. */}
            <div className="mt-10 flex flex-col md:mt-12">
              {ITEMS.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-x-5 border-t border-scheme-border py-6 last:border-b md:gap-x-6 md:py-7"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1 block size-8 shrink-0 bg-caribbean-green-dark md:size-9"
                    style={{
                      maskImage: `url(/svgs/icon-${item.icon}.svg)`,
                      WebkitMaskImage: `url(/svgs/icon-${item.icon}.svg)`,
                      maskSize: "contain",
                      WebkitMaskSize: "contain",
                      maskRepeat: "no-repeat",
                      WebkitMaskRepeat: "no-repeat",
                      maskPosition: "center",
                      WebkitMaskPosition: "center",
                    }}
                  />
                  <div>
                    <h3 className="mb-2 text-h4 font-bold md:mb-3">
                      {item.title}
                    </h3>
                    <p>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 606x887 bounding box: three 522x824 cards at (0,0), (49,32) and
              (84,63). Everything below is that box in percentages. */}
          <div className="@container relative mx-auto aspect-[606/887] w-full max-w-[606px]">
            <div
              aria-hidden="true"
              className="absolute top-0 left-0 h-[92.897%] w-[86.139%] rounded-[14.191cqw] border border-scheme-border"
            />
            <div className="absolute top-[3.608%] left-[8.086%] h-[92.897%] w-[86.139%]">
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster="/images/for-individual-care-poster.jpg"
                aria-label="A montage of five moments outdoors: someone photographing a sunset over the water as pelicans glide past, a hand holding a yellow flower in a green field, a woman blowing bubbles in golden light, a woman resting back on a swing, and a woman laughing with clouds painted around her eyes"
                className="size-full rounded-[14.191cqw] object-cover"
              >
                <source
                  src="/videos/for-individual-care.webm"
                  type="video/webm"
                />
                <source src="/videos/for-individual-care.mp4" type="video/mp4" />
              </video>
            </div>
            <div
              aria-hidden="true"
              className="absolute top-[7.103%] left-[13.861%] h-[92.897%] w-[86.139%] rounded-[14.191cqw] border border-scheme-border"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
