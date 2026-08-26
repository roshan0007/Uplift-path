import * as React from "react";

/** Square checkbox, 18px, 2px radius. Checked fills near-black with a white tick; `alternate` inverts for dark sections. */
export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  /** @default "default" — "alternate" is the white-on-dark treatment for scheme 2/3/6/7/8 sections. */
  variant?: "default" | "alternate";
  style?: React.CSSProperties;
}
export declare function Checkbox(props: CheckboxProps): React.JSX.Element;
