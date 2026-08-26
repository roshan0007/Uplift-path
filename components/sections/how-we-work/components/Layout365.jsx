"use client";

import React from "react";

export function Layout365() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <p className="mb-3 font-semibold md:mb-4">Process</p>
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Three simple steps
            </h2>
            <p className="md:text-md">
              Our culture is built on three core pillars that guide how we show
              up, how we grow, and how we deliver impact.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:gap-8">
          <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
            <div className="flex flex-col border border-border-primary md:grid md:grid-cols-2">
              <div className="block flex-col justify-center p-6 md:flex">
                <div>
                  <p className="mb-2 font-semibold">First</p>
                  <h3 className="mb-2 text-xl font-bold md:text-2xl">
                    Accountability
                  </h3>
                  <p>
                    Accountability means owning your decisions, focusing on
                    outcomes, sharing honest feedback, and learning from
                    mistakes together.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-portrait.svg"
                  alt="Relume placeholder image 1"
                  className="w-full object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col border border-border-primary md:grid md:grid-cols-2">
              <div className="block flex-col justify-center p-6 md:flex">
                <div>
                  <p className="mb-2 font-semibold">First</p>
                  <h3 className="mb-2 text-xl font-bold md:text-2xl">
                    Accountability
                  </h3>
                  <p>
                    Accountability means owning your decisions, focusing on
                    outcomes, sharing honest feedback, and learning from
                    mistakes together.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-portrait.svg"
                  alt="Relume placeholder image 2"
                  className="w-full object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col items-stretch border border-border-primary lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-3">
              <div className="block flex-1 flex-col items-stretch justify-center p-6 md:flex md:p-8 lg:p-12">
                <div>
                  <p className="mb-2 font-semibold">Third</p>
                  <h3 className="mb-5 text-4xl font-bold leading-[1.2] md:mb-6 md:text-5xl lg:text-6xl">
                    Flexibility
                  </h3>
                  <p>
                    Flexibility means meeting real needs, supporting life and
                    work, and fostering safety to speak up, adapt, and try new
                    ideas.
                  </p>
                </div>
              </div>
              <div>
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  alt="Relume placeholder image 3"
                  className="w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
