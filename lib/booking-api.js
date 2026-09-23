/**
 * The booking backend: the `uplift-api` Cloudflare Worker, which fronts Zoho
 * Bookings and Zoho CRM. It is a separate Worker from the one that serves this
 * site, and it holds the Zoho OAuth secrets — nothing here ever sees a token.
 *
 * Every call is a POST of `{ action, ...fields }` to the one URL. The two this
 * site uses:
 *
 *   getSlots  { date: "dd-MM-yyyy" }
 *             → { success, slots: [{ time: "09:30 AM", staff_id, staff_name }] }
 *   bookSlot  { case_id, datetime: "dd-Mon-yyyy HH:mm:ss", staff_id }
 *             → { success, booking_id, start_time }
 *
 * `bookSlot` looks the case up in the CRM's Intake Submissions by its Name
 * field, books the appointment against that person, and writes the meeting
 * link back onto the record and the matching Contact. So the case id is not
 * optional: without it there is nobody to book.
 *
 * Times are Zoho's business time zone, Eastern — the Worker books with
 * `time_zone: "America/New_York"` — whatever the visitor's browser is set to.
 *
 * `NEXT_PUBLIC_BOOKING_API_URL` overrides the endpoint at build time, for
 * pointing a preview at a different Worker.
 */
export const BOOKING_API_URL =
  process.env.NEXT_PUBLIC_BOOKING_API_URL ??
  "https://uplift-api.sarfarazsiddiqui199.workers.dev";

/** Zoho can take a few seconds per staff member; past this, give up. */
const TIMEOUT_MS = 30_000;

const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const pad = (n) => String(n).padStart(2, "0");

/** A local date as the `dd-MM-yyyy` that `getSlots` takes. Also the cache key. */
export const dayKey = (date) =>
  `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()}`;

/** "09:30 AM" → "09:30". Null if Zoho sent something that is not a time. */
function to24h(value) {
  const match = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(value.trim());
  if (!match) return null;
  let hours = Number(match[1]) % 12;
  if (match[3].toUpperCase() === "PM") hours += 12;
  return `${pad(hours)}:${match[2]}`;
}

async function call(body) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  let response;
  try {
    response = await fetch(BOOKING_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch {
    throw new Error(
      "We couldn't reach our scheduling system. Check your connection and try again.",
    );
  } finally {
    clearTimeout(timer);
  }

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error(
      `Our scheduling system returned an unexpected response (${response.status}). Please try again.`,
    );
  }
  if (!data?.success) {
    // A 4xx carries Zoho's own reason ("slot not available") and is worth
    // showing. A 5xx is the Worker falling over, and its message is a stack
    // fragment — e.g. an unknown case id reaches the CRM search, which answers
    // 204 with no body, and the Worker reports "Unexpected end of JSON input".
    const readable = response.status < 500 && data?.error;
    const error = new Error(
      readable ||
        "Something went wrong on our side. Please try again, or contact us if it keeps happening.",
    );
    error.code = data?.error;
    error.status = response.status;
    throw error;
  }
  return data;
}

/**
 * The open times on `date`, as `[{ time: "HH:mm", staffId }]`, sorted.
 *
 * The Worker asks each staff member separately, so the same time can come back
 * more than once. One entry per time is kept, and it is the first staff member
 * Zoho listed — the same rule the old site used.
 */
export async function fetchSlots(date) {
  const data = await call({ action: "getSlots", date: dayKey(date) });
  const byTime = new Map();
  for (const slot of data.slots ?? []) {
    const time = typeof slot?.time === "string" ? to24h(slot.time) : null;
    if (time && !byTime.has(time)) {
      byTime.set(time, { time, staffId: slot.staff_id });
    }
  }
  return [...byTime.values()].sort((a, b) => a.time.localeCompare(b.time));
}

/**
 * Book `slot` on `date` for the case. Resolves on success; throws an Error
 * whose message is fit to show the visitor.
 */
export async function bookSlot({ caseId, date, slot }) {
  const datetime =
    `${pad(date.getDate())}-${MONTHS_SHORT[date.getMonth()]}-${date.getFullYear()} ` +
    `${slot.time}:00`;
  try {
    return await call({
      action: "bookSlot",
      case_id: caseId,
      datetime,
      staff_id: slot.staffId,
    });
  } catch (error) {
    if (error.code === "Case not found") {
      throw new Error(
        "We couldn't find your application. Please start again from step 1 so we can link this session to it.",
      );
    }
    throw error;
  }
}
