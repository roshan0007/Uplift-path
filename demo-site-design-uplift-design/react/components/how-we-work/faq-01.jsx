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
              What makes Uplift’s company culture unique?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Uplift combines a spirit of collaboration, accountability, and
              respect, empowering every team member to contribute ideas, take
              initiative, and drive real business results.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-medium md:py-5">
              How does Uplift foster professional growth and learning?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              We prioritize continuous learning and skill development through
              mentorship, project variety, and open feedback, ensuring our
              consultants and clients are always growing.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-medium md:py-5">
              What values are most important at Uplift?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Integrity, collaboration, innovation, and results-driven action
              are the pillars of our work and client relationships, guiding
              decision-making at every level.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-medium md:py-5">
              How does Uplift handle feedback and communication?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              We promote transparent, frequent feedback and open communication
              encouraging both upward and peer-to-peer sharing in a supportive
              and respectful environment.​
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="mx-auto mt-12 max-w-md text-center md:mt-18 lg:mt-20" />
      </div>
    </section>
  );
}
