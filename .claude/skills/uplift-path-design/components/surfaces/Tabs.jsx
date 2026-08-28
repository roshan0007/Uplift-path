import React from "react";

/**
 * Pill tab set. The active trigger keeps its 2px scheme border; inactive triggers
 * hold the same box with a transparent border, so nothing shifts on select.
 */
export function Tabs({ tabs = [], value, onValueChange, defaultValue, orientation = "horizontal", style, ...props }) {
  const [inner, setInner] = React.useState(defaultValue ?? (tabs[0] && tabs[0].value));
  const active = value === undefined ? inner : value;
  const select = (v) => { if (value === undefined) setInner(v); onValueChange && onValueChange(v); };
  return (
    <div data-slot="tabs" style={style} {...props}>
      <div
        data-slot="tabs-list"
        style={{ display: "flex", flexDirection: orientation === "vertical" ? "column" : "row", gap: "1.5rem", alignItems: orientation === "vertical" ? "stretch" : "center" }}
      >
        {tabs.map((t) => (
          <button
            key={t.value}
            type="button"
            data-slot="tabs-trigger"
            data-state={active === t.value ? "active" : "inactive"}
            onClick={() => select(t.value)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.625rem 1.5rem",
              borderRadius: "var(--radius-button)",
              border: `var(--border-width) solid ${active === t.value ? "var(--color-scheme-border, var(--border-default))" : "transparent"}`,
              background: "transparent",
              color: "inherit",
              fontFamily: "var(--font-body)",
              fontSize: "inherit",
              whiteSpace: "nowrap",
              transition: "all var(--duration-fast) var(--ease-in-out)",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t) =>
        t.value === active ? (
          <div key={t.value} data-slot="tabs-content" style={{ animation: "uplift-tabs var(--duration-slow) var(--ease-standard) forwards" }}>
            {t.content}
          </div>
        ) : null
      )}
      <style>{"@keyframes uplift-tabs{from{opacity:0}to{opacity:1}}"}</style>
    </div>
  );
}
