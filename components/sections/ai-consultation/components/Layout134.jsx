"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

export function Layout134() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container max-w-lg text-center">
        <p className="mb-3 font-semibold md:mb-4">AI Consultation</p>
        <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
          Unlock Your Business Potential with AI
        </h2>
        <p className="md:text-md">
          From Complex Technology to Tangible Business Results.
        </p>
        <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
          <Button title="Book your AI strategy session" variant="secondary">
            Book your AI strategy session
          </Button>
        </div>
      </div>
    </section>
  );
}
