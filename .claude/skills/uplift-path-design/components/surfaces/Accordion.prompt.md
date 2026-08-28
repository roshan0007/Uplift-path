The FAQ pattern. Every page on the site ends with one of these above the CTA banner.

```jsx
<Accordion
  type="multiple"
  items={[
    { question: "What is business consulting?", answer: "Business consulting involves providing expert advice…" },
  ]}
/>
```

Items are separated by 1px rules only — no cards, no fills. Question rows are 16px vertical padding (20px from the md breakpoint up) and semibold; answers are regular weight with 20px of bottom padding. Open/close runs 200ms ease-out. Wrap in a `max-width: 48rem` centred container, as the site does.
