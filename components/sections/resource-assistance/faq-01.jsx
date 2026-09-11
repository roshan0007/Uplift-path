"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

/**
 * Copy is identical to the 2026-09-09 Figma (frame `Resource Assistance`) --
 * all three questions and answers, at its own 18/27 and 16/24. Only the
 * question face changed: Lexend Deca 700 via `font-body font-[700]` at the call
 * site, both classes since `cn()` is tailwind-merge. See `globals.css` [13].
 * Seventh of eleven `faq-01` sections to get it.
 */
export function Faq1() {
  return (
    // `scheme-mint`, not `scheme-1`.
    // /resource-assistance ran four consecutive white sections. One break here
    // gives white white MINT white.
    // This brand has exactly two depth cues -- a scheme change and the button
    // ledge -- so the remedy for a same-background run is the scheme, never a
    // texture or a blurred shadow. `.scheme-mint` is the light neutral already
    // used this way on home/testimonial-10; cta-25's white is a documented
    // deliberate reversal and is left alone everywhere.
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
            {/* `text-large`, not `text-medium`, on every trigger in this list.
                `font-body font-[400]` is the site-wide ruling (CLAUDE.md: all
                eleven routes, not bold, deliberately) and is untouched -- but at
                `text-medium` the question came out identical to its own answer in
                family, size, weight and colour, with only the chevron to tell them
                apart. Weight is not available as the differentiator in this brand,
                so it has to be size: one token step up, ruling intact. Same
                resolution as home/faq-01. */}
            <AccordionTrigger className="text-large font-body font-[400] md:py-5">
              Can you guarantee funding?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              No. The decision rests with the funder. We make sure you apply for
              the right opportunities, well.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-large font-body font-[400] md:py-5">
              Do you write the grant or do we?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Together. You know the work; we know what funders need to see.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-large font-body font-[400] md:py-5">
              We are small. Is this worth it?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Small organisations benefit most, having the least spare capacity
              to chase resources themselves.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
