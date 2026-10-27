/**
 * The visitor's cookie / tracking choices, and the rules that decide whether a
 * non-essential technology may load.
 *
 * This exists because the Cookies and Tracking Technologies Notice (v2.0, Oct
 * 2026) states, as fact, that this website has a consent banner with per-category
 * choices, that non-essential technologies are off until the visitor opts in,
 * that Global Privacy Control is honoured for everyone, and that advertising and
 * social technologies never load on the inquiry form. The website build spec
 * (WebsiteTracking_InquiryFormBuildSpec_Oct2026_v1.0) turns each of those
 * sentences into a line item. The line ids (CB-1, FM-1, GPC-1 ...) are quoted
 * below where a rule implements one.
 *
 * **Today the site loads no analytics, advertising, social, session-replay or
 * accessibility-widget script at all**, so there is nothing yet for these choices
 * to switch. The mechanism is here so that the day one is added it can only be
 * added behind `<ConsentGate>` (see components/consent), and so the notice is
 * true in the meantime. Add every new tag to docs/tracking-inventory.md and to
 * CATEGORY_STORAGE below in the same change; the HIPAA Security Officer's
 * approval (V-3) is a precondition, not a formality.
 *
 * Pure functions, no React. Everything that touches `window` is guarded, because
 * `localStorage` and `navigator` are unavailable during the static export and can
 * throw in a private window.
 */

export const CONSENT_STORAGE_KEY = "uplift-consent";
export const CONSENT_CHANGED_EVENT = "uplift:consent-changed";
export const OPEN_PREFERENCES_EVENT = "uplift:open-consent";

/**
 * The three optional categories, in the order and with the wording the Notice
 * uses ("Categories We Use", B-D). "Strictly Necessary" (A) is not a choice and
 * is described by the banner itself.
 */
export const CATEGORIES = [
  {
    id: "analytics",
    label: "Analytics and Performance",
    blurb:
      "Help us understand how visitors find and use the Website so we can improve navigation, content and reliability.",
  },
  {
    id: "functionality",
    label: "Functionality",
    blurb:
      "Remember choices you make, such as language or display preferences, so you do not have to set them again.",
  },
  {
    id: "advertising",
    label: "Advertising and Social",
    blurb:
      "Where used, these allow advertising and social platforms to measure campaigns and to show advertisements.",
  },
];

const ALL_OFF = { analytics: false, functionality: false, advertising: false };

/**
 * Pages that host, or are the direct hand-off to, a form that collects personal
 * information. FM-1: advertising and social technology never loads on the
 * inquiry form, whatever consent has been given elsewhere. FM-5 (session replay,
 * heatmaps and form analytics prohibited on this page in every category) is a
 * rule about which tools may be installed at all, not about consent, so it is
 * enforced by never adding one; see docs/tracking-inventory.md.
 *
 * Deliberately broader than "the contact form": every route that embeds a Zoho
 * form is listed, so a new tag cannot end up on one by omission.
 */
export const INQUIRY_FORM_PATHS = [
  "/contact-us",
  "/grievance",
  "/cmps",
  "/booking",
  "/consent-form",
  "/thank-you",
];

export function isInquiryFormPath(pathname) {
  if (!pathname) return false;
  const clean = pathname.replace(/\/+$/, "") || "/";
  return INQUIRY_FORM_PATHS.includes(clean);
}

/**
 * What each category's technologies leave behind, so withdrawing consent can
 * clear it (CB-5). Cookie patterns are matched against the cookie name.
 * These are the conventional names for the providers the Notice and the Website
 * Privacy Notice mention (Google Analytics; advertising/social pixels). It is a
 * registry to extend, not a claim that any of these are set today.
 */
export const CATEGORY_STORAGE = {
  analytics: {
    cookies: [/^_ga/, /^_gid$/, /^_gat/],
    storage: [/^_ga/],
  },
  functionality: { cookies: [], storage: [] },
  advertising: {
    cookies: [/^_fbp$/, /^_fbc$/, /^_gcl_/, /^IDE$/],
    storage: [],
  },
};

function safeStorage() {
  try {
    return typeof window === "undefined" ? null : window.localStorage;
  } catch {
    return null;
  }
}

