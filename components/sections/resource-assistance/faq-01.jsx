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
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
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
            <AccordionTrigger className="text-medium font-body font-[700] md:py-5">
              Can you guarantee funding?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              No. The decision rests with the funder. We make sure you apply for
              the right opportunities, well.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-medium font-body font-[700] md:py-5">
              Do you write the grant or do we?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Together. You know the work; we know what funders need to see.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-medium font-body font-[700] md:py-5">
              We are small. Is this worth it?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Small organisations benefit most, having the least spare capacity
              to chase resources themselves.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="mx-auto mt-12 max-w-md text-center md:mt-18 lg:mt-20" />
      </div>
    </section>
  );
}
