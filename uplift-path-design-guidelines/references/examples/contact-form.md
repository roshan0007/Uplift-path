# Example — contact form

A validated contact form with a Server Action, per-field errors, and form-level
messaging. Compiles against the public API and type-checks in the starter.

```tsx
// app/contact/page.tsx
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Container,
  Field,
  Input,
  Section,
  SectionHeading,
  Select,
  Text,
  Textarea,
} from '@/components/uplift'

type Errors = Partial<Record<'name' | 'email' | 'message', string>>

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string }>
}) {
  const { sent } = await searchParams

  async function submit(formData: FormData) {
    'use server'

    const errors: Errors = {}
    const name = String(formData.get('name') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()

    if (!name) errors.name = 'Enter your name.'
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      errors.email = 'Enter a valid email address.'
    }
    if (message.length < 10) errors.message = 'Add a few more details.'

    if (Object.keys(errors).length > 0) {
      // Return or redirect with errors per your app's conventions.
      return
    }

    // Persist or send the enquiry here.
  }

  return (
    <main>
      <Section>
        <Container width="narrow">
          <SectionHeading
            eyebrow="Get in touch"
            title="Tell us where you are"
            description="Share a little about your situation and we will help you find the right next step."
          />

          <Card className="mt-10">
            <form action={submit} className="flex flex-col gap-5">
              {sent ? (
                <Alert tone="success" title="Message sent">
                  Thank you. We will reply within two business days.
                </Alert>
              ) : null}

              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="name" label="Full name" required>
                  <Input id="name" name="name" autoComplete="name" required />
                </Field>

                <Field
                  id="email"
                  label="Email address"
                  required
                  hint="We will only use this to reply."
                >
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    aria-describedby="email-hint"
                  />
                </Field>
              </div>

              <Field id="topic" label="How can we help?">
                <Select id="topic" name="topic" defaultValue="services">
                  <option value="services">Learning about services</option>
                  <option value="referral">Making a referral</option>
                  <option value="partnership">Partnership enquiry</option>
                  <option value="other">Something else</option>
                </Select>
              </Field>

              <Field id="message" label="Tell us more" required>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="What would meaningful progress look like for you?"
                  required
                />
              </Field>

              <Checkbox
                id="consent"
                name="consent"
                label="I am happy to be contacted about programs and resources."
              />

              <Button type="submit" block className="sm:w-auto">
                Send message
              </Button>

              <Text size="caption" tone="muted">
                We reply to every enquiry within two business days.
              </Text>
            </form>
          </Card>
        </Container>
      </Section>
    </main>
  )
}
```

## Field with an error

When validation fails, pass `error` to `Field` and wire the control:

```tsx
<Field id="email" label="Email address" required error={errors.email}>
  <Input
    id="email"
    name="email"
    type="email"
    required
    aria-invalid={!!errors.email}
    aria-describedby={errors.email ? 'email-error' : undefined}
  />
</Field>
```

- `Field` renders the message at `{id}-error`.
- `aria-invalid` turns the border orange and is what screen readers announce.
- Only set `aria-describedby` when the error exists — pointing at a missing id is
  worse than omitting it.
- Error text stays ink. Orange body text on white is below AA.

## Client-side variant

For live validation, move the form into a client leaf and keep the page a Server
Component:

```tsx
// components/contact-form.tsx
'use client'

import { useState } from 'react'
import { Button, Field, Input } from '@/components/uplift'

export function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({})
  // …
}
```

Don't convert the whole page to `'use client'` for this.

## What this demonstrates

- **`Field` as a wrapper** with matching `id` on both `Field` and control — the
  render-prop form doesn't exist and can't cross the server boundary.
- **`name` on every control**, required for `FormData`.
- **`Checkbox` outside `Field`** — it renders its own label.
- **`Container width="narrow"`** so the form doesn't span 1280px.
- **`block className="sm:w-auto"`** — full width on mobile, content width above.
- **`Alert`** for form-level status, `Field error` for per-field.
- **`autoComplete`** on name and email, which materially improves completion.
- **Server Action** with no `'use client'` anywhere.

## Common mistakes

- `Field` `id` not matching the control's `id` — silently unlabeled.
- Missing `name`, so `FormData` comes back empty.
- Placeholder used instead of a label.
- `aria-describedby` pointing at an id that isn't rendered.
- Orange error text.
- `Checkbox` nested in a `Field`, producing two labels.
- Full-container-width forms.
