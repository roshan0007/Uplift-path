"use client";

import React from "react";

export function Layout469() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-x-16">
          <div>
            <p className="mb-3 font-semibold md:mb-4">Operations</p>
            <h2 className="mb-5 text-h2 font-bold md:mb-6">
              Growth Acceleration
            </h2>
            <p className="text-medium">
              Discover how we navigate strategic growth with purpose, clear
              strategy, and shared vision. Join us in fostering a culture that
              values self-starters, autonomy, and the confidence to adapt and
              overcome challenges. At Uplift Path, we're not just expanding;
              we're building a future where business transformation and impact
              remain at the heart of everything we do. Explore what working in a
              high-growth consulting environment looks like, and see why being a
              builder and problem solver is the key to thriving here.
            </p>
          </div>
          <div className="relative flex">
            <div className="absolute top-[10%] left-0 w-1/2">
              <img
                src="/images/career-feature-section-2.png"
                className="aspect-square size-full rounded-image object-cover"
                alt="Relume placeholder image 1"
              />
            </div>
            <div className="ml-[30%]">
              <img
                src="/images/career-feature-section-3.jpg"
                className="aspect-[2/3] size-full rounded-image object-cover"
                alt="Relume placeholder image 2"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
