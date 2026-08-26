"use client";

import React from "react";

export function Layout1() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-2 badge-alt">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">About</p>
            <h1 className="mb-5 text-h2 font-bold md:mb-6">
              Your Partner in Practical AI Implementation
            </h1>
            <p className="text-medium">
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
              src="/images/ai-consultation-about-section.jpg"
              className="w-full rounded-image object-cover"
              alt="Relume placeholder image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
