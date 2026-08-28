Uplift Path's container. A 2px border in the scheme colour, an 8px radius, and no shadow — flat and "edgy", never soft.

```jsx
<Card>
  <CardHeader><CardTitle>Program Development Consulting</CardTitle></CardHeader>
  <CardContent><p>Design and refine evidence-based programs…</p></CardContent>
  <CardFooter><Button variant="link" size="link">Learn more</Button></CardFooter>
</Card>

<BackgroundCard style={{position:"relative",minHeight:"70vh"}}>
  <img src="assets/images/home-who-we-help-0.png" alt="" />
</BackgroundCard>
```

Use `Card` wherever a boundary is needed and `BackgroundCard` for image tiles — it drops the border so the photo runs to the corner. Slots (`CardHeader`/`CardContent`) pad 24px with no bottom padding, so `CardFooter` supplies the closing 24px. `variant="transparent"` for the 1px white outline used on dark sections.
