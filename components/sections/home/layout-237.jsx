"use client";

import React from "react";

export function Layout237() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      <div className="container">
        <div className="flex flex-col items-center">
          <div className="mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
            <h2 className="mb-5 text-h2 font-bold md:mb-6">
              Uplift Outcomes Across Your Organization
            </h2>
            <p className="text-medium">
              Strategy, systems and growth work as one set of practices, so change
              reaches the programs, the processes, and the people behind them.
            </p>
          </div>
          <div className="grid grid-cols-1 items-start justify-center gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
            <div className="flex w-full flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <img
                  className="size-12 text-scheme-text"
                  src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/step.svg"
                />
              </div>
              <h3 className="mb-5 text-h4 font-bold md:mb-6">
                Uplift Strategy
              </h3>
              <p>
                Co-design a clear Pathway Plan with goals, milestones, and
                support for sustainable growth.
              </p>
            </div>
            <div className="flex w-full flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <img
                  className="size-12 text-scheme-text"
                  src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/settings.svg"
                />
              </div>
              <h3 className="mb-5 text-h4 font-bold md:mb-6">Uplift Systems</h3>
              <p>
                Build coordinated policies, training, and data to make pathways
                simple and improvable.
              </p>
            </div>
            <div className="flex w-full flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <img
                  className="size-12 text-scheme-text"
                  src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/progress_activity.svg"
                />
              </div>
              <h3 className="mb-5 text-h4 font-bold md:mb-6">Uplift Growth</h3>
              <p>
                To impact 100K lives by uplifting the individuals, businesses,
                and communities we serve by 2036.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
