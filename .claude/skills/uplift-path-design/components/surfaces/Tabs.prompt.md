Segments a feature section into named views — used for the advisor list on About Us and the service tabs on the For Individuals page.

```jsx
<Tabs
  defaultValue="tab-1"
  tabs={[
    { value: "tab-1", label: "Mariza Green", content: <AdvisorPanel /> },
    { value: "tab-2", label: "Regina Wooten", content: <AdvisorPanel /> },
  ]}
/>
```

Triggers are button-radius pills, 24px horizontal padding. Only the active one shows its 2px border; inactive triggers keep a transparent border of the same width, so selecting never nudges the layout. Content fades in over 600ms. `orientation="vertical"` for the stacked list layout.
