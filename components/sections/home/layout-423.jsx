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
      className="relative scroll-mt-20 px-[5%] pt-10 pb-16 md:pt-12 md:pb-24 lg:pt-56 lg:pb-28 scheme-1 badge-alt"
    >
      {/* Three loose decoratives — the heart, and two sparkle clusters. They
          are anchored to the section rather than nested in the grid columns,
          because in the Figma they do not belong to any column: the heart and
          one sparkle straddle the heading, and the other sparkle sits above
          the steps list.

          `left` is a percentage of the Figma's own 1440 canvas (144px, 312px
          and 1050px), so they hold their relationship to the composition as
          the viewport widens instead of drifting with a grid track. Vertical
          offsets are measured from the same export, relative to the heading —
          which is what `lg:pt-56` above is for: it buys the top room the Figma
          gives them, so the heart and the upper sparkle sit inside this
          section instead of reaching up into the CARF strip.

          All three are decorative and lg-only: under 1024px there is no room
          beside the text and they would land on top of it. */}
      <img
        src="/images/home-steps-hand-heart.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-8 left-[10%] hidden w-[161px] select-none lg:block"
      />
      <img
        src="/images/home-steps-sparkle-b.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -top-7 left-[72.9%] hidden w-[113px] select-none lg:block"
      />
      <img
        src="/images/home-steps-sparkle-a.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[155px] left-[21.7%] hidden w-[113px] select-none lg:block"
      />
      <div className="relative container">
        <div className="grid grid-cols-1 items-center gap-x-8 gap-y-12 lg:grid-cols-[1.1fr_0.9fr_1fr] lg:gap-x-12">
          {/* Left-aligned, not centred — this is the one section heading in the
              page that is not centred, and it is deliberate in the Figma. */}
          <div className="max-w-md">
            <h2 className="mb-5 text-h2 font-bold md:mb-6">
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
                  {/* `<p>`, not `<h3>`. These labels are Lexend Deca semibold
                      in the Figma, and globals.css binds Playfair Display to
                      h1-h6 and nowhere else — an <h3> here would silently
                      serif them and stop matching the design. The enclosing
                      <ol> carries the structure instead. */}
                  <p className="font-semibold">{step.title}</p>
                  <p className="mt-2 text-small">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
