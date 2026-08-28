import * as React from "react";

/** 16:9 iframe embed with a spinning loader until the frame loads. */
export interface VideoEmbedProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  /** Embed URL (YouTube/Vimeo player URL). */
  src: string;
}

export declare function VideoEmbed(props: VideoEmbedProps): JSX.Element;
