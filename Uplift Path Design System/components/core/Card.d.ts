import * as React from "react";

/**
 * Bordered container — 2px scheme border, 8px radius, no shadow ("edgy" card style).
 *
 * @startingPoint section="Core" subtitle="Card, BackgroundCard and card slots" viewport="700x320"
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** @default "default" — "transparent" is the 1px white outline used on imagery. */
  variant?: "default" | "transparent";
}
export interface BackgroundCardProps extends React.HTMLAttributes<HTMLDivElement> {}
export declare function Card(props: CardProps): React.JSX.Element;
/** Borderless clipped container for full-bleed image tiles. */
export declare function BackgroundCard(props: BackgroundCardProps): React.JSX.Element;
export declare function CardHeader(props: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
export declare function CardTitle(props: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
export declare function CardDescription(props: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
export declare function CardContent(props: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
export declare function CardFooter(props: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
