"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * The one layout every legal page uses: Accessibility, Terms of Use, Privacy
 * Policy and Grievance.
 *
 * These pages replace three lorem-ipsum stubs the Relume export shipped. The
 * words are the live ones lifted from upliftpathwellness.com — not rewritten,
 * not summarised, because a policy that has been paraphrased is a different
 * policy. What changed is only the typography and the layout.
 *
 * Two sections since 2026-10-01 (refactor audit,
 * docs/agent-reports/refactor-audit-legal-pages-2026-10-01.md): a full-width
 * `scheme-mint` title band carrying the h1 and the version or date line, then
 * the notice on `scheme-1`. Below the band, two columns from `lg`: a jump list
 * on the left, the policy on the right. Privacy Policy alone runs to 127 blocks
 * and Terms to 142 — long enough that a single column gives a reader no idea
 * where they are and no way to reach the one section they came for. Only the
 * jump list is sticky, capped at the viewport height so it never runs off
 * screen; below `lg` it collapses into an accordion above the body.
 *
 * The h1 used to sit in the left column, which had to widen to 25rem to hold
 * "Accessibility" at the lg h1 step and still could not hold
 * "Nondiscrimination" (that page stepped down to `text-h2`). In the band it has
 * the full container, so every title is `text-h1` and the sidebar is 20rem.
 *
 * The measure is `max-w-md`, the design system's 35rem text column — 50 to 70
 * characters a line.
 *
 * Headings are h2 throughout. The source used h3 for every section under a
 * single h2 page title, which skips no levels only because there is nothing
 * between them; rendering them as h2 under the page's h1 keeps the outline
 * honest for a screen reader and for the SEO audit.
 *
 * The Oct 2026 notices carry a version and an effective date instead of a
 * "last updated" date. Those are legal facts (the notice binds us from the day it
 * is posted), so they are rendered exactly as the notice states them and are
 * never derived from a build date.
 *
 * @param {{
 *   title: string,
 *   updated?: string | null,
 *   version?: string | null,
 *   effective?: string | null,
 *   intro?: React.ReactNode,
 *   content: Array<Record<string, any>>,
 *   children?: React.ReactNode,
 * }} props
 */
