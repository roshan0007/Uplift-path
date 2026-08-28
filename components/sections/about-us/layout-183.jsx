"use client";

import React from "react";

export function Layout183() {
  return (
    <section className="relative px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      <div className="relative z-10 container">
        <div className="mx-auto max-w-lg text-center">
          <h3 className="text-h3 font-bold text-white">Why Uplift Path</h3>
          <p className="mt-5 text-medium text-white md:mt-6">
            These values aren’t just words on a page—they’re the foundation of
            everything we do at Uplift Path. They reflect what our clients, our
            team, and our partners have told us matters most. They’re backed by
            research, required by accreditation standards, and, most
            importantly, they’re what truly make a difference in people’s lives.
            When you work with Uplift Path, you can trust that we’ll UPLIFT
            you—through partnership, clarity, compassion, inclusion, hope, and
            whole-person care.
          </p>
        </div>
      </div>
      <div className="absolute inset-0 z-0">
        <video
          className="absolute inset-0 aspect-video size-full object-cover"
          autoPlay={true}
          loop={true}
          muted={true}
        >
          <source
            src="https://d22po4pjz3o32e.cloudfront.net/placeholder-video.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-neutral-darkest/50" />
      </div>
    </section>
  );
}
