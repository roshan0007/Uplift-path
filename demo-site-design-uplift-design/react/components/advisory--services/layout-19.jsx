"use client";

import React from "react";

export function Layout19() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-2 badge-alt">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">Truth</p>
            <h2 className="mb-5 text-h2 font-bold md:mb-6">
              The problem we solve
            </h2>
            <p className="mb-5 text-medium md:mb-6">
              You know where you want the organisation to go. What you do not
              have is the time to design the route, the structure to support it,
              or an honest read on what is holding you back. So decisions get
              made reactively. Good people work hard on the wrong priorities.
              Growth arrives before the operational foundation is ready to carry
              it — and that is when quality slips.
            </p>
            <ul className="my-4 list-disc pl-5">
              <li className="my-1 self-start pl-2">
                <p>
                  Behavioral health providers building or refining service lines
                </p>
              </li>
              <li className="my-1 self-start pl-2">
                <p>
                  Founders and early-stage teams moving from idea to operating
                  business
                </p>
              </li>
              <li className="my-1 self-start pl-2">
                <p>Nonprofits balancing mission, funding and capacity</p>
              </li>
              <li className="my-1 self-start pl-2">
                <p>Educational institutions developing new programmes</p>
              </li>
              <li className="my-1 self-start pl-2">
                <p>
                  Established organisations preparing to scale into new sites,
                  counties or states
                </p>
              </li>
            </ul>
          </div>
          <div>
            <img
              src="https://imagedelivery.net/RAP5LnVUMDfmG3LRL4kHtw/7360c627-99d5-41fd-2efb-a70e9eb5ba01/2560?exp=1788307200&sig=236128537ab3331f10d732b69716f2c4f407f641590fe8708052061f326bd3a8"
              className="w-full rounded-image object-cover"
              alt="Relume placeholder image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
