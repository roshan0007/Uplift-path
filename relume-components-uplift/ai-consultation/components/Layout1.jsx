"use client";

import React from "react";

export function Layout1() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">About</p>
            <h1 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Your Partner in Practical AI Implementation
            </h1>
            <p className="md:text-md">
              Is your business ready to harness the power of artificial
              intelligence but unsure where to start? Many companies struggle to
              move beyond the hype and implement AI in a way that drives
              real-world productivity and profitability. We provide end-to-end
              AI consulting and implementation services designed to make your
              workforce more efficient, productive, and prepared for the future.
            </p>
          </div>
          <div>
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              className="w-full object-cover"
              alt="Relume placeholder image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
