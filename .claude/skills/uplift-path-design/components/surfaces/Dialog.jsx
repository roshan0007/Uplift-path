import React from "react";
import { Icon } from "../actions/Icon.jsx";

/** Centred modal over a 90% dark scrim. Close glyph sits outside the panel by default. */
export function Dialog({ open, onClose, closeIconPosition = "outside", width = "48rem", style, children, ...props }) {
  if (!open) return null;
  return (
    <div data-slot="dialog-portal" style={{ position: "fixed", inset: 0, zIndex: 50 }}>
      <div
        data-slot="dialog-overlay"
        onClick={onClose}
        style={{ position: "absolute", inset: 0, background: "color-mix(in srgb,var(--color-neutral-darkest),transparent 10%)", animation: "uplift-fade var(--duration-fast) var(--ease-out)" }}
      >
        {closeIconPosition === "outside" && (
          <button type="button" aria-label="Close" onClick={onClose} style={closeStyle("var(--color-white)")}>
            <Icon name="close" size={28} />
          </button>
        )}
      </div>
      <div
        data-slot="dialog-content"
        role="dialog"
        aria-modal="true"
        style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "100%", maxWidth: width, padding: "1.5rem", boxSizing: "border-box", ...style }}
        {...props}
      >
        {children}
        {closeIconPosition === "inside" && (
          <button type="button" aria-label="Close" onClick={onClose} style={closeStyle("var(--color-neutral-darkest)")}>
            <Icon name="close" size={28} />
          </button>
        )}
      </div>
      <style>{"@keyframes uplift-fade{from{opacity:0}to{opacity:1}}"}</style>
    </div>
  );
}

function closeStyle(color) {
  return {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    display: "inline-flex",
    border: "none",
    background: "transparent",
    color,
    opacity: 0.6,
    padding: 0,
    transition: "opacity var(--duration-fast) var(--ease-in-out)",
    zIndex: 60,
  };
}

export function DialogHeader({ style, children, ...props }) {
  return <div data-slot="dialog-header" style={{ display: "flex", flexDirection: "column", gap: "0.375rem", ...style }} {...props}>{children}</div>;
}
export function DialogTitle({ style, children, ...props }) {
  return <div data-slot="dialog-title" style={{ fontSize: "var(--text-h6)", lineHeight: 1, fontWeight: "var(--font-weight-semibold)", ...style }} {...props}>{children}</div>;
}
export function DialogDescription({ style, children, ...props }) {
  return <div data-slot="dialog-description" style={{ fontSize: "var(--text-small)", color: "var(--text-muted)", ...style }} {...props}>{children}</div>;
}
export function DialogFooter({ style, children, ...props }) {
  return <div data-slot="dialog-footer" style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "0.25rem", ...style }} {...props}>{children}</div>;
}
