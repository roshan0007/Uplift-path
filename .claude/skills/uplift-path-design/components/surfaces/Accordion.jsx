import React from "react";
import { Icon } from "../actions/Icon.jsx";

/**
 * FAQ accordion. Hairline rules top and bottom of each item, chevron rotates 180°.
 * `type="multiple"` lets several items stay open (the site's default).
 */
export function Accordion({ items = [], type = "multiple", defaultOpen = [], style, ...props }) {
  const [open, setOpen] = React.useState(defaultOpen);
  const toggle = (i) => {
    if (type === "single") setOpen(open[0] === i ? [] : [i]);
    else setOpen(open.includes(i) ? open.filter((x) => x !== i) : [...open, i]);
  };
  const rule = "var(--border-width-hairline) solid var(--color-scheme-border, var(--border-default))";
  return (
    <div data-slot="accordion" style={style} {...props}>
      {items.map((item, i) => {
        const isOpen = open.includes(i);
        return (
          <div key={i} data-slot="accordion-item" style={{ borderBottom: rule, borderTop: i === 0 ? rule : "none" }}>
            <button
              type="button"
              data-slot="accordion-trigger"
              data-state={isOpen ? "open" : "closed"}
              onClick={() => toggle(i)}
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                padding: "1rem 0",
                border: "none",
                background: "transparent",
                color: "inherit",
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-medium)",
                fontWeight: "var(--font-weight-semibold)",
                textAlign: "left",
                transition: "all var(--duration-fast) var(--ease-in-out)",
              }}
            >
              {item.question}
              <Icon
                name="keyboard_arrow_down"
                size={28}
                style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform var(--duration-medium) var(--ease-in-out)" }}
              />
            </button>
            <div
              data-slot="accordion-content"
              style={{
                overflow: "hidden",
                display: "grid",
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                transition: `grid-template-rows var(--duration-fast) var(--ease-out)`,
              }}
            >
              <div style={{ minHeight: 0 }}>
                <div style={{ paddingBottom: "1.25rem" }}>{item.answer}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
