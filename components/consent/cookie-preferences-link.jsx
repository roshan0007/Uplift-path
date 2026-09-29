"use client";

import { openConsentPreferences } from "@/lib/consent";
import React from "react";

/**
 * The persistent "reopen the banner" control (CB-4). It is a <button> because it
 * performs an action rather than navigating; `className` lets the caller make it
 * look like its sibling links.
 */
export function CookiePreferencesLink({ className = "underline", children }) {
  return (
    <button type="button" onClick={openConsentPreferences} className={className}>
      {children ?? "Cookie Preferences"}
    </button>
  );
}
