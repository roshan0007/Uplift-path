"use client";

import React from "react";

/**
 * Re-laid out to the 2026-09-08 Figma (node 10214-103875), which replaces the
 * scroll-tracked vertical rail with numbered blocks: a hairline rule with a
 * 32px filled segment at its left, then a tagline, a 52/62.4 heading and body
 * copy, all set against an oversized numeral in the left column.
 *
 * ## The frame's copy is not this page's copy, by decision
 *
 * The frame fills these blocks with For Business material -- "Our simple
 * 3-step consultation process", "Submit request ... through your organisation",
 * "Discovery call", "Expert guidance", "consultation expert", "tailored
 * strategies and solutions". That is sales language for the sibling audience
 * page, and this route is peer coaching, therapy and counselling for Ohio
 * Medicaid adults. The frame also mis-numbers itself: its intro block is
 * labelled "01", so its first real step reads "02".
 *
 * So the frame supplies the layout and the page keeps its own content. The four
 * steps below are unchanged and remain the same four the intake flow walks a
 * person through -- Application (the modal on this page), Eligibility (/cmps),
 * Scheduling (/booking), Consent (/consent-form). The names must stay in sync
 * with `components/intake/intake-steps.js`, which drives the breadcrumb on
 * every one of those screens. One story, told twice.
 *
 * ## Two more departures from the frame
 *
 * - **The eight buttons are not built.** Every one of them is labelled
 *   literally "Button" -- untouched Relume placeholder, two per block. They
 *   were not in the section before, they have no destination, and the page
 *   already offers the same action in the hero, in all three tabs and in the
 *   CTA.
 * - **The numerals are Playfair Display 400, not the frame's Roboto 700.**
 *   Roboto is not one of this brand's two faces. Size, position and colour are
 *   the frame's.
 */
const STEPS = [
  {
    title: "Application",
    body: "Tell us what you are looking for. A short confidential form asks about your goals, your situation, and the kind of support that would actually help. It takes a few minutes.",
  },
  {
    title: "Eligibility",
    body: "We confirm the basics. Personalized Supportive Services are for Ohio adults 18 and over with active Ohio Medicaid, so we check that first and tell you plainly where you stand.",
  },
  {
    title: "Scheduling",
    body: "You pick the time. Choose your session from the openings our Peer Coaches have — by phone or by video, from anywhere in Ohio.",
  },
  {
    title: "Consent",
    body: "You sign the consent form. It sets out what stays private, what we share and with whom, and what you can expect from your coach. Once it is signed, your session is confirmed.",
  },
];

export function Timeline5() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      <div className="container">
        <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
          <h2 className="mb-5 text-h2 font-bold md:mb-6">
            How getting matched works
          </h2>
          <p className="text-medium">
            Four steps between the first form and your session. Each one is
            short, and nothing you share leaves our team.
          </p>
        </div>

        {/* The frame runs the numeral column 338px wide (80 to 418) against a
            1280 container, and each block 349 tall with a 112px gap. */}
        <div className="flex flex-col gap-y-12 md:gap-y-16">
          {STEPS.map((step, index) => (
            <div
              key={step.title}
              className="grid grid-cols-1 gap-x-6 gap-y-4 lg:grid-cols-[258px_1fr] lg:gap-x-20"
            >
              {/* 224/268.8 in the frame. `leading-none` because the frame sets
                  the numeral's box to 159px against a 268.8 line box -- it is
                  measured cap-to-baseline, not by line height. */}
              <p
                aria-hidden="true"
                className="font-heading text-[6rem] leading-none font-bold text-scheme-text lg:text-[14rem]"
              >
                {String(index + 1).padStart(2, "0")}
              </p>

              <div>
                {/* Progress bar: a 2px rule at 10% black with a 32px filled
                    segment at its left. Decorative -- the numeral already
                    states the position. */}
                <div
                  aria-hidden="true"
                  className="h-0.5 w-full bg-scheme-text/10"
                >
                  <div className="h-full w-8 bg-scheme-text" />
                </div>
                <div className="mt-8">
                  <p className="mb-3 font-semibold md:mb-4">
                    Step {index + 1}
                  </p>
                  <h3 className="mb-5 text-h2 font-bold md:mb-6">
                    {step.title}
                  </h3>
                  <p className="text-medium">{step.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
