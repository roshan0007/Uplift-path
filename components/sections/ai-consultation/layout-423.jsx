"use client";

import { Button } from "@/components/ui/button";
import { BackgroundCard } from "@/components/ui/card";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import { ChevronRight } from "relume-icons";

const useRelume = () => {
  const [hoveredFeatureIdx, setHoveredFeatureIdx] = useState(null);
  const handleMouseEnter = (index) => () => {
    setHoveredFeatureIdx(index);
  };
  const handleMouseLeave = () => {
    setHoveredFeatureIdx(null);
  };
  const startAnimation = (index) => {
    return hoveredFeatureIdx === index ? "visible" : "hidden";
  };
  return {
    handleMouseEnter,
    handleMouseLeave,
    startAnimation,
  };
};

export function Layout423() {
  const hoverState = useRelume();
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      <div className="container">
        <div className="md:mb-18 mx-auto mb-12 w-full max-w-lg text-center lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">Services</p>
          <h2 className="text-h2 mb-5 font-bold md:mb-6">
            Our AI consulting and implementation services
          </h2>
          <p className="text-medium">
            We offer a full suite of services to guide your AI transformation
            from concept to completion.
          </p>
        </div>
        <div className="flex flex-col justify-between gap-6 md:gap-8 lg:flex-row">
          <BackgroundCard
            className="relative flex w-full flex-col overflow-hidden lg:h-full lg:w-1/2 lg:transition-all lg:duration-200 lg:hover:w-[70%]"
            onMouseOver={hoverState.handleMouseEnter(0)}
            onMouseLeave={hoverState.handleMouseLeave}
          >
            <a href="#">
              <div className="absolute inset-0 flex size-full flex-col items-center justify-center self-start">
                <div className="bg-neutral-darkest/50 absolute inset-0" />
                <img
                  src="/images/ai-consultation-services-section-0.png"
                  alt="Relume placeholder image 1"
                  className="size-full object-cover"
                />
              </div>
              <div className="group relative flex h-full min-h-[70vh] flex-col justify-end p-6 md:p-8">
                <div className="lg:group-hover:bg-neutral-darkest/50 lg:absolute lg:inset-0 lg:z-0 lg:transition-all lg:duration-300" />
                <div className="z-10">
                  <p className="mb-2 font-semibold text-white">AI consulting</p>
                  <h3 className="text-h4 font-bold text-white">
                    AI strategy and implementation
                  </h3>
                  <div className="lg:hidden">
                    <p className="mt-5 text-white md:mt-6">
                      We help you build a strong AI foundation with strategy,
                      governance, and workforce-ready solutions.
                    </p>
                  </div>
                </div>
                <AnimatePresence>
                  <motion.div
                    className="z-10 hidden lg:block lg:w-[340px]"
                    variants={{
                      hidden: { opacity: 0, height: 0, y: 50 },
                      visible: { opacity: 1, height: "auto", y: 0 },
                    }}
                    initial="hidden"
                    animate={hoverState.startAnimation(0)}
                    exit="hidden"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <p className="mt-5 text-white md:mt-6">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse varius enim in eros elementum tristique.
                    </p>
                    <div className="mt-6 md:mt-8">
                      <Button
                        variant="link"
                        size="link"
                        iconRight={<ChevronRight />}
                        className="text-white"
                      >
                        Button
                      </Button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </a>
          </BackgroundCard>
          <BackgroundCard
            className="relative flex w-full flex-col overflow-hidden lg:h-full lg:w-1/2 lg:transition-all lg:duration-200 lg:hover:w-[70%]"
            onMouseOver={hoverState.handleMouseEnter(1)}
            onMouseLeave={hoverState.handleMouseLeave}
          >
            <a href="#">
              <div className="absolute inset-0 flex size-full flex-col items-center justify-center self-start">
                <div className="bg-neutral-darkest/50 absolute inset-0" />
                <img
                  src="/images/ai-consultation-services-section-1.png"
                  alt="Relume placeholder image 2"
                  className="size-full object-cover"
                />
              </div>
              <div className="group relative flex h-full min-h-[70vh] flex-col justify-end p-6 md:p-8">
                <div className="lg:group-hover:bg-neutral-darkest/50 lg:absolute lg:inset-0 lg:z-0 lg:transition-all lg:duration-300" />
                <div className="z-10">
                  <p className="mb-2 font-semibold text-white">AI consulting</p>
                  <h3 className="text-h4 font-bold text-white">
                    AI strategy and implementation
                  </h3>
                  <div className="lg:hidden">
                    <p className="mt-5 text-white md:mt-6">
                      We help you build a strong AI foundation with strategy,
                      governance, and workforce-ready solutions.
                    </p>
                  </div>
                </div>
                <AnimatePresence>
                  <motion.div
                    className="z-10 hidden lg:block lg:w-[340px]"
                    variants={{
                      hidden: { opacity: 0, height: 0, y: 50 },
                      visible: { opacity: 1, height: "auto", y: 0 },
                    }}
                    initial="hidden"
                    animate={hoverState.startAnimation(1)}
                    exit="hidden"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <p className="mt-5 text-white md:mt-6">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse varius enim in eros elementum tristique.
                    </p>
                    <div className="mt-6 md:mt-8">
                      <Button
                        variant="link"
                        size="link"
                        iconRight={<ChevronRight />}
                        className="text-white"
                      >
                        Button
                      </Button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </a>
          </BackgroundCard>
          <BackgroundCard
            className="relative flex w-full flex-col overflow-hidden lg:h-full lg:w-1/2 lg:transition-all lg:duration-200 lg:hover:w-[70%]"
            onMouseOver={hoverState.handleMouseEnter(2)}
            onMouseLeave={hoverState.handleMouseLeave}
          >
            <a href="#">
              <div className="absolute inset-0 flex size-full flex-col items-center justify-center self-start">
                <div className="bg-neutral-darkest/50 absolute inset-0" />
                <img
                  src="/images/ai-consultation-services-section-2.png"
                  alt="Relume placeholder image 3"
                  className="size-full object-cover"
                />
              </div>
              <div className="group relative flex h-full min-h-[70vh] flex-col justify-end p-6 md:p-8">
                <div className="lg:group-hover:bg-neutral-darkest/50 lg:absolute lg:inset-0 lg:z-0 lg:transition-all lg:duration-300" />
                <div className="z-10">
                  <p className="mb-2 font-semibold text-white">AI consulting</p>
                  <h3 className="text-h4 font-bold text-white">
                    AI strategy and implementation
                  </h3>
                  <div className="lg:hidden">
                    <p className="mt-5 text-white md:mt-6">
                      We help you build a strong AI foundation with strategy,
                      governance, and workforce-ready solutions.
                    </p>
                  </div>
                </div>
                <AnimatePresence>
                  <motion.div
                    className="z-10 hidden lg:block lg:w-[340px]"
                    variants={{
                      hidden: { opacity: 0, height: 0, y: 50 },
                      visible: { opacity: 1, height: "auto", y: 0 },
                    }}
                    initial="hidden"
                    animate={hoverState.startAnimation(2)}
                    exit="hidden"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <p className="mt-5 text-white md:mt-6">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse varius enim in eros elementum tristique.
                    </p>
                    <div className="mt-6 md:mt-8">
                      <Button
                        variant="link"
                        size="link"
                        iconRight={<ChevronRight />}
                        className="text-white"
                      >
                        Button
                      </Button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </a>
          </BackgroundCard>
        </div>
      </div>
    </section>
  );
}
