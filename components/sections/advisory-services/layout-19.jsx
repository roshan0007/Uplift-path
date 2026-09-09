"use client";

import React from "react";

/**
 * Matched to the 2026-09-09 Figma (frame `Advisory Services`). Two changes.
 *
 * 1. **The body is two paragraphs**, which is what the frame draws -- the break
 *    falls after "what is holding you back." and measures as a 54px gap against
 *    the 27px line pitch either side, i.e. exactly one blank line. The export
 *    ran them together.
 * 2. **The media is the frame's own line-art illustration**, not the stock
 *    photo. That photo, `advisory-services-growth-gap-assessment.jpg`, is now
 *    used by the card it was actually named for in `layout-374`.
 *
 * The five-item list and its copy are identical to the frame.
 */
export function Layout19() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <h2 className="mb-5 text-h2 font-bold md:mb-6">
              The problem we solve
            </h2>
            <p className="mb-5 text-medium md:mb-6">
              You know where you want the organisation to go. What you do not
              have is the time to design the route, the structure to support it,
              or an honest read on what is holding you back.
            </p>
            <p className="mb-5 text-medium md:mb-6">
              So decisions get made reactively. Good people work hard on the
              wrong priorities. Growth arrives before the operational foundation
              is ready to carry it — and that is when quality slips.
            </p>
            <ul className="my-4 list-disc pl-5">
              <li className="my-1 self-start pl-2">
                <p>
                  Behavioral health providers building or refining service lines
                </p>
              </li>
              <li className="my-1 self-start pl-2">
                <p>
                  Founders and early-stage teams moving from idea to operating
                  business
                </p>
              </li>
              <li className="my-1 self-start pl-2">
                <p>Nonprofits balancing mission, funding and capacity</p>
              </li>
              <li className="my-1 self-start pl-2">
                <p>Educational institutions developing new programmes</p>
              </li>
              <li className="my-1 self-start pl-2">
                <p>
                  Established organisations preparing to scale into new sites,
                  counties or states
                </p>
              </li>
            </ul>
          </div>
          {/* The frame replaces the stock photo with its own line-art
              illustration -- a hand writing on a pad. Decorative: the heading,
              the two paragraphs and the list carry the meaning. Drawn 392.5x463
              in the frame, so it is capped at that width rather than stretched
              to fill the column. */}
          <div className="flex justify-center">
            <img
              src="/images/advisory-problem-writing.png"
              alt=""
              aria-hidden="true"
              className="h-auto w-full max-w-[392.5px] select-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
