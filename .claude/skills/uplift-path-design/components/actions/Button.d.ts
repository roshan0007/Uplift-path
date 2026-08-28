import * as React from "react";

/**
 * Uplift Path button. Hard 3px ledge shadow that presses down on hover.
 * @startingPoint section="Core" subtitle="Primary, secondary and link buttons" viewport="700x180"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual treatment. `default` is the green primary; `secondary` is the outlined pair to it; `dark` is the black button used on green sections. */
  variant?: "default" | "alternate" | "secondary" | "secondary-alt" | "dark" | "link" | "link-alt" | "ghost" | "none";
  /** `default` for standard actions, `sm` for the navbar, `icon` for square carousel controls. */
  size?: "default" | "sm" | "link" | "icon" | "none";
  /** Icon element rendered before the label. */
  iconLeft?: React.ReactNode;
  /** Icon element rendered after the label. */
  iconRight?: React.ReactNode;
  disabled?: boolean;
  children?: React.ReactNode;
}

export declare function Button(props: ButtonProps): JSX.Element;
