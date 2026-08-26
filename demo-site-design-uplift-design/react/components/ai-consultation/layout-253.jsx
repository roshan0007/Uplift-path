"use client";

import React from "react";

export function Layout253() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      <div className="container">
        <div className="grid auto-cols-fr grid-cols-1 items-start justify-start gap-y-12 md:grid-cols-[0.5fr_1fr] md:gap-x-12 md:gap-y-16 lg:gap-x-20">
          <div>
            <h2 className="mb-5 text-h2 font-bold md:mb-6">
              Our Approch: Your Strategic AI Partner
            </h2>
          </div>
          <div className="grid w-full auto-cols-fr grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:gap-y-16 lg:gap-x-12">
            <div>
              <div className="mb-5 md:mb-6">
                <img
                  className="size-12 text-scheme-text"
                  src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/strategy.svg"
                />
              </div>
              <h1 className="mb-5 text-h4 font-bold md:mb-6">Strategic</h1>
              <p>
                We align every AI initiative with your core business goals to
                ensure a significant return on investment.
              </p>
            </div>
            <div>
              <div className="mb-5 md:mb-6">
                <img
                  className="size-12 text-scheme-text"
                  src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/integration_instructions.svg"
                />
              </div>
              <h1 className="mb-5 text-h4 font-bold md:mb-6">Integrated</h1>
              <p>
                We connect AI tools with your existing workflows to ensure
                seamless operation and user adoption.
              </p>
            </div>
            <div>
              <div className="mb-5 md:mb-6">
                <img
                  className="size-12 text-scheme-text"
                  src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/encrypted_add.svg"
                />
              </div>
              <h1 className="mb-5 text-h4 font-bold md:mb-6">
                Secure & Compliant
              </h1>
              <p>
                We build with a focus on security and governance, setting up AI
                compliance frameworks tailored to your industry's needs
                (including healthcare and other regulated sectors).
              </p>
            </div>
            <div>
              <div className="mb-5 md:mb-6">
                <img
                  className="size-12 text-scheme-text"
                  src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/align_justify_center.svg"
                />
              </div>
              <h1 className="mb-5 text-h4 font-bold md:mb-6">Human-Centered</h1>
              <p>
                We focus on empowering your workforce, ensuring your team can
                adopt and leverage AI to become more efficient and effective.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
