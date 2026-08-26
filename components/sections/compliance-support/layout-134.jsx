"use client";

import { Button } from "@/components/ui/button";
import React from "react";

export function Layout134() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-4 btn-dark badge-alt alternate logo-alt">
      <div className="container max-w-lg text-center">
        <p className="mb-3 font-semibold md:mb-4">Compliance Support</p>
        <h2 className="mb-5 text-h2 font-bold md:mb-6">
          Be ready before the audit, not because of it
        </h2>
        <p className="text-medium">
          We hold the CARF Gold Seal ourselves. We have been through this as an
          organisation, not only advised on it.
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
