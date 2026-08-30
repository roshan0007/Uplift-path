"use client";

import { Button } from "@/components/ui/button";
import React from "react";

export function Cta25() {
  return (
    // `id` is what the sticky IntakeBar watches to know it should get out of
    // the way - two green CTAs stacked reads as a mistake.
    <section id="home-cta" className="scroll-mt-20 px-[5%] py-16 md:py-24 lg:py-28 scheme-2 btn-dark badge-alt">
      <div className="container max-w-lg text-center">
        <h2 className="mb-5 text-h2 font-bold md:mb-6">
          Ready to unlock Your growth plan
        </h2>
        <p className="text-medium">
          Book your discovery call for personalized, actionable strategies
          tailored to your goals.
        </p>
        <div className="mt-6 flex items-center justify-center gap-4 md:mt-8">
          <Button asChild title="Get Started">
            <a href="/contact-us">Get Started</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
