"use client";

import React from "react";

/**
 * The 2026-09-18 `Marketing Page` design's audience line: a centred h2 over
 * four audiences separated by middots.
 *
 * Built as a real `<ul>` rather than one paragraph of middot-separated text.
 * The frame draws four discrete items and a screen reader should hear four,
 * not one run-on sentence. The frame's middots were `::before` separators
 * until 2026-09-29; see the note on the list.
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
          {/* One centred line per audience (2026-09-29). The middots are
              gone: the four items total ~1,360px against a 768px list, so it
              wrapped at every width and each wrapped line began with a
              separator that separated nothing. */}
          <ul className="flex flex-col items-center gap-y-1 text-medium">
            {AUDIENCES.map((audience) => (
              <li key={audience}>{audience}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
