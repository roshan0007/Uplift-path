Radio set — the contact form uses a two-column grid of these ("Which best describes you?").

```jsx
<RadioGroup defaultValue="owner" style={{gridTemplateColumns:"1fr 1fr",gap:"0.875rem 1.5rem"}}>
  <Label htmlFor="owner"><RadioGroupItem value="owner" id="owner" />Business owner</Label>
  <Label htmlFor="indiv"><RadioGroupItem value="indiv" id="indiv" />Individual</Label>
</RadioGroup>
```

Set `variant="alternate"` on the group for dark sections (scheme 2, 3, 6, 7, 8): white ring, and when selected a white fill with a near-black dot.
