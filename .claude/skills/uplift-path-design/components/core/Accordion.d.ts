import * as React from "react";

/**
 * FAQ disclosure list. Rows are separated by 1px scheme-border rules; the chevron
 * rotates 180° when open.
 *
 * @startingPoint section="Core" subtitle="FAQ accordion" viewport="700x300"
 */
export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** @default "single" */
  type?: "single" | "multiple";
  defaultValue?: string | string[];
}
export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> { value: string }
export declare function Accordion(props: AccordionProps): React.JSX.Element;
export declare function AccordionItem(props: AccordionItemProps): React.JSX.Element;
export declare function AccordionTrigger(props: React.HTMLAttributes<HTMLButtonElement>): React.JSX.Element;
export declare function AccordionContent(props: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
