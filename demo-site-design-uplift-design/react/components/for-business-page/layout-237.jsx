"use client";

import React from "react";

export function Layout237() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-2 badge-alt">
      <div className="container">
        <div className="flex flex-col items-center">
          <div className="mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
            <p className="mb-3 font-semibold md:mb-4">Operations</p>
            <h2 className="mb-5 text-h2 font-bold md:mb-6">
              Business Consultation That Fuels Your Growth
            </h2>
            <p className="text-medium">
              We help businesses to set clear goals, streamline workflows, and
              stay compliant so your practice can grow while staying true to its
              mission.
            </p>
          </div>
          <div className="grid grid-cols-1 items-start justify-center gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
            <div className="flex w-full flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <img
                  className="size-12 text-scheme-text"
                  src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/handshake.svg"
                />
              </div>
              <h3 className="mb-5 text-h4 font-bold md:mb-6">Expert Advice</h3>
              <p>
                Gain expert advice and proven strategies tailored to business
                objectives.
              </p>
            </div>
            <div className="flex w-full flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <img
                  className="size-12 text-scheme-text"
                  src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/bar_chart.svg"
                />
              </div>
              <h3 className="mb-5 text-h4 font-bold md:mb-6">
                Process To Improve
              </h3>
              <p>
                Streamline processes to improve efficiency and productivity.
              </p>
            </div>
            <div className="flex w-full flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <img
                  className="size-12 text-scheme-text"
                  src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/category_search.svg"
                />
              </div>
              <h3 className="mb-5 text-h4 font-bold md:mb-6">Access Tools</h3>
              <p>
                Access specialized tools, industry trends, and benchmarking
                resources.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
