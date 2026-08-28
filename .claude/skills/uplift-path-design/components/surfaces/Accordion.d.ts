import * as React from "react";

/**
 * FAQ accordion — hairline rules, semibold question, chevron rotating 180°.
 * @startingPoint section="Core" subtitle="FAQ accordion, tabs and carousel" viewport="700x320"
 */
export interface AccordionProps {
  items?: Array<{ question: React.ReactNode; answer: React.ReactNode }>;
  /** `multiple` (the site default) allows several open at once. */
  type?: "single" | "multiple";
  /** Indexes open on first render. */
  defaultOpen?: number[];
  style?: React.CSSProperties;
}

export declare function Accordion(props: AccordionProps): JSX.Element;
