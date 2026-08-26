"use client";

import React from "react";

export function Layout419() {
  return (
    <section className="pt-24 md:pt-0 scheme-1 badge-alt">
      <div className="grid grid-cols-1 gap-y-16 md:grid-cols-2 md:gap-y-0">
        <div>
          <div className="md:sticky md:top-0 md:gap-y-0">
            <div className="flex flex-col items-end md:h-screen md:justify-center">
              <div className="mx-[5%] max-w-md md:mr-12 md:ml-[5vw] lg:mr-20">
                <h2 className="mb-5 text-h2 font-bold md:mb-6">
                  Empowering Success Across Industries
                </h2>
                <p className="text-medium">
                  We co-create clear, sustainable pathways so progress is
                  understandable, supported, and measurable across Industries.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="sticky top-0 flex h-screen flex-col justify-center border-t border-t-scheme-border bg-scheme-foreground px-[5%] py-10 md:px-10">
            <div className="max-w-md">
              <div className="mb-6 md:mb-8">
                <img
                  src="/images/for-business-page-feature-section-0.jpg"
                  alt="Relume placeholder image 1"
                  className="size-full rounded-image object-cover"
                />
              </div>
              <h3 className="mb-3 text-h5 font-bold md:mb-4">
                Behavioral Health Consulting
              </h3>
              <p>
                Strategic consultation for behavioral health organizations to
                improve care quality, operational efficiency, and compliance. We
                help practices develop sustainable business models, optimize
                team processes, and navigate industry changes.
              </p>
            </div>
          </div>
          <div className="sticky top-0 flex h-screen flex-col justify-center border-t border-t-scheme-border bg-scheme-foreground px-[5%] py-10 md:px-10">
            <div className="max-w-md">
              <div className="mb-6 md:mb-8">
                <img
                  src="/images/for-business-page-feature-section-1.png"
                  alt="Relume placeholder image 2"
                  className="size-full rounded-image object-cover"
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
          </div>
          <div className="sticky top-0 flex h-screen flex-col justify-center border-t border-t-scheme-border bg-scheme-foreground px-[5%] py-10 md:px-10">
            <div className="max-w-md">
              <div className="mb-6 md:mb-8">
                <img
                  src="/images/for-business-page-feature-section-2.jpg"
                  alt="Relume placeholder image 3"
                  className="size-full rounded-image object-cover"
                />
              </div>
              <h3 className="mb-3 text-h5 font-bold md:mb-4">
                Startups & Entrepreneurs
              </h3>
              <p>
                Startup coaching to address business model challenges, tailor
                solutions for market positioning, and connect Founders with
                relevant networks to accelerate growth.
              </p>
            </div>
          </div>
          <div className="sticky top-0 flex h-screen flex-col justify-center border-t border-t-scheme-border bg-scheme-foreground px-[5%] py-10 md:px-10">
            <div className="max-w-md">
              <div className="mb-6 md:mb-8">
                <img
                  src="/images/for-business-page-feature-section-3.jpg"
                  alt="Relume placeholder image 4"
                  className="size-full rounded-image object-cover"
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
