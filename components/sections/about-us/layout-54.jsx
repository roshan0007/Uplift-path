"use client";

import React from "react";

export function Layout54() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      <div className="container">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-x-12 md:gap-y-8 lg:gap-x-20">
          <h3 className="text-h3 font-bold">
            Where We're Headed — and How We Get There
          </h3>
          <div>
            <p className="mb-6 text-medium md:mb-8">
              Uplift Path exists to move people and organizations forward. Two
              ways in, one goal we're counting toward.
            </p>
            <div className="grid grid-cols-1 gap-6 py-2 lg:grid-cols-2">
              <div className="flex">
                <div className="mr-4 flex-none self-start">
                  <img
                    className="size-8 text-scheme-text"
                    src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/support.svg"
                  />
                </div>
                <div>
                  <h6 className="mb-3 text-h6 font-bold md:mb-4">Our Vision</h6>
                  <p>
                    A future where every life thrives—clear pathways, trusted
                    collaboration, and sustainable support for all.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="mr-4 flex-none self-start">
                  <img
                    className="size-8 text-scheme-text"
                    src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/communities.svg"
                  />
                </div>
                <div>
                  <h6 className="mb-3 text-h6 font-bold md:mb-4">
                    Our Mission
                  </h6>
                  <p>
                    Our mission: uplift 100,000 lives by 2036 through
                    sustainable paths to lasting change.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
