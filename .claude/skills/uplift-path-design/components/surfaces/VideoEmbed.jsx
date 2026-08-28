import React from "react";
import { Icon } from "../actions/Icon.jsx";

/** 16:9 iframe embed with a spinning loader until the frame reports ready. */
export function VideoEmbed({ src, style, ...props }) {
  const [loaded, setLoaded] = React.useState(false);
  return (
    <>
      {!loaded && (
        <Icon
          name="progress_activity"
          size={64}
          style={{ margin: "0 auto", display: "block", color: "var(--color-white)", animation: "uplift-spin 1s linear infinite" }}
        />
      )}
      <iframe
        data-slot="video-iframe"
        src={src}
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        onLoad={() => setLoaded(true)}
        style={{ display: loaded ? "block" : "none", margin: "0 auto", aspectRatio: "16 / 9", width: "100%", height: "100%", border: "none", ...style }}
        {...props}
      />
      <style>{"@keyframes uplift-spin{to{transform:rotate(360deg)}}"}</style>
    </>
  );
}
