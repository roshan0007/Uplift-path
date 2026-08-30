"use client";

import React from "react";
import { DribbbleLogo, LinkedinLogo, XLogo } from "relume-icons";

export function Team6() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      <div className="container">
        <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <h2 className="mb-5 text-h2 font-bold md:mb-6">Our team</h2>
          <p className="text-medium">The people behind the work.</p>
        </div>
        <div className="grid grid-cols-1 items-start justify-center gap-x-8 gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
          <div className="flex flex-col text-center">
            <div className="mb-5 flex flex-col flex-nowrap text-center md:mb-6">
              <div className="mx-auto w-full">
                <img
                  src="/images/about-us-award-logos-list-section-0.jpg"
                  alt="Relume placeholder image 1"
                  className="aspect-[4/3] size-full rounded-image object-cover"
                />
              </div>
            </div>
            <div className="mb-3 md:mb-4">
              <h5 className="text-large font-semibold">Julia Gilliam</h5>
              <h6 className="text-medium">Chief Compliance Officer</h6>
            </div>
            <p>
              Julia is a trauma-informed social worker with 9 years of
              experience in behavioral health, addiction recovery, and mental
              health services. She specializes in mentoring professionals,
              managing recovery programs, and creating supportive environments
              for diverse clients, including survivors of human trafficking and
              K-8 students. Julia is committed to fostering resilience and
              positive change in every community served.
            </p>
            <div className="mt-5 grid grid-flow-col grid-cols-[max-content] gap-3.5 self-center md:mt-6">
              <a href="#">
                <LinkedinLogo className="size-6 text-scheme-text" />
              </a>
              <a href="#">
                <XLogo className="size-6 p-0.5 text-scheme-text" />
              </a>
              <a href="#">
                <DribbbleLogo className="size-6 text-scheme-text" />
              </a>
            </div>
          </div>
          <div className="flex flex-col text-center">
            <div className="mb-5 flex flex-col flex-nowrap text-center md:mb-6">
              <div className="mx-auto w-full">
                <img
                  src="/images/about-us-award-logos-list-section-1.jpg"
                  alt="Relume placeholder image 1"
                  className="aspect-[4/3] size-full rounded-image object-cover"
                />
              </div>
            </div>
            <div className="mb-3 md:mb-4">
              <h5 className="text-large font-semibold">Devyani Balladin</h5>
              <h6 className="text-medium">Chief Operating Officer</h6>
            </div>
            <p>
              Devyani Balladin, COO of Uplift Path Inc., brings 20+ years of
              leadership across business, behavioral health, education, and
              nonprofits. Known for people-centered solutions, she strengthens
              teams, streamlines operations, and drives growth. Her behavioral
              health expertise fosters strategic clarity and sustainable change,
              aligning strategy, culture, and resources for measurable impact.
            </p>
            <div className="mt-5 grid grid-flow-col grid-cols-[max-content] gap-3.5 self-center md:mt-6">
              <a href="#">
                <LinkedinLogo className="size-6 text-scheme-text" />
              </a>
              <a href="#">
                <XLogo className="size-6 p-0.5 text-scheme-text" />
              </a>
              <a href="#">
                <DribbbleLogo className="size-6 text-scheme-text" />
              </a>
            </div>
          </div>
          <div className="flex flex-col text-center">
            <div className="mb-5 flex flex-col flex-nowrap text-center md:mb-6">
              <div className="mx-auto w-full">
                <img
                  src="/images/about-us-award-logos-list-section-2.jpg"
                  alt="Relume placeholder image 1"
                  className="aspect-[4/3] size-full rounded-image object-cover"
                />
              </div>
            </div>
            <div className="mb-3 md:mb-4">
              <h5 className="text-large font-semibold">Martha Matthews</h5>
              <h6 className="text-medium">Chief Risk Officer</h6>
            </div>
            <p>
              Martha brings over 20 years of expertise in enterprise risk
              management and governance, guiding strategic operations for
              financial, healthcare, and other enterprises. A former Board
              member of the National Society of Compliance Professionals and
              recipient of a U.S. Senate Leadership Gavel, her leadership
              strengthens Uplift’s commitment to responsible growth and
              compliant innovation.
            </p>
            <div className="mt-5 grid grid-flow-col grid-cols-[max-content] gap-3.5 self-center md:mt-6">
              <a href="#">
                <LinkedinLogo className="size-6 text-scheme-text" />
              </a>
              <a href="#">
                <XLogo className="size-6 p-0.5 text-scheme-text" />
              </a>
              <a href="#">
                <DribbbleLogo className="size-6 text-scheme-text" />
              </a>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-14 w-full max-w-md text-center md:mt-20 lg:mt-24" />
      </div>
    </section>
  );
}
