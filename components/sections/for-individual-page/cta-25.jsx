"use client";

import { GetStartedButton } from "@/components/intake/get-started-button";
import React from "react";

export function Cta25() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-2 btn-dark badge-alt">
      <div className="container max-w-lg text-center">
        <h2 className="mb-5 text-h2 font-bold md:mb-6">
          Ready to unlock Your growth plan
        </h2>
        <p className="text-medium">
          Book your discovery call for personalized, actionable strategies
          tailored to your goals.
        </p>
        <div className="mt-6 flex items-center justify-center gap-4 md:mt-8">
          {/* Opens the intake Application modal (step 1). The default variant
              is correct here: this banner carries .btn-dark, which makes the
              button black with a white label on the green fill. */}
          <GetStartedButton label="Get Started" variant="default" />
        </div>
      </div>
    </section>
  );
}
