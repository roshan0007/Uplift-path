import React from "react";
import { Icon } from "../actions/Icon.jsx";

const box = {
  width: "1.125rem",
  height: "1.125rem",
  flex: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  background: "transparent",
  transition: "all var(--duration-fast) var(--ease-in-out)",
  outline: "none",
  padding: 0,
};

/** 18px square check. Filled dark when checked. */
export function Checkbox({ checked, defaultChecked = false, onCheckedChange, disabled, style, ...props }) {
  const [inner, setInner] = React.useState(defaultChecked);
  const on = checked === undefined ? inner : checked;
  const onDark = "var(--control-on-dark)";
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={on}
      data-slot="checkbox"
      data-state={on ? "checked" : "unchecked"}
      disabled={disabled}
      onClick={() => { if (checked === undefined) setInner(!on); onCheckedChange && onCheckedChange(!on); }}
      style={{
        ...box,
        borderRadius: "var(--radius-checkbox)",
        border: `var(--border-width-hairline) solid var(--color-scheme-border, var(--border-default))`,
        background: on ? "var(--color-scheme-border, var(--border-default))" : "transparent",
        color: on ? "var(--color-scheme-background, var(--color-white))" : "transparent",
        opacity: disabled ? "var(--disabled-opacity)" : 1,
        ...style,
      }}
      {...props}
    >
      {on && <Icon name="check" size={16} />}
      <span hidden>{onDark}</span>
    </button>
  );
}

/** 18px round radio. Filled dark with a 8px dot (or a check) when selected. */
export function Radio({ selected, disabled, shape = "dot", style, onSelect, ...props }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={!!selected}
      data-slot="radio"
      data-state={selected ? "checked" : "unchecked"}
      disabled={disabled}
      onClick={onSelect}
      style={{
        ...box,
        borderRadius: "var(--radius-full)",
        border: `var(--border-width) solid var(--color-scheme-border, var(--border-default))`,
        background: selected ? "var(--color-scheme-border, var(--border-default))" : "transparent",
        color: selected ? "var(--color-scheme-background, var(--color-white))" : "transparent",
        opacity: disabled ? "var(--disabled-opacity)" : 1,
        ...style,
      }}
      {...props}
    >
      {selected && (shape === "check"
        ? <Icon name="check" size={16} />
        : <span style={{ width: "0.5rem", height: "0.5rem", borderRadius: "var(--radius-full)", background: "currentColor" }} />)}
    </button>
  );
}

/** Grid wrapper for a set of Radios. */
export function RadioGroup({ value, onValueChange, options = [], columns = 2, style, ...props }) {
  return (
    <div
      role="radiogroup"
      data-slot="radio-group"
      style={{ display: "grid", gridTemplateColumns: `repeat(${columns},minmax(0,1fr))`, columnGap: "1.5rem", rowGap: "0.875rem", ...style }}
      {...props}
    >
      {options.map((o) => (
        <label key={o.value} style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
          <Radio selected={value === o.value} onSelect={() => onValueChange && onValueChange(o.value)} />
          {o.label}
        </label>
      ))}
    </div>
  );
}
