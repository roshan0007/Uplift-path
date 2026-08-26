import React from "react";

/**
 * Material Symbols Rounded (weight 500) served from jsDelivr — the same source the
 * exported site pulls its inline nav/feature icons from. Rendered as a masked span so
 * the glyph takes `color` from the current scheme.
 */
export function Icon({name,size=24,color="currentColor",style,...props}) {
  const url = `url("https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/${name}.svg")`;
  return (
    <span
      role="img" aria-label={name} data-slot="icon"
      style={{
        display:"inline-block",width:size,height:size,flex:"none",backgroundColor:color,
        WebkitMaskImage:url,maskImage:url,
        WebkitMaskRepeat:"no-repeat",maskRepeat:"no-repeat",
        WebkitMaskSize:"contain",maskSize:"contain",
        WebkitMaskPosition:"center",maskPosition:"center",...style
      }}
      {...props}
    />
  );
}
