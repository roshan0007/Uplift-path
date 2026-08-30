"use client";

import React, { Fragment } from "react";

export function Layout615() {
  return (
    <section className="px-[5%] py-16 md:py-20 lg:py-20 scheme-1 badge-alt">
      <div className="container">
        <div className="mb-12 max-w-lg md:mb-12 lg:mb-12">
          <h2 className="mb-5 text-h2 font-bold md:mb-6">Led by</h2>
        </div>
        <div className="grid grid-cols-1 border-t border-scheme-border md:grid-cols-[1fr_auto_1fr] md:gap-8 lg:gap-12">
          <Fragment>
            <div className="border-b border-scheme-border py-6 last:border-b-0 md:border-b-0 md:py-8 lg:py-8">
              <div className="mb-6 w-full overflow-hidden md:mb-8">
                <img
                  src="/images/compliance-support-feature-section-1.jpg"
                  alt="Relume placeholder image"
                  className="aspect-video size-full rounded-image object-cover"
                />
              </div>
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
            <div className="border-b border-scheme-border py-6 last:border-b-0 md:border-b-0 md:py-8 lg:py-8">
              <div className="mb-6 w-full overflow-hidden md:mb-8">
                <img
                  src="/images/compliance-support-feature-section-2.jpg"
                  alt="Relume placeholder image"
                  className="aspect-video size-full rounded-image object-cover"
                />
              </div>
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
      </div>
    </section>
  );
}
