"use client";

import React from "react";

export function Layout564() {
  return (
    // Three children so a phone reads heading, figure, list (2026-09-29; was
    // all the text then one picture). From lg the heading and the list stack
    // in the right column (`self-end` / `self-start`, no row gap) and the
    // figure spans both rows on the left, as before. Same pattern as
    // resource-assistance/layout-491. The list is now last on one column, so
    // the section carries its own bottom padding there.
    <section className="grid grid-cols-1 items-center gap-y-16 pt-16 pb-16 md:pt-24 md:pb-24 lg:grid-cols-2 lg:gap-y-0 lg:pt-0 lg:pb-0 scheme-1 badge-alt">
      <div className="relative mx-[5%] sm:max-w-md md:justify-self-start lg:col-start-2 lg:row-start-1 lg:mr-[5vw] lg:ml-20 lg:self-end">
        {/* The frame adds a small hand-drawn sparkle above and right of the
            heading -- 147x97, its left edge 355.5px in from the text column's
            own left edge, sitting clear above the heading. It is anchored from
            the left rather than the right on purpose: this section's column is
            ~88px wider than the frame's (a pre-existing difference, and this is
            not a section to restyle), so right-anchoring pushed the sparkle
            that far out. Both columns start at the same place, so the left
            offset reproduces the frame's relationship to the heading.
            Decorative, so `aria-hidden`, and `lg:` only -- below that the
            column is full-width and it would collide with the copy. */}
        <img
          src="/images/systems-whatwedo-sparkle.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -top-[110px] left-[355.5px] hidden h-[97px] w-[147px] select-none lg:block"
        />
        {/* <h2>, not <h1>: this was the route's only <h1>, on a section that is
            not the page title. The hero heading carries it now. */}
        <h2 className="mb-5 text-h2 font-bold md:mb-6">What We Do</h2>
      </div>
      {/* Below `lg` this column is full-width with no height of its own, so an
          `h-auto` image took width 100% and returned its own 998x1846 ratio —
          753x1393 at the 768px breakpoint, a figure taller than the viewport.
          QA filed it as the image overflowing the screen. The explicit heights
          give `object-contain` a box to fit the whole figure inside; above
          `lg` the image goes absolute and `min-h-[32rem]` takes over again, so
          the desktop composition is untouched. */}
      <div className="relative h-80 w-full overflow-hidden md:h-[26rem] lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:h-full lg:min-h-[32rem]">
        {/* `object-contain`, not cover. This is a line illustration of a
            standing figure on a transparent ground — tall and narrow inside a
            wide half-page column — so cover had to crop it hard to fill, and
            what it cropped was the raised hand at the top and the feet at the
            bottom. Contained, the whole figure survives.

            The file itself was cropped to match: the source was a 2400px square
            with the figure occupying a 838x1686 box in the middle, so a third
            of the width and a sixth of the height on every side was empty
            canvas that `contain` would have had to scale down to fit. The
            pristine square is still in the design system's assets folder.

            No padding on top of that: the crop already left an 80px margin all
            round, and CSS padding here would only be spent shrinking the figure
            further inside a column it does not fill to begin with. */}
        <img
          src="/images/systems-technology-about-section-new1.png"
          alt="An illustration of a person holding up a phone"
          className="static size-full object-contain lg:absolute lg:inset-0"
        />
      </div>
      <div className="mx-[5%] sm:max-w-md md:justify-self-start lg:col-start-2 lg:row-start-2 lg:mr-[5vw] lg:ml-20 lg:self-start">
        {/* "Map and automate" is the first of four parallel services, so it is
            the first bullet (2026-09-29). It used to be an 18px lead paragraph
            above the other three, which ranked one offering over its equals. */}
        <ul className="my-4 list-disc pl-5">
          <li className="my-1 self-start pl-2">
            <p>
              Map and automate — We document how work really flows, then remove
              the duplicate entry and manual handoffs.
            </p>
          </li>
          <li className="my-1 self-start pl-2">
            <p>
              Select and implement — Independent help choosing your core
              platform. We are not resellers, so the recommendation follows your
              requirements.
            </p>
          </li>
          <li className="my-1 self-start pl-2">
            <p>
              Report and measure — Define the metrics that matter and build the
              dashboard behind them.
            </p>
          </li>
          <li className="my-1 self-start pl-2">
            <p>
              Train and hand over — Implementations fail on adoption, not
              technology. Your team owns it when we step back.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}
