import * as React from "react";

/** Dropdown with the same underline treatment as Input. Chevron rotates 180° when open. */
export interface SelectOption { value: string; label: string }
export interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** @default "Select one..." */
  placeholder?: string;
  options?: SelectOption[];
  /** @default "primary" */
  variant?: "primary" | "secondary";
  style?: React.CSSProperties;
}
export declare function Select(props: SelectProps): React.JSX.Element;
