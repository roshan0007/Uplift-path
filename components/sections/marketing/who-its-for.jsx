"use client";

import React from "react";

/**
 * The 2026-09-18 `Marketing Page` design's audience line: a centred h2 over
 * four audiences separated by middots.
 *
 * Built as a real `<ul>` rather than one paragraph of middot-separated text.
 * The frame draws four discrete items and a screen reader should hear four,
 * not one run-on sentence; the middots are restored as decorative `::before`
 * separators via `before:` utilities so the rendered line is the frame's.
 *
 * **The frame's closing sentence is deliberately not built.** It reads "CLIENT
 * TO CONFIRM whether you take non-healthcare clients here — if yes, say so; if
 * no, say that too, it makes the page stronger." That is a note to the client
 * inside the draft, not page copy. Add the answer as a fifth item (or a
 * sentence under the list) once it is confirmed. Same call as the bracket in
 * `first-engagement`.
 */
const AUDIENCES = [
  "Behavioral health providers",
  "Nonprofits and community organizations",
  "Private practices adding a location or service line",
  "Schools and education programs",
];

export function WhoItsFor() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      <div className="container">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="mb-5 text-h2 font-bold md:mb-6">
            Who It&rsquo;s For
          </h2>
          <ul className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-medium">
            {AUDIENCES.map((audience) => (
              <li
                key={audience}
                // The separator is decorative and generated, so it never
                // reaches the accessibility tree and never trails the last
                // item.
                className="before:mr-2 before:content-['·'] first:before:hidden first:before:content-none"
              >
                {audience}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
