# Example — landing page

A complete, validated marketing page. This compiles against the public API and
type-checks in the starter. Treat the structure as the pattern: hero → feature
band → dark stat band → testimonials → CTA → footer.

Copy is from the Uplift Path brand voice (person-centered, hopeful, specific).

```tsx
// app/page.tsx
import { ArrowRight, Compass, HeartHandshake, Sparkles, Users } from 'lucide-react'
import {
  ButtonLink,
  Container,
  CtaBand,
  FeatureGrid,
  Hero,
  Section,
  SectionHeading,
  SiteFooter,
  SiteHeader,
  StatBand,
  Testimonial,
} from '@/components/uplift'
import type { FooterColumn, NavItem } from '@/components/uplift'

const navItems: NavItem[] = [
  { label: 'Who We Serve', href: '/who-we-serve' },
  { label: 'How We Work', href: '/how-we-work' },
  { label: 'Our Values', href: '/values' },
  { label: 'Stories', href: '/stories' },
]

const values = [
  {
    icon: Compass,
    title: 'Pathways with Clarity',
    description:
      'Transparent routes to progress. We set clear, achievable goals that reflect what matters most to each person.',
  },
  {
    icon: Users,
    title: 'Unity Through Collaboration',
    description:
      'Partnership where everyone rises together, rooted in shared decision-making and mutual respect.',
  },
  {
    icon: HeartHandshake,
    title: 'Lead with Compassion',
    description:
      'Empathy and person-centered care in every interaction. We listen deeply to understand what matters most.',
  },
  {
    icon: Sparkles,
    title: 'Foster Hope',
    description:
      'Recovery-oriented care that unlocks potential. We focus on strengths and celebrate every step forward.',
  },
]

const stats = [
  { value: '2,400+', label: 'People supported' },
  { value: '38', label: 'Partner organisations' },
  { value: '92%', label: 'Would recommend us' },
  { value: '11', label: 'Years of service' },
]

const testimonials = [
  {
    quote: 'They helped me see a path I did not know existed, then walked it with me.',
    author: 'Maya R.',
    role: 'Program participant',
  },
  {
    quote: 'The goals were mine. That is what made them possible to reach.',
    author: 'Daniel O.',
    role: 'Program graduate, 2024',
  },
  {
    quote: 'For the first time I felt like someone was listening to the whole picture.',
    author: 'Priya S.',
    role: 'Family member',
  },
]

const footerColumns: FooterColumn[] = [
  {
    heading: 'Services',
    items: [
      { label: 'Total Person Care', href: '/services/total-person-care' },
      { label: 'Coaching', href: '/services/coaching' },
      { label: 'Community programs', href: '/services/community' },
    ],
  },
  {
    heading: 'Organisation',
    items: [
      { label: 'About us', href: '/about' },
      { label: 'Our values', href: '/values' },
      { label: 'Careers', href: '/careers' },
    ],
  },
  {
    heading: 'Connect',
    items: [
      { label: 'Contact', href: '/contact' },
      { label: 'Refer someone', href: '/refer' },
    ],
  },
]

export default function Page() {
  return (
    <>
      <SiteHeader items={navItems} cta={{ label: 'Get in touch', href: '/contact' }} />

      <main>
        {/* Hero — the one gradient element on the page. */}
        <Hero
          eyebrow="People first. Kaizen always."
          headline={
            <>
              Uplifting every <span className="text-gradient-brand">life</span> we touch
            </>
          }
          subhead="Person-centered support that meets people where they are and helps them build a path forward — with clarity, compassion, and hope."
          actions={
            <>
              <ButtonLink href="/contact" size="lg">
                Start the conversation <ArrowRight />
              </ButtonLink>
              <ButtonLink href="/how-we-work" variant="outline" size="lg">
                How we work
              </ButtonLink>
            </>
          }
        />

        {/* Values — subtle band separates it from the white hero. */}
        <Section tone="subtle" id="values">
          <Container>
            <SectionHeading
              eyebrow="Our values"
              title="What guides every interaction"
              description="Four commitments that shape how we show up for the people we serve."
            />
            <FeatureGrid features={values} columns={4} className="mt-12" />
          </Container>
        </Section>

        {/* Stats — dark band, tight spacing, on-dark tone. */}
        <Section tone="dark" space="sm">
          <Container>
            <StatBand stats={stats} tone="dark" />
          </Container>
        </Section>

        {/* Testimonials — back to white. */}
        <Section>
          <Container>
            <SectionHeading
              eyebrow="Stories"
              title="Progress, in their words"
              align="center"
            />
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <Testimonial key={testimonial.author} {...testimonial} />
              ))}
            </div>
          </Container>
        </Section>

        <CtaBand
          headline="Ready to take the next step?"
          body="Tell us where you are today. We will help you find the path forward."
          actions={
            <>
              <ButtonLink href="/contact" variant="onDark" size="lg">
                Get in touch
              </ButtonLink>
              <ButtonLink
                href="/services"
                variant="ghost"
                size="lg"
                className="text-foreground-on-dark"
              >
                Explore services
              </ButtonLink>
            </>
          }
        />
      </main>

      <SiteFooter
        columns={footerColumns}
        blurb="Person-centered support for people building a better path. People first. Kaizen always. Excellence expected."
      />
    </>
  )
}
```

## What this demonstrates

- **Banding rhythm** — white hero → `subtle` → `dark` → white → CTA. No two
  adjacent sections share a tone.
- **Gradient discipline** — the hero wash, the clipped headline word, and the
  `CtaBand` glow. Nothing else.
- **On-dark switching** — `StatBand tone="dark"`, `ButtonLink variant="onDark"`,
  and an explicit `text-foreground-on-dark` on the ghost button.
- **Hero and CtaBand unwrapped** — they render their own section and container.
- **`FeatureGrid columns={4}`** matching exactly four values, so no orphan card.
- **Four stats** — the count `StatBand`'s grid is built for.
- **Icons as components** — `Compass`, not `<Compass />`.
- **`<main>` landmark** wrapping page content, header and footer outside it.

## Adapting it

- Multi-page site: move `SiteHeader` / `SiteFooter` into `app/layout.tsx` and
  keep only `<main>` contents here.
- More sections: continue alternating tones. Use `SectionDivider` if two
  same-tone bands must sit adjacent.
- Fewer values: change `columns` to match (3 values → `columns={3}`).
- This is a Server Component throughout — no `'use client'` needed. `SiteHeader`
  is already a client leaf.
