Text entry for Uplift Path forms — `Input`, `Textarea` and `Label`, all sharing a 2px border, 12px radius and 44px minimum height.

```jsx
<div style={{display:"grid"}}>
  <Label htmlFor="email" style={{marginBottom:"0.5rem"}}>Email</Label>
  <Input type="email" id="email" />
</div>
<Textarea placeholder="Type your message..." style={{minHeight:"11.25rem"}} />
```

Fields are transparent, not filled — the border does the work. Hovering washes the field with 5% of the text colour. On a dark section pass `variant="secondary"` for white borders. Message textareas on the live contact form are 11.25rem tall.
