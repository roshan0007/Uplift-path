import * as React from "react";

/** Slide track used for testimonials. 48px square outlined arrows; 8px dots below. */
export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  /** @default true */
  loop?: boolean;
  setApi?: (api: unknown) => void;
}
export declare function Carousel(props: CarouselProps): React.JSX.Element;
export declare function CarouselContent(props: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
export declare function CarouselItem(props: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
export declare function CarouselPrevious(props: React.HTMLAttributes<HTMLButtonElement>): React.JSX.Element;
export declare function CarouselNext(props: React.HTMLAttributes<HTMLButtonElement>): React.JSX.Element;
/** Dot pagination. Not in the source Carousel file — the site builds it inline in testimonial-10. */
export declare function CarouselDots(props: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
