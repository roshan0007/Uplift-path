"use client";

import React from "react";

/**
 * Matched to the 2026-09-09 Figma (frame `Resource Assistance`, 1440x3793).
 *
 * **The tabs are gone, because the frame does not draw tabs.** The export built
 * this as a Radix `Tabs`: three triggers whose labels were `<h2>`, each holding
 * its own body inside a `motion.div` that collapsed to `height: 0` when
 * inactive, with the two inactive triggers dimmed to 25% opacity and a
 * per-tab illustration swapping in the right-hand column.
 *
 * The frame shows all three headings at full opacity with all three bodies open
 * at once, one illustration for the whole section, and no affordance suggesting
 * anything is clickable. That is the same defect Advisory's "tabs" had — an
 * interaction that changes nothing a reader can act on, while hiding two thirds
 * of the copy behind a control. If the frame draws it static, build it static.
 * So: three plain blocks, each a heading, a body and its "You get:" line, on a
 * hairline rule.
 *
 * Two structural fixes come with it:
 *
 * - **The headings were `<h2>` inside the section's own `<h1>`.** This section
 *   held the route's only `<h1>` ("What do you need?"), which is not the page
 *   title; the hero has it now, and these three are `<h3>` under this section's
 *   `<h2>`.
 * - **"You get:" is its own paragraph**, as the frame sets it. The export ran
 *   it onto the end of the body sentence.
 *
 * Type is untouched: 52/62.4 for the section heading, 36/46.8 for the three
 * (the frame's own cap-to-descender extents are 35.5), 16/24 for the copy.
 *
 * Not changed: the frame draws the block 51px right of the container edge, and
 * its rules at 2px rather than the brand hairline. The offset is a pasted
 * screenshot of the built page, so the block stays container-aligned; the rules
 * stay at 1px, which is what the brand settles for accordion and divider
 * hairlines and what this same render's own FAQ rules would need to change to
 * as well. Both are flagged in the import record.
 */

/** One resource: heading, body, and the "You get:" line, on the frame's rule. */
function Resource({ title, children, youGet }) {
  return (
    <div className="border-b border-scheme-border py-6">
      <h3 className="text-h4 font-bold">{title}</h3>
      <p className="mt-3 md:mt-4">{children}</p>
      <p className="mt-3 md:mt-4">You get: {youGet}</p>
    </div>
  );
}

export function Layout491() {
  return (
    <section className="px-[5%] py-16 md:py-20 lg:py-20 scheme-1 badge-alt">
      <div className="container">
        <div className="mx-auto mb-12 max-w-lg text-center md:mb-12 lg:mb-12">
          <h2 className="mb-5 text-h2 font-bold md:mb-6">What do you need?</h2>
          <p className="text-medium">
            We do not offer advice from a distance. We sit at the table with you
            and look at the hard facts.
          </p>
        </div>
        <div className="grid grid-cols-1 items-center gap-x-12 gap-y-12 md:grid-cols-2 lg:gap-x-20">
          <div>
            <Resource
              title="Funding"
              youGet="an eligible-opportunity shortlist and a funding calendar."
            >
              We identify what you are genuinely eligible for, build the
              narrative and budget, and set up the reporting funders expect
              afterwards.
            </Resource>
            <Resource
              title="Payer enrolment and credentialing"
              youGet="a credentialing tracker with every renewal date."
            >
              Medicaid enrolment, managed care contracting and provider
              credentialing, tracked so nothing lapses quietly.
            </Resource>
            <Resource
              title="Staff"
              youGet="a complete hiring pack."
            >
              Role architecture, job descriptions that attract the right
              applicants, and supervision models that make people stay —
              particularly for credentialed roles.
            </Resource>
          </div>

          {/* One illustration for the section, as the frame has it. Decorative:
              the three headings carry the meaning. 584px is the box that puts
              its ink at the frame's own 208x451 — the source PNG is a 2000
              square with the drawing 712x1543 inside it. */}
          <img
            src="/images/resource-assistance-feature-section.png"
            alt=""
            aria-hidden="true"
            className="mx-auto w-full max-w-[584px] object-contain select-none"
          />
        </div>
      </div>
    </section>
  );
}
