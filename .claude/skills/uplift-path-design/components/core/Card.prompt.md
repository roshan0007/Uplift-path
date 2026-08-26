Two containers. `Card` is the bordered box that wraps the footer and CTA panels; `BackgroundCard` is the borderless clipped tile used for image-backed feature cards.

```jsx
<Card style={{padding:"3rem"}}>…</Card>

<BackgroundCard style={{position:"relative",minHeight:"70vh"}}>
  <img src="…" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}} />
  <div style={{position:"absolute",inset:0,background:"var(--scrim)"}} />
</BackgroundCard>
```

Never add a drop shadow — this brand has no elevation system.
