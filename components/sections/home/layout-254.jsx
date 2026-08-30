"use client";

import React from "react";

export function Layout254() {
  return (
    <section className="px-[5%] py-16 md:py-20 lg:py-20 scheme-1 badge-alt">
      <div className="container">
        <div className="mb-12 md:mb-14 lg:mb-14">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="mb-5 text-h2 font-bold md:mb-6">
              Empowering Success Across Industries
            </h2>
            <p className="text-medium">
              We work across behavioral health, startups, education and
              nonprofits, and the approach adapts to what each sector has to
              answer for.
            </p>
          </div>
        </div>
        <div className="grid place-items-center gap-x-8 gap-y-12 sm:grid-cols-2 md:gap-y-16 lg:grid-cols-[1fr_1.5fr_1fr] lg:gap-x-12">
          <div className="grid w-full grid-cols-1 gap-x-20 gap-y-10 md:gap-y-12">
            <div className="flex flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <img
                  className="size-12 text-scheme-text"
                  src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/psychology_alt.svg"
                />
              </div>
              <h3 className="mb-3 text-h5 font-bold md:mb-4">
                Behavioral Health Consulting
              </h3>
              <p>
                Strategic consulting for behavioral health: improving care,
                efficiency, and compliance. We build sustainable models,
                optimize teams, and navigate change.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <img
                  className="size-12 text-scheme-text"
                  src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/work.svg"
                />
              </div>
              <h3 className="mb-3 text-h5 font-bold md:mb-4">
                Startups & Entrepreneurs
              </h3>
              <p>
                Startup coaching to tackle business model challenges, refine
                market positioning, and connect Founders with key networks for
                growth.
              </p>
            </div>
          </div>
          <div className="relative order-last w-full sm:col-span-2 lg:order-none lg:col-span-1">
            <img
              src="/images/home-benefits-section.png"
              alt="Relume placeholder image"
              className="h-auto w-full rounded-image object-cover"
            />
          </div>
          <div className="grid w-full grid-cols-1 gap-x-20 gap-y-10 md:gap-y-12">
            <div className="flex flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <img
                  className="size-12 text-scheme-text"
                  src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/edit.svg"
                />
              </div>
              <h3 className="mb-3 text-h5 font-bold md:mb-4">
                Educational Institutions
              </h3>
              <p>
                Strategic advisory for education leaders to enhance operational
                performance, boost faculty engagement, and achieve academic
                excellence.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <img
                  className="size-12 text-scheme-text"
                  src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/partner_reports.svg"
                />
              </div>
              <h3 className="mb-3 text-h5 font-bold md:mb-4">
                Nonprofit Organizations
              </h3>
              <p>
                Expert guidance to help nonprofits clarify their mission,
                develop sustainable funding models, and maximize their community
                impact through targeted advisory.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
