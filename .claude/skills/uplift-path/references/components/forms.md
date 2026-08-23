# Forms

Source: `components/uplift/field.tsx`.

```tsx
import { Field, Input, Textarea, Select, Checkbox, Button } from '@/components/uplift'
```

## Field is a wrapper, not a render prop

`Field` renders the label, the control you pass as children, and the hint or
error text. It does **not** clone or inject props into the control.

This matters: an earlier render-prop design (`<Field>{(props) => …}</Field>`)
could not cross the Next.js server/client boundary — functions aren't
serializable, so it broke prerendering. The wrapper form works from Server
Components.

Because nothing is injected, **you must pass a matching `id` to both `Field` and
the control**. That's what associates the label.

```tsx
<Field id="email" label="Work email" required>
  <Input id="email" type="email" required />
</Field>
```

Mismatched or missing ids silently break the label association — clicking the
label won't focus the input, and screen readers announce it unlabeled.

## Field props

| Prop | Type | Notes |
| --- | --- | --- |
| `id` | `string` (required) | Must match the control's `id` |
| `label` | `string` (required) | Always visible — never rely on placeholder alone |
| `hint` | `string` | Helper text, rendered at `{id}-hint` |
| `error` | `string` | Error text, rendered at `{id}-error` |
| `required` | `boolean` | Renders an orange `*` |

`error` takes precedence over `hint` — when both are set, only the error shows.

## Wiring hints and errors for assistive tech

`Field` renders the hint/error with a predictable id, but it can't put
`aria-describedby` on your control. Pass it yourself:

```tsx
// With a hint
<Field id="email" label="Work email" hint="We'll reply within two business days.">
  <Input id="email" type="email" aria-describedby="email-hint" />
</Field>

// With an error
<Field id="email" label="Work email" error="Enter a valid email address.">
  <Input id="email" type="email" aria-invalid aria-describedby="email-error" />
</Field>
```

Set `aria-invalid` on the control when there's an error — that's what turns the
border orange (`aria-[invalid=true]:border-alert`) and what screen readers
announce.

Error text is ink, not orange. Orange body text on white is below AA, so the
error state is carried by the border, the `aria-invalid` state, and the medium
font weight — not by colored text. Never restyle error copy to orange.

## Controls

`Input`, `Textarea`, and `Select` share a base style: white fill, `border`
token, `rounded-md`, 16px horizontal padding, hover border darkening, orange
border when `aria-invalid`.

```tsx
<Input type="email" placeholder="jordan@company.com" />
<Textarea placeholder="What would meaningful growth look like?" />
<Select defaultValue="consulting">
  <option value="consulting">Strategic consulting</option>
  <option value="coaching">Coaching and mentorship</option>
</Select>
```

They accept all native props (`type`, `required`, `disabled`, `rows`, `name`,
`defaultValue`, event handlers). `Textarea` is `min-h-28` and vertically
resizable.

Placeholders are examples, not labels. Every control needs a real `label` via
`Field`.

## Checkbox

`Checkbox` includes its own label, so it does **not** go inside a `Field`:

```tsx
<Checkbox
  id="consent"
  label="Send me occasional updates about programs and resources."
/>
```

`id` is required and must be unique on the page.

## Layout

Stack fields with `gap-4`, pair them at `sm:`:

```tsx
<form className="flex flex-col gap-5">
  <div className="grid gap-4 sm:grid-cols-2">
    <Field id="name" label="Full name" required>
      <Input id="name" required />
    </Field>
    <Field id="email" label="Work email" required>
      <Input id="email" type="email" required />
    </Field>
  </div>

  <Field id="message" label="Tell us about your goals">
    <Textarea id="message" />
  </Field>

  <Checkbox id="consent" label="Send me occasional updates." />

  <Button type="submit" block className="sm:w-auto">Send message</Button>
</form>
```

Put forms in `<Container width="narrow">` or a `Card` — a form spanning 1280px
is unusable. Keep single-column; multi-column forms hurt completion.

`block className="sm:w-auto"` gives a full-width mobile button that shrinks to
content width on desktop.

## Form-level messaging

Use `Alert` above the submit button for form-wide success or failure, not for
per-field errors:

```tsx
{state.error ? <Alert tone="alert" title="Couldn't send">{state.error}</Alert> : null}
{state.ok ? <Alert tone="success" title="Message sent">We'll be in touch.</Alert> : null}
```

See `feedback.md`.

## Server Actions

Forms work as Server Components with a Server Action — no `'use client'` needed:

```tsx
export default function ContactPage() {
  async function submit(formData: FormData) {
    'use server'
    // …
  }

  return (
    <form action={submit} className="flex flex-col gap-5">
      <Field id="email" label="Work email" required>
        <Input id="email" name="email" type="email" required />
      </Field>
      <Button type="submit">Send</Button>
    </form>
  )
}
```

Always set `name` on controls when using `FormData`. Reach for `'use client'`
plus `useState` only when you need live validation or conditional fields.

## Common mistakes

- Using the old render-prop form — `Field` takes children.
- `Field` `id` not matching the control `id`.
- Placeholder used instead of a label.
- Missing `aria-describedby` or `aria-invalid` when an error is present.
- Styling error text orange (below AA on white).
- Wrapping `Checkbox` in a `Field`, producing two labels.
- Forms at full container width.
- Missing `name` attributes with `FormData`.
