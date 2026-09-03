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
      className="scroll-mt-20 px-[5%] pt-10 pb-16 md:pt-12 md:pb-24 lg:pt-14 lg:pb-28 scheme-1 badge-alt"
    >
      <div className="container">
        {/* Two columns for now, three in the Figma: heading, illustration,
            steps. The middle illustration column is deliberately NOT rendered
            as an empty track — a 1.1fr hole between the two text columns reads
            as a missing section, which is the same trap the TrustStrip comment
            warns about. So this is `lg:grid-cols-2` until the asset arrives,
            and the ASSET SLOT note below says exactly what to change. */}
        <div className="grid grid-cols-1 items-center gap-x-8 gap-y-12 lg:grid-cols-2 lg:gap-x-16">
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

          {/* ASSET SLOT — centre illustration.

              The Figma has the standing figure with the lightbulb head between
              the two text columns, plus a small teal sparkle cluster
              above-right and another below-left. None of the three exist in
              `public/images/` or the design system's `assets/images/` yet.

              To restore the Figma's three-column layout, change the grid above
              to `lg:grid-cols-[1fr_1.1fr_1fr] lg:gap-x-12` and insert here:

                <div className="order-last lg:order-none">
                  <img src="/svgs/home-steps-lightbulb.svg" alt="" aria-hidden="true"
                       className="mx-auto h-auto w-full max-w-sm" />
                </div>

              `order-last` so a phone gets both text columns before the
              decoration. Decorative, so `alt=""` and `aria-hidden` — the three
              steps beside it already carry the meaning. */}

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
