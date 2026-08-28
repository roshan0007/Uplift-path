import * as React from "react";

/** Dropdown select. Trigger matches Input; the panel is a square-cornered 1px sheet. */
export interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  /** Shown at 60% opacity when nothing is selected. The site uses "Select one...". */
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  /** `secondary` forces white borders for dark sections. */
  variant?: "primary" | "secondary";
  style?: React.CSSProperties;
}

export declare function Select(props: SelectProps): JSX.Element;
