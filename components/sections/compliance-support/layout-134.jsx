"use client";

import { Button } from "@/components/ui/button";
import React from "react";

export function Layout134() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      <div className="container max-w-lg text-center">
        <img
          src="/brand/CARF.webp"
          alt="CARF accredited — Aspire to Excellence seal"
          width={900}
          height={900}
          className="mx-auto mb-5 size-24 md:mb-6"
        />
        <p className="mb-3 font-semibold md:mb-4">Compliance Support</p>
        <h2 className="mb-5 text-h2 font-bold md:mb-6">
          Be ready before the audit, not because of it
        </h2>
        <p className="text-medium">
          We hold the CARF Gold Seal ourselves. We have been through this as an
          organisation, not only advised on it.
        </p>
        <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
          <Button asChild title="Book a discovery call" variant="secondary">
            <a href="/contact-us">Book a discovery call</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
