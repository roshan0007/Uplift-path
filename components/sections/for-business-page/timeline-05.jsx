"use client";

import { motion, useScroll, useTransform } from "motion/react";
import React, { useRef } from "react";

// The engagement journey for an organization, in the order it actually happens.
// Written from what this page and the service pages already say -- not from the
// Relume filler the old layout-486 carried.
const STEPS = [
  {
    title: "Discovery call",
    body: "You describe what is not working — the bottleneck, the audit coming up, the growth you cannot staff for. We tell you plainly whether this is work we are the right people for.",
  },
  {
    title: "Assessment",
    body: "We look at how work actually moves through your organization: workflows, documentation, the systems you already own, and where compliance sits today. You get a written picture of what we found.",
  },
  {
    title: "Pathway Plan",
    body: "Together we set the goals, the sequence, and the measures. You leave with a Pathway Plan naming what changes first, who owns it, and how you will know it worked.",
  },
  {
    title: "Support through delivery",
    body: "We stay on while the plan is built — systems, documentation, training — and step back once your team is running it without us.",
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
              How an engagement works
            </h2>
            <p className="text-medium">
              Four steps from the first call to the point where your team runs
              it without us. Operations keep running throughout.
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
