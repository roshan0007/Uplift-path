import React from "react";
import { Icon } from "../actions/Icon.jsx";

const arrow = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: "3rem",
  height: "3rem",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "var(--radius-carousel)",
  border: "var(--border-width-hairline) solid var(--color-scheme-border, var(--border-default))",
  background: "var(--color-scheme-background, var(--surface-card))",
  color: "var(--color-scheme-text, var(--text-body))",
  zIndex: 20,
};

/** Looping single-slide carousel with square outlined arrows and dot pagination. */
export function Carousel({ slides = [], loop = true, showArrows = true, showDots = true, style, ...props }) {
  const [i, setI] = React.useState(0);
  const last = slides.length - 1;
  const go = (n) => setI(loop ? (n + slides.length) % slides.length : Math.max(0, Math.min(last, n)));
  return (
    <div data-slot="carousel" role="region" aria-roledescription="carousel" style={{ position: "relative", overflow: "hidden", ...style }} {...props}>
      <div data-slot="carousel-content" style={{ display: "flex", transform: `translateX(-${i * 100}%)`, transition: "transform var(--duration-slow) var(--ease-standard)" }}>
        {slides.map((s, n) => (
          <div key={n} role="group" aria-roledescription="slide" data-slot="carousel-item" style={{ minWidth: 0, flex: "0 0 100%" }}>
            {s}
          </div>
        ))}
      </div>
      {showArrows && (
        <>
          <button type="button" data-slot="carousel-previous" aria-label="Previous slide" onClick={() => go(i - 1)} style={{ ...arrow, left: 0 }}>
            <Icon name="arrow_back" size={24} />
          </button>
          <button type="button" data-slot="carousel-next" aria-label="Next slide" onClick={() => go(i + 1)} style={{ ...arrow, right: 0 }}>
            <Icon name="arrow_forward" size={24} />
          </button>
        </>
      )}
      {showDots && (
        <div style={{ display: "flex", justifyContent: "center", height: "1.75rem", paddingTop: "0.625rem" }}>
          {slides.map((_, n) => (
            <button
              key={n}
              type="button"
              aria-label={`Slide ${n + 1}`}
              onClick={() => go(n)}
              style={{
                position: "relative",
                margin: "0 3px",
                width: "0.5rem",
                height: "0.5rem",
                border: "none",
                padding: 0,
                borderRadius: "var(--radius-full)",
                background: "var(--color-scheme-text, var(--text-body))",
                opacity: n === i ? 1 : 0.2,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
