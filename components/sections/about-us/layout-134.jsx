"use client";

import { Button } from "@/components/ui/button";
import React from "react";

export function Layout134() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      <div className="container max-w-lg text-center">
        <p className="mb-3 font-semibold md:mb-4">About</p>
        <h2 className="mb-5 text-h2 font-bold md:mb-6">Uplift Path</h2>
        <p className="text-medium">
          Uplift Path unlocks true growth for Founders, and organizations by
          designing clear, sustainable pathways to progress. Our purpose is to
          uplift every client we serve through trusted collaboration, holistic
          support, and transparent guidance at every stage of business
          development. With a foundation in strategic advisory and disciplined
          business solutions, our team brings cross-industry expertise to help
          businesses reach new milestones and build lasting impact. Success is
          driven by custom strategies, shared decision-making, and measurable
          results tailored for startups and organizations across all sectors.
        </p>
        <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
          <Button title="Get Started" variant="secondary">
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
}
