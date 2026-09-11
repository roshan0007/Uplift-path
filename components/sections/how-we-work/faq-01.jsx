"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

/**
 * Content matches the 2026-09-08 Figma (node 10214-103297, `Container`
 * 10214:100184) verbatim - all four questions and all four answers, at the
 * frame's own 18/27 and 16/24.
 *
 * The one change is `font-body font-[700]` on the triggers. Every frame in the
 * Figma file sets FAQ questions in Lexend Deca 700; the build rendered them in
 * Playfair 400 because Radix wraps the trigger in an `<h3>` and this brand
 * pins `--font-weight-bold` to 400. See `[13]` in `globals.css` for why it
 * takes two classes - the same two belong on the other ten `faq-01` sections.
 *
 * The frame draws all four answers expanded. Shipping collapsed is the
 * existing precedent from the About Us pass.
 */
export function Faq1() {
  return (
    <section className="px-[5%] pt-16 pb-12 md:pt-24 md:pb-16 lg:pt-28 lg:pb-16 scheme-1 badge-alt">
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
              What makes Uplift’s company culture unique?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Uplift combines a spirit of collaboration, accountability, and
              respect, empowering every team member to contribute ideas, take
              initiative, and drive real business results.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-large font-body font-[400] md:py-5">
              How does Uplift foster professional growth and learning?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              We prioritize continuous learning and skill development through
              mentorship, project variety, and open feedback, ensuring our
              consultants and clients are always growing.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-large font-body font-[400] md:py-5">
              What values are most important at Uplift?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Integrity, collaboration, innovation, and results-driven action
              are the pillars of our work and client relationships, guiding
              decision-making at every level.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-large font-body font-[400] md:py-5">
              How does Uplift handle feedback and communication?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              We promote transparent, frequent feedback and open communication
              encouraging both upward and peer-to-peer sharing in a supportive
              and respectful environment.​
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
