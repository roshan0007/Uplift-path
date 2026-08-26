"use client";

import React from "react";

export function Layout22() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Who we are
            </h2>
            <p className="md:text-md">
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
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              className="w-full object-cover"
              alt="Relume placeholder image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
