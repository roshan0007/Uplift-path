"use client";

import React from "react";

export function Layout442() {
  return (
    <section id="relume" className="relative px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 gap-x-12 gap-y-5 md:grid-cols-2 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold text-text-alternative md:mb-4">
              Promise
            </p>
            <h2 className="text-5xl font-bold text-text-alternative md:text-7xl lg:text-8xl">
              Why Uplift Path
            </h2>
          </div>
          <div className="mx-[7.5%] md:mt-48">
            <p className="text-text-alternative md:text-md">
              These values aren’t just words on a page—they’re the foundation of
              everything we do at Uplift Path. They reflect what our clients,
              our team, and our partners have told us matters most. They’re
              backed by research, required by accreditation standards, and, most
              importantly, they’re what truly make a difference in people’s
              lives. When you work with Uplift Path, you can trust that we’ll
              UPLIFT you—through partnership, clarity, compassion, inclusion,
              hope, and whole-person care.
            </p>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 z-0">
        <img
          src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
          className="size-full object-cover"
          alt="Relume placeholder image"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
    </section>
  );
}
