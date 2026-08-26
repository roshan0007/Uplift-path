"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@relume_io/relume-ui";
import React from "react";

export function Faq1() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container max-w-lg">
        <div className="rb-12 mb-12 text-center md:mb-18 lg:mb-20">
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Frequently Asked Questions
          </h2>
          <p className="md:text-md">Find answers to your questions about us.</p>
        </div>
        <Accordion type="multiple">
          <AccordionItem value="item-0">
            <AccordionTrigger className="md:py-5 md:text-md">
              How long does accreditation take?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              We give you a realistic timeline after the gap analysis, not
              before it.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-1">
            <AccordionTrigger className="md:py-5 md:text-md">
              Do you write our policies or coach us to write them?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Usually both. Policies you had no hand in writing do not get
              followed.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="md:py-5 md:text-md">
              Can you guarantee accreditation?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              No, and nor can anyone else — the decision belongs to the
              accrediting body. We make sure you enter the survey prepared and
              evidenced.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="mx-auto mt-12 max-w-md text-center md:mt-18 lg:mt-20" />
      </div>
    </section>
  );
}
