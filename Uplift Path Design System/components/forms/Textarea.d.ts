import * as React from "react";

/** Multi-line field. Same underline treatment as Input; contact forms use min-height 11.25rem. */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** @default "primary" */
  variant?: "primary" | "secondary";
}
export declare function Textarea(props: TextareaProps): React.JSX.Element;
