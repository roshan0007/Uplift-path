import React from "react";
import { Icon } from "../actions/Icon.jsx";

/** Dropdown. Trigger matches Input; the panel is a square-cornered bordered sheet. */
export function Select({ value, onValueChange, placeholder = "Select one...", options = [], variant = "primary", style, ...props }) {
  const [open, setOpen] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const onDark = variant === "secondary";
  const selected = options.find((o) => o.value === value);
  return (
    <div data-slot="select" style={{ position: "relative", width: "100%", ...style }} {...props}>
      <button
        type="button"
        data-slot="select-trigger"
        data-state={open ? "open" : "closed"}
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: "flex",
          width: "100%",
          minHeight: "2.75rem",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.25rem",
          padding: "0.5rem 0.75rem",
          borderRadius: "var(--radius-form)",
          border: `var(--border-width) solid ${onDark ? "var(--color-white)" : "var(--color-scheme-border, var(--border-default))"}`,
          background: hover ? (onDark ? "var(--hover-wash-light)" : "var(--hover-wash-dark)") : "transparent",
          color: onDark ? "var(--color-white)" : "var(--color-scheme-text, var(--text-body))",
          fontFamily: "var(--font-body)",
          fontSize: "inherit",
          whiteSpace: "nowrap",
          transition: "all var(--duration-fast) var(--ease-in-out)",
          boxSizing: "border-box",
        }}
      >
        <span style={{ opacity: selected ? 1 : 0.6 }}>{selected ? selected.label : placeholder}</span>
        <Icon name="keyboard_arrow_down" size={20} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform var(--duration-medium) var(--ease-in-out)" }} />
      </button>
      {open && (
        <div
          data-slot="select-content"
          style={{
            position: "absolute",
            zIndex: 50,
            top: "calc(100% + 0.25rem)",
            left: 0,
            right: 0,
            maxHeight: "24rem",
            overflow: "auto",
            padding: "0.25rem",
            border: "var(--border-width-hairline) solid var(--color-scheme-border, var(--border-default))",
            background: "var(--color-scheme-background, var(--surface-card))",
            color: "var(--color-scheme-text, var(--text-body))",
          }}
        >
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              data-slot="select-item"
              onClick={() => { onValueChange && onValueChange(o.value); setOpen(false); }}
              style={{
                position: "relative",
                display: "flex",
                width: "100%",
                alignItems: "center",
                padding: "0.5rem 0.75rem",
                border: "none",
                background: value === o.value ? "var(--hover-wash-dark)" : "transparent",
                color: "inherit",
                font: "inherit",
                textAlign: "left",
              }}
            >
              {o.label}
              {value === o.value && <Icon name="check" size={20} style={{ position: "absolute", right: "0.5rem" }} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
