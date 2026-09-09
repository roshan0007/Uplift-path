"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

/**
 * All four questions replaced per the 2026-09 Figma.
 *
 * What was here was still Relume boilerplate — "What is business consulting?",
 * "Why should we work with a business consultant?" — generic copy about the
 * category rather than answers about Uplift Path. The Figma replaces them with
 * the four things a real visitor actually arrives asking.
 *
 * Two of the answers carry statements of fact rather than marketing, and they
 * are worded the way they are on purpose:
 *
 *  - the peer-coaching answer states plainly that it is not psychotherapy, not
 *    diagnosis and not a substitute for clinical treatment, and gives 988. Peer
 *    support and clinical care are different things under Ohio licensure, and a
 *    visitor in crisis reaching this page needs the number, not a nurture flow.
 *  - the CARF answer claims accreditation of our own programs. That claim is
 *    verifiable and the seal in the TrustStrip above links to CARF's provider
 *    listing, so the wording must not drift beyond what that record supports.
 *
 * Anyone editing those two should keep both properties.
 */
const FAQS = [
  {
    q: "Do you work with individuals, or only organizations?",
    a: "Both. Uplift Path has two sides: consulting and advisory for organizations, and one-to-one peer coaching for individuals. Same team, same values, same standard. The two cards at the top of this page point you to the right one.",
  },
  {
    q: "What happens on a discovery call?",
    a: "One conversation, about 30 minutes, at no cost and with no obligation. We ask about your goals, what is already working, and what is in the way. If we are a good fit you will leave with a proposed next step. If we are not, we will say so and point you somewhere better.",
  },
  {
    q: "Is peer coaching the same as therapy?",
    a: "No. Peer coaching is support from someone with lived experience — practical help navigating a difficult stretch, setting goals, and finding resources. It is not psychotherapy, it is not diagnosis, and it is not a substitute for clinical treatment. If you need clinical care we will help you find it. If you are in crisis, call or text 988.",
  },
  {
    q: "What does your CARF accreditation mean for me?",
    a: "CARF is an independent accreditor that surveys organizations on-site against national quality standards. We hold the Gold Seal for our own programs — so when we help a provider get survey-ready, we have been through it ourselves rather than read about it.",
  },
];

export function Faq1() {
  return (
    <section className="px-[5%] pt-16 pb-12 md:pt-24 md:pb-16 lg:pt-28 lg:pb-16 scheme-1 badge-alt">
      <div className="container max-w-lg">
        <div className="mb-12 text-center md:mb-18 lg:mb-20">
          <h2 className="mb-5 text-h2 font-bold md:mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-medium">Find answers to your questions about us.</p>
        </div>
        <Accordion type="multiple">
          {FAQS.map((faq, index) => (
            <AccordionItem key={faq.q} value={`item-${index}`}>
              <AccordionTrigger className="text-medium font-body font-[400] md:py-5">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
