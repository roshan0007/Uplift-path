import * as React from "react";

/** Embedded 16:9 video with a spinner until the iframe loads. */
export interface VideoIframeProps {
  /** Embed URL. */
  video: string;
  style?: React.CSSProperties;
}
export declare function VideoIframe(props: VideoIframeProps): React.JSX.Element;
