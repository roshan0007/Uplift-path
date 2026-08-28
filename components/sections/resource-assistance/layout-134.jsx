"use client";

import { Button } from "@/components/ui/button";
import React from "react";

export function Layout134() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      <div className="container max-w-lg text-center">
        <p className="mb-3 font-semibold md:mb-4">Resource Assistance</p>
        <h2 className="mb-5 text-h2 font-bold md:mb-6">
          You should not have to fund it, or build it, alone
        </h2>
        <p className="text-medium">
          The funding is available, the right staff are in place, and strong
          partners are ready to collaborate. Our proven expertise connects you
          directly to these vital resources.
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
