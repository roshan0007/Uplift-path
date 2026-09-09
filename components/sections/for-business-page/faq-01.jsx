"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

/**
 * The 2026-09-08 Figma (node 10214-104878) draws all four questions and the
 * other three answers verbatim as the export shipped them, at its own 18/27 and
 * 16/24, so only two things changed here.
 *
 * The question face. Every frame in the file sets FAQ questions in Lexend Deca
 * 18/27 weight 700; the build rendered them in Playfair Display 400. Two causes
 * compound -- Radix wraps the trigger in an <h3>, which the base h1-h6 Playfair
 * rule catches, and `font-bold` resolves through `--font-weight-bold`, which
 * this brand pins to 400 on purpose. `font-body font-[700]` fixes it at the
 * call site: both classes, since `cn()` is tailwind-merge and only drops
 * `font-bold` when a real font-weight utility lands beside it. See
 * `globals.css` [13]. This is the third of eleven `faq-01` sections to get it.
 *
 * The industries answer. The frame answers "Which industries do you specialize
 * in?" with untouched Relume boilerplate -- "across all industries, from
 * startups and SaaS ventures to retail, manufacturing, and professional
 * services" -- which is a claim this company cannot support and contradicts the
 * CARF and behavioural-health positioning the rest of the site sells. Replaced
 * with the answer the design system's own UI kit already carries
 * (`ui_kits/website/Chrome.jsx`). Raised and settled before building.
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
            <AccordionTrigger className="text-medium font-body font-[400] md:py-5">
              What is business consulting?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Business consulting involves providing expert advice, actionable
              strategies, and hands-on support to help organizations solve
              challenges, improve operations, and achieve measurable growth.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-medium font-body font-[400] md:py-5">
              Why should we work with a business consultant?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Business consultants offer an objective perspective, proven
              methodologies, and industry insights that accelerate
              problem-solving, streamline workflows, and drive
              innovation—resulting in sustainable business outcomes.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-medium font-body font-[400] md:py-5">
              Which industries do you specialize in?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Our business consulting approach serves Founders and Leaders
              primarily in the behavioural health services sectors, from
              early-stage startups navigating accreditation to established
              agencies seeking operational transformation and growth.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-medium font-body font-[400] md:py-5">
              How do your consulting services create value for clients?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              We help clients address complex business challenges through
              collaborative coaching, process optimisation, technology
              integration, and growth strategy delivering disciplined
              improvements and actionable outcomes.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
