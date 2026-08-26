import * as React from "react";

/** Single-line text field. Underline only — a 2px bottom rule, no box, no fill. */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** @default "primary" — "secondary" is the white-on-dark treatment. */
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
  /** @default "left" */
  iconPosition?: "left" | "right";
  /** Bordered affix (e.g. a currency or country code). */
  prefix?: React.ReactNode;
  /** @default "left" */
  prefixPosition?: "left" | "right";
}
export declare function Input(props: InputProps): React.JSX.Element;
