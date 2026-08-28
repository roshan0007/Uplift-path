"use client";

import { Button } from "@/components/ui/button";
import React from "react";

export function Layout134() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      <div className="container max-w-lg text-center">
        <p className="mb-3 font-semibold md:mb-4">Careers</p>
        <h2 className="mb-5 text-h2 font-bold md:mb-6">
          Thrive and grow along your unique uplift path.
        </h2>
        <p className="text-medium">
          Join a team designing strategies that create measurable, lasting
          business results.
        </p>
        <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
          <Button title="Explore Opportunities" variant="secondary">
            Explore Opportunities
          </Button>
        </div>
      </div>
    </section>
  );
}
