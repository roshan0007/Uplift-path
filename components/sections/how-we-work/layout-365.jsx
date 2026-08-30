"use client";

import { Card } from "@/components/ui/card";
import React from "react";

export function Layout365() {
  return (
    <section className="px-[5%] py-16 md:py-20 lg:py-20 scheme-1 badge-alt">
      <div className="container">
        <div className="mb-12 md:mb-12 lg:mb-12">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="mb-5 text-h2 font-bold md:mb-6">
              Three simple steps
            </h2>
            <p className="text-medium">
              Our culture is built on three core pillars that guide how we show
              up, how we grow, and how we deliver impact.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:gap-8">
          <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
            <Card className="flex flex-col md:grid md:grid-cols-2">
              <div className="block flex-col justify-center p-6 md:flex">
                <div>
                  <p className="mb-2 font-semibold">First</p>
                  <h3 className="mb-2 text-h5 font-bold">Accountability</h3>
                  <p>
                    Accountability means owning your decisions, focusing on
                    outcomes, sharing honest feedback, and learning from
                    mistakes together.
                  </p>
                </div>
              </div>
              <div className="flex aspect-[3/2] items-center justify-center">
                <img
                  src="/images/how-we-work-how-it-works-section-new-0.png"
                  alt="Relume placeholder image 1"
                  className="size-full object-cover"
                />
              </div>
            </Card>
            <Card className="flex flex-col md:grid md:grid-cols-2">
              <div className="block flex-col justify-center p-6 md:flex">
                <div>
                  <p className="mb-2 font-semibold">First</p>
                  <h3 className="mb-2 text-h5 font-bold">Accountability</h3>
                  <p>
                    Accountability means owning your decisions, focusing on
                    outcomes, sharing honest feedback, and learning from
                    mistakes together.
                  </p>
                </div>
              </div>
              <div className="flex aspect-[3/2] items-center justify-center">
                <img
                  src="/images/how-we-work-how-it-works-section-new-0.png"
                  alt="Relume placeholder image 2"
                  className="size-full object-cover"
                />
              </div>
            </Card>
            <Card className="flex flex-col items-stretch lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-3">
              <div className="block flex-1 flex-col items-stretch justify-center p-6 md:flex md:p-8 lg:p-12">
                <div>
                  <p className="mb-2 font-semibold">Third</p>
                  <h3 className="mb-5 text-h3 font-bold md:mb-6">
                    Flexibility
                  </h3>
                  <p>
                    Flexibility means meeting real needs, supporting life and
                    work, and fostering safety to speak up, adapt, and try new
                    ideas.
                  </p>
                </div>
              </div>
              <div className="aspect-[2/1] min-h-0">
                <img
                  src="/images/how-we-work-how-it-works-section-new-2.png"
                  alt="Relume placeholder image 3"
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
