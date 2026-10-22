"use client";

import React from "react";

/**
 * Rebuilt to the 2026-09-30 Figma (node 10647:8658, "Group 17").
 *
 * What this section was: a flat green band (`.scheme-green-deep`, white text)
 * built to the 2026-09-08 frame. The new frame drops the band for white and
 * frames the copy in a wall of portraits: sixteen photos in nine columns,
 * with nine pale mint tiles hanging from the top of each column. The copy
 * gains a green "Why Uplift Path" tagline and a two-tone heading, and the body
 * moves from white to `--color-neutral-dark`, which is the frame's `#4c5352`.
 *
 * `.scheme-green-deep` is now unused by any section. It stays in globals.css
 * (`[11]`) rather than being deleted in the same change that stopped using it.
 *
 * The mint tiles are the frame's white-to-`#ceFff5` vertical ramps, delivered
 * as PNGs alongside the photos and drawn as images here -- no CSS gradient is
 * added, so this is not a third exception to the flat-colour rule.
 *
 * Every box below is the frame's own, in 1404x667 px measured from the top
 * left of the portrait wall (frame x=18, y=2058). Each file was delivered at
 * exactly 2x its box with its 12px corners already rounded, so none needs a
 * radius or `object-fit`. The wall is a share of the section width, so it
 * scales with the viewport; the copy is pulled up into its open centre with a
 * negative top margin that is a share of the same width (margin percentages
 * resolve against the containing block's width): the tagline sits 445px down
 * a 667px wall, 222/1404 = 15.81% from its foot. The copy then grows downward
 * into white space, so a wrap can never push it into a photo.
 *
 * Decorative, so `aria-hidden` and no alt text. `lg:` only: below 992px the
 * centre gap is too narrow for the heading. Phones and tablets get eight of
 * the portraits as a grid between the heading and the body instead -- text,
 * media, text, as every section reads on a phone.
 */
const WALL = [
  // Mint tiles, hanging from the top of each column.
  { src: "69", x: 0, y: 13, w: 129, h: 320 },
  { src: "70", x: 147, y: 13, w: 129, h: 214 },
  { src: "44", x: 301, y: 13, w: 129, h: 254 },
  { src: "46", x: 455, y: 13, w: 130, h: 185 },
  { src: "48", x: 640, y: 0, w: 130, h: 150 },
  { src: "50", x: 825, y: 13, w: 130, h: 185 },
  { src: "52", x: 975, y: 13, w: 129, h: 252 },
  { src: "71", x: 1129, y: 13, w: 129, h: 214 },
  { src: "72", x: 1274, y: 13, w: 129, h: 320 },
  // Portraits.
  { src: "57", x: 0, y: 354, w: 130, h: 150 },
  { src: "39", x: 0, y: 517, w: 130, h: 150 },
  { src: "59", x: 146, y: 246, w: 130, h: 150 },
  { src: "58", x: 146, y: 410, w: 130, h: 150 },
  { src: "65", x: 301, y: 281, w: 129, h: 150 },
  { src: "61", x: 455, y: 215, w: 130, h: 150 },
  { src: "62", x: 640, y: 183, w: 130, h: 150 },
  { src: "66", x: 825, y: 215, w: 130, h: 150 },
  { src: "64", x: 975, y: 281, w: 129, h: 150 },
  { src: "68", x: 1124, y: 246, w: 130, h: 150 },
  { src: "60", x: 1124, y: 411, w: 130, h: 149 },
  { src: "67", x: 1274, y: 354, w: 130, h: 149 },
  { src: "63", x: 1274, y: 517, w: 130, h: 150 },
];

// The eight portraits nearest the centre of the wall, for the phone grid.
const GRID = ["61", "62", "66", "65", "64", "58", "60", "59"];

export function Layout183() {
  return (
    // `lg:px-[1.25%]`: the wall spans 1404 of the frame's 1440, i.e. 18px --
    // 1.25% -- short of each edge, so at lg it reaches into the usual 5%
    // gutter. The copy keeps its own container width regardless.
    <section className="overflow-hidden px-[5%] py-16 md:py-24 lg:px-[1.25%] lg:py-28 scheme-light">
      {/* One box for both wall and copy, so the copy's percentage margin
          resolves against the wall's own width. Capped at 108rem so the
          portraits stop growing on very wide screens. */}
      <div className="mx-auto max-w-[108rem]">
        <div
          aria-hidden="true"
          className="pointer-events-none relative hidden aspect-[1404/667] w-full select-none lg:block"
        >
          {WALL.map(({ src, x, y, w, h }) => (
            <img
              key={src}
              src={`/images/about-why-${src}.png`}
              alt=""
              className="absolute"
              style={{
                left: `${(x / 1404) * 100}%`,
                top: `${(y / 667) * 100}%`,
                width: `${(w / 1404) * 100}%`,
                height: `${(h / 667) * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="relative container max-w-lg text-center lg:-mt-[15.81%]">
          {/* 34px SemiBold in the frame; `text-h4` is 36px at lg, the nearest
              step. `#06a785` on white is 3.06:1, which passes as large text
              at this size (24px on phones) but would not for body copy. */}
          <p className="text-h4 font-semibold text-caribbean-green-dark">
            Why Uplift Path
          </p>
          {/* Playfair 700, not the brand's usual 400: the frame sets a real
              700 here, and `font-bold` would resolve through
              `--font-weight-bold`, which is 400 on purpose. The second line
              is the frame's `#939393`, which is not in the palette;
              `--color-neutral` is the nearest token (3.9:1 on white, fine for
              a heading this size). */}
          <h2 className="mt-3 text-balance text-h3 font-[700] md:mt-4">
            Support that understands you.{" "}
            <span className="block text-neutral">
              Care that moves you forward.
            </span>
          </h2>

          <div
            aria-hidden="true"
            className="mt-8 grid grid-cols-4 gap-3 md:mx-auto md:max-w-md lg:hidden"
          >
            {GRID.map((src) => (
              <img
                key={src}
                src={`/images/about-why-${src}.png`}
                alt=""
                className="aspect-[130/150] w-full"
              />
            ))}
          </div>

          {/* SemiBold body, which is the frame's own weight for this block --
              it is a pull-quote of sorts rather than running text.
              Left-aligned below md (2026-09-29): centred, it was nine lines on
              a phone with no fixed edge to return to. */}
          <div className="mt-8 space-y-6 text-left text-medium font-semibold text-neutral-dark md:text-center lg:mt-12">
            <p>
              These values aren’t just words on a page—they’re the foundation
              of everything we do at Uplift Path. They reflect what our
              clients, our team, and our partners have told us matters most.
              They’re backed by research, required by accreditation standards,
              and, most importantly, they’re what truly make a difference in
              people’s lives.
            </p>
            <p>
              When you work with Uplift Path, you can trust that we’ll UPLIFT
              you—through partnership, clarity, compassion, inclusion, hope,
              and whole-person care.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
