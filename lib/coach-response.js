/**
 * The browser's side of /accept-client: read the case from the emailed link,
 * and ask the `uplift-api` Worker (action `coachResponse`) what the CRM says.
 *
 * The Worker holds the Zoho API key (secret `ZOHO_COACH_API_URL`) and calls the
 * CRM function; the browser never sees either. It answers with one of a fixed
 * set of result strings, and that is all this module passes on — it carries no
 * client details because none ever reach the page.
 *
 * The Worker only answers requests whose `Origin` is the production domain or
 * the workers.dev host (`COACH_ORIGINS` in its code), so this does not work from
 * `localhost`: a local run shows the generic error state.
 */

import { BOOKING_API_URL } from "@/lib/booking-api";

/** `UPW-` and digits — the shape of every case id in the emailed link. */
export const CASE_PATTERN = /^UPW-\d{1,12}$/;

/** The same plain check the Worker runs. A typo gets caught before a round trip. */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** The Worker is fast; this only covers a stuck connection. */
const TIMEOUT_MS = 15_000;

/**
 * The case in the current URL (`?case=UPW-123`), or null if it is missing or
 * does not look like a case id. Client-side only: the site is a static export
 * and the id only exists in the URL. Callers read it in an effect so the
 * server's markup and the first client render agree.
 */
export function readCoachCase() {
  if (typeof window === "undefined") return null;
  const value = new URLSearchParams(window.location.search).get("case")?.trim();
  return value && CASE_PATTERN.test(value) ? value : null;
}

/**
 * Ask the Worker about `caseId` for `email`. `decision` is "check" (read-only),
 * "accept" or "reject" (decline). Resolves to one of `accepted`, `rejected`,
 * `already_taken`, `not_offered`, `not_found`, `open`, or `error`; never
 * throws, because a network failure is just another `error` to the page.
 */
export async function sendCoachResponse({ caseId, email, decision }) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(BOOKING_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "coachResponse", caseId, email, decision }),
      cache: "no-store",
      signal: controller.signal,
    });
    const data = await response.json();
    return typeof data?.result === "string" ? data.result : "error";
  } catch {
    return "error";
  } finally {
    clearTimeout(timer);
  }
}
