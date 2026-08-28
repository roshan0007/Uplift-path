import * as React from "react";

/**
 * Single-line text field — 2px border, 12px radius, 44px min height.
 * @startingPoint section="Forms" subtitle="Text fields, labels and controls" viewport="700x320"
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** `primary` borders in the scheme colour; `secondary` forces white borders for dark sections. */
  variant?: "primary" | "secondary";
  /** Icon element absolutely positioned inside the field. */
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  /** Bordered affix block (currency, domain) butted against the field. */
  prefix?: React.ReactNode;
  prefixPosition?: "left" | "right";
}

/** Multi-line text field with the same border treatment as Input. */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: "primary" | "secondary";
}

/** Field label; sits 8px above its control. */
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children?: React.ReactNode;
}

export declare function Input(props: InputProps): JSX.Element;
export declare function Textarea(props: TextareaProps): JSX.Element;
export declare function Label(props: LabelProps): JSX.Element;
