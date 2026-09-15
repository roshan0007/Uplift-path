/**
 * The case id, as it travels through the intake funnel.
 *
 * Zoho mints it on step 1: the Application form's redirect is
 * `/cmps?caseid=${zf:UniqueId}`, and `UniqueId` is a Zoho system value, so that
 * first hop always carries one. Every hop after it is ours to keep alive —
 * the id has to reach step 4, and nothing on the server knows it, because the
 * site is a static export and the id only ever exists in the URL.
 *
 * Steps 2 and 4 are Zoho forms with a **hidden, mandatory "Case ID" field**
 * that Zoho expects to be prefilled from the form's own URL, and whose value
 * their redirect then merges into the link to the next step. So a dropped
 * parameter does not just lose the id on one screen — it empties the field, and
 * the form's own redirect hands the next step `?caseid=` with nothing after it.
 * That is the failure this module exists to prevent.
 *
 * Client-side only by nature: `window.location` is the only place the id lives.
 * Callers read it in an effect rather than during render, so the server's markup
 * and the first client render agree and hydration stays quiet.
 */

/** The query parameter the funnel carries the case id in. */
export const CASE_ID_PARAM = "caseid";

/**
 * The case id in the current URL, or null.
 *
 * Null rather than an empty string for the case that actually happens: Zoho
 * merges an empty field into `?caseid=`, so "present but empty" is the shape a
 * broken hop arrives in, and it should be treated as absent rather than
 * forwarded onwards as an empty prefill.
 */
export function readCaseId() {
  if (typeof window === "undefined") return null;
  const value = new URLSearchParams(window.location.search).get(CASE_ID_PARAM);
  return value?.trim() ? value.trim() : null;
}

/** `href` with the case id appended, or unchanged if there is none to add. */
export function withCaseId(href, caseId = readCaseId()) {
  if (!caseId) return href;
  const separator = href.includes("?") ? "&" : "?";
  return `${href}${separator}${CASE_ID_PARAM}=${encodeURIComponent(caseId)}`;
}

/**
 * A Zoho form URL with the case id prefilled into the fields that hold it.
 *
 * `fields` are Zoho **field link names**, not labels — `SingleLine`,
 * `SingleLine10`. They are what Zoho matches a query parameter against, they
 * are per-form, and they are what `${zf:...}` in that form's redirect refers
 * to. Read them off the form's own markup (`linkname="..."`), not off the
 * builder's field titles, which are all "Case ID".
 */
export function withCaseIdPrefill(src, fields, caseId = readCaseId()) {
  if (!caseId || !fields?.length) return src;
  const value = encodeURIComponent(caseId);
  return fields.reduce(
    (url, field) =>
      `${url}${url.includes("?") ? "&" : "?"}${field}=${value}`,
    src,
  );
}