/** The saved decision, or null if the visitor has not made one. */
export function readStoredConsent() {
  const store = safeStorage();
  if (!store) return null;
  try {
    const raw = store.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return {
      analytics: parsed.analytics === true,
      functionality: parsed.functionality === true,
      advertising: parsed.advertising === true,
    };
  } catch {
    return null;
  }
}

/**
 * Global Privacy Control (GPC-1). Honoured for every visitor, wherever they are:
 * the Notice commits to doing so "wherever you are located rather than only where
 * a law requires it". It is not gated to a list of states.
 *
 * Legacy Do Not Track is deliberately NOT read (GPC-3). The Notice says the
 * Website does not respond to it; implementing it silently would make that false.
 */
export function gpcEnabled() {
  return typeof navigator !== "undefined" && navigator.globalPrivacyControl === true;
}

/**
 * The consent that actually applies. A recognised GPC signal overrides a
 * previously given acceptance (GPC-2), so this is the stored decision AND NOT
 * the signal. Before any decision is made everything is off (CB-1, CAT-2).
 */
export function getEffectiveConsent() {
  if (gpcEnabled()) return { ...ALL_OFF };
  return readStoredConsent() ?? { ...ALL_OFF };
}

/** Whether `category` may load on `pathname`. The single question a tag asks. */
export function isAllowed(category, pathname) {
  if (category === "advertising" && isInquiryFormPath(pathname)) return false;
  return getEffectiveConsent()[category] === true;
}

function expireCookie(name) {
  const host = window.location.hostname;
  const parts = host.split(".");
  // The bare host, then each parent domain that could have set it
  // (a.b.example.com -> .a.b.example.com, .b.example.com, .example.com).
  const domains = [undefined];
  for (let i = 0; i < parts.length - 1; i += 1) {
    domains.push(`.${parts.slice(i).join(".")}`);
  }
  for (const domain of domains) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${
      domain ? `; domain=${domain}` : ""
    }`;
  }
}

/** Remove the cookies and local storage a category's technologies set (CB-5). */
export function clearCategoryStorage(category) {
  if (typeof window === "undefined") return;
  const spec = CATEGORY_STORAGE[category];
  if (!spec) return;
  try {
    for (const pair of document.cookie.split(";")) {
      const name = pair.split("=")[0].trim();
      if (name && spec.cookies.some((re) => re.test(name))) expireCookie(name);
    }
  } catch {
    /* cookies unavailable: nothing to clear */
  }
  const store = safeStorage();
  if (!store) return;
  try {
    for (const key of Object.keys(store)) {
      if (spec.storage.some((re) => re.test(key))) store.removeItem(key);
    }
  } catch {
    /* storage unavailable: nothing to clear */
  }
}

/**
 * Record a decision. Anything withdrawn is cleared immediately and listeners are
 * told, so a loader can tear its tag down without a page reload (CB-5).
 * Under GPC the recorded decision is all-off regardless of what was passed in.
 */
export function saveConsent(choices) {
  const before = readStoredConsent() ?? ALL_OFF;
  const next = gpcEnabled()
    ? { ...ALL_OFF }
    : {
        analytics: choices.analytics === true,
        functionality: choices.functionality === true,
        advertising: choices.advertising === true,
      };
  const store = safeStorage();
  if (store) {
    try {
      store.setItem(
        CONSENT_STORAGE_KEY,
        JSON.stringify({ ...next, savedAt: new Date().toISOString() }),
      );
    } catch {
      /* the choice still applies for this page view */
    }
  }
  for (const { id } of CATEGORIES) {
    if (before[id] && !next[id]) clearCategoryStorage(id);
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: next }));
  }
  return next;
}

/**
 * Clear anything a GPC signal now forbids but an earlier acceptance allowed
 * (GPC-2). Called once on load.
 */
export function enforceGpc() {
  if (!gpcEnabled()) return;
  const stored = readStoredConsent();
  if (!stored) return;
  for (const { id } of CATEGORIES) {
    if (stored[id]) clearCategoryStorage(id);
  }
}

/** Ask the banner to open in its category view (CB-4: the footer link). */
export function openConsentPreferences() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(OPEN_PREFERENCES_EVENT));
  }
}
