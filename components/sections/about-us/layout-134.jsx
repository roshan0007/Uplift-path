"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useRef } from "react";

/**
 * Rebuilt to the 2026-09-08 Figma (node 10358-8178).
 *
 * It was a single centred column of copy with no imagery. The Figma makes it a
 * two-column opener: a four-tile collage on the left, and the tagline / heading
 * / two justified paragraphs / button on the right.
 *
 * The grid is the frame's own geometry over its 1280px container. The left cell
 * is 663px and the collage is 639px right-aligned inside it, which lands the
 * collage's left edge at x=104 and its right edge at x=743; the 63px gap then
 * puts the text column at x=806, all exactly as the frame has them.
 */
export function Layout134() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:pt-24 lg:pb-44 scheme-1 badge-alt">
      <div className="container">
        <div className="grid grid-cols-1 items-start gap-x-[63px] gap-y-12 lg:grid-cols-[663fr_554fr]">
          <div className="lg:ml-auto lg:w-full">
            <HeroCollage />
          </div>

          {/* The frame does not centre this column against the collage — it
              hangs the tagline off the top of the tall middle photo, 77px below
              the collage's own top edge. A percentage top padding resolves
              against this column's width, and both columns are `fr` off the
              same container, so 13.9% tracks the collage's height at every
              width where the two sit side by side. A fixed 77px would only be
              right at 1440. */}
          <div className="lg:pt-[13.9%]">
            {/* The frame butts the heading's box straight onto the tagline's,
                so the only gap is the two fonts' own leading. `mb-0` rather
                than the export's `mb-3`, which pushed them 12px further
                apart than drawn. */}
            <p className="mb-0 font-semibold">About</p>
            {/* `text-h1`, not `text-h2`. Every section heading on this route is
                `text-h2` -- 40px at 375, 52px at 1440 -- and so was the page
                title, which made the h1 the joint-largest heading rather than the
                largest. Weight cannot recover the rank here: `--font-weight-bold`
                is 400 on purpose, so size is the only signal available. One token
                step up is 44px / 72px, which clears every h2 at both widths. The
                lg step is 20px over the frame's 52, and that is the deliberate
                trade -- the frame giving the h1 and the h2 the same size is
                exactly the finding. Same resolution as the homepage h1.

    `text-balance` is what makes 44px survive a 338px measure: these
    titles run to three and four lines on a phone at the new size, and
    without it the last line orphans a single word. It is inert on the
    one-line titles and at lg, so it only acts where the wrap is real. */}
            <h1 className="mb-5 text-balance text-h1 font-bold md:mb-6">Uplift Path</h1>
            {/* Justified in the frame, and the measure is set by the 554px
                column, so the rag matches without hard breaks. Two paragraphs,
                not the one merged block the export shipped.

                Justification is held back to `lg`, which is the only place the
                frame actually specifies it. Below that the column is the full
                page width and justifying a ~330px measure tears rivers of white
                space through it — at 375px "Uplift Path unlocks true growth
                for" spreads across the line. Ragged right is the correct
                setting at that measure. */}
            <div className="space-y-6 text-medium lg:text-justify">
              <p>
                Uplift Path unlocks true growth for Founders, and organizations
                by designing clear, sustainable pathways to progress. Our
                purpose is to uplift every client we serve through trusted
                collaboration, holistic support, and transparent guidance at
                every stage of business development.
              </p>
              <p>
                With a foundation in strategic advisory and disciplined business
                solutions, our team brings cross-industry expertise to help
                businesses reach new milestones and build lasting impact.
                Success is driven by custom strategies, shared decision-making,
                and measurable results tailored for startups and organizations
                across all sectors.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-x-4 md:mt-10">
              {/* Plain `secondary`, no colour override.
                  It used to carry `border-caribbean-green` and a matching green
                  ledge, sampled off the About Us frame. That made it the only
                  green-stroked button on the site — /how-we-work renders the
                  same hero button in the dark neutral, and QA filed the pair
                  side by side as a button-consistency defect. One frame's
                  sampled stroke is not worth eleven routes disagreeing, so this
                  goes back to the variant everything else uses. If the green
                  stroke is wanted it needs to become a real variant applied
                  everywhere, not a one-off here. */}
              <Button asChild title="Get Started" variant="secondary">
                <a href="/contact-us">Get Started</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * The frame's four tiles, positioned as percentages of their own 639x564
 * bounding box so the whole composition scales as one unit.
 *
 * The bottom-left tile is a *video*, not a still. Figma carries it the same way
 * the homepage's montage is carried — an `imageRef` that is only a poster frame
 * plus a separate `gifRef` — so checking for a video node finds nothing. Source
 * GIF is 800x450, 82 frames at 10fps (8.2s), 16.6MB; transcoded to MP4 (x264
 * crf 28) and WebM (VP9 crf 40) at 0.70/0.52MB. The poster is the video's own
 * first frame, so nothing shifts when playback starts.
 *
 * Replaced 2026-09-10 with a longer cut supplied by the client: it opens on the
 * same sunset frame the poster already carries and then cuts to a second shot
 * of four people celebrating outdoors, so the `aria-label` describes both.
 *
 * Radii are in `cqw` against the collage's own container, not px. The frame's
 * 71/80/68px are drawn against a 639px box; as px they would stay put while the
 * collage shrinks, and at 375px the tiles would read as pills. As a fraction of
 * the container they hold their proportion at every width. None of the three is
 * large enough for Figma to clamp it, so these are literal radii rather than
 * the `rounded-full` the homepage montage needed.
 */
function HeroCollage() {
  const videoRef = useRef(null);

  // Same reduced-motion handling as the homepage montage: there is no CSS that
  // pauses a video, so under a reduce preference the poster stays and playback
  // never starts. `autoPlay` is left on the element so the common case needs no
  // JS at all.
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
    <div className="@container relative mx-auto aspect-[639/564] w-full max-w-[639px] lg:mr-0">
      {/* Top left — 298x232 at 104,161. Rounded across the top only. */}
      <img
        src="/images/about-hero-field.jpg"
        alt="Two women holding hands and laughing in a meadow of dandelions"
        className="absolute top-0 left-0 h-[41.13%] w-[46.64%] rounded-t-[11.11cqw] object-cover"
      />

      {/* Right — 298x379 at 440,231. Rounded top-right and bottom-left. */}
      <img
        src="/images/about-hero-couple.jpg"
        alt="An older couple smiling at each other"
        className="absolute top-[12.41%] left-[52.58%] h-[67.20%] w-[46.64%] rounded-tr-[11.11cqw] rounded-bl-[12.52cqw] object-cover"
      />

      {/* Bottom left — 298x298 at 104,427. The video. */}
      <video
        ref={videoRef}
        // `muted` is what makes autoplay permissible at all; `playsInline`
        // stops iOS taking it fullscreen.
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/images/about-hero-moment-poster.jpg"
        aria-label="A woman laughing in low evening sunlight, then four people celebrating together outdoors"
        className="absolute top-[47.16%] left-0 h-[52.84%] w-[46.64%] rounded-tr-[11.11cqw] rounded-bl-[12.52cqw] object-cover"
      >
        <source src="/videos/about-hero-moment.webm" type="video/webm" />
        <source src="/videos/about-hero-moment.mp4" type="video/mp4" />
      </video>

      {/* Bottom right — 298x82 at 445,641. A flat green shape, purely
          compositional, so it is hidden from assistive tech. */}
      <div
        aria-hidden="true"
        className="absolute top-[85.11%] left-[53.36%] h-[14.54%] w-[46.64%] rounded-br-[10.64cqw] bg-jade"
      />
    </div>
  );
}
