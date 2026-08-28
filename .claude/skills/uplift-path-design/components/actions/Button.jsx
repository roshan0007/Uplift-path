import React from "react";

const base = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.75rem",
  border: "none",
  borderRadius: "var(--radius-button)",
  whiteSpace: "nowrap",
  fontFamily: "var(--font-body)",
  fontSize: "inherit",
  transition: "all var(--duration-fast) var(--ease-in-out)",
  outline: "none",
  boxSizing: "border-box",
  background: "transparent",
  color: "inherit",
};

const sizes = {
  default: { padding: "0.625rem 1.5rem", marginBottom: "0.25rem" },
  sm: { padding: "0.375rem 1.25rem", marginBottom: "0.25rem" },
  link: { padding: 0, borderRadius: 0 },
  icon: { width: "2.5rem", height: "2.5rem", padding: 0 },
  none: { borderRadius: 0 },
};

const variants = {
  default: {
    border: "var(--border-width) solid var(--action-primary-edge)",
    background: "var(--action-primary-bg)",
    color: "var(--action-primary-text)",
    fontWeight: "var(--font-weight-medium)",
    boxShadow: "var(--shadow-press-accent)",
  },
  alternate: {
    border: "var(--border-width) solid var(--border-subtle)",
    background: "var(--color-white)",
    color: "var(--color-neutral-darkest)",
    fontWeight: "var(--font-weight-medium)",
    boxShadow: "var(--shadow-press-light)",
  },
  secondary: {
    border: "var(--border-width) solid var(--color-scheme-border, var(--border-default))",
    background: "transparent",
    color: "var(--color-scheme-text, var(--text-body))",
    fontWeight: "var(--font-weight-medium)",
    boxShadow: "0 3px 0 0 var(--color-scheme-border, var(--border-default))",
  },
  "secondary-alt": {
    border: "var(--border-width) solid var(--color-white)",
    background: "transparent",
    color: "var(--color-white)",
    fontWeight: "var(--font-weight-medium)",
    boxShadow: "var(--shadow-press-white)",
  },
  dark: {
    border: "var(--border-width) solid var(--color-neutral-darkest)",
    background: "var(--color-neutral-darkest)",
    color: "var(--color-white)",
    fontWeight: "var(--font-weight-medium)",
    boxShadow: "none",
  },
  link: { gap: "0.5rem", color: "var(--color-scheme-text, var(--text-body))" },
  "link-alt": { gap: "0.5rem", color: "var(--color-white)" },
  ghost: {},
  none: {},
};

const pressable = { default: 1, secondary: 1, "secondary-alt": 1, alternate: 1 };

/** Uplift Path's primary action. Hard 3px ledge that presses down on hover. */
export function Button({
  variant = "default",
  size = "default",
  iconLeft,
  iconRight,
  disabled,
  style,
  children,
  ...props
}) {
  const [pressed, setPressed] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const canPress = pressable[variant] && !disabled;
  const active = canPress && (hovered || pressed);
  return (
    <button
      data-slot="button"
      data-variant={variant}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        ...base,
        ...sizes[size],
        ...variants[variant],
        ...(active ? { transform: "translateY(3px)", boxShadow: "none" } : null),
        ...(variant === "ghost" && hovered ? { background: "var(--color-neutral-darkest)", color: "var(--color-white)" } : null),
        ...(disabled ? { opacity: "var(--disabled-opacity)", pointerEvents: "none" } : null),
        ...style,
      }}
      {...props}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
