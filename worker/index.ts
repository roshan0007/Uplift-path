/**
 * The site's one server-side entry point.
 *
 * The site is a static export, so nothing in `app/` can run on a server. This
 * Worker sits in front of the static assets and handles exactly one route,
 * `POST /api/coach-response`, which is where the /accept-client page sends a
 * coach's accept / decline. Every other path is answered straight from the
 * assets by Cloudflare without invoking this script (`run_worker_first` in
 * wrangler.jsonc lists only `/api/*`), so the rest of the site is unchanged.
 *
 * Why a server at all: the Zoho CRM function is exposed with an API key, and
 * the key is in the URL. It must never reach a browser, so the browser calls
 * this route and this route calls Zoho.
 *
 * The key lives in the Worker secret `ZOHO_COACH_API_URL` — the full Zoho
 * "execute" URL including `auth_type=apikey&zapikey=…`. It is read from `env`,
 * the three arguments are appended with proper encoding, and it is never
 * logged, echoed or returned. Set it with:
 *
 *     npx wrangler secret put ZOHO_COACH_API_URL
 *
 * This repo is public: no key, no client data and no real coach address belongs
 * in this file or in a test of it.
 */

interface RateLimit {
  limit(options: { key: string }): Promise<{ success: boolean }>;
}

interface Env {
  /** Static-assets binding. Present on every request this Worker sees. */
  ASSETS: { fetch(request: Request): Promise<Response> };
  /** Secret. The full Zoho function URL, key included. */
  ZOHO_COACH_API_URL?: string;
  /** Rate-limit binding declared in wrangler.jsonc. Optional so local dev runs without it. */
  COACH_LIMITER?: RateLimit;
}

const ROUTE = "/api/coach-response";

/** `UPW-` and digits, the shape of every case id in the emailed link. */
const CASE_PATTERN = /^UPW-\d{1,12}$/;

/** Deliberately plain: one `@`, no spaces, a dot in the domain. Zoho does the real matching. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const DECISIONS = ["accept", "reject", "check"] as const;
type Decision = (typeof DECISIONS)[number];

/**
 * What Zoho may answer, per decision. Anything outside the list becomes
 * `error`, so a change on the CRM side can never put an unexpected string on
 * the page — and the page never shows more than these states.
 */
const ALLOWED: Record<Decision, readonly string[]> = {
  accept: ["accepted", "already_taken", "not_offered", "not_found"],
  reject: ["rejected", "not_offered", "not_found"],
  check: ["open", "already_taken", "not_offered", "not_found"],
};

/** The body is three short strings; anything bigger is not from our page. */
const MAX_BODY_BYTES = 1024;

/** Zoho functions answer in a second or two. Past this the coach is better off retrying. */
const UPSTREAM_TIMEOUT_MS = 8_000;

const HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer",
};

function reply(body: Record<string, unknown>, status = 200, extra: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), { status, headers: { ...HEADERS, ...extra } });
}

/** The generic failure. Same body whatever went wrong, so the message leaks nothing. */
const failure = (status = 502) => reply({ result: "error" }, status);

/**
 * Zoho wraps a function's return value in JSON — `details.output` for a
 * standalone function — but the shape is not something to bet the page on.
 * Look in the places it is known to live, fall back to the raw text, and
 * normalise either way.
 */
function extractResult(text: string): string {
  let value: unknown = text;
  try {
    const json = JSON.parse(text);
    value = json?.details?.output ?? json?.output ?? json?.message ?? json;
  } catch {
    // Not JSON: treat the body as the bare result string.
  }
  if (typeof value !== "string") return "error";
  return value.trim().replace(/^["']+|["']+$/g, "").toLowerCase();
}

/** Only our own page may call this: the browser sets `Origin` on a cross-site POST. */
function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("Origin");
  if (!origin) return true; // Non-browser caller: the rate limit and validation still apply.
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

async function handleCoachResponse(request: Request, env: Env): Promise<Response> {
  if (request.method !== "POST") {
    return reply({ result: "error" }, 405, { Allow: "POST" });
  }
  if (!sameOrigin(request)) return failure(403);
  if (!request.headers.get("Content-Type")?.toLowerCase().startsWith("application/json")) {
    return failure(415);
  }

  // The secret is checked before the body so a missing one fails loudly in
  // setup, not as a puzzling validation error. It is never part of the message.
  const upstream = env.ZOHO_COACH_API_URL;
  if (!upstream) return failure(503);

  // Rate limits: per caller, and per case so one link cannot be hammered from
  // many addresses. The limiter is approximate and per location — a brake, not
  // a wall; the real guard is that `accept` only works for an offered coach.
  if (env.COACH_LIMITER) {
    const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
    const { success } = await env.COACH_LIMITER.limit({ key: `ip:${ip}` });
    if (!success) return reply({ result: "error" }, 429, { "Retry-After": "60" });
  }

  const raw = await request.text();
  if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) return failure(413);

  let body: { caseId?: unknown; email?: unknown; decision?: unknown };
  try {
    body = JSON.parse(raw);
  } catch {
    return failure(400);
  }

  const caseId = typeof body.caseId === "string" ? body.caseId.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const decision = body.decision as Decision;

  if (
    !CASE_PATTERN.test(caseId) ||
    email.length > 254 ||
    !EMAIL_PATTERN.test(email) ||
    !DECISIONS.includes(decision)
  ) {
    return failure(400);
  }

  if (env.COACH_LIMITER) {
    const { success } = await env.COACH_LIMITER.limit({ key: `case:${caseId}` });
    if (!success) return reply({ result: "error" }, 429, { "Retry-After": "60" });
  }

  let text: string;
  try {
    // Appended with URLSearchParams, so the arguments are encoded and the
    // key already in the URL's query string is left exactly as it was.
    const target = new URL(upstream);
    target.searchParams.set("caseId", caseId);
    target.searchParams.set("coachEmail", email);
    target.searchParams.set("decision", decision);

    const response = await fetch(target, {
      method: "POST",
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });
    if (!response.ok) return failure();
    text = await response.text();
  } catch {
    // Timeout, DNS, TLS, a malformed secret. Deliberately not logged: a
    // fetch error can carry the URL, and the URL carries the key.
    return failure();
  }

  const result = extractResult(text);
  if (!ALLOWED[decision].includes(result)) return failure();
  return reply({ result });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (pathname === ROUTE) return handleCoachResponse(request, env);
    // `run_worker_first` should keep us from seeing anything else; if we do,
    // the assets (and their 404 page) are the right answer.
    return env.ASSETS.fetch(request);
  },
};
