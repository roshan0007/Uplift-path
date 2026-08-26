"use client";

import React from "react";

export function Layout16() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-2 badge-alt">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">What's included</p>
            <h1 className="mb-5 text-h2 font-bold md:mb-6">
              Where are you right now?
            </h1>
            <p className="mb-5 text-medium md:mb-6">
              "We are brand new." Licensure requirements, foundational policies,
              and payer enrolment readiness — built correctly from the start,
              which is far cheaper than retrofitting later.
            </p>
            <ul className="grid grid-cols-1 gap-4 py-2">
              <li className="flex self-start">
                <div className="mr-4 flex-none self-start">
                  <img
                    className="size-6 text-scheme-text"
                    src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/strategy.svg"
                  />
                </div>
                <span>
                  "We are pursuing accreditation." Gap analysis against your
                  standard, policy build-out, evidence preparation, and a mock
                  survey before the real one.
                </span>
              </li>
              <li className="flex self-start">
                <div className="mr-4 flex-none self-start">
                  <img
                    className="size-6 text-scheme-text"
                    src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/search_insights.svg"
                  />
                </div>
                <span>
                  "Our policies have drifted from what we actually do." Chart
                  audits and policy realignment, so the documented process and
                  the real process are the same thing again — plus a review
                  cycle that keeps them aligned.
                </span>
              </li>
              <li className="flex self-start">
                <div className="mr-4 flex-none self-start">
                  <img
                    className="size-6 text-scheme-text"
                    src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/support.svg"
                  />
                </div>
                <span>
                  "We have findings." A corrective action plan with owners and
                  deadlines, addressed at the root rather than patched. We will
                  be direct with you about what has to change.
                </span>
              </li>
              <li className="flex self-start">
                <div className="mr-4 flex-none self-start">
                  <img
                    className="size-6 text-scheme-text"
                    src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/send.svg"
                  />
                </div>
                <span>
                  "We passed — now we need to stay ready." An internal audit
                  cadence, staff training, and a risk register, owned by your
                  team rather than by us.
                </span>
              </li>
            </ul>
          </div>
          <div>
            <img
              src="https://imagedelivery.net/RAP5LnVUMDfmG3LRL4kHtw/0c04e089-cad6-43fa-798e-4327509a7801/2560?exp=1788307200&sig=188a3e6d43976f2fbddfbc2a1a65144bbb6493ccdf594f06276fe453acebab06"
              className="w-full rounded-image object-cover"
              alt="Relume placeholder image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
