"use client";

import React, { useState } from "react";
import { DribbbleLogo, LinkedinLogo, XLogo } from "relume-icons";

/**
 * Height fix only. The three member blocks were identical markup repeated three
 * times; they are a map now so the bio toggle lives in one place. Every class is
 * the one the export shipped, apart from the portrait aspect (square → 3:2) and
 * the bio clamp — square portraits plus seven-line bios put this section well
 * past one screen. The full bio is one click away, nothing is dropped.
 */
const MEMBERS = [
  {
    name: "Julia Gilliam",
    role: "Chief Compliance Officer",
    image: "/images/about-us-award-logos-list-section-0.jpg",
    bio: "Julia is a trauma-informed social worker with 9 years of experience in behavioral health, addiction recovery, and mental health services. She specializes in mentoring professionals, managing recovery programs, and creating supportive environments for diverse clients, including survivors of human trafficking and K-8 students. Julia is committed to fostering resilience and positive change in every community served.",
  },
  {
    name: "Devyani Balladin",
    role: "Chief Operating Officer",
    image: "/images/about-us-award-logos-list-section-1.jpg",
    bio: "Devyani Balladin, COO of Uplift Path Inc., brings 20+ years of leadership across business, behavioral health, education, and nonprofits. Known for people-centered solutions, she strengthens teams, streamlines operations, and drives growth. Her behavioral health expertise fosters strategic clarity and sustainable change, aligning strategy, culture, and resources for measurable impact.",
  },
  {
    name: "Martha Matthews",
    role: "Chief Risk Officer",
    image: "/images/about-us-award-logos-list-section-2.jpg",
    bio: "Martha brings over 20 years of expertise in enterprise risk management and governance, guiding strategic operations for financial, healthcare, and other enterprises. A former Board member of the National Society of Compliance Professionals and recipient of a U.S. Senate Leadership Gavel, her leadership strengthens Uplift’s commitment to responsible growth and compliant innovation.",
  },
];

function TeamMember({ member }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="flex flex-col text-center">
      <div className="mb-5 flex flex-col flex-nowrap text-center md:mb-6">
        <div className="mx-auto w-full">
          <img
            src={member.image}
            alt={`${member.name}, ${member.role} at Uplift Path`}
            className="aspect-[3/2] size-full rounded-image object-cover"
          />
        </div>
      </div>
      <div className="mb-3 md:mb-4">
        <h5 className="text-large font-semibold">{member.name}</h5>
        <h6 className="text-medium">{member.role}</h6>
      </div>
      <p className={expanded ? undefined : "line-clamp-4"}>{member.bio}</p>
      <button
        type="button"
        onClick={() => setExpanded((open) => !open)}
        aria-expanded={expanded}
        className="mt-2 self-center text-small font-medium underline"
      >
        {expanded ? "Read less" : "Read more"}
      </button>
      <div className="mt-5 grid grid-flow-col grid-cols-[max-content] gap-3.5 self-center md:mt-6">
        <a href="#">
          <LinkedinLogo className="size-6 text-scheme-text" />
        </a>
        <a href="#">
          <XLogo className="size-6 p-0.5 text-scheme-text" />
        </a>
        <a href="#">
          <DribbbleLogo className="size-6 text-scheme-text" />
        </a>
      </div>
    </div>
  );
}

export function Team6() {
  return (
    <section className="px-[5%] py-16 md:py-20 lg:py-24 scheme-1 badge-alt">
      <div className="container">
        <div className="mx-auto mb-12 max-w-lg text-center md:mb-12 lg:mb-12">
          <h2 className="mb-5 text-h2 font-bold md:mb-6">Our team</h2>
          <p className="text-medium">The people behind the work.</p>
        </div>
        <div className="grid grid-cols-1 items-start justify-center gap-x-8 gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
          {MEMBERS.map((member) => (
            <TeamMember key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
