import React from "react";

const CDN = "https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/";

/**
 * Material Symbols Rounded glyph, weight 500 — the icon set the source site loads,
 * rendered as an <img> exactly as the source does. On dark schemes pass `invert`
 * to knock the glyph out to white (the same filter the .logo-alt utility uses).
 */
export function Icon({ name, size = 24, invert = false, style, ...props }) {
  const px = typeof size === "number" ? `${size}px` : size;
  return (
    <img
      data-slot="icon"
      alt=""
      aria-hidden="true"
      src={`${CDN}${name}.svg`}
      style={{
        display: "inline-block",
        flex: "none",
        width: px,
        height: px,
        ...(invert ? { filter: "brightness(0) invert(1)" } : null),
        ...style,
      }}
      {...props}
    />
  );
}
