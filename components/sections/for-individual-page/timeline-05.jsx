"use client";

import { motion, useScroll, useTransform } from "motion/react";
import React, { useRef } from "react";

/**
 * The scroll-tracked vertical rail, which is the `timeline-05` this site
 * already ships on `/systems-&-technology` and `/for-business-page`.
 *
 * ## Why this is not the oversized-numeral layout any more
 *
 * A previous pass re-laid this section out to the 2026-09-08 Figma (node
 * 10214-103875), which draws numbered blocks: a 224px Playfair numeral in a
 * 258px left column, a hairline progress rule, a "Step N" tagline, a 52/62.4
 * heading and body copy. It was built faithfully and it works, but it is a
 * *third* way of presenting an ordered list of steps on one site -- the two
 * pages above already share the rail, and this page's four steps are the same
 * kind of content theirs are. Asked to unify on the component the other pages
 * use, and that is what this now is.
 *
 * The trade is deliberate and worth naming: the numeral layout gave each step
 * a full-width block and a 52px heading, which is more presence per step. The
 * rail gives four steps that read as one connected sequence, and a visitor who
 * has come from `/systems-&-technology` or `/for-business-page` meets the same
 * component doing the same job. Consistency won.
 *
 * ## What is unchanged
 *
 * The heading, the standfirst and all four steps -- Application, Eligibility,
 * Scheduling, Consent. Those names must stay in sync with
 * `components/intake/intake-steps.js`, which drives the breadcrumb on `/cmps`,
 * `/booking` and `/consent-form`: this section is the public description of
 * the same flow those screens walk a person through. One story, told twice.
 *
 * The frame's own copy for these blocks was refused on the earlier pass and
 * still is -- it fills them with For Business material ("Our simple 3-step
 * consultation process", "Submit request ... through your organisation") and
 * mis-numbers itself, labelling its intro block "01" so its first real step
 * reads "02". Nor are its eight buttons built: every one is labelled literally
 * "Button", they have no destination, and this page already offers the same
 * action in the hero, in all three tabs and in the CTA.
 */

/**
 * The rail's dot. Fills in as the step it belongs to reaches the top of the
 * viewport, which is what makes the rail read as progress rather than as
 * decoration. Lifted unchanged from `systems-&-technology/timeline-05.jsx` so
 * the two behave identically.
 */
const Circle = () => {
  const circleRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: circleRef,
    offset: ["end end", "end center"],
  });

  const opacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);

  return (
    <div className="absolute -ml-8 flex h-full w-8 items-start justify-center">
      <div
        ref={circleRef}
        className="relative z-20 mt-9 size-3.75 rounded-full shadow-[0_0_0_8px_var(--color-scheme-background)] backdrop-blur-3xl md:mt-12"
      >
        <div className="absolute inset-0 rounded-full bg-scheme-text/15" />
        <motion.div
          className="absolute inset-0 rounded-full bg-scheme-text"
          style={{ opacity }}
        />
      </div>
    </div>
  );
};

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
    <section className="overflow-clip px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      <div className="container max-w-lg">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="relative z-10 w-full max-w-lg">
            <h2 className="mb-5 text-h2 font-bold md:mb-6">
              How getting matched works
            </h2>
            <p className="text-medium">
              Four steps between the first form and your session. Each one is
              short, and nothing you share leaves our team.
            </p>
          </div>
        </div>
        {/* The rail itself: a sticky filled segment over a 15%-black track, with
            a background-coloured mask above and below so the line appears to
            start and stop at the first and last step rather than at the section
            edges. */}
        <div className="grid w-full max-w-lg auto-cols-fr grid-cols-[max-content_1fr] items-start justify-items-center">
          <div className="relative left-0 flex h-full w-8 flex-col items-center md:left-auto">
            <div className="absolute z-10 h-16 w-1 bg-gradient-to-b from-scheme-background to-transparent" />
            <div className="sticky top-0 mt-[-50vh] h-[50vh] w-[3px] bg-scheme-text" />
            <div className="h-full w-[3px] bg-scheme-text/15" />
            <div className="absolute bottom-0 z-0 h-16 w-1 bg-gradient-to-b from-transparent to-scheme-background" />
            <div className="absolute top-[-50vh] h-[50vh] w-full bg-scheme-background" />
          </div>
          <div className="grid auto-cols-fr grid-cols-1 gap-y-8 sm:gap-12 md:gap-20">
            {STEPS.map((step, index) => (
              <div key={step.title} className="relative">
                <Circle />
                <div className="mt-4 ml-4 flex flex-col md:ml-12">
                  {/* The numeral is an <h3> and the step name an <h4> on the
                      two pages this comes from, so it is the same here. The
                      numeral is content, not decoration: it is the only thing
                      that states the order. */}
                  <h3 className="mb-3 text-h3 font-bold md:mb-4">
                    {String(index + 1).padStart(2, "0")}
                  </h3>
                  <h4 className="mb-3 text-h5 font-bold md:mb-4">
                    {step.title}
                  </h4>
                  <p>{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
