import * as React from "react";

/** Radio set. Items are 18px circles; the selected item fills near-black with a white dot (or tick). */
export interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Applied to every item unless the item overrides it. @default "default" */
  variant?: "default" | "alternate";
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export interface RadioGroupItemProps {
  value: string;
  id?: string;
  /** @default "dot" */
  shape?: "dot" | "check";
  /** Overrides the group's variant. "alternate" is the white-on-dark treatment. */
  variant?: "default" | "alternate";
  disabled?: boolean;
  style?: React.CSSProperties;
}
export declare function RadioGroup(props: RadioGroupProps): React.JSX.Element;
export declare function RadioGroupItem(props: RadioGroupItemProps): React.JSX.Element;
