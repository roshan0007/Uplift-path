"use client";

import { motion, useScroll, useTransform } from "motion/react";
import React, { useRef } from "react";

// The four steps here are the same four steps the intake flow walks a person
// through -- Application (the modal on this page), Eligibility (/cmps),
// Scheduling (/booking), Consent (/consent-form). The names must stay in sync
// with `components/intake/intake-steps.js`, which drives the breadcrumb on
// every one of those screens. One story, told twice.
const STEPS = [
  {
    title: "Application",
    body: "Tell us what you are looking for. A short confidential form asks about your goals, your situation, and the kind of support that would actually help. It takes a few minutes.",
  },
  {
    title: "Eligibility",
    body: "We confirm the basics. Personalized Supportive Services are for Ohio adults 18 and over with active Ohio Medicaid, so we check that first and tell you plainly where you stand.",
  },
  {
    title: "Scheduling",
    body: "You pick the time. Choose your session from the openings our Peer Coaches have — by phone or by video, from anywhere in Ohio.",
  },
  {
    title: "Consent",
    body: "You sign the consent form. It sets out what stays private, what we share and with whom, and what you can expect from your coach. Once it is signed, your session is confirmed.",
  },
];

const Circle = () => {
  const circleRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: circleRef,
    offset: ["end end", "end center"],
  });

  const opacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);

  return (
    <div className="absolute -ml-8 flex h-full w-8 items-start justify-center">
      <div
        ref={circleRef}
        className="relative z-20 mt-9 size-3.75 rounded-full shadow-[0_0_0_8px_var(--color-scheme-background)] backdrop-blur-3xl md:mt-12"
      >
        <div className="absolute inset-0 rounded-full bg-scheme-text/15" />
        <motion.div
          className="absolute inset-0 rounded-full bg-scheme-text"
          style={{ opacity }}
        />
      </div>
    </div>
  );
};

export function Timeline5() {
  return (
    <section className="overflow-clip px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      <div className="container max-w-lg">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="relative z-10 w-full max-w-lg">
            <h2 className="mb-5 text-h2 font-bold md:mb-6">
              How getting matched works
            </h2>
            <p className="text-medium">
              Four steps between the first form and your session. Each one
              is short, and nothing you share leaves our team.
            </p>
          </div>
        </div>
        <div className="grid w-full max-w-lg auto-cols-fr grid-cols-[max-content_1fr] items-start justify-items-center">
          <div className="relative left-0 flex h-full w-8 flex-col items-center md:left-auto">
            <div className="absolute z-10 h-16 w-1 bg-gradient-to-b from-scheme-background to-transparent" />
            <div className="sticky top-0 mt-[-50vh] h-[50vh] w-[3px] bg-scheme-text" />
            <div className="h-full w-[3px] bg-scheme-text/15" />
            <div className="absolute bottom-0 z-0 h-16 w-1 bg-gradient-to-b from-transparent to-scheme-background" />
            <div className="absolute top-[-50vh] h-[50vh] w-full bg-scheme-background" />
          </div>
          <div className="grid auto-cols-fr grid-cols-1 gap-y-8 sm:gap-12 md:gap-20">
            {STEPS.map((step, index) => (
              <div key={step.title} className="relative">
                <Circle />
                <div className="mt-4 ml-4 flex flex-col md:ml-12">
                  <h3 className="mb-3 text-h3 font-bold md:mb-4">
                    {String(index + 1).padStart(2, "0")}
                  </h3>
                  <h4 className="mb-3 text-h5 font-bold md:mb-4">
                    {step.title}
                  </h4>
                  <p>{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
