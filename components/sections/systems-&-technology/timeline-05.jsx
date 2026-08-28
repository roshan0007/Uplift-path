"use client";

import { motion, useScroll, useTransform } from "motion/react";
import React, { useRef } from "react";

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
            <h2 className="mb-5 text-h2 font-bold md:mb-6">How we work</h2>
            <p className="text-medium">
              Operations keep running throughout. Quick wins land in phase one.
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
            <div className="relative">
              <Circle />
              <div className="mt-4 ml-4 flex flex-col md:ml-12">
                <h3 className="mb-3 text-h3 font-bold md:mb-4">01</h3>
                <h4 className="mb-3 text-h5 font-bold md:mb-4">Map</h4>
                <p>
                  We sit with your people and document how things actually get
                  done. The real process, not the one in the manual.
                </p>
              </div>
            </div>
            <div className="relative">
              <Circle />
              <div className="mt-4 ml-4 flex flex-col md:ml-12">
                <h3 className="mb-3 text-h3 font-bold md:mb-4">02</h3>
                <h4 className="mb-3 text-h5 font-bold md:mb-4">Design</h4>
                <p>
                  We cut the duplicate entry, the manual handoffs, and the
                  waiting. What remains is the essential work.
                </p>
              </div>
            </div>
            <div className="relative">
              <Circle />
              <div className="mt-4 ml-4 flex flex-col md:ml-12">
                <h3 className="mb-3 text-h3 font-bold md:mb-4">03</h3>
                <h4 className="mb-3 text-h5 font-bold md:mb-4">
                  Build in phases
                </h4>
                <p>
                  We set up your existing stack to do the heavy lifting. Most of
                  the gain comes from what you already own.
                </p>
              </div>
            </div>
            <div className="relative">
              <Circle />
              <div className="mt-4 ml-4 flex flex-col md:ml-12">
                <h3 className="mb-3 text-h3 font-bold md:mb-4">04</h3>
                <h4 className="mb-3 text-h5 font-bold md:mb-4">Train</h4>
                <p>
                  Your team runs the system before we step back. Adoption is the
                  whole game and we play it to win.
                </p>
              </div>
            </div>
            <div className="relative">
              <Circle />
              <div className="mt-4 ml-4 flex flex-col md:ml-12">
                <h3 className="mb-3 text-h3 font-bold md:mb-4">05</h3>
                <h4 className="mb-3 text-h5 font-bold md:mb-4">Hand over</h4>
                <p>
                  We sit with your people and document how things actually get
                  done. The real process, not the one in the manual.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
