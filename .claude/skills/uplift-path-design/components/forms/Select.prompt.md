Dropdown for form choices. The trigger is an Input with a `keyboard_arrow_down` chevron that rotates 180° when open.

```jsx
<Select
  placeholder="Select one..."
  value={topic}
  onValueChange={setTopic}
  options={[{value:"first",label:"First Choice"},{value:"second",label:"Second Choice"}]}
/>
```

Note the deliberate mismatch, copied from the source: the trigger has a 12px radius and a 2px border, but the open panel is square-cornered with a 1px border. Selected items get a check on the right edge.
