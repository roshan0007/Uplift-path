/**
 * The browser's side of /accept-client: read the case from the emailed link,
 * and talk to our own `POST /api/coach-response` route (worker/index.ts).
 *
 * The browser never sees Zoho or its key. The route answers with one of a
 * fixed set of result strings, and that is all this module passes on — it
 * carries no client details because none ever reach the page.
 */

/** `UPW-` and digits — the shape of every case id in the emailed link. */
export const CASE_PATTERN = /^UPW-\d{1,12}$/;

/** The same plain check the route runs. A typo gets caught before a round trip. */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ENDPOINT = "/api/coach-response";

/** The route is fast; this only covers a stuck connection. */
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
 * Ask the route about `caseId` for `email`. `decision` is "check" (read-only),
 * "accept" or "reject" (decline). Resolves to one of `accepted`, `rejected`,
 * `already_taken`, `not_offered`, `not_found`, `open`, or `error`; never
 * throws, because a network failure is just another `error` to the page.
 */
export async function sendCoachResponse({ caseId, email, decision }) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ caseId, email, decision }),
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
