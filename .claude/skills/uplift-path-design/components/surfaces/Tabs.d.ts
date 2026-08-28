import * as React from "react";

/** Pill tab set — active trigger keeps a 2px border, inactive holds the same box with a transparent one. */
export interface TabsProps {
  tabs?: Array<{ value: string; label: React.ReactNode; content?: React.ReactNode }>;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** `vertical` stacks the list, as on the Resource Assistance page. */
  orientation?: "horizontal" | "vertical";
  style?: React.CSSProperties;
}

export declare function Tabs(props: TabsProps): JSX.Element;
