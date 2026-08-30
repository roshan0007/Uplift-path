"use client";

import React from "react";

export function Layout564() {
  return (
    <section className="grid grid-cols-1 items-center gap-y-16 pt-16 md:pt-24 lg:grid-cols-2 lg:pt-0 scheme-1 badge-alt">
      <div className="relative order-last size-full overflow-hidden lg:order-first lg:min-h-[32rem]">
        <img
          src="/images/systems-technology-about-section-new1.png"
          alt="Relume placeholder image"
          className="static size-full object-cover lg:absolute lg:inset-0"
        />
      </div>
      <div className="mx-[5%] sm:max-w-md md:justify-self-start lg:mr-[5vw] lg:ml-20">
        <h1 className="mb-5 text-h2 font-bold md:mb-6">What we do</h1>
        <p className="mb-6 text-medium md:mb-8">
          Map and automate — We document how work really flows, then remove the
          duplicate entry and manual handoffs.
        </p>
        <ul className="my-4 list-disc pl-5">
          <li className="my-1 self-start pl-2">
            <p>
              Select and implement — Independent help choosing your core
              platform. We are not resellers, so the recommendation follows your
              requirements.
            </p>
          </li>
          <li className="my-1 self-start pl-2">
            <p>
              Report and measure — Define the metrics that matter and build the
              dashboard behind them.
            </p>
          </li>
          <li className="my-1 self-start pl-2">
            <p>
              Train and hand over — Implementations fail on adoption, not
              technology. Your team owns it when we step back.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}