export function LegalPage({
  title,
  updated,
  version = null,
  effective = null,
  intro = null,
  content,
  children = null,
}) {
  // Anchor ids are assigned once, up front, so a heading that appears twice
  // gets two distinct ids rather than two elements answering to the same one.
  // Terms of Use has "User Submissions and Feedback" in two places, which is
  // the source's own duplication and not ours to edit out of a legal document.
  const ids = [];
  const seen = new Map();
  for (const block of content) {
    if (block.type !== "h") {
      ids.push(null);
      continue;
    }
    const base = slug(block.text);
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    ids.push(n === 0 ? base : `${base}-${n + 1}`);
  }

  // Only top-level sections reach the jump list. Privacy Policy is the one page
  // with two heading levels, and listing all 47 of its headings made the list
  // longer than most of the sections it points at.
  const sections = content
    .map((block, index) => ({ block, id: ids[index] }))
    .filter(({ block }) => block.type === "h" && levelOf(block) === 1);

  const hasToc = sections.length > 2;

  const meta =
    version && effective
      ? `Version ${version} · Effective ${effective}`
      : updated
        ? `Last updated ${updated}`
        : null;

  return (
    <>
      {/* The title band. The page used to be one white field from navbar to
          footer, about 5,000px of `scheme-1` with nothing to mark where the
          notice starts. Refactor audit 2026-10-01: the mint scheme is the
          light neutral the brand already uses for full-bleed washes, dark text
          on it is 17.91:1 and the /60 meta line 5.16:1, so the page gets one
          quiet colour block without breaking any rule. Full width, so the h1
          no longer has to fit a 25rem sidebar -- which is what the old
          `longestWord > 15 ? text-h2 : text-h1` workaround was for, and why
          Nondiscrimination alone came out a step smaller than the other seven. */}
      <section className="px-[5%] py-16 md:py-20 lg:py-24 scheme-mint badge-alt">
        <div className="container">
          <h1 className="max-w-lg text-balance text-h1 font-bold">{title}</h1>
          {meta && (
            <p className="mt-5 text-small text-scheme-text/60 md:mt-6">
              {meta}
            </p>
          )}
        </div>
      </section>

      <section className="px-[5%] py-16 md:py-20 lg:py-24 scheme-1 badge-alt">
        {/* One column when there is no jump list (Grievance): a 20rem track
            with nothing in it would push the form off-centre for no reason. */}
        <div
          className={`container grid grid-cols-1 gap-10 lg:gap-16 ${
            hasToc ? "lg:grid-cols-[minmax(0,20rem)_minmax(0,35rem)]" : ""
          }`}
        >
          {hasToc && (
            <aside>
              {/* Phones and tablets: a collapsed list, so a reader on an
                    8,700px notice can still reach the section they came for.
                    Composed from the accordion primitive. Its trigger sits in
                    an <h3>, so it takes `font-body` like every FAQ question. */}
              {/* The wrapper carries `lg:hidden` because the primitive's
                    root drops `className`. */}
              <div className="lg:hidden">
                <Accordion type="single" collapsible>
                  <AccordionItem value="toc">
                    <AccordionTrigger className="font-body text-small font-semibold">
                      On This Page
                    </AccordionTrigger>
                    <AccordionContent>
                      <TocList sections={sections} />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Desktop: only the nav is sticky, not the whole column. The
                    column used to carry the h1 and date as well, 902px pinned
                    at 96px, so the bottom of the list ran off a 900px screen
                    on four of the eight routes. The 96px offset was also
                    clearing a sticky navbar that is not sticky. The list now
                    caps at the viewport, so there is one scroll box at most
                    (Terms and Privacy only), not a 50vh box inside a column
                    that was already clipped. */}
              <nav
                aria-label="On This Page"
                className="hidden lg:sticky lg:top-8 lg:block lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto [scrollbar-color:var(--color-scheme-border)_transparent] [scrollbar-width:thin]"
              >
                <p className="mb-4 text-small font-semibold">On This Page</p>
                <TocList sections={sections} />
              </nav>
            </aside>
          )}

          {/* `max-w-md` (35rem, the design system's text column) instead of the
              old 45rem: 76-84 characters a line came down to 50-70. */}
          <div className="max-w-md">
            {intro}
            {content.map((block, index) => (
              <Block key={index} block={block} id={ids[index]} />
            ))}
            {children}
          </div>
        </div>
      </section>
    </>
  );
}

/**
 * The jump list. Links sit at 60% so the list reads as navigation next to the
 * policy rather than competing with it (5.36:1 on white, AA). A 1px hairline
 * down the side, the same treatment as the footer divider and the accordion.
 */
function TocList({ sections }) {
  return (
    <ul className="space-y-3 border-l border-scheme-border pl-4 text-small">
      {sections.map(({ block, id }) => (
        <li key={id}>
          <a
            href={`#${id}`}
            className="block text-scheme-text/60 transition-colors duration-200 ease-in-out hover:text-scheme-text"
          >
            {block.text}
          </a>
        </li>
      ))}
    </ul>
  );
}

function Block({ block, id }) {
  if (block.type === "h") {
    // Level 2 is a subsection: same family, a step down in size and a lighter
    // gap above, so the reader can see at a glance which headings are the
    // policy's spine and which hang off it.
    const Tag = levelOf(block) === 1 ? "h2" : "h3";
    return (
      // `scroll-mt-8` matches the sticky jump list's `top-8`; the navbar is
      // static, so there is nothing else to clear.
      <Tag
        id={id}
        className={
          Tag === "h2"
            ? "mt-12 mb-4 scroll-mt-8 text-h4 font-bold first:mt-0 md:mt-14"
            : "mt-8 mb-3 scroll-mt-8 text-h6 font-bold"
        }
      >
        {block.text}
      </Tag>
    );
  }

  if (block.type === "ul") return <List items={block.items} className="my-4" />;

  // `whitespace-pre-line` honours the line breaks the notices use for postal
  // addresses and phone/TTY pairs; it collapses everything else as usual.
  return (
    <p className="mb-4 whitespace-pre-line">
      {block.lead && (
        <>
          <strong className="font-semibold">{block.lead}</strong>{" "}
        </>
      )}
      {block.bold ? (
        <strong className="font-semibold">
          <Inline text={block.text} />
        </strong>
      ) : (
        <Inline text={block.text} />
      )}
    </p>
  );
}

