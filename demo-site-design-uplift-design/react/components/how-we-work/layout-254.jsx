"use client";

import React from "react";

export function Layout254() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="mb-5 text-h2 font-bold md:mb-6">
              What You'll Experience
            </h2>
            <p className="text-medium">
              At Uplift Path, we believe in uplifting every life through six
              core values that guide everything we do
            </p>
          </div>
        </div>
        <div className="grid place-items-center gap-x-8 gap-y-12 sm:grid-cols-2 md:gap-y-16 lg:grid-cols-[1fr_1.5fr_1fr] lg:gap-x-12">
          <div className="grid w-full grid-cols-1 gap-x-20 gap-y-12 md:gap-y-16">
            <div className="flex flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <img
                  className="size-12 text-scheme-text"
                  src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/share.svg"
                />
              </div>
              <h3 className="mb-3 text-h5 font-bold md:mb-4">
                Psychological Safety
              </h3>
              <p>
                Share ideas. Admit mistakes. Try imperfect solutions. We've got
                you.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <img
                  className="size-12 text-scheme-text"
                  src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/business_center.svg"
                />
              </div>
              <h3 className="mb-3 text-h5 font-bold md:mb-4">
                The people behind it
              </h3>
              <p>
                Our leadership brings decades of hard-won experience from the
                front lines of business and technology.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <img
                  className="size-12 text-scheme-text"
                  src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/menu_open.svg"
                />
              </div>
              <h3 className="mb-3 text-h5 font-bold md:mb-4">Transparency</h3>
              <p>Open goals. Open data. Open decisions.</p>
            </div>
          </div>
          <div className="relative order-last w-full sm:col-span-2 lg:order-none lg:col-span-1">
            <img
              src="https://imagedelivery.net/RAP5LnVUMDfmG3LRL4kHtw/494a4e8f-9fc0-44b6-e878-91c87942e201/2560?exp=1788307200&sig=c50a97995586462c2b83685c1ed90a1d08171efc015cf9b4991882e210908c68"
              alt="Relume placeholder image"
              className="h-auto w-full rounded-image object-cover"
            />
          </div>
          <div className="grid w-full grid-cols-1 gap-x-20 gap-y-12 md:gap-y-16">
            <div className="flex flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <img
                  className="size-12 text-scheme-text"
                  src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/experiment.svg"
                />
              </div>
              <h3 className="mb-3 text-h5 font-bold md:mb-4">Autonomy</h3>
              <p>Make decisions. Own your work. Experiment freely.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <img
                  className="size-12 text-scheme-text"
                  src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/business_center.svg"
                />
              </div>
              <h3 className="mb-3 text-h5 font-bold md:mb-4">
                The people behind it
              </h3>
              <p>
                Our leadership brings decades of hard-won experience from the
                front lines of business and technology.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <img
                  className="size-12 text-scheme-text"
                  src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/self_improvement.svg"
                />
              </div>
              <h3 className="mb-3 text-h5 font-bold md:mb-4">Growth</h3>
              <p>
                Monthly improvement goals. Continuous learning. Progress over
                perfection.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 md:mt-18 lg:mt-20" />
      </div>
    </section>
  );
}
