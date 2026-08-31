/**
 * The individual intake funnel, in order.
 *
 * These four names are also the four steps of the scroll timeline on
 * /for-individual-page (`components/sections/for-individual-page/timeline-05.jsx`).
 * If a name changes here it changes there too — the page promises a journey and
 * the funnel has to be the one it promised.
 *
 * Step 1 has no `href`: it is a modal over /for-individual-page, so the URL does
 * not change when it opens. Steps 2-4 are real routes, all noindexed.
 */
export const INTAKE_STEPS = [
  { id: "application", label: "Application", href: null },
  { id: "eligibility", label: "Eligibility", href: "/cmps" },
  { id: "scheduling", label: "Scheduling", href: "/booking" },
  { id: "consent", label: "Consent", href: "/consent-form" },
];

/** Index of a step id, or -1. */
export const stepIndex = (id) => INTAKE_STEPS.findIndex((s) => s.id === id);

/** The step after `id`, or null if it is the last one. */
export const nextStep = (id) => INTAKE_STEPS[stepIndex(id) + 1] ?? null;

/**
 * Where "Back" goes from `id`.
 *
 * The previous step's route, except from Eligibility: the step before it is the
 * Application modal, which has no URL of its own, so back from there means back
 * to the page the modal opens over. Step 1 itself never renders a back control
 * — it is a modal and closing it is the way out.
 */
export const backHref = (id) =>
  INTAKE_STEPS[stepIndex(id) - 1]?.href ?? "/for-individual-page";
