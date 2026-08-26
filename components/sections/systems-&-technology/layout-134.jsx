"use client";

import { Button } from "@/components/ui/button";
import React from "react";

export function Layout134() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-4 btn-dark badge-alt alternate logo-alt">
      <div className="container max-w-lg text-center">
        <p className="mb-3 font-semibold md:mb-4">Systems & Technology</p>
        <h2 className="mb-5 text-h2 font-bold md:mb-6">
          Technology should remove work, not add it
        </h2>
        <p className="text-medium">
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
