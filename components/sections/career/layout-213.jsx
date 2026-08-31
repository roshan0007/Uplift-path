"use client";

import { Button } from "@/components/ui/button";
import React from "react";

export function Layout213() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-x-20">
          <div className="order-2 md:order-1">
            <img
              src="/images/career-feature-section-0.png"
              className="w-full rounded-image object-cover"
              alt="Relume placeholder image"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="mb-5 text-h2 font-bold md:mb-6">Who we are</h2>
            <p className="text-medium">
              We chose the name "Uplift Path" because our mission is to elevate
              businesses at every stage, every day. The word “uplift” embodies
              progress, innovation, and positive change. We’re dedicated to
              ensuring every Founder, leader, and team can access clear
              strategies and practical solutions—no matter who they are or where
              they operate.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
              <Button asChild title="Apply" variant="secondary">
                <a href="https://openings.upliftpathwellness.com/jobs/Careers" target="_blank" rel="noreferrer">Apply</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
