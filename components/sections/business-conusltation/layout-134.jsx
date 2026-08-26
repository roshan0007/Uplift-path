"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { ChevronRight } from "relume-icons";

export function Layout134() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-4 btn-dark badge-alt alternate logo-alt">
      <div className="container max-w-lg text-center">
        <p className="mb-3 font-semibold md:mb-4">Consulting</p>
        <h2 className="mb-5 text-h2 font-bold md:mb-6">
          Consulting services for business growth
        </h2>
        <p className="text-medium">
          Expert guidance for founders and leaders. Transform challenges into
          opportunities with focused business consulting.
        </p>
        <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
          <Button title="Get started" variant="secondary">
            Get started
          </Button>
          <Button
            title="Learn more"
            variant="link"
            size="link"
            iconRight={<ChevronRight className="text-scheme-text" />}
          >
            Learn more
          </Button>
        </div>
      </div>
    </section>
  );
}
