"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React from "react";

export function Layout353() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-3 badge-alt alternate logo-alt">
      <div className="container">
        <div className="grid grid-cols-1 items-start gap-y-12 md:grid-flow-row md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
          <div className="static md:sticky md:top-[30%]">
            <h2 className="mb-5 text-h2 font-bold md:mb-6">
              Our business consulting services
            </h2>
            <p className="text-medium">
              Helping you build, structure, and grow your business. We provide
              the map and the compass for your journey.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button title="Explore" variant="secondary">
                Explore
              </Button>
            </div>
          </div>
          <div>
            <Card className="mb-8border-none sticky p-8" style={{ top: "30%" }}>
              <div className="mb-3 md:mb-4">
                <img
                  className="size-12 text-scheme-text"
                  src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/verified.svg"
                />
              </div>
              <h3 className="mb-3 text-h5 font-bold md:mb-4">
                Program development
              </h3>
              <p>
                Design and refine evidence-based programs that align with your
                mission, meet community needs, and drive measurable impact.
              </p>
            </Card>
            <Card className="mb-8border-none sticky p-8" style={{ top: "32%" }}>
              <div className="mb-3 md:mb-4">
                <img
                  className="size-12 text-scheme-text"
                  src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/autorenew.svg"
                />
              </div>
              <h3 className="mb-3 text-h5 font-bold md:mb-4">
                Business structuring
              </h3>
              <p>
                Build a robust operational foundation with workflows, standard
                operating procedures, and compliance frameworks for your
                business.
              </p>
            </Card>
            <Card className="mb-8border-none sticky p-8" style={{ top: "34%" }}>
              <div className="mb-3 md:mb-4">
                <img
                  className="size-12 text-scheme-text"
                  src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/support.svg"
                />
              </div>
              <h3 className="mb-3 text-h5 font-bold md:mb-4">
                Accreditation consulting
              </h3>
              <p>
                Get expert guidance to prepare for and navigate accreditation
                processes, ensuring your organisation meets high industry
                standards.
              </p>
            </Card>
            <Card className="mb-8border-none sticky p-8" style={{ top: "36%" }}>
              <div className="mb-3 md:mb-4">
                <img
                  className="size-12 text-scheme-text"
                  src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/moving.svg"
                />
              </div>
              <h3 className="mb-3 text-h5 font-bold md:mb-4">
                Business growth
              </h3>
              <p>
                Identify opportunities, optimise operations, and implement
                strategies to sustainably scale your services and expand your
                reach.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
