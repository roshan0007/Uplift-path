"use client";

import { SymbolIcon } from "@/components/ui/symbol-icon";
import React, { useEffect, useRef } from "react";

/**
 * Updated to the 2026-09-08 Figma (node 10358-8178).
 *
 * The copy and the two list items were already right. What the section was
 * missing is its media: the frame puts a tall video composite in a left column
 * beside the heading, and this section had no imagery at all.
 */
export function Layout54() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-x-20 gap-y-12 lg:grid-cols-[560fr_600fr]">
          <div className="lg:ml-auto lg:w-full">
            <JourneyMontage />
          </div>

          <div>
            <h2 className="text-h3 font-bold">
              Where We're Headed — and How We Get There
            </h2>
            <p className="mt-5 mb-6 text-medium md:mt-6 md:mb-8">
              Uplift Path exists to move people and organizations forward. Two
              ways in, one goal we're counting toward.
            </p>
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
              <div className="flex">
                <div className="mr-4 flex-none self-start">
                  {/* The frame tints both of these Viking dark (#41b19a)
                      rather than leaving them the scheme's text colour. */}
                  <SymbolIcon
                    name="support"
                    className="size-8 text-viking-dark"
                  />
                </div>
                <div>
                  <h3 className="mb-3 text-h6 font-bold md:mb-4">Our Vision</h3>
                  <p>
                    A future where every life thrives—clear pathways, trusted
                    collaboration, and sustainable support for all.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="mr-4 flex-none self-start">
                  <SymbolIcon
                    name="communities"
                    className="size-8 text-viking-dark"
                  />
                </div>
                <div>
                  <h3 className="mb-3 text-h6 font-bold md:mb-4">
                    Our Mission
                  </h3>
                  <p>
                    Our mission: uplift 100,000 lives by 2036 through
                    sustainable paths to lasting change.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * The frame's `Group 5`: a media rect with two 1px outlined rects offset behind
 * it, all three on a 60px corner radius, inside a 513x747 box.
 *
 * Like the homepage montage, the media is a *video* carried as a placed GIF —
 * an `imageRef` that is only a poster frame plus a separate `gifRef`. Source is
 * 800x1422, 174 frames at 10fps (17.4s), 74MB raw; transcoded to 0.69MB WebM
 * and 1.05MB MP4. A driving shot along a mountain road.
 *
 * Unlike the homepage montage this is **not** `rounded-full`. There the radius
 * exceeded half the shorter side and Figma clamped it to a stadium; here 60px
 * against a 372px-wide rect is well under the clamp, so it is a literal radius.
 * Expressed in `cqw` against the composite's own container so it keeps its
 * proportion as the box scales, rather than ballooning at narrow widths.
 *
 * Percentages are the frame's own geometry over the 513x747 group box, so the
 * three rects hold their offsets at every size.
 */
function JourneyMontage() {
  const videoRef = useRef(null);

  // No CSS pauses a video, so the reduced-motion preference is honoured in JS:
  // the poster stays and playback never starts. `autoPlay` stays on the element
  // so the common case needs no JS at all.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (mq.matches) {
        el.pause();
        el.removeAttribute("autoplay");
      } else if (el.paused) {
        el.play().catch(() => {});
      }
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <div className="@container relative mx-auto aspect-[513/747] w-full max-w-[513px] lg:mr-0">
      {/* The two outlines. Decorative, and behind the media. */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 h-[92.91%] w-[73.29%] rounded-[11.70cqw] border border-scheme-border"
      />
      <div
        aria-hidden="true"
        className="absolute top-[6.96%] left-[27.49%] h-[93.04%] w-[72.51%] rounded-[11.70cqw] border border-scheme-border"
      />
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/images/about-vision-road-poster.jpg"
        aria-label="Driving along a highway through forested mountains"
        className="absolute top-[2.41%] left-[6.24%] h-[94.78%] w-[87.52%] rounded-[11.70cqw] object-cover"
      >
        <source src="/videos/about-vision-road.webm" type="video/webm" />
        <source src="/videos/about-vision-road.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
