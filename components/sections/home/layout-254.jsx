"use client";

import { SymbolIcon } from "@/components/ui/symbol-icon";
import React, { useEffect, useRef } from "react";

export function Layout254() {
  return (
    <section className="px-[5%] py-16 md:py-18 lg:py-18 scheme-1 badge-alt">
      <div className="container">
        <div className="mb-12 md:mb-12 lg:mb-12">
          <div className="mx-auto max-w-lg text-center">
            {/* The v3 Figma drops the starburst cluster that used to sit
                above this heading; the section now opens on the heading
                itself. `home-audience-starburst.png` is unreferenced. */}
            <h2 className="mb-5 text-h2 font-bold md:mb-6">
              Who <em className="font-heading-italic">We Work</em> With
            </h2>
            <p className="text-medium">
              Four kinds of organizations, and individuals. The approach adapts
              to what each one is accountable for.
            </p>
          </div>
        </div>
        <div className="grid place-items-center gap-x-8 gap-y-12 sm:grid-cols-2 md:gap-y-16 lg:grid-cols-[1fr_1.5fr_1fr] lg:gap-x-12">
          <div className="grid w-full grid-cols-1 gap-x-20 gap-y-10 md:gap-y-12">
            <div className="flex flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <SymbolIcon
                  name="psychology_alt"
                  className="size-12 text-caribbean-green-dark"
                />
              </div>
              <h3 className="mb-3 text-h5 font-bold md:mb-4">
                Behavioral Health Consulting
              </h3>
              <p>
                We hold the CARF Gold Seal ourselves. We help providers build
                service models that last, get survey-ready, and hold quality
                steady while they grow.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <SymbolIcon
                  name="work"
                  className="size-12 text-viking-dark"
                />
              </div>
              <h3 className="mb-3 text-h5 font-bold md:mb-4">
                Startups & Entrepreneurs
              </h3>
              <p>
                Pressure-test the business model, sharpen the positioning, and
                open doors that actually convert. For founders who need a second
                opinion they can trust.
              </p>
            </div>
          </div>
          <div className="relative order-last w-full sm:col-span-2 lg:order-none lg:col-span-1">
            <AudienceMontage />
          </div>
          <div className="grid w-full grid-cols-1 gap-x-20 gap-y-10 md:gap-y-12">
            <div className="flex flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <SymbolIcon
                  name="edit"
                  className="size-12 text-viking-dark"
                />
              </div>
              <h3 className="mb-3 text-h5 font-bold md:mb-4">
                Educational Institutions
              </h3>
              <p>
                Improve operational performance and faculty engagement without
                adding administrative weight to the people who teach.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <SymbolIcon
                  name="partner_reports"
                  className="size-12 text-viking-dark"
                />
              </div>
              <h3 className="mb-3 text-h5 font-bold md:mb-4">
                Nonprofit Organizations
              </h3>
              <p>
                Clarify the mission on paper, diversify the funding model, and
                evidence community impact in the language funders accept.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * The centre of "Who We Work With". In the Figma this is `Group 4`: a media
 * rect with two 1px outlined rects offset behind it, all three sharing a 230px
 * corner radius.
 *
 * The media is a *video*, not a still. Figma carries it as a placed GIF — the
 * node has an `imageRef` (a poster frame) and a separate `gifRef` — which is
 * why an earlier pass shipped the poster as a flat image. The source GIF is
 * 800x1422, 83 frames, 8.3s, 30.3MB; it is transcoded to MP4 + WebM at ~0.8MB
 * and ~0.4MB. Four shots of people on video calls.
 *
 * `rounded-full`, not `rounded-[230px]`. Figma's 230 exceeds half the shorter
 * side of all three rects, so Figma clamps it — the left and right ends come
 * out as true semicircles and the shape reads as a stadium, which is what the
 * frame renders. `border-radius: 9999px` reproduces exactly that and, unlike a
 * fixed 230px, stays correct as the composite scales down.
 *
 * The mask and the outlines are CSS rather than baked into the asset, because a
 * video cannot carry them: the outlines overhang the media on two sides, so
 * they are two positioned siblings. Percentages are the Figma's own geometry
 * over the 507x735 group box, so the whole composition scales as one.
 *
 * `object-cover` crops the 800x1422 source into the Figma's 449x708 window,
 * which is the same crop the frame applies. The poster is the video's own first
 * frame at full 800x1422, unmasked, so poster and video are cropped and rounded
 * identically and nothing shifts when playback starts.
 */
function AudienceMontage() {
  const videoRef = useRef(null);

  // Autoplaying loops are exactly what `prefers-reduced-motion` is for. There
  // is no CSS that pauses a video, so this is done in JS: under a reduce
  // preference the poster stays and playback never starts. `autoPlay` is left
  // on the element so the common case needs no JS at all.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (mq.matches) {
        el.pause();
        el.removeAttribute("autoplay");
      } else if (el.paused) {
        // Can reject if the browser refuses autoplay; the poster is the
        // fallback either way, so the rejection is not an error worth raising.
        el.play().catch(() => {});
      }
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    // aspect-ratio holds the group's 507x735 box so the absolutely positioned
    // children have something to be a percentage of.
    <div className="relative mx-auto w-full max-w-[507px] aspect-[507/735]">
      {/* The two outlines. Decorative and behind the media. */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 h-[94.42%] w-[74.16%] rounded-full border border-scheme-border"
      />
      <div
        aria-hidden="true"
        className="absolute top-[5.44%] left-[26.63%] h-[94.56%] w-[73.37%] rounded-full border border-scheme-border"
      />
      <video
        ref={videoRef}
        // `muted` is required for autoplay to be allowed at all, and
        // `playsInline` stops iOS taking it fullscreen.
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/images/home-audience-montage-poster.jpg"
        aria-label="People meeting over video calls from home offices and a boardroom"
        className="absolute top-[2.72%] left-[5.72%] h-[96.33%] w-[88.56%] rounded-full object-cover"
      >
        <source src="/videos/home-audience-montage.webm" type="video/webm" />
        <source src="/videos/home-audience-montage.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
