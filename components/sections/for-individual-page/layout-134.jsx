"use client";

import { Button } from "@/components/ui/button";
import React from "react";

export function Layout134() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-4 btn-dark badge-alt alternate logo-alt">
      <div className="container max-w-lg text-center">
        <p className="mb-3 font-semibold md:mb-4">Ohio Residents:</p>
        <h2 className="mb-5 text-h2 font-bold md:mb-6">
          Individualized Support for Ohio Adults
        </h2>
        <p className="text-medium">
          Get no-cost Personalized Supportive Services from a dedicated Uplift
          Peer Coach to help you move toward your goals. Available for adults
          18+ with active Ohio Medicaid.
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
