import * as React from "react";

/** Centred modal over a 90%-opaque dark scrim. */
export interface DialogProps {
  open?: boolean;
  onClose?: () => void;
  /** `outside` puts the white close glyph on the scrim (the source default); `inside` puts a dark one on the panel. */
  closeIconPosition?: "outside" | "inside";
  /** Max panel width; the source's video lightbox is 48rem. */
  width?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export declare function Dialog(props: DialogProps): JSX.Element | null;
export declare function DialogHeader(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export declare function DialogTitle(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export declare function DialogDescription(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export declare function DialogFooter(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
