"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

const Circle = () => {
  const circleRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: circleRef,
    offset: ["end end", "end center"],
  });
  const backgroundColor = {
    backgroundColor: useTransform(scrollYProgress, [0.85, 1], ["#ccc", "#000"]),
  };
  return (
    <div className="absolute -ml-8 flex h-full w-8 items-start justify-center">
      <motion.div
        ref={circleRef}
        style={backgroundColor}
        className="z-20 mt-7 size-[0.9375rem] rounded-full shadow-[0_0_0_8px_white] md:mt-8"
      />
    </div>
  );
};

export function Timeline5() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container max-w-lg">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="relative z-10 w-full max-w-lg">
            <p className="mb-3 font-semibold md:mb-4">Method</p>
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              How we work
            </h2>
            <p className="md:text-md">
              Operations keep running throughout. Quick wins land in phase one.
            </p>
          </div>
        </div>
        <div className="grid w-full max-w-lg auto-cols-fr grid-cols-[max-content_1fr] items-start justify-items-center">
          <div className="relative left-0 flex h-full w-8 flex-col items-center md:left-auto">
            <div className="absolute z-10 h-16 w-1 bg-gradient-to-b from-background-primary to-transparent" />
            <div className="sticky top-0 mt-[-50vh] h-[50vh] w-[3px] bg-neutral-black" />
            <div className="h-full w-[3px] bg-neutral-lighter" />
            <div className="absolute bottom-0 z-0 h-16 w-1 bg-gradient-to-b from-transparent to-background-primary" />
            <div className="absolute top-[-50vh] h-[50vh] w-full bg-background-primary" />
          </div>
          <div className="grid auto-cols-fr grid-cols-1 gap-y-8 sm:gap-12 md:gap-20">
            <div className="relative">
              <Circle />
              <div className="ml-4 mt-4 flex flex-col md:ml-12">
                <h3 className="mb-3 text-4xl font-bold leading-[1.2] md:mb-4 md:text-5xl lg:text-6xl">
                  01
                </h3>
                <h4 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
                  Map
                </h4>
                <p>
                  We sit with your people and document how things actually get
                  done. The real process, not the one in the manual.
                </p>
              </div>
            </div>
            <div className="relative">
              <Circle />
              <div className="ml-4 mt-4 flex flex-col md:ml-12">
                <h3 className="mb-3 text-4xl font-bold leading-[1.2] md:mb-4 md:text-5xl lg:text-6xl">
                  02
                </h3>
                <h4 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
                  Design
                </h4>
                <p>
                  We cut the duplicate entry, the manual handoffs, and the
                  waiting. What remains is the essential work.
                </p>
              </div>
            </div>
            <div className="relative">
              <Circle />
              <div className="ml-4 mt-4 flex flex-col md:ml-12">
                <h3 className="mb-3 text-4xl font-bold leading-[1.2] md:mb-4 md:text-5xl lg:text-6xl">
                  03
                </h3>
                <h4 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
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
              <div className="ml-4 mt-4 flex flex-col md:ml-12">
                <h3 className="mb-3 text-4xl font-bold leading-[1.2] md:mb-4 md:text-5xl lg:text-6xl">
                  04
                </h3>
                <h4 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
                  Train
                </h4>
                <p>
                  Your team runs the system before we step back. Adoption is the
                  whole game and we play it to win.
                </p>
              </div>
            </div>
            <div className="relative">
              <Circle />
              <div className="ml-4 mt-4 flex flex-col md:ml-12">
                <h3 className="mb-3 text-4xl font-bold leading-[1.2] md:mb-4 md:text-5xl lg:text-6xl">
                  05
                </h3>
                <h4 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
                  Hand over
                </h4>
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
