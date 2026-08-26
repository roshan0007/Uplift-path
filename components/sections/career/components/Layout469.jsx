"use client";

import React from "react";

export function Layout469() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-x-16">
          <div>
            <p className="mb-3 font-semibold md:mb-4">Operations</p>
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Growth Acceleration
            </h2>
            <p className="md:text-md">
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
            <div className="absolute left-0 top-[10%] w-1/2">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-dim.png"
                className="aspect-square size-full object-cover"
                alt="Relume placeholder image 1"
              />
            </div>
            <div className="ml-[30%]">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                className="aspect-[2/3] size-full object-cover"
                alt="Relume placeholder image 2"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
