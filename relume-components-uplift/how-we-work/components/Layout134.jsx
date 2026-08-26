"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

export function Layout134() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container max-w-lg text-center">
        <p className="mb-3 font-semibold md:mb-4">Uplift</p>
        <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
          A clear path to better outcomes starts here
        </h2>
        <p className="md:text-md">
          When people rise and step forward with purpose, new pathways open
          before them, allowing meaningful growth and lasting progress to follow
          naturally.
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
