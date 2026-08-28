"use client";

import React from "react";
import { FacebookLogo, LinkedinLogo } from "relume-icons";

export function Footer4() {
  return (
    <footer className="px-[5%] py-12 md:py-18 lg:py-20 scheme-1 badge-alt">
      <div className="container">
        <div className="grid grid-cols-1 items-center justify-center justify-items-center gap-x-[4vw] gap-y-12 pb-12 md:pb-18 lg:grid-cols-[0.25fr_1fr_0.25fr] lg:justify-between lg:gap-y-4 lg:pb-20">
          <a href="#" className="lg:justify-self-start">
            <img
              src="/brand/uplift-path-logo.svg"
              alt="Uplift Path"
              className="inline-block h-8 w-auto"
            />
          </a>
          <ul className="grid grid-flow-row grid-cols-1 items-start justify-center justify-items-center gap-6 md:grid-flow-col md:grid-cols-[max-content] md:justify-center md:justify-items-start">
            <li className="font-semibold">
              <a href="#">Home</a>
            </li>
            <li className="font-semibold">
              <a href="#">Services</a>
            </li>
            <li className="font-semibold">
              <a href="#">About</a>
            </li>
            <li className="font-semibold">
              <a href="#">Contact</a>
            </li>
            <li className="font-semibold">
              <a href="#">Get started</a>
            </li>
          </ul>
          <div className="flex items-start justify-start justify-items-center gap-x-3 lg:justify-self-end">
            <a href="#">
              <FacebookLogo className="size-6 text-scheme-text" />
            </a>
            <a href="#">
              <LinkedinLogo className="size-6 text-scheme-text" />
            </a>
          </div>
        </div>
        <div className="h-px w-full bg-scheme-border" />
        <div className="flex flex-col-reverse items-start pt-6 pb-4 text-small md:flex-row md:items-center md:justify-center md:justify-items-center md:gap-x-6 md:pt-8 md:pb-0">
          {/* The export puts a <p> and four bare <a> elements directly inside this
              <ul>, which is invalid HTML. The browser's parser rebuilds it, so the
              server markup and the client tree disagree and React throws a
              hydration error on every route (the navbar and footer are site
              chrome). Each item is wrapped in an <li>; Tailwind's preflight
              already strips list styling, so nothing about the layout changes. */}
          <ul className="grid grid-flow-row grid-cols-[max-content] items-start gap-y-4 text-small md:grid-flow-col md:gap-x-6 md:gap-y-0">
            <li>
              <p className="mt-4 md:mt-0">
                © 2026 Uplift Path Inc. All rights reserved.
              </p>
            </li>
            <li>
              <a href="#" className="underline">
                Accessibility
              </a>
            </li>
            <li>
              <a href="#" className="underline">
                Terms of service
              </a>
            </li>
            <li>
              <a href="#" className="underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="underline">
                Grievance
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
