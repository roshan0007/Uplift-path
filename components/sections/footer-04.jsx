"use client";

import { CarfSeal } from "@/components/brand/carf-seal";
import React from "react";
import { FacebookLogo, LinkedinLogo } from "relume-icons";

export function Footer4() {
  return (
    <footer className="px-[5%] py-12 md:py-18 lg:py-20 scheme-1 badge-alt">
      <div className="container">
        {/* Alignment, not redesign. Three fixes to the top row:

            1. `items-center` on the row, so all three columns share one optical
               centreline instead of the logo block being top-aligned against a
               centred nav.
            2. The track sizing was `0.25fr 1fr 0.25fr`. An fr track still has a
               min-content floor, so the moment the left column's content grew
               past its 25% share it pushed the middle track right and the nav
               stopped being centred - which is the "not visually balanced" bug,
               and it got worse as soon as the CARF lockup went horizontal.
               `1fr auto 1fr` sizes the nav to its content and splits everything
               left over equally between the two sides, so the nav sits on the
               footer's true centreline whatever the outer columns hold.
            3. The CARF lockup was stacked under the logo and dangled, leaving
               a lopsided gap. It now sits beside the logo on one baseline as a
               single lockup, which is also how it reads on the compliance page. */}
        <div className="grid grid-cols-1 items-center justify-items-center gap-x-[4vw] gap-y-10 pb-12 md:pb-18 lg:grid-cols-[1fr_auto_1fr] lg:gap-y-4 lg:pb-20">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-4 lg:justify-self-start">
            <a href="/" className="inline-flex items-center">
              <img
                src="/brand/uplift-path-logo.svg"
                alt="Uplift Path"
                className="h-11 w-auto"
              />
            </a>
            {/* The seal travels with the brand on every page. It is a
                third-party accreditation mark: native 1:1, colours untouched,
                never cropped. */}
            <a
              href="/compliance-support"
              className="inline-flex items-center gap-2"
              title="CARF accredited"
            >
              <CarfSeal className="size-14" />
              <span className="text-small font-semibold">CARF accredited</span>
            </a>
          </div>
          <ul className="grid grid-flow-row grid-cols-1 items-center justify-center justify-items-center gap-6 md:grid-flow-col md:grid-cols-[max-content] md:justify-center">
            <li className="font-semibold">
              <a href="/">Home</a>
            </li>
            <li className="font-semibold">
              <a href="/for-business-page">Services</a>
            </li>
            <li className="font-semibold">
              <a href="/about-us">About</a>
            </li>
            <li className="font-semibold">
              <a href="/contact-us">Contact</a>
            </li>
            <li className="font-semibold">
              <a href="/contact-us">Get started</a>
            </li>
          </ul>
          {/* LinkedIn is the supplied company page. Facebook is still "#":
              no URL for it exists in the repo or the design export, and
              guessing one would point the site at an account we cannot verify.
              Owner to supply it, or say to drop the icon. */}
          <div className="flex items-center justify-center gap-x-4 lg:justify-self-end">
            <a href="#" className="inline-flex" aria-label="Facebook">
              <FacebookLogo className="size-7 text-scheme-text" />
            </a>
            <a
              href="https://www.linkedin.com/in/uptech-support"
              target="_blank"
              rel="noreferrer"
              className="inline-flex"
              aria-label="LinkedIn"
            >
              <LinkedinLogo className="size-7 text-scheme-text" />
            </a>
          </div>
        </div>
        <div className="h-px w-full bg-scheme-border" />
        {/* The export had `flex-col-reverse items-start` here against
            `md:justify-center`, so the bottom bar was left-aligned on mobile and
            centred from 768px up, and the reversal put the copyright line above
            the legal links on mobile only. Centred at every width now, in one
            reading order. */}
        <div className="flex flex-col items-center pt-6 pb-4 text-small md:flex-row md:justify-center md:gap-x-6 md:pt-8 md:pb-0">
          {/* The export puts a <p> and four bare <a> elements directly inside this
              <ul>, which is invalid HTML. The browser's parser rebuilds it, so the
              server markup and the client tree disagree and React throws a
              hydration error on every route (the navbar and footer are site
              chrome). Each item is wrapped in an <li>; Tailwind's preflight
              already strips list styling, so nothing about the layout changes. */}
          <ul className="grid grid-flow-row grid-cols-[max-content] items-center justify-items-center gap-y-4 text-small md:grid-flow-col md:gap-x-6 md:gap-y-0">
            <li>
              <p>© 2026 Uplift Path Inc. All rights reserved.</p>
            </li>
            <li>
              <a href="/accessibility" className="underline">
                Accessibility
              </a>
            </li>
            <li>
              <a href="/terms-of-use" className="underline">
                Terms of service
              </a>
            </li>
            <li>
              <a href="/privacy-policy" className="underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/grievance" className="underline">
                Grievance
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
