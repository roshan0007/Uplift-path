"use client";

import { SymbolIcon } from "@/components/ui/symbol-icon";
import React from "react";

export function Layout237() {
  return (
    // `id` is what the sticky IntakeBar watches to decide when to appear.
    <section id="uplift-outcomes" className="scroll-mt-20 px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      <div className="container">
        <div className="flex flex-col items-center">
          <div className="mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
            {/* Sits directly above the heading and centred on it. Decorative,
                so it carries no alt text — the heading below says the same
                thing in words. */}
            <img
              src="/images/home-changes-hands-flowers.png"
              alt=""
              aria-hidden="true"
              className="mx-auto mb-4 h-auto w-full max-w-[353px] select-none"
            />
            <h2 className="mb-5 text-h2 font-bold md:mb-6">
              What Actually{" "}
              <em className="font-heading-italic">Changes</em>
            </h2>
            <p className="text-medium">
              Strategy, systems and people move together. A plan that never
              reaches the day-to-day isn't a plan.
            </p>
          </div>
          <div className="grid grid-cols-1 items-start justify-center gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
            <div className="flex w-full flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <SymbolIcon
                  name="step"
                  className="size-12 text-caribbean-green-dark"
                />
              </div>
              <h3 className="mb-5 text-h4 font-bold md:mb-6">
                Uplift Strategy
              </h3>
              <p>
                Co-design a clear Pathway Plan with goals, milestones, and
                support for sustainable growth.
              </p>
            </div>
            <div className="flex w-full flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <SymbolIcon
                  name="settings"
                  className="size-12 text-viking-dark"
                />
              </div>
              <h3 className="mb-5 text-h4 font-bold md:mb-6">Uplift Systems</h3>
              <p>
                Build coordinated policies, training, and data to make pathways
                simple and improvable.
              </p>
            </div>
            <div className="flex w-full flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <SymbolIcon
                  name="progress_activity"
                  className="size-12 text-viking-dark"
                />
              </div>
              <h3 className="mb-5 text-h4 font-bold md:mb-6">Uplift Growth</h3>
              <p>
                To impact 100K lives by uplifting the individuals, businesses,
                and communities we serve by 2036.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
