import * as React from "react";

/** 18px square check with a 4px radius; fills solid dark when checked. */
export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

/** 18px round radio; a 8px dot or a check mark when selected. */
export interface RadioProps {
  selected?: boolean;
  disabled?: boolean;
  /** Indicator glyph. The source defaults to `dot`. */
  shape?: "dot" | "check";
  onSelect?: () => void;
  style?: React.CSSProperties;
}

/** Grid of radios — the contact form uses two columns. */
export interface RadioGroupProps {
  value?: string;
  onValueChange?: (value: string) => void;
  options?: Array<{ value: string; label: string }>;
  columns?: number;
  style?: React.CSSProperties;
}

export declare function Checkbox(props: CheckboxProps): JSX.Element;
export declare function Radio(props: RadioProps): JSX.Element;
export declare function RadioGroup(props: RadioGroupProps): JSX.Element;
