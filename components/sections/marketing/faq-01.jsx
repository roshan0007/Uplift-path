"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

/**
 * The four questions and answers from the 2026-09-18 `Marketing Page` design,
 * verbatim, in the site's standard `faq-01`.
 *
 * Question face is Lexend Deca 400 via `font-body font-[400]` at the call site
 * — both classes, since `cn()` is tailwind-merge and only drops `font-bold`
 * when a real font-weight utility lands beside it. That is the site-wide
 * ruling: all routes, not bold, deliberately. See `globals.css` [13] and
 * CLAUDE.md.
 *
 * `text-large`, not `text-medium`, on every trigger: at `text-medium` the
 * question comes out identical to its own answer in family, size, weight and
 * colour, with only the chevron to tell them apart, and weight is not
 * available as the differentiator in this brand. Same resolution as
 * home/faq-01 and compliance-support/faq-01.
 *
 * `scheme-mint` — third of the three breaks in this route's white run. See the
 * note in `why-not-an-agency`.
 */
export function Faq1() {
  return (
    <section className="px-[5%] pt-16 pb-12 md:pt-24 md:pb-16 lg:pt-28 lg:pb-16 scheme-mint badge-alt">
      <div className="container max-w-lg">
        <div className="mb-12 text-center md:mb-18 lg:mb-20">
          <h2 className="mb-5 text-h2 font-bold md:mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-medium">
            Find answers to your questions about us.
          </p>
        </div>
        <Accordion type="multiple">
          <AccordionItem value="item-0">
            <AccordionTrigger className="text-large font-body font-[400] md:py-5">
              Can we use client testimonials?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Not without written authorization that meets HIPAA&rsquo;s
              requirements, and even then it&rsquo;s rarely worth the exposure.
              We build proof a different way: referral partner quotes,
              accreditation, outcomes reported in aggregate, and staff
              credentials.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-large font-body font-[400] md:py-5">
              Is a tracking pixel on our website a problem?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              It can be. Analytics and ad pixels on pages tied to a service or
              an intake form have triggered enforcement action across the
              sector. Reviewing what&rsquo;s installed is part of the first
              engagement.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-large font-body font-[400] md:py-5">
              Do you run the marketing or teach us to?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Either. Most clients start with us running it and move to running
              it in-house once the system is documented — that handover is the
              goal, not an exit.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-large font-body font-[400] md:py-5">
              We already have a website. Do we have to start over?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Almost never. Most of what holds a site back is wording and
              structure, not the build.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