/**
 * How prominent a heading is.
 *
 * Privacy Policy states it outright — its source marked sections and
 * subsections with different classes. Elsewhere the only signal is the trailing
 * colon: "Contact the Chief Risk Officer:", "We do not warrant that:", "Upon
 * termination:" are lead-ins to the list underneath them, not sections of the
 * policy, and listing them alongside "Limitation of Liability" in the jump list
 * made the list read like a transcript.
 */
function levelOf(block) {
  if (block.level) return block.level;
  return block.text.trim().endsWith(":") ? 2 : 1;
}

/**
 * A list item is either a string or `{ text, items }` for a labelled group.
 *
 * The source page had the nesting flattened by its own CMS — the Accessibility
 * Features list ran two parent labels and their children out at one level,
 * which repeated two lines verbatim and left "Multimedia Accessibility:"
 * reading as a bullet of its own. Same words, nesting restored.
 */
function List({ items, className = "" }) {
  return (
    <ul className={`list-disc pl-5 ${className}`}>
      {items.map((item, index) => (
        <li key={index} className="my-1 self-start pl-2">
          <p className="whitespace-pre-line">
            <Inline text={typeof item === "string" ? item : item.text} />
          </p>
          {typeof item !== "string" && item.items && (
            <List items={item.items} className="mt-1 mb-2" />
          )}
        </li>
      ))}
    </ul>
  );
}

/**
 * Turns the plain strings in a notice into text with links, without touching the
 * wording. Four kinds of thing are linked and nothing else:
 *
 *   - email addresses (mailto:) and the office phone number (tel:)
 *   - the contact form, which the notices cite as `upliftpathwellness.com/contact`;
 *     the href is `/contact-us` (the real route; `/contact` also 301s there)
 *   - the two HHS pages the nondiscrimination notice tells people to use
 *   - the other notices, by their exact titles, so a reader can get from the
 *     Website Privacy Notice to the Consumer Health Data Privacy Notice it
 *     points at. The notices say they are separate documents; this is how a
 *     reader finds the other one.
 *
 * Phrases are matched exactly and case-sensitively. A near-miss stays plain text
 * rather than being linked to the wrong place.
 */
const PHRASE_LINKS = {
  "Cookies and Tracking Technologies Notice":
    "/cookies-and-tracking-technologies",
  "Consumer Health Data Privacy Notice": "/consumer-health-data-privacy",
  "State Privacy Rights Notice": "/state-privacy-rights",
  "Website Notice of Privacy": "/privacy-policy",
  "Website Terms of Use": "/terms-of-use",
  "notice of Nondiscrimination and Language Access":
    "/nondiscrimination-and-language-access",
  "grievance form": "/grievance",
};

const OTHER_LINKS = {
  "upliftpathwellness.com/contact": "/contact-us",
  "ocrportal.hhs.gov/ocr/portal/lobby.jsf":
    "https://ocrportal.hhs.gov/ocr/portal/lobby.jsf",
  "hhs.gov/ocr/office/file/index.html":
    "https://www.hhs.gov/ocr/office/file/index.html",
  "hhs.gov/ocr": "https://www.hhs.gov/ocr",
  "(513) 299-4553": "tel:+15132994553",
};

const escapeRe = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Longest keys first inside each group would matter if one key contained
// another; `hhs.gov/ocr` is a prefix of the form-page path, so the specific
// paths are listed before it above and alternation takes the first that fits.
const INLINE_PATTERN = new RegExp(
  `(${[
    "[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\\.[A-Za-z0-9-]+)*\\.[A-Za-z]{2,}",
    ...Object.keys(OTHER_LINKS).map(escapeRe),
    ...Object.keys(PHRASE_LINKS).map(escapeRe),
  ].join("|")})`,
);

function Inline({ text }) {
  return text.split(INLINE_PATTERN).map((part, index) => {
    if (index % 2 === 0) return part;
    const href = part.includes("@")
      ? `mailto:${part}`
      : (OTHER_LINKS[part] ?? PHRASE_LINKS[part]);
    const external = href.startsWith("https://");
    return (
      <a
        key={index}
        href={href}
        className="underline"
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {part}
      </a>
    );
  });
}

/**
 * Section headings become their own anchors. Lower-cased, punctuation dropped,
 * spaces to hyphens — stable as long as the heading text is, which for a policy
 * is the point: a link someone saved to a section should still land there.
 */
function slug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
