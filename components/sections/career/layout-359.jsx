"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React from "react";

export function Layout359() {
  return (
    <section className="px-[5%] py-16 md:py-20 lg:py-20 scheme-1 badge-alt">
      <div className="container">
        <div className="mb-12 md:mb-12 lg:mb-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-5 text-h2 font-bold md:mb-6">
              Why Uplift Path — Hear from Our Team
            </h2>
            <p className="text-medium">
              Learn why our team chose Uplift Path and how our mission to
              empower businesses through clarity, strategy, and growth aligns
              with their professional journeys. Join a culture built on
              collaboration, open communication, and innovation—where every
              voice shapes how we deliver impact. At Uplift Path, we’re not just
              a workplace; we’re a community of strategic thinkers, builders,
              and problem-solvers committed to helping organizations and leaders
              thrive.
            </p>
          </div>
        </div>
        <Card className="grid auto-cols-fr grid-cols-1 md:grid-cols-2">
          <div className="flex aspect-[3/2] items-center justify-center">
            <img
              src="/images/career-feature-section-1.png"
              className="size-full object-cover"
              alt="Relume placeholder image"
            />
          </div>
          <div className="flex flex-col justify-center p-6 md:p-8 lg:p-12">
            <div>
              <p className="mb-2 text-small font-semibold">Operations</p>
              <h3 className="mb-5 text-h3 font-bold md:mb-6">
                Manage all support tickets from a single dashboard
              </h3>
              <p>
                We built our internal systems the same way we advise clients.
                Clarity eliminates chaos and a single source of truth keeps the
                team moving forward together.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              {/* Self-link, flagged: no jobs board or ATS URL exists in the
                  repo, so /career is a placeholder destination. */}
              <Button asChild title="Explore opportunities" variant="secondary">
                <a href="/career">Explore opportunities</a>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
