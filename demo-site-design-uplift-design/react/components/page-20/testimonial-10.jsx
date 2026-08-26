"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React, { useEffect, useState } from "react";
import { StarFull } from "relume-icons";

const useCarousel = () => {
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleDotClick = (index) => () => {
    if (api) {
      api.scrollTo(index);
    }
  };

  const dotClassName = (index) => {
    return `relative mx-[3px] inline-block size-2 rounded-full ${
      current === index + 1 ? "bg-scheme-text" : "bg-scheme-text/20"
    }`;
  };

  return { api, setApi, current, handleDotClick, dotClassName };
};

export function Testimonial10() {
  const carouselState = useCarousel();
  return (
    <section className="overflow-hidden px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      <div className="container">
        <Carousel
          setApi={carouselState.setApi}
          opts={{ loop: true, align: "start" }}
          className="overflow-hidden"
        >
          <div className="relative pb-12 md:pb-16 lg:px-8">
            <CarouselContent className="ml-0">
              <CarouselItem className="pl-0 md:px-16 lg:px-6">
                <div className="mx-auto flex h-full max-w-lg flex-col items-center justify-center text-center">
                  <div className="mb-6 flex gap-1 md:mb-8">
                    <StarFull className="size-6 text-scheme-text" />
                    <StarFull className="size-6 text-scheme-text" />
                    <StarFull className="size-6 text-scheme-text" />
                    <StarFull className="size-6 text-scheme-text" />
                    <StarFull className="size-6 text-scheme-text" />
                  </div>
                  <h5 className="text-h5 font-bold">
                    "The fog lifted. For the first time in years I could see the
                    next step and the one after that."
                  </h5>
                  <div className="mt-6 flex w-full flex-col items-center gap-3 text-center md:mt-8 md:w-auto md:flex-row md:gap-5 md:text-left">
                    <div className="size-14 min-h-14 min-w-14 overflow-hidden rounded-full">
                      <img
                        src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                        alt="Testimonial avatar 1"
                        className="size-full object-cover"
                      />
                    </div>
                    <div className="mb-4 md:mb-0">
                      <p className="font-semibold">Sarah Mitchell</p>
                      <p>Executive Director, Behavioral Health</p>
                    </div>
                    <div className="hidden w-px self-stretch bg-scheme-border md:block" />
                    <div>
                      <img
                        src="https://imagedelivery.net/RAP5LnVUMDfmG3LRL4kHtw/5c526e84-1a61-41d5-a8fe-b560e3dedd01/2560?exp=1788307200&sig=91bd59ff484d62fa459677d492fac1aa6714c1a9f5672e5252da786a9e5f9ace"
                        alt="Webflow logo 1"
                        className="max-h-12"
                      />
                    </div>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem className="pl-0 md:px-16 lg:px-6">
                <div className="mx-auto flex h-full max-w-lg flex-col items-center justify-center text-center">
                  <div className="mb-6 flex gap-1 md:mb-8">
                    <StarFull className="size-6 text-scheme-text" />
                    <StarFull className="size-6 text-scheme-text" />
                    <StarFull className="size-6 text-scheme-text" />
                    <StarFull className="size-6 text-scheme-text" />
                    <StarFull className="size-6 text-scheme-text" />
                  </div>
                  <h5 className="text-h5 font-bold">
                    "The fog lifted. For the first time in years I could see the
                    next step and the one after that."
                  </h5>
                  <div className="mt-6 flex w-full flex-col items-center gap-3 text-center md:mt-8 md:w-auto md:flex-row md:gap-5 md:text-left">
                    <div className="size-14 min-h-14 min-w-14 overflow-hidden rounded-full">
                      <img
                        src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                        alt="Testimonial avatar 1"
                        className="size-full object-cover"
                      />
                    </div>
                    <div className="mb-4 md:mb-0">
                      <p className="font-semibold">Sarah Mitchell</p>
                      <p>Executive Director, Behavioral Health</p>
                    </div>
                    <div className="hidden w-px self-stretch bg-scheme-border md:block" />
                    <div>
                      <img
                        src="https://imagedelivery.net/RAP5LnVUMDfmG3LRL4kHtw/5c526e84-1a61-41d5-a8fe-b560e3dedd01/2560?exp=1788307200&sig=91bd59ff484d62fa459677d492fac1aa6714c1a9f5672e5252da786a9e5f9ace"
                        alt="Webflow logo 1"
                        className="max-h-12"
                      />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
            <div className="absolute right-0 bottom-0 left-0 z-20 flex h-7 justify-center pt-2.5">
              <button
                onClick={carouselState.handleDotClick(0)}
                className={carouselState.dotClassName(0)}
              />
              <button
                onClick={carouselState.handleDotClick(1)}
                className={carouselState.dotClassName(1)}
              />
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
}
