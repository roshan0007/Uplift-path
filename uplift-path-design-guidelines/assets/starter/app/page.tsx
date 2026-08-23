import { Compass, HeartHandshake, Sparkles, Users } from 'lucide-react'
import {
  Alert,
  Badge,
  Button,
  ButtonLink,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Container,
  CtaBand,
  FeatureGrid,
  Field,
  Heading,
  Hero,
  Input,
  Logo,
  Section,
  SectionHeading,
  Select,
  SiteFooter,
  SiteHeader,
  StatBand,
  Testimonial,
  Text,
  Textarea,
} from '@/components/uplift'

const navItems = [
  { label: 'Who We Serve', href: '#who-we-serve' },
  { label: 'How We Work', href: '#how-we-work' },
  { label: 'Our Values', href: '#values' },
  { label: 'Foundations', href: '#foundations' },
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

const colorRamps = [
  {
    name: 'Primary — Minty Teal',
    token: '--color-teal',
    steps: [
      { label: '10', hex: '#E6FAF6' },
      { label: '40', hex: '#9CECDB' },
      { label: '70', hex: '#52DEC1' },
      { label: '100', hex: '#08D1A7' },
    ],
  },
  {
    name: 'Secondary — Deep Blue',
    token: '--color-blue',
    steps: [
      { label: '10', hex: '#E5F5FA' },
      { label: '40', hex: '#99D8EC' },
      { label: '70', hex: '#4DBBDE' },
      { label: '100', hex: '#019ED0' },
    ],
  },
  {
    name: 'Neutral Dark',
    token: '--color-ink',
    steps: [
      { label: '10', hex: '#E9EBED' },
      { label: '40', hex: '#AAB1B9' },
      { label: '70', hex: '#6B7784' },
      { label: '100', hex: '#2C3E50' },
    ],
  },
  {
    name: 'Accent Orange (alerts)',
    token: '--color-orange',
    steps: [
      { label: '10', hex: '#FFF2EA' },
      { label: '40', hex: '#FFD8C1' },
      { label: '70', hex: '#FFA56F' },
      { label: '100', hex: '#FF7F32' },
    ],
  },
]

const typeScale = [
  { name: 'display', className: 'text-display', sample: 'Uplifting every life' },
  { name: 'h1', className: 'text-h1', sample: 'Pathways to Growth' },
  { name: 'h2', className: 'text-h2', sample: 'How We Work' },
  { name: 'h3', className: 'text-h3', sample: 'Total Person Care' },
  {
    name: 'body-lg',
    className: 'text-body-lg',
    sample: 'Clear, transparent routes to meaningful progress.',
  },
  {
    name: 'body',
    className: 'text-body',
    sample: 'We communicate openly and honestly in every interaction.',
  },
  { name: 'caption', className: 'text-caption', sample: 'Progress over perfection.' },
]

export default function Page() {
  return (
    <>
      <SiteHeader items={navItems} cta={{ label: 'Get in touch', href: '#contact' }} />

      <main>
        <Hero
          eyebrow="Uplift Path"
          headline={
            <>
              Uplifting every life <span className="text-gradient-brand">we serve</span>
            </>
          }
          subhead="Strategic consulting, coaching, and access to essential resources that unlock true potential through clear and sustainable pathways to meaningful growth."
          actions={
            <>
              <ButtonLink href="#contact" size="lg">
                Request a consultation
              </ButtonLink>
              <ButtonLink href="#how-we-work" variant="outline" size="lg">
                How we work
              </ButtonLink>
            </>
          }
          media={
            <Card className="flex flex-col gap-6 shadow-lg">
              <Logo variant="lockup" height={44} alt="Uplift Path" />
              <div className="flex flex-wrap gap-2">
                <Badge tone="teal">Consulting</Badge>
                <Badge tone="blue">Coaching</Badge>
                <Badge tone="neutral">Advisory</Badge>
              </div>
              <Text tone="muted">
                Our goal is to uplift 100,000 lives nationwide by 2036 by creating clear and
                sustainable pathways that unlock potential.
              </Text>
              <div className="bg-gradient-brand-horizontal h-px w-full" role="presentation" />
              <StatBand
                className="grid-cols-2 sm:grid-cols-2 lg:grid-cols-2"
                stats={[
                  { value: '100K', label: 'Lives uplifted by 2036' },
                  { value: '6', label: 'Core UPLIFT values' },
                ]}
              />
            </Card>
          }
        />

        <Section id="who-we-serve" tone="subtle">
          <Container>
            <div className="flex flex-col gap-10">
              <SectionHeading
                eyebrow="Who we serve"
                title="Built for leaders committed to growth and transformation"
                description="We partner with founders, business owners, executives, and education leaders, as well as individuals and communities across every industry and stage."
              />
              <StatBand
                stats={[
                  { value: 'Startups', label: 'Early-stage founders' },
                  { value: 'Enterprise', label: 'Established organizations' },
                  { value: 'Education', label: 'Education leaders' },
                  { value: 'Community', label: 'Communities and individuals' },
                ]}
              />
            </div>
          </Container>
        </Section>

        <Section id="values">
          <Container>
            <div className="flex flex-col gap-10">
              <SectionHeading
                eyebrow="Our core values"
                title="UPLIFT values in action"
                description="These values aren't just words on a page — they're the foundation of everything we do."
              />
              <FeatureGrid features={values} columns={4} />
            </div>
          </Container>
        </Section>

        <Section id="how-we-work" tone="dark">
          <Container>
            <div className="flex flex-col gap-12">
              <SectionHeading
                tone="on-dark"
                eyebrow="How we work"
                title="Accountability, Kaizen, and Flexibility"
                description="Three core pillars guide how we show up, how we grow, and how we deliver impact."
              />
              <div className="grid gap-5 lg:grid-cols-3">
                <Card tone="dark" className="border-white/15">
                  <CardHeader>
                    <div>
                      <Badge tone="onDark">Accountability</Badge>
                    </div>
                    <Heading as="h3" size="h3" tone="on-dark">
                      We own our work and deliver results.
                    </Heading>
                  </CardHeader>
                  <CardContent>
                    <Text tone="on-dark-muted">
                      Freedom with responsibility. We measure results, not hours, and treat mistakes
                      as learning opportunities.
                    </Text>
                  </CardContent>
                </Card>
                <Card tone="dark" className="border-white/15">
                  <CardHeader>
                    <div>
                      <Badge tone="onDark">Kaizen</Badge>
                    </div>
                    <Heading as="h3" size="h3" tone="on-dark">
                      We get better every day.
                    </Heading>
                  </CardHeader>
                  <CardContent>
                    <Text tone="on-dark-muted">
                      Small improvements compound into big results. Imperfect action beats perfect
                      inaction.
                    </Text>
                  </CardContent>
                </Card>
                <Card tone="dark" className="border-white/15">
                  <CardHeader>
                    <div>
                      <Badge tone="onDark">Flexibility</Badge>
                    </div>
                    <Heading as="h3" size="h3" tone="on-dark">
                      We adapt and stay human-centered.
                    </Heading>
                  </CardHeader>
                  <CardContent>
                    <Text tone="on-dark-muted">
                      Work that fits your life, psychological safety, and quick pivots when a process
                      doesn&apos;t serve people well.
                    </Text>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Container>
        </Section>

        <Section id="foundations" tone="subtle">
          <Container>
            <div className="flex flex-col gap-12">
              <SectionHeading
                eyebrow="Foundations"
                title="Color, type, and components"
                description="Token ramps built from the palette slide's 10/40/70/100% tints, a fluid type scale, and the component set that expresses them."
              />

              <div className="grid gap-5 sm:grid-cols-2">
                {colorRamps.map((ramp) => (
                  <Card key={ramp.name} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <Heading as="h3" size="h4">
                        {ramp.name}
                      </Heading>
                      <Text size="caption" tone="muted" className="font-mono">
                        {`${ramp.token}-10 … ${ramp.token}-100`}
                      </Text>
                    </div>
                    <div className="flex overflow-hidden rounded-lg">
                      {ramp.steps.map((step) => (
                        <div
                          key={step.hex}
                          className="flex h-20 flex-1 flex-col justify-end p-2"
                          style={{ backgroundColor: step.hex }}
                        >
                          <span className="text-ink-100 text-[11px] font-semibold">
                            {step.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>

              <div className="grid gap-5 lg:grid-cols-[1.15fr_1fr]">
                <Card className="flex flex-col gap-6">
                  <div className="flex flex-col gap-1">
                    <Heading as="h3" size="h4">
                      Type scale
                    </Heading>
                    <Text size="caption" tone="muted">
                      Fluid with clamp() — display drops from 70px to 40px on mobile. Families come
                      from --font-heading and --font-body.
                    </Text>
                  </div>
                  <ul className="flex flex-col gap-5">
                    {typeScale.map((entry) => (
                      <li
                        key={entry.name}
                        className="border-border flex flex-col gap-1 border-t pt-4 first:border-t-0 first:pt-0"
                      >
                        <span className="text-caption text-foreground-muted font-mono">
                          {entry.name}
                        </span>
                        <span className={entry.className}>{entry.sample}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <div className="flex flex-col gap-5">
                  <Card className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                      <Heading as="h3" size="h4">
                        Buttons
                      </Heading>
                      <Text size="caption" tone="muted">
                        24px / 10px padding, 8px radius. Teal fills use ink text — white on teal is
                        1.96:1 and fails AA.
                      </Text>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button>Primary</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="alert">Alert</Button>
                      <Button variant="link">Link action</Button>
                      <Button disabled>Disabled</Button>
                    </div>
                  </Card>

                  <Alert tone="success" title="Accessible by default">
                    Every interactive element has a visible focus ring, and body copy holds at least
                    4.5:1 contrast.
                  </Alert>

                  <Alert tone="alert" title="Use the accent sparingly">
                    Accent orange is reserved for genuinely urgent messages.
                  </Alert>
                </div>
              </div>

              <div className="grid items-start gap-5 lg:grid-cols-[1fr_1.1fr]">
                <Testimonial
                  quote="They gave us a clear path forward — honest guidance, well-defined goals, and no hidden barriers."
                  author="Executive Director"
                  role="Community health partner"
                />

                <Card id="contact" className="flex flex-col gap-2">
                  <CardHeader>
                    <Heading as="h3" size="h3">
                      Get in touch with us
                    </Heading>
                    <Text tone="muted">
                      Tell us where you are today and we&apos;ll map the pathway forward.
                    </Text>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field id="contact-name" label="Full name" required>
                        <Input id="contact-name" placeholder="Jordan Ellis" required />
                      </Field>
                      <Field
                        id="contact-email"
                        label="Work email"
                        required
                        hint="We'll reply within two business days."
                      >
                        <Input
                          id="contact-email"
                          type="email"
                          placeholder="jordan@company.com"
                          required
                          aria-describedby="contact-email-hint"
                        />
                      </Field>
                    </div>
                    <Field id="contact-service" label="How can we help?">
                      <Select id="contact-service" defaultValue="consulting">
                        <option value="consulting">Strategic consulting</option>
                        <option value="coaching">Coaching and mentorship</option>
                        <option value="resources">Access to resources</option>
                      </Select>
                    </Field>
                    <Field
                      id="contact-goals"
                      label="Tell us about your goals"
                      error="Please add a few details."
                    >
                      <Textarea
                        id="contact-goals"
                        placeholder="What would meaningful growth look like?"
                        aria-invalid
                        aria-describedby="contact-goals-error"
                      />
                    </Field>
                  </CardContent>
                  <CardFooter>
                    <Button size="lg">Request a consultation</Button>
                    <Button variant="ghost" size="lg">
                      Book a call
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </Container>
        </Section>

        <CtaBand
          headline="When people rise, pathways open"
          body="Let's build a clear, sustainable pathway to the growth you're working toward."
          actions={
            <>
              <ButtonLink href="#contact" variant="onDark" size="lg">
                Start the conversation
              </ButtonLink>
              <ButtonLink
                href="#values"
                size="lg"
                variant="ghost"
                className="text-foreground-on-dark hover:bg-white/10 active:bg-white/15"
              >
                Explore our values
              </ButtonLink>
            </>
          }
        />
      </main>

      <SiteFooter
        blurb="Uplifting every life we serve by unlocking true potential through clear and sustainable pathways to meaningful growth."
        columns={[
          {
            heading: 'Services',
            items: [
              { label: 'Consulting', href: '#' },
              { label: 'Coaching', href: '#' },
              { label: 'Advisory', href: '#' },
            ],
          },
          {
            heading: 'Company',
            items: [
              { label: 'Our values', href: '#values' },
              { label: 'How we work', href: '#how-we-work' },
              { label: 'Who we serve', href: '#who-we-serve' },
            ],
          },
          {
            heading: 'Connect',
            items: [
              { label: 'Contact', href: '#contact' },
              { label: 'Careers', href: '#' },
              { label: 'Partners', href: '#' },
            ],
          },
        ]}
      />
    </>
  )
}
