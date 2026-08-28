Modal overlay. On the source site its only job is the video lightbox, so the panel itself is unstyled — you supply the content surface.

```jsx
<Dialog open={open} onClose={() => setOpen(false)}>
  <VideoEmbed src="https://www.youtube.com/embed/…" />
</Dialog>
```

The scrim is the darkest neutral at 90%. The close glyph defaults to `outside` — white, on the scrim, top-right of the viewport. Pass `closeIconPosition="inside"` and a `Card` child when you need a conventional dialog.
