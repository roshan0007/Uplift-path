"use client";

import { Card } from "@/components/ui/card";
import React from "react";

export function Layout395() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      <div className="container">
        <div className="mx-auto mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
          <h1 className="mb-5 text-h2 font-bold md:mb-6">
            Care built around your life
          </h1>
          <p className="text-medium">
            Professional support that adapts to your schedule and your needs.
          </p>
        </div>
        <div className="grid auto-cols-fr grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
          <Card className="flex flex-col">
            {/* Fixed ratio and object-cover. The three source images have
                different intrinsic ratios, so unconstrained they rendered at
                three different heights and the headings below them started on
                three different baselines. Same treatment as the homepage
                audience cards. */}
            <div className="aspect-[3/2] w-full shrink-0 border-b-2 border-scheme-border">
              <img
                src="/images/for-individual-page-benefits-section-0.jpg"
                alt="A peer coach and a client talking over a video call at home"
                className="size-full object-cover"
              />
            </div>
            {/* Top-aligned, not centred. "Counseling" is one line where the
                other two headings are two, so centring the block dropped it
                ~24px below its neighbours. Aligning to the top puts all three
                headings on one baseline; the descriptions ending at different
                depths is normal and reads fine. */}
            <div className="flex flex-1 flex-col justify-start p-6 md:p-8">
              <div>
                <h2 className="mb-3 text-h4 font-bold md:mb-4">
                  Peer coaching support
                </h2>
                <p>Guidance from someone who has walked a similar path.</p>
              </div>
            </div>
          </Card>
          <Card className="flex flex-col">
            {/* Fixed ratio and object-cover. The three source images have
                different intrinsic ratios, so unconstrained they rendered at
                three different heights and the headings below them started on
                three different baselines. Same treatment as the homepage
                audience cards. */}
            <div className="aspect-[3/2] w-full shrink-0 border-b-2 border-scheme-border">
              <img
                src="/images/for-individual-page-benefits-section-1.png"
                alt="Someone in a therapy session on a tablet, wrapped in a blanket at home"
                className="size-full object-cover"
              />
            </div>
            {/* Top-aligned, not centred. "Counseling" is one line where the
                other two headings are two, so centring the block dropped it
                ~24px below its neighbours. Aligning to the top puts all three
                headings on one baseline; the descriptions ending at different
                depths is normal and reads fine. */}
            <div className="flex flex-1 flex-col justify-start p-6 md:p-8">
              <div>
                <h2 className="mb-3 text-h4 font-bold md:mb-4">
                  Mental health therapy
                </h2>
                <p>
                  Build the skills to navigate life with greater resilience.
                </p>
              </div>
            </div>
          </Card>
          <Card className="flex flex-col">
            {/* Fixed ratio and object-cover. The three source images have
                different intrinsic ratios, so unconstrained they rendered at
                three different heights and the headings below them started on
                three different baselines. Same treatment as the homepage
                audience cards. */}
            <div className="aspect-[3/2] w-full shrink-0 border-b-2 border-scheme-border">
              <img
                src="/images/for-individual-page-benefits-section-2.png"
                alt="Someone in a counseling session on a phone, sitting on their sofa"
                className="size-full object-cover"
              />
            </div>
            {/* Top-aligned, not centred. "Counseling" is one line where the
                other two headings are two, so centring the block dropped it
                ~24px below its neighbours. Aligning to the top puts all three
                headings on one baseline; the descriptions ending at different
                depths is normal and reads fine. */}
            <div className="flex flex-1 flex-col justify-start p-6 md:p-8">
              <div>
                <h2 className="mb-3 text-h4 font-bold md:mb-4">Counseling</h2>
                <p>A steady space to untangle your thoughts and feel heard.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
