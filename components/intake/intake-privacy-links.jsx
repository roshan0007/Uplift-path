"use client";

import { CookiePreferencesLink } from "@/components/consent/cookie-preferences-link";
import React from "react";

/**
 * The privacy links under every intake screen: the Application modal (step 1)
 * and the three pages (steps 2-4). None of them has the site footer, and all of
 * them collect personal information.
 *
 * The Consumer Health Data Privacy Notice has to be linked from every page that
 * collects personal information, and the cookie banner has to be reopenable from
 * every page (build spec CB-4), so both live here. One component so the four
 * screens cannot drift apart -- step 1 was missed once already.
 */
export function IntakePrivacyLinks() {
  return (
    <nav
      aria-label="Privacy"
      className="container flex shrink-0 flex-wrap items-center justify-center gap-x-6 gap-y-1 pb-4 text-small"
    >
      <a href="/consumer-health-data-privacy" className="underline">
        Consumer Health Data Privacy
      </a>
      <a href="/privacy-policy" className="underline">
        Privacy Policy
      </a>
      <CookiePreferencesLink />
    </nav>
  );
}
