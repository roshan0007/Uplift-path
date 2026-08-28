import * as React from "react";

/** Material Symbols Rounded (weight 500) glyph, tinted with currentColor. */
export interface IconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Material Symbols Rounded glyph name, e.g. `step`, `settings`, `keyboard_arrow_down`. */
  name: string;
  /** Rendered box in px, or any CSS length. Section icons are 48; UI glyphs 24. */
  size?: number | string;
  /** Knocks the glyph out to white for dark schemes. */
  invert?: boolean;
}

export declare function Icon(props: IconProps): JSX.Element;
