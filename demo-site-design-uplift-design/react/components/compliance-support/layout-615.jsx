"use client";

import React, { Fragment } from "react";

export function Layout615() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      <div className="container">
        <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">Included</p>
          <h2 className="mb-5 text-h2 font-bold md:mb-6">Led by</h2>
        </div>
        <div className="grid grid-cols-1 border-t border-scheme-border md:grid-cols-[1fr_auto_1fr] md:gap-8 lg:gap-12">
          <Fragment>
            <div className="border-b border-scheme-border py-6 last:border-b-0 md:border-b-0 md:py-8 lg:py-12">
              <img
                className="mb-6 w-full overflow-hidden md:mb-8"
                src="https://imagedelivery.net/RAP5LnVUMDfmG3LRL4kHtw/d8b894b1-d585-476a-95cb-195d937bbc01/2560?exp=1788307200&sig=1365aef4144cb3fb3030b6a46f0ba1603a0a8eae5bd4971a39af8808627a003a"
              >
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  alt="Relume placeholder image"
                  className="aspect-video size-full rounded-image object-cover"
                />
              </img>
              <h3 className="mb-5 text-h3 font-bold md:mb-6">
                Julia Gilliam, LSW
              </h3>
              <p>
                Chief Compliance Officer, Clinical. Nine years across behavioral
                health, addiction recovery and mental health services.
              </p>
            </div>
            <div className="hidden h-full w-px bg-scheme-border md:block" />
          </Fragment>
          <Fragment>
            <div className="border-b border-scheme-border py-6 last:border-b-0 md:border-b-0 md:py-8 lg:py-12">
              <img
                className="mb-6 w-full overflow-hidden md:mb-8"
                src="https://imagedelivery.net/RAP5LnVUMDfmG3LRL4kHtw/4643376e-e10e-4f57-ba12-f8df24bc9101/2560?exp=1788307200&sig=938efdd440d68660c93ea2e807ec8f84d937598c511cbf706d97c0b1e545874a"
              >
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  alt="Relume placeholder image"
                  className="aspect-video size-full rounded-image object-cover"
                />
              </img>
              <h3 className="mb-5 text-h3 font-bold md:mb-6">
                Martha Matthews
              </h3>
              <p>
                Chief Risk Officer. 20+ years in enterprise risk across
                healthcare and financial institutions.
              </p>
            </div>
          </Fragment>
        </div>
        <div className="mt-8 flex flex-wrap gap-4 md:mt-10 lg:mt-12" />
      </div>
    </section>
  );
}
