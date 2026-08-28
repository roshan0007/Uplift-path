"use client";

import { Button } from "@/components/ui/button";
import React from "react";

export function Header104() {
  return (
    <section className="relative px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      <div className="container max-w-xl overflow-hidden text-center">
        <h1 className="mb-5 text-[1.75rem] leading-[1.2] font-bold sm:text-[2.5rem] md:mb-6 md:text-[3.25rem] lg:text-[5rem]">
          Uplift One Path. Two Ways Forward.
        </h1>
        <p className="text-medium">
          Unlock progress and meaningful growth through clarity, collaboration
          and trusted guidance every step.
        </p>
        <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
          <Button title="Business">Business</Button>
          <Button title="Individual" variant="secondary">
            Individual
          </Button>
        </div>
      </div>
    </section>
  );
}
