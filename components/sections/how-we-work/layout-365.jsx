"use client";

import { Card } from "@/components/ui/card";
import React from "react";

/**
 * Matched to the 2026-09-08 Figma (node 10214-103297, `Container` 10214:100184).
 *
 * Two changes from the v2 export:
 *
 * 1. The second card is **Kaizen**, not "Clarity". The export shipped this card
 *    as a byte-identical copy of the first one - same "First", same
 *    "Accountability", same sentence, same image - which left the section
 *    promising three pillars and showing two. An earlier pass patched that by
 *    writing a new pillar called "Clarity". The Figma resolves it properly:
 *    the missing pillar is Kaizen, and the copy below is the frame's own.
 *
 * 2. All three illustrations are the frame's. They are line-art, not the
 *    photographs the export used; see the import record for the sources.
 *    `how-we-work-flexibility.png` was re-supplied by the client on
 *    2026-09-10: the cut taken off the reference render had been upscaled to
 *    1216x720 and quantised to a 256-colour palette, which on line art at this
 *    size showed as soft, broken strokes, and its crop clipped the figures'
 *    feet and the ground curve they stand on. The replacement is the original
 *    500x500 RGB asset -- smaller, but sharp at the 604px the card draws it,
 *    and whole.
 *
 * Geometry the frame draws, all of which the classes below reproduce: cards
 * 2px #000a08 on white at r8 (`--radius-card`); the two small cards 640x290
 * split 320/320 between copy and image; the tall card 608x613 with a 608x360
 * image band under 253px of copy. Type is 28/39.2 (`text-h5`) on the small
 * cards and 44/52.8 (`text-h3`) on the tall one, both Playfair 400.
 */
export function Layout365() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      <div className="container">
        <div className="mb-12 md:mb-12 lg:mb-12">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="mb-5 text-h2 font-bold md:mb-6">
              Three simple steps
            </h2>
            <p className="text-medium">
              Our culture is built on three core pillars that guide how we show
              up, how we grow, and how we deliver impact.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:gap-8">
          {/* The frame's two columns are 640 and 608 across the 1280
              container with a 32px gap, not two equal halves - so the small
              cards split 320/320 between copy and image exactly. */}
          <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-[640fr_608fr]">
            <Card className="flex flex-col md:grid md:grid-cols-2">
              <div className="block flex-col justify-center p-6 md:flex">
                <div>
                  <p className="mb-2 font-semibold">First</p>
                  <h3 className="mb-2 text-h5 font-bold">Accountability</h3>
                  <p>
                    Accountability means owning your decisions, focusing on
                    outcomes, sharing honest feedback, and learning from
                    mistakes together.
                  </p>
                </div>
              </div>
              {/* The frame gives the image the card's full 290px height, not a
                  3:2 box - `min-h-0` lets it take the grid row's height on
                  md+, and the aspect ratio only governs the stacked layout. */}
              <div className="aspect-[320/290] min-h-0 md:aspect-auto">
                <img
                  src="/images/how-we-work-accountability.png"
                  alt="Two people holding up a heart cradled in a pair of hands"
                  className="size-full object-cover"
                />
              </div>
            </Card>
            <Card className="flex flex-col md:grid md:grid-cols-2">
              <div className="block flex-col justify-center p-6 md:flex">
                <div>
                  <p className="mb-2 font-semibold">Second</p>
                  <h3 className="mb-2 text-h5 font-bold">Kaizen</h3>
                  <p>
                    Kaizen making small, ongoing improvements, welcoming
                    suggestions from everyone, and learning through
                    experimentation to drive real innovation.
                  </p>
                </div>
              </div>
              <div className="aspect-[320/290] min-h-0 md:aspect-auto">
                <img
                  src="/images/how-we-work-kaizen.png"
                  alt="A group of people turning the gears of a globe together"
                  className="size-full object-cover"
                />
              </div>
            </Card>
            <Card className="flex flex-col items-stretch lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-3">
              <div className="block flex-1 flex-col items-stretch justify-center p-6 md:flex md:p-8 lg:p-12">
                <div>
                  <p className="mb-2 font-semibold">Third</p>
                  <h3 className="mb-5 text-h3 font-bold md:mb-6">
                    Flexibility
                  </h3>
                  <p>
                    Flexibility means meeting real needs, supporting life and
                    work, and fostering safety to speak up, adapt, and try new
                    ideas.
                  </p>
                </div>
              </div>
              {/* 608x360 in the frame. */}
              <div className="aspect-[608/360] min-h-0">
                <img
                  src="/images/how-we-work-flexibility.png"
                  alt="A row of people presenting plans, artwork and ideas to one another"
                  className="size-full object-cover object-bottom"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
