"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

export function Layout359() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="rb-12 mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <p className="mb-3 font-semibold md:mb-4">Careers</p>
            <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Why Uplift Path — Hear from Our Team
            </h2>
            <p className="md:text-md">
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
        <div className="grid auto-cols-fr grid-cols-1 border border-border-primary md:grid-cols-2">
          <div className="flex items-center justify-center">
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              className="size-full object-cover"
              alt="Relume placeholder image"
            />
          </div>
          <div className="flex flex-col justify-center p-6 md:p-8 lg:p-12">
            <div>
              <p className="mb-2 text-sm font-semibold">Operations</p>
              <h3 className="mb-5 text-4xl font-bold leading-[1.2] md:mb-6 md:text-5xl lg:text-6xl">
                Manage all support tickets from a single dashboard
              </h3>
              <p>
                We built our internal systems the same way we advise clients.
                Clarity eliminates chaos and a single source of truth keeps the
                team moving forward together.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button title="Explore opportunities" variant="secondary">
                Explore opportunities
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
