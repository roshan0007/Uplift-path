"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

export function Layout134() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container max-w-lg text-center">
        <p className="mb-3 font-semibold md:mb-4">Systems & Technology</p>
        <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
          Technology should remove work, not add it
        </h2>
        <p className="md:text-md">
          Technology should remove work, not add it. We map how your
          organisation really operates, then build the systems and automations
          that give your people their time back.
        </p>
        <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
          <Button title="Book a discovery call" variant="secondary">
            Book a discovery call
          </Button>
        </div>
      </div>
    </section>
  );
}
