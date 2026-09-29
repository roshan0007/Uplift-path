"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CATEGORIES,
  OPEN_PREFERENCES_EVENT,
  enforceGpc,
  gpcEnabled,
  readStoredConsent,
  saveConsent,
} from "@/lib/consent";
import React from "react";

const ALL_OFF = { analytics: false, functionality: false, advertising: false };
const ALL_ON = { analytics: true, functionality: true, advertising: true };

/**
 * The cookie banner the Cookies and Tracking Technologies Notice says exists.
 *
 * Mounted once in the root layout, so it is on every route including the intake
 * funnel, which sits outside the `(site)` chrome. Behaviour, against the build
 * spec's line ids:
 *
 * - CB-1  It appears on the first visit and nothing non-essential has loaded by
 *         then -- there is nothing non-essential to load until <ConsentGate>
 *         says so.
 * - CB-2  Choices are per category. "Accept all" and "Decline all" are
 *         shortcuts to the same three switches, not a substitute for them.
 * - CB-3  "Decline all" and "Accept all" are the same variant and size, one
 *         click each. No switch is pre-ticked.
 * - CB-4  It reopens from a link in the footer (and on the intake screens, which
 *         have no footer) via `openConsentPreferences()`.
 * - CB-6  The decision is kept in localStorage and holds across sessions.
 *
 * It is a non-modal region, not a dialog that traps focus: the Notice promises
 * that declining "changes nothing about the care available to you", so the page
 * behind it must stay usable while it is up. It takes focus only when the visitor
 * asks for it (the footer link), never on load.
 *
 * Under Global Privacy Control the switches are locked off and say why, and a
 * saved acceptance is ignored (GPC-2, see lib/consent.js).
 *
 * The copy under each category is the Notice's own sentence for that category.
 */
export function ConsentManager() {
  const [mounted, setMounted] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [hasDecision, setHasDecision] = React.useState(false);
  const [gpc, setGpc] = React.useState(false);
  const [draft, setDraft] = React.useState(ALL_OFF);
  const headingRef = React.useRef(null);
  const focusOnOpen = React.useRef(false);

  React.useEffect(() => {
    const stored = readStoredConsent();
    setGpc(gpcEnabled());
    setHasDecision(stored !== null);
    // Under GPC the switches show what actually applies: off.
    setDraft(gpcEnabled() ? ALL_OFF : (stored ?? ALL_OFF));
    setVisible(stored === null);
    setMounted(true);
    enforceGpc();

    const onOpen = () => {
      const current = readStoredConsent();
      setGpc(gpcEnabled());
      setDraft(gpcEnabled() ? ALL_OFF : (current ?? ALL_OFF));
      setExpanded(true);
      setVisible(true);
      focusOnOpen.current = true;
    };
    window.addEventListener(OPEN_PREFERENCES_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, onOpen);
  }, []);

  // Focus moves into the card only when the visitor asked for it, and only once
  // it has rendered -- which is why this is an effect on `visible`, not a call
  // inside the event handler.
  React.useEffect(() => {
    if (visible && focusOnOpen.current) {
      focusOnOpen.current = false;
      headingRef.current?.focus();
    }
  }, [visible]);

  React.useEffect(() => {
    if (!visible || !hasDecision) return undefined;
    // With a decision already on file the card is optional, so Escape closes it.
    const onKey = (event) => {
      if (event.key === "Escape") setVisible(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, hasDecision]);

  if (!mounted || !visible) return null;

  function commit(choices) {
    saveConsent(choices);
    setHasDecision(true);
    setVisible(false);
    setExpanded(false);
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 p-4 md:p-6">
      <section
        aria-labelledby="consent-heading"
        className="pointer-events-auto mx-auto max-h-[85dvh] w-full max-w-[44rem] overflow-y-auto rounded-card border-2 border-neutral-darkest scheme-1 p-5 md:p-6"
      >
        <h2
          id="consent-heading"
          ref={headingRef}
          tabIndex={-1}
          className="mb-2 text-h6 font-bold focus-visible:outline-none"
        >
          Your privacy choices
        </h2>
        <p className="text-small">
          Cookies the Website needs in order to work are always on. Everything
          else is off until you choose, and declining changes nothing about the
          care available to you. See our{" "}
          <a href="/cookies-and-tracking-technologies" className="underline">
            Cookies and Tracking Technologies Notice
          </a>
          .
        </p>

        {gpc && (
          <p className="mt-3 text-small font-medium">
            Your browser is sending a Global Privacy Control signal. We honor it,
            so the optional categories below are off.
          </p>
        )}

        {expanded && (
          <ul className="mt-4 space-y-3 border-t border-scheme-border pt-4">
            <li className="text-small">
              <p className="font-semibold">Strictly Necessary</p>
              <p>
                Required for the Website to function and for security. Always on.
              </p>
            </li>
            {CATEGORIES.map((category) => (
              <li key={category.id} className="flex items-start gap-3 text-small">
                <Checkbox
                  id={`consent-${category.id}`}
                  checked={draft[category.id]}
                  disabled={gpc}
                  onCheckedChange={(value) =>
                    setDraft((current) => ({
                      ...current,
                      [category.id]: value === true,
                    }))
                  }
                  className="mt-0.5 shrink-0"
                />
                <label htmlFor={`consent-${category.id}`} className="cursor-pointer">
                  <span className="block font-semibold">{category.label}</span>
                  <span className="block">{category.blurb}</span>
                </label>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {/* Decline and Accept are deliberately identical in variant and size
              (CB-3): equal prominence, one click each. */}
          <Button size="sm" onClick={() => commit(ALL_OFF)}>
            Decline all
          </Button>
          <Button size="sm" onClick={() => commit(ALL_ON)}>
            Accept all
          </Button>
          {expanded ? (
            <Button size="sm" variant="secondary" onClick={() => commit(draft)}>
              Save my choices
            </Button>
          ) : (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setExpanded(true)}
            >
              Choose by category
            </Button>
          )}
          {hasDecision && (
            <Button
              size="sm"
              variant="link"
              className="underline"
              onClick={() => setVisible(false)}
            >
              Close
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}
