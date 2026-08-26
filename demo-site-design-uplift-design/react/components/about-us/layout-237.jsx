"use client";

import React from "react";

export function Layout237() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      <div className="container">
        <div className="flex flex-col items-center">
          <div className="mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
            <h2 className="mb-5 text-h2 font-bold md:mb-6">Our Core Values</h2>
            <p className="text-medium">
              Our leadership brings decades of hard-won experience from the
              front lines of social work, education, and clinical practice. They
              guide our mission with steady hands and clear eyes.
            </p>
          </div>
          <div className="grid grid-cols-1 items-start justify-center gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
            <div className="flex w-full flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <img
                  className="size-12 text-scheme-text"
                  src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/diversity_2.svg"
                />
              </div>
              <h3 className="mb-5 text-h4 font-bold md:mb-6">
                Unity Through Collaboration
              </h3>
              <p>Partnership where everyone rises together.</p>
            </div>
            <div className="flex w-full flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <img
                  className="size-12 text-scheme-text"
                  src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/map.svg"
                />
              </div>
              <h3 className="mb-5 text-h4 font-bold md:mb-6">
                Pathways with Clarity
              </h3>
              <p>Clear, transparent routes to meaningful progress.</p>
            </div>
            <div className="flex w-full flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <img
                  className="size-12 text-scheme-text"
                  src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/leaderboard.svg"
                />
              </div>
              <h3 className="mb-5 text-h4 font-bold md:mb-6">
                Lead with Compassion
              </h3>
              <p>Empathy and person-centered care in every interaction.</p>
            </div>
            <div className="flex w-full flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <img
                  className="size-12 text-scheme-text"
                  src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/all_inclusive.svg"
                />
              </div>
              <h3 className="mb-5 text-h4 font-bold md:mb-6">
                Inclusion for All
              </h3>
              <p>Cultural humility and equity for marginalized populations.</p>
            </div>
            <div className="flex w-full flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <img
                  className="size-12 text-scheme-text"
                  src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/support.svg"
                />
              </div>
              <h3 className="mb-5 text-h4 font-bold md:mb-6">Foster Hope</h3>
              <p>
                Unlock true potential through strength-based, holistic support.
              </p>
            </div>
            <div className="flex w-full flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <img
                  className="size-12 text-scheme-text"
                  src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/security.svg"
                />
              </div>
              <h3 className="mb-5 text-h4 font-bold md:mb-6">
                Total Person Care
              </h3>
              <p>Holistic support addressing all dimensions of wellness.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
