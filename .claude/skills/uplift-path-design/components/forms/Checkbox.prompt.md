Boolean and single-choice controls — both 18px, both outlined then filled solid dark when on.

```jsx
<label style={{display:"flex",gap:"0.5rem",alignItems:"center"}}>
  <Checkbox defaultChecked />
  I accept the terms
</label>

<RadioGroup
  value={who}
  onValueChange={setWho}
  options={[{value:"owner",label:"Business owner"},{value:"individual",label:"Individual"}]}
/>
```

Checkbox uses a 1px border and a 4px radius; Radio uses a 2px border and is fully round. Neither has a coloured "on" state — they fill with the scheme border colour (dark on light sections, white on dark ones).
