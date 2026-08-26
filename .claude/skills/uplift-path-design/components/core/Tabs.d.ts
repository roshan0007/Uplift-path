import * as React from "react";

/** Pill tabs. The active tab is outlined with a 2px scheme border; inactive tabs are borderless. */
export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}
export interface TabsTriggerProps extends React.HTMLAttributes<HTMLButtonElement> { value: string }
export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> { value: string }
export declare function Tabs(props: TabsProps): React.JSX.Element;
export declare function TabsList(props: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
export declare function TabsTrigger(props: TabsTriggerProps): React.JSX.Element;
export declare function TabsContent(props: TabsContentProps): React.JSX.Element;
