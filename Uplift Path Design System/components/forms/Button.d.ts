import * as React from "react";

/**
 * Primary action control. Solid Caribbean Green by default; `secondary` is the
 * bordered/transparent variant used on most section CTAs.
 *
 * @startingPoint section="Core" subtitle="Button variants and sizes" viewport="700x220"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual treatment. @default "default" */
  variant?: "default" | "alternate" | "secondary" | "secondary-alt" | "link" | "link-alt" | "ghost" | "none";
  /** @default "default" */
  size?: "default" | "sm" | "link" | "icon" | "none";
  /** Icon element rendered before the label. */
  iconLeft?: React.ReactNode;
  /** Icon element rendered after the label. */
  iconRight?: React.ReactNode;
}
export declare function Button(props: ButtonProps): React.JSX.Element;
