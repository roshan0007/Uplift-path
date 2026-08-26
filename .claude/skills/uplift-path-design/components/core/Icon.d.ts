import * as React from "react";

/**
 * Material Symbols Rounded glyph, masked so it inherits the scheme text colour.
 *
 * @startingPoint section="Core" subtitle="Material Symbols icon set" viewport="700x200"
 */
export interface IconProps {
  /** Material Symbols Rounded glyph name, e.g. "work", "handshake", "chevron_right". */
  name: string;
  /** Pixel size. @default 24 */
  size?: number;
  /** @default "currentColor" */
  color?: string;
  style?: React.CSSProperties;
}
export declare function Icon(props: IconProps): React.JSX.Element;
