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
              What is Uplift Path’s approach to business consulting?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Uplift Path focuses on practical, results-driven strategies. We
              listen to each client’s needs, analyze their business, and deliver
              clear, actionable plans for measurable growth.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-medium md:py-5">
              Who benefits from your consulting services?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Our clients include Founders, entrepreneurs, business owners, and
              executives from any industry seeking strategic guidance and
              mentorship for sustainable growth.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-medium md:py-5">
              What types of challenges can you help with?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              We assist with growth planning, process optimization, market
              entry, strategic decision-making, team development, and more.
              Every service is tailored to unique business needs.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-medium md:py-5">
              What makes Uplift Path different from other consultancies?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              We emphasize actionable advice, collaborative problem-solving, and
              a personalized approach. Our team brings deep expertise and a
              disciplined focus to every project.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="mx-auto mt-12 max-w-md text-center md:mt-18 lg:mt-20" />
      </div>
    </section>
  );
}
