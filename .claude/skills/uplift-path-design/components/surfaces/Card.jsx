import React from "react";

/** Bordered container — 2px scheme border, 8px radius ("edgy" card style). */
export function Card({ variant = "default", style, children, ...props }) {
  const tones = {
    default: {
      border: "var(--border-width) solid var(--color-scheme-border, var(--border-default))",
      background: "var(--color-scheme-foreground, var(--surface-card))",
      color: "var(--color-scheme-text, var(--text-body))",
    },
    transparent: {
      border: "var(--border-width-hairline) solid var(--color-white)",
      background: "transparent",
      color: "var(--color-white)",
    },
  };
  return (
    <div data-slot="card" style={{ overflow: "hidden", borderRadius: "var(--radius-card)", ...tones[variant], ...style }} {...props}>
      {children}
    </div>
  );
}

/** Borderless clipped container used for full-bleed image cards. */
export function BackgroundCard({ style, children, ...props }) {
  return (
    <div data-slot="bg-card" style={{ overflow: "hidden", borderRadius: "var(--radius-card)", ...style }} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ style, children, ...props }) {
  return <div data-slot="card-header" style={{ display: "flex", flexDirection: "column", gap: "0.375rem", padding: "1.5rem 1.5rem 0", ...style }} {...props}>{children}</div>;
}
export function CardTitle({ style, children, ...props }) {
  return <div data-slot="card-title" style={{ lineHeight: 1, fontWeight: "var(--font-weight-semibold)", ...style }} {...props}>{children}</div>;
}
export function CardDescription({ style, children, ...props }) {
  return <div data-slot="card-description" style={{ fontSize: "var(--text-small)", color: "var(--text-muted)", ...style }} {...props}>{children}</div>;
}
export function CardContent({ style, children, ...props }) {
  return <div data-slot="card-content" style={{ padding: "1.5rem 1.5rem 0", ...style }} {...props}>{children}</div>;
}
export function CardFooter({ style, children, ...props }) {
  return <div data-slot="card-footer" style={{ display: "flex", alignItems: "center", padding: "1.5rem", ...style }} {...props}>{children}</div>;
}
