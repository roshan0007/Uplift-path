"use client";

import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import React, { useCallback, useEffect, useRef, useState } from "react";

const useLayout485 = () => {
  const { scrollY } = useScroll();
  const [activeIndex, setActiveIndex] = useState(0);
  const featureCount = features.length;

  const yProgress = useMotionValue(0);
  const y = useTransform(yProgress, (value) => `${value}%`);

  const updateActiveIndex = useCallback(() => {
    const cards = document.querySelectorAll("[data-card-index]");
    const triggerPoint = window.innerHeight * 0.3;
    let newActiveIndex = 0;

    cards.forEach((card, i) => {
      const rect = card.getBoundingClientRect();
      if (rect.top <= triggerPoint) {
        newActiveIndex = i;
      }
    });

    setActiveIndex(newActiveIndex);
  }, []);

  useEffect(() => {
    const targetY = -((activeIndex * 100) / featureCount);
    animate(yProgress, targetY, {
      type: "spring",
      stiffness: 300,
      damping: 30,
    });
  }, [activeIndex, featureCount, yProgress]);

  useMotionValueEvent(scrollY, "change", () => {
    updateActiveIndex();
  });

  useEffect(() => {
    updateActiveIndex();
    const onResize = () => updateActiveIndex();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [updateActiveIndex]);

  return { y };
};

const useProgressBars485 = () => {
  const { scrollY } = useScroll();
  const [progresses, setProgresses] = useState([0, 0, 0]);

  const updateProgresses = useCallback(() => {
    const cards = document.querySelectorAll("[data-card-index]");
    const triggerPoint = window.innerHeight * 0.3;
    const newProgresses = [];

    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const progress = rect.top <= triggerPoint ? 1 : 0;
      newProgresses[index] = progress;
    });

    setProgresses(newProgresses);
  }, []);

  useMotionValueEvent(scrollY, "change", updateProgresses);

  useEffect(() => {
    updateProgresses();

    const handleResize = () => updateProgresses();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateProgresses]);

  const progressMotionValues = progresses.map((progress) => {
    const motionValue = useMotionValue(0);

    useEffect(() => {
      animate(motionValue, progress, {
        type: "spring",
        stiffness: 50,
        damping: 25,
        mass: 1.5,
      });
    }, [progress, motionValue]);

    return useTransform(motionValue, [0, 1], ["0%", "100%"]);
  });

  return progressMotionValues;
};

export function Layout485() {
  const layout485ProgressBars = useProgressBars485();
  const layout485State = useLayout485();
  return (
    <section
      data-layout="layout485"
      className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt"
    >
      <div className="container">
        <div className="relative grid auto-cols-fr grid-cols-1 items-start gap-x-8 gap-y-12 md:grid-cols-[0.75fr_1fr] md:gap-y-16 lg:grid-cols-[max-content_1fr] lg:gap-x-20">
          <div className="static top-[20%] hidden h-56 overflow-hidden md:sticky md:flex md:items-start">
            <p className="text-[6rem] leading-none font-bold md:text-[14rem]">
              0
            </p>
            <motion.div className="text-center" style={{ y: layout485State.y }}>
              <p className="text-[6rem] leading-none font-bold md:text-[14rem]">
                1
              </p>
              <p className="text-[6rem] leading-none font-bold md:text-[14rem]">
                2
              </p>
              <p className="text-[6rem] leading-none font-bold md:text-[14rem]">
                3
              </p>
            </motion.div>
          </div>
          <div className="grid auto-cols-fr grid-cols-1 gap-x-12 gap-y-12 md:gap-x-28 md:gap-y-28">
            <div
              data-card-index={0}
              className="flex flex-col items-start justify-center py-8 md:py-0"
            >
              <div className="mt-10 flex text-[6rem] leading-none font-bold md:mt-0 md:hidden md:text-[14rem]">
                01
              </div>
              <div className="mt-8 mb-8 h-0.5 w-full bg-neutral-lighter md:mt-0">
                <motion.div
                  className="h-0.5 bg-scheme-text"
                  style={{ width: layout485ProgressBars[0] }}
                  initial={{ width: "0%" }}
                />
              </div>
              <p className="mb-3 font-semibold md:mb-4">Process</p>
              <h2 className="mb-5 text-h2 font-bold md:mb-6">
                Increased Productivity & Profitability
              </h2>
              <p className="text-medium">
                Automate repetitive tasks and free your team to focus on
                high-value work.
              </p>
            </div>
            <div
              data-card-index={1}
              className="flex flex-col items-start justify-center py-8 md:py-0"
            >
              <div className="mt-10 flex text-[6rem] leading-none font-bold md:mt-0 md:hidden md:text-[14rem]">
                02
              </div>
              <div className="mt-8 mb-8 h-0.5 w-full bg-neutral-lighter md:mt-0">
                <motion.div
                  className="h-0.5 bg-scheme-text"
                  style={{ width: layout485ProgressBars[1] }}
                  initial={{ width: "0%" }}
                />
              </div>
              <p className="mb-3 font-semibold md:mb-4">Integration</p>
              <h2 className="mb-5 text-h2 font-bold md:mb-6">
                A More Efficient & Empowered Workforce
              </h2>
              <p className="text-medium">
                Give your team the tools and training they need to succeed in an
                AI-driven world.
              </p>
            </div>
            <div
              data-card-index={2}
              className="flex flex-col items-start justify-center py-8 md:py-0"
            >
              <div className="mt-10 flex text-[6rem] leading-none font-bold md:mt-0 md:hidden md:text-[14rem]">
                03
              </div>
              <div className="mt-8 mb-8 h-0.5 w-full bg-neutral-lighter md:mt-0">
                <motion.div
                  className="h-0.5 bg-scheme-text"
                  style={{ width: layout485ProgressBars[2] }}
                  initial={{ width: "0%" }}
                />
              </div>
              <p className="mb-3 font-semibold md:mb-4">Growth</p>
              <h2 className="mb-5 text-h2 font-bold md:mb-6">
                Smarter, Faster Decisions
              </h2>
              <p className="text-medium">
                Leverage data and AI-powered insights to make strategic choices
                with confidence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
