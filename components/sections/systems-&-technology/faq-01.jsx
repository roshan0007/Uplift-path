"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

/**
 * Copy is identical to the 2026-09-09 Figma (frame `System & Technology`) --
 * all three questions and answers at its own 18/27 and 16/24. Only the question
 * face changed: Lexend Deca 700 via `font-body font-[700]` at the call site,
 * both classes since `cn()` is tailwind-merge. See `globals.css` [13]. Fifth of
 * eleven `faq-01` sections to get it.
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
              Do we have to replace our current system?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Usually not. Most of the gain comes from configuring what you
              already own.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-large font-body font-[400] md:py-5">
              Our staff resist new tools.
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Because they were announced to them. We involve them in the
              mapping stage instead.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-large font-body font-[400] md:py-5">
              We handle sensitive client information.
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Implementations are designed around your privacy obligations,
              including HIPAA where it applies, and the safeguards are
              documented at handover.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
