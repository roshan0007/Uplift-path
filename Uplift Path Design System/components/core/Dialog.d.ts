import * as React from "react";

/** Centred modal over a 90%-opaque near-black scrim. The close icon sits outside the panel by default. */
export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** @default "outside" */
  closeIconPosition?: "outside" | "inside";
}
export declare function Dialog(props: DialogProps): React.JSX.Element | null;
export declare function DialogHeader(props: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
export declare function DialogTitle(props: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
export declare function DialogDescription(props: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
export declare function DialogFooter(props: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
