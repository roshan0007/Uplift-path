import * as React from "react";

/** Single-slide looping carousel — 48px square outlined arrows, 8px dot pagination. */
export interface CarouselProps {
  slides?: React.ReactNode[];
  loop?: boolean;
  showArrows?: boolean;
  showDots?: boolean;
  style?: React.CSSProperties;
}

export declare function Carousel(props: CarouselProps): JSX.Element;
