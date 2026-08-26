18px square checkbox — used for consent rows in contact and signup forms.

```jsx
<div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
  <Checkbox id="terms" />
  <Label htmlFor="terms">I accept the terms</Label>
</div>
```

On a dark section (scheme 2, 3, 6, 7, 8) pass `variant="alternate"`: white border, and when checked a white fill with a near-black tick. Hover washes the box 5% (near-black) or 10% (white).
