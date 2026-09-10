"use client";

import { SymbolIcon } from "@/components/ui/symbol-icon";
import React from "react";

export function Layout237() {
  return (
    // `id` is what the sticky IntakeBar watches to decide when to appear.
    // The v3 Figma puts this section on a full-bleed pale-green pattern band
    // (`Rectangle 12`, 1440x702 starting where the hero's mint wash ends). It
    // is a background, not content: a CSS background rather than an <img>, so
    // it can never be tabbed to, read out, or dragged, and `bg-cover` keeps it
    // covering the band the way the Figma's own FILL scale mode does.
    //
    // `bg-top` rather than the default `center`: the band is taller than the
    // section on narrow viewports, and the pattern's density is at the top, so
    // anchoring there keeps the composition the Figma drew instead of sliding
    // the busiest part off-screen.
    //
    // The lg paddings are the Figma's own: 74px from the band's top edge to the
    // illustration, and 53px from the last line of the third column to the
    // band's foot.
    //
    // The pattern is knocked back behind a flat white veil at 62%. Full
    // strength it competed with the type sitting on it — the heading, three
    // headings and three bodies all read against it, and the section reads as
    // a quiet band in the page rather than an illustrated one. Flat
    // `--color-white` at an opacity, not a gradient and not a new colour, so
    // it stays inside the brand's flat-colour rule.
    //
    // `isolate` + a `before` pseudo-element rather than a sibling div: the
    // veil is presentation, so it should not exist in the DOM as content, and
    // the container below is `relative` so it stacks above it.
    <section
      id="uplift-outcomes"
      className="relative isolate scroll-mt-20 bg-[url('/images/home-changes-pattern-band.png')] bg-cover bg-top bg-no-repeat px-[5%] py-16 md:py-24 lg:pt-[4.625rem] lg:pb-[3.3125rem] scheme-1 badge-alt before:absolute before:inset-0 before:bg-white/62 before:content-['']"
    >
      <div className="relative container">
        <div className="flex flex-col items-center">
          <div className="mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
            {/* Sits directly above the heading and centred on it. Decorative,
                so it carries no alt text — the heading below says the same
                thing in words. */}
            <img
              src="/images/home-changes-hands-flowers.png"
              alt=""
              aria-hidden="true"
              className="mx-auto mb-4 h-auto w-full max-w-[353px] select-none lg:mb-0"
            />
            <h2 className="mb-5 text-h2 font-bold md:mb-6">
              What Actually{" "}
              <em className="font-heading-italic">Changes</em>
            </h2>
            <p className="text-medium">
              Strategy, systems and people move together. A plan that never
              reaches the day-to-day isn't a plan.
            </p>
          </div>
          <div className="grid grid-cols-1 items-start justify-center gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
            <div className="flex w-full flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                {/* `text-viking-dark` like the other two. This one was
                    `text-caribbean-green-dark`, which put one of three
                    otherwise-identical parallel cards in a different hue and
                    implied a distinction the content does not have. */}
                <SymbolIcon
                  name="step"
                  className="size-12 text-viking-dark"
                />
              </div>
              {/* `mb-2 md:mb-3`, not the icon block's `mb-5 md:mb-6`: the
                  heading belongs to the paragraph under it. At 24px above and
                  24px below it read as floating between the icon and the body
                  instead. */}
              <h3 className="mb-2 text-h4 font-bold md:mb-3">
                Uplift Strategy
              </h3>
              <p>
                Co-design a clear Pathway Plan with goals, milestones, and
                support for sustainable growth.
              </p>
            </div>
            <div className="flex w-full flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <SymbolIcon
                  name="settings"
                  className="size-12 text-viking-dark"
                />
              </div>
              <h3 className="mb-2 text-h4 font-bold md:mb-3">Uplift Systems</h3>
              <p>
                Build coordinated policies, training, and data to make pathways
                simple and improvable.
              </p>
            </div>
            <div className="flex w-full flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <SymbolIcon
                  name="progress_activity"
                  className="size-12 text-viking-dark"
                />
              </div>
              <h3 className="mb-2 text-h4 font-bold md:mb-3">Uplift Growth</h3>
              <p>
                To impact 100K lives by uplifting the individuals, businesses,
                and communities we serve by 2036.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
