"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React from "react";
import { ChevronRight } from "relume-icons";

export function Layout395() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      <div className="container">
        <div className="mx-auto mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
          <h1 className="mb-5 text-h2 font-bold md:mb-6">
            Business consultation that fuels your growth
          </h1>
          <p className="text-medium">
            We help businesses set clear goals, streamline workflows, and stay
            compliant so your practice can grow while staying true to its
            mission.
          </p>
        </div>
        <div className="grid auto-cols-fr grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
          <Card className="flex flex-col">
            <div className="flex w-full flex-col items-center justify-center self-start">
              <img
                src="/images/business-conusltation-features-list-section-0.png"
                alt="Relume placeholder image 1"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
              <div>
                <p className="mb-2 font-semibold">Strategy</p>
                <h2 className="mb-3 text-h4 font-bold md:mb-4">
                  Expert advice tailored to your objectives
                </h2>
                <p>
                  Gain expert advice and proven strategies tailored to your
                  business objectives.
                </p>
              </div>
              <div className="mt-5 md:mt-6">
                <Button
                  title="Learn more"
                  variant="link"
                  size="link"
                  iconRight={<ChevronRight className="text-scheme-text" />}
                >
                  Learn more
                </Button>
              </div>
            </div>
          </Card>
          <Card className="flex flex-col">
            <div className="flex w-full flex-col items-center justify-center self-start">
              <img
                src="/images/business-conusltation-features-list-section-1.png"
                alt="Relume placeholder image 1"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
              <div>
                <p className="mb-2 font-semibold">Efficiency</p>
                <h2 className="mb-3 text-h4 font-bold md:mb-4">
                  Streamline processes to boost productivity.
                </h2>
                <p>
                  Streamline processes to improve efficiency and productivity.
                </p>
              </div>
              <div className="mt-5 md:mt-6">
                <Button
                  title="Learn more"
                  variant="link"
                  size="link"
                  iconRight={<ChevronRight className="text-scheme-text" />}
                >
                  Learn more
                </Button>
              </div>
            </div>
          </Card>
          <Card className="flex flex-col">
            <div className="flex w-full flex-col items-center justify-center self-start">
              <img
                src="/images/business-conusltation-features-list-section-2.png"
                alt="Relume placeholder image 1"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
              <div>
                <p className="mb-2 font-semibold">Insight</p>
                <h2 className="mb-3 text-h4 font-bold md:mb-4">
                  Access tools, trends, and benchmarks.
                </h2>
                <p>
                  Access specialised tools, industry trends, and benchmarking
                  resources.
                </p>
              </div>
              <div className="mt-5 md:mt-6">
                <Button
                  title="Learn more"
                  variant="link"
                  size="link"
                  iconRight={<ChevronRight className="text-scheme-text" />}
                >
                  Learn more
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
