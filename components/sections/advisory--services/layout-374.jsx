"use client";

import { Card } from "@/components/ui/card";
import React from "react";

export function Layout374() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="mb-5 text-h2 font-bold md:mb-6">What we do</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:gap-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card className="flex flex-col sm:col-span-2 sm:row-span-2">
              <div className="flex flex-1 flex-col justify-center p-6 md:p-8 lg:p-12">
                <div>
                  <p className="mb-2 text-small font-semibold">Clarity</p>
                  <h3 className="mb-5 text-h3 font-bold md:mb-6">
                    Program Development
                  </h3>
                  <p>
                    Design and refine evidence-informed programmes that align
                    with your mission and your payer requirements — service
                    definitions, staffing model, documentation standards, and
                    the outcome measures you will be held to.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="/images/advisory-services-features-list-section-0.jpg"
                  alt="Relume placeholder image 5"
                  className="size-full object-cover"
                />
              </div>
            </Card>
            <Card className="flex flex-col">
              <div className="flex flex-col justify-center p-6">
                <div>
                  <p className="mb-2 text-small font-semibold">Focus</p>
                  <h3 className="mb-2 text-h5 font-bold">
                    Business Structuring
                  </h3>
                  <p>
                    Design operational clarity so the organization runs without
                    depending on any individual.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="/images/advisory-services-features-list-section-1.jpg"
                  alt="Relume placeholder image 1"
                  className="size-full object-cover"
                />
              </div>
            </Card>
            <Card className="flex flex-col">
              <div className="flex flex-col justify-center p-6">
                <div>
                  <p className="mb-2 text-small font-semibold">Focus</p>
                  <h3 className="mb-2 text-h5 font-bold">
                    Business Structuring
                  </h3>
                  <p>
                    Design operational clarity so the organization runs without
                    depending on any individual.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="/images/advisory-services-features-list-section-1.jpg"
                  alt="Relume placeholder image 2"
                  className="size-full object-cover"
                />
              </div>
            </Card>
            <Card className="flex flex-col">
              <div className="flex flex-col justify-center p-6">
                <div>
                  <p className="mb-2 text-small font-semibold">Focus</p>
                  <h3 className="mb-2 text-h5 font-bold">
                    Business Structuring
                  </h3>
                  <p>
                    Design operational clarity so the organization runs without
                    depending on any individual.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="/images/advisory-services-features-list-section-1.jpg"
                  alt="Relume placeholder image 3"
                  className="size-full object-cover"
                />
              </div>
            </Card>
            <Card className="flex flex-col">
              <div className="flex flex-col justify-center p-6">
                <div>
                  <p className="mb-2 text-small font-semibold">Focus</p>
                  <h3 className="mb-2 text-h5 font-bold">
                    Business Structuring
                  </h3>
                  <p>
                    Design operational clarity so the organization runs without
                    depending on any individual.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="/images/advisory-services-features-list-section-1.jpg"
                  alt="Relume placeholder image 4"
                  className="size-full object-cover"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
