"use client";

import React from "react";

/**
 * The one layout every legal page uses: Accessibility, Terms of Use, Privacy
 * Policy and Grievance.
 *
 * These pages replace three lorem-ipsum stubs the Relume export shipped. The
 * words are the live ones lifted from upliftpathwellness.com — not rewritten,
 * not summarised, because a policy that has been paraphrased is a different
 * policy. What changed is only the typography and the layout.
 *
 * Two columns from `lg`: the title, the last-updated date and a jump list on
 * the left, the policy itself on the right. Privacy Policy alone runs to 127
 * blocks and Terms to 142 — long enough that a single centred column gives a
 * reader no idea where they are or how much is left, and no way to reach the
 * one section they actually came for. The left column sticks as the body
 * scrolls, so the jump list is always in reach.
 *
 * The measure is capped at 45rem. The design system puts text columns at 35rem
 * and heading blocks at 48rem; policy prose sits between the two — narrower
 * than a heading block, but tight enough that a 90-character legal sentence
 * does not run the full width of a desktop.
 *
 * Headings are h2 throughout. The source used h3 for every section under a
 * single h2 page title, which skips no levels only because there is nothing
 * between them; rendering them as h2 under the page's h1 keeps the outline
 * honest for a screen reader and for the SEO audit.
 *
 * @param {{
 *   title: string,
 *   updated?: string | null,
 *   intro?: React.ReactNode,
 *   content: Array<Record<string, any>>,
 *   children?: React.ReactNode,
 * }} props
 */
export function LegalPage({
  title,
  updated,
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

  return (
    <section className="px-[5%] py-16 md:py-20 lg:py-24 scheme-1 badge-alt">
      <div className="container grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-16">
        <header className="lg:sticky lg:top-24 lg:self-start">
          <h1 className="text-h2 font-bold">{title}</h1>
          {updated && (
            <p className="mt-4 text-small text-scheme-text/60">
              Last updated {updated}
            </p>
          )}
          {sections.length > 2 && (
            <nav aria-label="On this page" className="mt-8 hidden lg:block">
              <p className="mb-4 text-small font-semibold">On this page</p>
              {/* A hairline rule down the list, which is the treatment the
                  footer divider and the accordion already use. The 1px is
                  deliberate — a 2px border here would read as a card edge. */}
              <ul className="max-h-[50vh] space-y-3 overflow-y-auto border-l border-scheme-border pl-4 text-small">
                {sections.map(({ block, id }) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className="block transition-opacity duration-200 ease-in-out hover:opacity-70"
                    >
                      {block.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </header>

        <div className="max-w-[45rem]">
          {intro}
          {content.map((block, index) => (
            <Block key={index} block={block} id={ids[index]} />
          ))}
          {children}
        </div>
      </div>
    </section>
  );
}

function Block({ block, id }) {
  if (block.type === "h") {
    // Level 2 is a subsection: same family, a step down in size and a lighter
    // gap above, so the reader can see at a glance which headings are the
    // policy's spine and which hang off it.
    const Tag = levelOf(block) === 1 ? "h2" : "h3";
    return (
      // `scroll-mt` clears the sticky navbar when the jump list lands here.
      <Tag
        id={id}
        className={
          Tag === "h2"
            ? "mt-12 mb-4 scroll-mt-24 text-h4 font-bold first:mt-0 md:mt-14"
            : "mt-8 mb-3 scroll-mt-24 text-h6 font-bold"
        }
      >
        {block.text}
      </Tag>
    );
  }

  if (block.type === "ul") return <List items={block.items} className="my-4" />;

  return <p className="mb-4">{block.text}</p>;
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
          <p>{typeof item === "string" ? item : item.text}</p>
          {typeof item !== "string" && item.items && (
            <List items={item.items} className="mt-1 mb-2" />
          )}
        </li>
      ))}
    </ul>
  );
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
