"use client";

import { Card } from "@/components/ui/card";
import React from "react";

export function Layout395() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-2 badge-alt">
      <div className="container">
        <div className="mx-auto mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
          <h1 className="mb-5 text-h2 font-bold md:mb-6">
            Care built around your life
          </h1>
          <p className="text-medium">
            Professional support that adapts to your schedule and your needs.
          </p>
        </div>
        <div className="grid auto-cols-fr grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
          <Card className="flex flex-col">
            <div className="flex w-full flex-col items-center justify-center self-start">
              <img
                src="https://imagedelivery.net/RAP5LnVUMDfmG3LRL4kHtw/8debe6db-9255-4bae-232f-5af53116b901/2560?exp=1788307200&sig=9db22670570099af8910e877c90d4ce5241cf04d18310639ba3934382178dcd1"
                alt="Relume placeholder image 1"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
              <div>
                <h2 className="mb-3 text-h4 font-bold md:mb-4">
                  Peer coaching support
                </h2>
                <p>Guidance from someone who has walked a similar path.</p>
              </div>
            </div>
          </Card>
          <Card className="flex flex-col">
            <div className="flex w-full flex-col items-center justify-center self-start">
              <img
                src="https://imagedelivery.net/RAP5LnVUMDfmG3LRL4kHtw/2d150a7c-cc4d-47d1-787a-b2578730f501/2560?exp=1788307200&sig=ec17317fc4fd6896b699e54a95aa710bb3c7b604361cdd922648ab54a0258457"
                alt="Relume placeholder image 1"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
              <div>
                <h2 className="mb-3 text-h4 font-bold md:mb-4">
                  Mental health therapy
                </h2>
                <p>
                  Build the skills to navigate life with greater resilience.
                </p>
              </div>
            </div>
          </Card>
          <Card className="flex flex-col">
            <div className="flex w-full flex-col items-center justify-center self-start">
              <img
                src="https://imagedelivery.net/RAP5LnVUMDfmG3LRL4kHtw/06b2cfab-d036-4638-ee58-156332916501/2560?exp=1788307200&sig=83fcafc5bb537060aa34c0bcb8f95f275296b78fbce84a2f9cd7e214c44977cc"
                alt="Relume placeholder image 1"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
              <div>
                <h2 className="mb-3 text-h4 font-bold md:mb-4">Counseling</h2>
                <p>A steady space to untangle your thoughts and feel heard.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
