import React from "react";

const shell = {
  display: "flex",
  width: "100%",
  minHeight: "2.75rem",
  padding: "0.5rem 0.75rem",
  borderRadius: "var(--radius-form)",
  background: "transparent",
  fontFamily: "var(--font-body)",
  fontSize: "inherit",
  boxSizing: "border-box",
  transition: "all var(--duration-fast) var(--ease-in-out)",
  outline: "none",
};

function tone(variant) {
  const onDark = variant === "secondary";
  return {
    border: `var(--border-width) solid ${onDark ? "var(--color-white)" : "var(--color-scheme-border, var(--border-default))"}`,
    color: onDark ? "var(--color-white)" : "var(--color-scheme-text, var(--text-body))",
  };
}

/** Single-line text field. 2px border, 12px radius, 44px minimum height. */
export function Input({ variant = "primary", icon, iconPosition = "left", prefix, prefixPosition = "left", style, ...props }) {
  const [hover, setHover] = React.useState(false);
  const affix = {
    minHeight: "2.75rem",
    flex: "none",
    display: "flex",
    alignItems: "center",
    padding: "0.5rem 0.75rem",
    borderTop: "var(--border-width-hairline) solid var(--color-scheme-border, var(--border-default))",
    borderBottom: "var(--border-width-hairline) solid var(--color-scheme-border, var(--border-default))",
  };
  return (
    <div style={{ position: "relative", display: "flex", width: "100%", alignItems: "center" }}>
      {icon && iconPosition === "left" && <div style={{ position: "absolute", left: "0.75rem", display: "flex" }}>{icon}</div>}
      {prefix && prefixPosition === "left" && (
        <div style={{ ...affix, borderLeft: "var(--border-width-hairline) solid var(--color-scheme-border, var(--border-default))" }}>{prefix}</div>
      )}
      <input
        data-slot="input"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          ...shell,
          ...tone(variant),
          ...(hover ? { background: variant === "secondary" ? "var(--hover-wash-light)" : "var(--hover-wash-dark)" } : null),
          ...(icon ? (iconPosition === "left" ? { paddingLeft: "2.75rem" } : { paddingRight: "2.75rem" }) : null),
          ...(prefix ? { flexGrow: 1 } : null),
          ...style,
        }}
        {...props}
      />
      {icon && iconPosition === "right" && <div style={{ position: "absolute", right: "0.75rem", display: "flex" }}>{icon}</div>}
      {prefix && prefixPosition === "right" && (
        <div style={{ ...affix, borderRight: "var(--border-width-hairline) solid var(--color-scheme-border, var(--border-default))" }}>{prefix}</div>
      )}
    </div>
  );
}

/** Multi-line text field. Same border treatment as Input. */
export function Textarea({ variant = "primary", style, ...props }) {
  const [hover, setHover] = React.useState(false);
  return (
    <textarea
      data-slot="textarea"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...shell,
        ...tone(variant),
        padding: "0.75rem",
        ...(hover ? { background: variant === "secondary" ? "var(--hover-wash-light)" : "var(--hover-wash-dark)" } : null),
        ...style,
      }}
      {...props}
    />
  );
}

/** Field label. Sits 8px above its control. */
export function Label({ style, children, ...props }) {
  return (
    <label
      data-slot="label"
      style={{ display: "flex", alignItems: "center", gap: "0.5rem", userSelect: "none", fontFamily: "var(--font-body)", ...style }}
      {...props}
    >
      {children}
    </label>
  );
}
