"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

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
            <AccordionTrigger className="text-medium md:py-5">
              How is advisory different from a consultant writing us a report?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              A report tells you what is wrong. We build the plan with your
              team, so they own it and can execute it after we step back.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-medium md:py-5">
              We are very early. Is it too soon?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Early is the cheapest time to get structure right. Retrofitting it
              after eighteen months of workarounds costs considerably more.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-medium md:py-5">
              How long does an engagement run?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              It depends on scope, and we will tell you honestly at the
              discovery call.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="mx-auto mt-12 max-w-md text-center md:mt-18 lg:mt-20" />
      </div>
    </section>
  );
}
