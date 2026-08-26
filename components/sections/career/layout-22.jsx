"use client";

import React from "react";

export function Layout22() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-2 badge-alt">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <h2 className="mb-5 text-h2 font-bold md:mb-6">Who we are</h2>
            <p className="text-medium">
              We chose the name "Uplift Path" because our mission is to elevate
              businesses at every stage, every day. The word “uplift” embodies
              progress, innovation, and positive change. We’re dedicated to
              ensuring every Founder, leader, and team can access clear
              strategies and practical solutions—no matter who they are or where
              they operate.
            </p>
          </div>
          <div>
            <img
              src="/images/career-feature-section-0.png"
              className="w-full rounded-image object-cover"
              alt="Relume placeholder image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
