"use client";

import React from "react";

export function Layout237_1() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      <div className="container">
        <div className="flex flex-col items-center">
          <div className="mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
            <h2 className="mb-5 text-h2 font-bold md:mb-6">
              Our Simple 3-Step Consultation Process
            </h2>
            <p className="text-medium">
              Get started in just three simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 items-start justify-center gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
            <div className="flex w-full flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <img
                  className="size-12 text-scheme-text"
                  src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/refresh.svg"
                />
              </div>
              <h3 className="mb-5 text-h4 font-bold md:mb-6">Submit Request</h3>
              <p>
                The client completes a short form on the website or through
                their organization to get started.
              </p>
            </div>
            <div className="flex w-full flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <img
                  className="size-12 text-scheme-text"
                  src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/communication.svg"
                />
              </div>
              <h3 className="mb-5 text-h4 font-bold md:mb-6">Discovery Call</h3>
              <p>
                The team reviews info and contacts the client to discuss needs.
              </p>
            </div>
            <div className="flex w-full flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <img
                  className="size-12 text-scheme-text"
                  src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/person.svg"
                />
              </div>
              <h3 className="mb-5 text-h4 font-bold md:mb-6">
                Expert Guidance
              </h3>
              <p>
                The client meets with a consultation expert who offers tailored
                business strategies and solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
