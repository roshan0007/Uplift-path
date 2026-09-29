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
import { usePathname } from "next/navigation";
import React from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "relume-icons";

const ALL_OFF = { analytics: false, functionality: false, advertising: false };
const ALL_ON = { analytics: true, functionality: true, advertising: true };
// UI state only ("I tucked the banner away"), not a consent record.
const HIDDEN_KEY = "uplift-consent-hidden";

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
 * It is a small card in the bottom-right corner with a hide arrow that tucks it
 * into a "Cookie choices" tab. Hiding is not a decision: optional categories stay
 * off. It is a non-modal region, not a dialog that traps focus: the Notice promises
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
  const [armed, setArmed] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);
  const [hasDecision, setHasDecision] = React.useState(false);
  const [gpc, setGpc] = React.useState(false);
  const [draft, setDraft] = React.useState(ALL_OFF);
  const pathname = usePathname();
  const headingRef = React.useRef(null);
  const focusOnOpen = React.useRef(false);

  React.useEffect(() => {
    const stored = readStoredConsent();
    setGpc(gpcEnabled());
    setHasDecision(stored !== null);
    // Under GPC the switches show what actually applies: off.
    setDraft(gpcEnabled() ? ALL_OFF : (stored ?? ALL_OFF));
    setVisible(stored === null);
    try {
      setCollapsed(window.sessionStorage.getItem(HIDDEN_KEY) === "1");
    } catch {
      /* treat as not hidden */
    }
    setMounted(true);
    enforceGpc();

    const onOpen = () => {
      const current = readStoredConsent();
      setGpc(gpcEnabled());
      setDraft(gpcEnabled() ? ALL_OFF : (current ?? ALL_OFF));
      setExpanded(true);
      setCollapsed(false);
      setArmed(true);
      setVisible(true);
      focusOnOpen.current = true;
    };
    window.addEventListener(OPEN_PREFERENCES_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, onOpen);
  }, []);

  // On the homepage the banner stays out of the way of the hero until the
  // visitor has scrolled down past the first screen. Every other page shows it
  // straight away. Nothing non-essential loads in the meantime, so holding it
  // back changes what is on screen, not what the site does. The footer link
  // (`onOpen` above) arms it regardless.
  React.useEffect(() => {
    if (pathname !== "/") {
      setArmed(true);
      return undefined;
    }
    const check = () => {
      if (window.scrollY > window.innerHeight * 0.75) {
        setArmed(true);
        window.removeEventListener("scroll", check);
      }
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [pathname]);

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

  if (!mounted || !visible || !armed) return null;

  function commit(choices) {
    saveConsent(choices);
    setHasDecision(true);
    setVisible(false);
    setExpanded(false);
  }

  function setHidden(value) {
    setCollapsed(value);
    // Hiding from the Manage view closes it too; the tab reopens the compact card.
    if (value) setExpanded(false);
    try {
      if (value) window.sessionStorage.setItem(HIDDEN_KEY, "1");
      else window.sessionStorage.removeItem(HIDDEN_KEY);
    } catch {
      /* the choice still applies for this page view */
    }
  }

  // `--sticky-bar-offset` is published by the homepage's sticky CTA bar while it
  // is on screen (components/sections/home/intake-bar.jsx), so this sits above
  // it rather than over its "Get Started" button.
  const position =
    "fixed right-4 bottom-[calc(1rem+var(--sticky-bar-offset,0px))] z-50 md:right-6 md:bottom-[calc(1.5rem+var(--sticky-bar-offset,0px))]";

  if (collapsed) {
    // The hidden state: a small tab, so the choice is one click away and the
    // page is not covered. It records nothing -- optional categories stay off.
    return (
      <div className={position}>
        <Button
          size="sm"
          variant="alternate"
          onClick={() => setHidden(false)}
          aria-label="Show cookie choices"
          iconRight={<KeyboardArrowUp className="size-5" />}
        >
          Cookie choices
        </Button>
      </div>
    );
  }

  return (
    <section
      aria-labelledby="consent-heading"
      className={`${position} max-h-[80dvh] w-[calc(100vw-2rem)] max-w-[22rem] overflow-y-auto rounded-card border-2 border-neutral-darkest scheme-1 p-4`}
    >
      <div className="mb-1 flex items-center justify-between gap-3">
        <h2
          id="consent-heading"
          ref={headingRef}
          tabIndex={-1}
          className="text-h6 font-bold focus-visible:outline-none"
        >
          Your privacy choices
        </h2>
        <button
          type="button"
          onClick={() => (hasDecision ? setVisible(false) : setHidden(true))}
          aria-label="Hide cookie choices"
          className="-mr-1 inline-flex opacity-60 transition-opacity duration-200 ease-in-out hover:opacity-100"
        >
          <KeyboardArrowDown className="size-6" />
        </button>
      </div>
      <p className="text-small">
        Everything except what the Website needs to work is off unless you allow
        it. Declining never affects your care. See our{" "}
        <a href="/cookies-and-tracking-technologies" className="underline">
          Cookies and Tracking Technologies Notice
        </a>
        .
      </p>

      {gpc && (
        <p className="mt-2 text-small font-medium">
          Your browser sends a Global Privacy Control signal. We honor it, so
          optional categories are off.
        </p>
      )}

      {expanded && (
        <ul className="mt-3 space-y-3 border-t border-scheme-border pt-3">
          <li className="text-small">
            <p className="font-semibold">Strictly Necessary</p>
            <p>Required for the Website to function and for security. Always on.</p>
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

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
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
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="text-small underline"
          >
            Manage
          </button>
        )}
      </div>
    </section>
  );
}
