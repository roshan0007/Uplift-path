import * as React from "react";

/**
 * Bordered container — 2px scheme border, 8px radius. The source calls this the "edgy" card style.
 * @startingPoint section="Core" subtitle="Cards, image cards and card slots" viewport="700x300"
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** `transparent` is the 1px white-outlined version used on dark sections. */
  variant?: "default" | "transparent";
  children?: React.ReactNode;
}

/** Borderless clipped container for full-bleed image cards (the "Who we help" tiles). */
export interface BackgroundCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export declare function Card(props: CardProps): JSX.Element;
export declare function BackgroundCard(props: BackgroundCardProps): JSX.Element;
export declare function CardHeader(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export declare function CardTitle(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export declare function CardDescription(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export declare function CardContent(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export declare function CardFooter(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
