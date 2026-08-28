Carries the testimonial section on the homepage — one quote per slide, arrows outside the content, dots below.

```jsx
<Carousel slides={[<Quote key="a" />, <Quote key="b" />]} />
```

Arrows are 48px squares with an 8px radius and a 1px border — the only place in the system where a control is square-ish rather than a bubble. Dots are 8px, active at full opacity and inactive at 20% of the text colour. Arrows hide below the md breakpoint on the live site; dots stay.

Do not put horizontal padding on the Carousel itself — `overflow: hidden` clips at the padding box, so padding becomes a window onto the next slide. Inset it with a wrapper div instead.
