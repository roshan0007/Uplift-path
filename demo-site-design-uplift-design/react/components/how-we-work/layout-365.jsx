"use client";

import { Card } from "@/components/ui/card";
import React from "react";

export function Layout365() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-2 badge-alt">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <p className="mb-3 font-semibold md:mb-4">Process</p>
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
              <div className="flex items-center justify-center">
                <img
                  src="https://imagedelivery.net/RAP5LnVUMDfmG3LRL4kHtw/4dde8512-908a-4936-d76a-18c24deded01/2560?exp=1788307200&sig=9b4bc2a298e9b37a1214da12cd46133f01d32584631da29b6d906208e5a0cdb4"
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
              <div className="flex items-center justify-center">
                <img
                  src="https://imagedelivery.net/RAP5LnVUMDfmG3LRL4kHtw/4dde8512-908a-4936-d76a-18c24deded01/2560?exp=1788307200&sig=9b4bc2a298e9b37a1214da12cd46133f01d32584631da29b6d906208e5a0cdb4"
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
              <div>
                <img
                  src="https://imagedelivery.net/RAP5LnVUMDfmG3LRL4kHtw/6d548587-e6c3-4f19-bc2d-622105274401/2560?exp=1788307200&sig=552ebb4ae47461c43914dc3f2de39d4ad0aa62a13993834dc09f066c46b7f4f3"
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
