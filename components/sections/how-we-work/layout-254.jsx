"use client";

import React from "react";

export function Layout254() {
  return (
    <section className="px-[5%] py-16 md:py-18 lg:py-18 scheme-1 badge-alt">
      <div className="container">
        <div className="mb-12 md:mb-12 lg:mb-12">
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
          <div className="grid w-full grid-cols-1 gap-x-20 gap-y-8 md:gap-y-8">
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
                Decades of frontline business and tech experience guide our
                leadership.
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
              <p>
                Open goals, open data, and open decisions—transparency drives
                every step forward.
              </p>
            </div>
          </div>
          <div className="relative order-last w-full sm:col-span-2 lg:order-none lg:col-span-1">
            <img
              src="/images/how-we-work-team-section-new.png"
              alt="Relume placeholder image"
              className="h-auto w-full rounded-image object-cover"
            />
          </div>
          <div className="grid w-full grid-cols-1 gap-x-20 gap-y-8 md:gap-y-8">
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
                Our leadership brings decades of frontline business and tech
                experience.
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
      </div>
    </section>
  );
}
