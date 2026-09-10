"use client";

import React from "react";

/**
 * The three steps, restructured to the 2026-09 Figma.
 *
 * What this section used to be: three `BackgroundCard`s, each a full-bleed
 * photo behind a 50% black scrim, with the body copy and a "Learn more" link
 * revealed on hover and the hovered card widening from 50% to 70%. The three
 * photos were `home-who-we-help-0/1/2` carrying the alt text "Relume
 * placeholder image 1/2/3" — they were export placeholders that never got
 * replaced.
 *
 * The Figma drops all of it: no cards, no photos, no scrims, no hover reveal.
 * Three steps as plain text in a column, next to a line illustration, under a
 * left-aligned heading. So the images, the `useRelume` hover state, the
 * `AnimatePresence` reveal and the per-card "Learn more" links are all gone
 * rather than restyled.
 *
 * Consequence worth knowing: this section no longer links to /how-we-work.
 * Each card used to be an anchor. The Figma has no link here, so the route is
 * now reached from the nav and the footer only.
 */
const STEPS = [
  {
    title: "Discovery & Listening",
    body: "We start with one conversation to understand your goals, your strengths, and whatever's currently in the way. No cost, no obligation.",
  },
  {
    title: "Your Pathway Plan",
    body: "You get it in writing: what happens, in what order, who's responsible, and how we'll know it worked.",
  },
  {
    title: "Measurable Progress",
    body: "We stay through execution — tracking what's changing and adjusting when reality differs from the plan.",
  },
];

export function Layout423() {
  return (
    // `id` is the hero scroll cue's destination.
    <section
      id="uplift-pathways"
      className="relative scroll-mt-20 bg-transparent px-[5%] pt-10 pb-16 md:pt-12 md:pb-24 lg:py-28 scheme-1 badge-alt"
    >
      {/* The 2026-09-08 Figma removes the three loose decoratives this
          section carried - the heart and the two sparkle clusters - along with
          the `lg:pt-56` that existed only to buy them room above the heading.
          The top padding is back to a normal section rhythm, which is what
          closes the 89px gap between this section's foot and the patterned
          band below. The three assets are still in `public/images/` and are
          now referenced by nothing. */}
      <div className="relative container">
        <div className="grid grid-cols-1 items-center gap-x-8 gap-y-12 lg:grid-cols-[574fr_204fr_350fr] lg:gap-x-12">
          {/* Left-aligned, not centred — this is the one section heading in the
              page that is not centred, and it is deliberate in the Figma. */}
          {/* No `max-w-md` from lg up: the track is already the Figma's own
              574/1128 share of the row, and capping it at 560px is what forced
              this heading onto four lines instead of the Figma's two. The
              50px is the Figma's too - a step below `text-h2`'s 52px, which is
              just enough that "know which one you're on." no longer fits. */}
          <div className="max-w-md lg:max-w-none">
            <h2 className="mb-5 text-h2 font-bold md:mb-6 lg:text-[3.125rem] lg:leading-[1.333]">
              Three steps. You always know{" "}
              <em className="font-heading-italic">which one you're on.</em>
            </h2>
            <p className="text-medium">
              Every engagement follows the same path, whether you're one person
              or a hundred-person organization.
            </p>
          </div>

          {/* `order-last` so a phone gets the heading and the three steps before
              the decoration — the illustration is the least useful thing on a
              small screen, and putting it second would push the steps below the
              fold. It returns to the middle column from lg up.

              Two corrections to what a plain centred grid cell would do, both
              measured off the Figma export: the figure sits at the right edge
              of its track rather than centred in it (`lg:ml-auto lg:mr-0`),
              and 84px higher than the row's vertical centre, because in the
              Figma it starts above the heading beside it rather than aligning
              to it.

              That lift is a `translate`, not a negative margin. A margin here
              shortens the grid row, and because the row is `items-center` that
              moves the heading too — it dragged the whole composition 42px out
              of place. `translate` paints the figure elsewhere without
              touching layout, so nothing else shifts. */}
          <div className="order-last lg:order-none">
            <img
              src="/images/home-steps-lightbulb.png"
              alt=""
              aria-hidden="true"
              className="mx-auto h-auto w-full max-w-[204px] select-none lg:mr-0 lg:ml-auto lg:-translate-y-[84px]"
            />
          </div>

          <ol className="flex flex-col gap-6 md:gap-8">
            {STEPS.map((step) => (
              <li key={step.title} className="flex gap-4">
                {/* The marker is the brand's own dot, not a list-style bullet:
                    `list-disc` would inherit the text colour and sit on the
                    baseline. `mt-2.5` optically centres it on the first line
                    of the title rather than its box. */}
                <span
                  aria-hidden="true"
                  className="mt-2.5 size-2 shrink-0 rounded-full bg-scheme-text"
                />
                <div>
                  {/* `<h3>`, and it needs to be: the v3 Figma sets these
                      labels in Playfair Display 25px/700, and globals.css
                      binds Playfair to h1-h6 and nowhere else, so a <p> here
                      renders them in Lexend and stops matching. (The previous
                      pass had them as Lexend semibold, which was right for the
                      older frame.) h3 is also the correct level under this
                      section's h2.

                      The weight is written out rather than `font-bold`,
                      because `--font-weight-bold` is deliberately 400 in this
                      brand - `font-bold` on a heading is regular weight. These
                      labels are one of the few places the design asks for a
                      genuinely heavy Playfair, and the 700 face is
                      self-hosted.

                      The size is `text-h5` (20px / 28px at 992px) rather than
                      the frame's flat 25px. A hard-coded step does not answer
                      the breakpoint, so at 1440px 25px collapsed toward the
                      body copy while the h2 beside it stepped 40 -> 50, and on
                      mobile it out-ranked the 20px hero card titles. 28px at
                      lg is 3px off the frame and is the deliberate trade for
                      being on the scale. */}
                  <h3 className="text-h5 leading-[1.333] font-[700]">
                    {step.title}
                  </h3>
                  {/* The Figma justifies all three step bodies at 18px, but
                      the measure it justifies them in is 350px - 35 characters,
                      half the 45-75 readable band - which tears word-space
                      rivers through every line. Justification dropped, and with
                      it the `lg:leading-[1.21]`: body copy wants the token's
                      1.5, not tighter. `text-medium` is 16px on mobile rising
                      to the Figma's own 18px at lg, which also gets these three
                      paragraphs off `text-small` - that token is 12px below
                      992px and identical there to `--text-regular`. */}
                  <p className="mt-2 text-medium">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
