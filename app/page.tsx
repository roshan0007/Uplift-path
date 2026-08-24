import Image from 'next/image'
import { ArrowRight, MessageCircle, UsersRound, Video } from 'lucide-react'
import {
  Badge,
  ButtonLink,
  Container,
  Eyebrow,
  Heading,
  Section,
  Text,
} from '@/components/uplift'
import { SiteHeader } from '@/components/header/site-header'
import { MediaPlaceholder } from '@/components/home/media-placeholder'
import { Reveal } from '@/components/home/reveal'
import { StickyCtaBar } from '@/components/home/sticky-cta-bar'

/** Quiet, subordinate text link with an arrow that nudges on hover. */
const quietLinkClass =
  'group text-foreground-muted hover:text-foreground inline-flex items-center gap-1.5 rounded-sm font-medium transition-colors duration-[160ms] ease-[var(--ease-brand)]'

const steps = [
  {
    icon: MessageCircle,
    label: 'First',
    title: 'Reach out.',
    body: 'One short conversation. No commitment either way.',
  },
  {
    icon: UsersRound,
    label: 'Then',
    title: 'Get matched with a peer coach.',
    body: 'Someone trained to support you, who has walked a road like yours.',
  },
  {
    icon: Video,
    label: 'Ongoing',
    title: 'Meet by video, on your schedule.',
    body: 'For as long as it helps, and no longer.',
  },
]

const situations = [
  'Starting over after a layoff',
  'Getting sober — and staying that way',
  'Coming home after incarceration',
  'Caregiving for a parent or partner',
  'New to a city, building from zero',
  'Parenting without a map',
  "Grief that isn't on a schedule",
  'Steady ground after a diagnosis',
  'First in the family to do any of this',
  'Rebuilding after a divorce',
]

const badgeTones = ['teal', 'blue', 'neutral'] as const

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main>
        {/* ---- 1. Hero -------------------------------------------------- */}
        <Section id="hero" tone="mint" space="none" className="pt-32 pb-20 md:pt-44 md:pb-32">
          <Container>
            <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
              <div>
                <Reveal>
                  <Heading as="h1" size="display" className="max-w-[16ch]">
                    You don&rsquo;t have to figure it out alone.
                  </Heading>
                </Reveal>

                <Reveal delay={90}>
                  <Text size="body-lg" tone="muted" className="mt-7 max-w-[38ch]">
                    Peer coaching by video, at whatever pace you need.
                  </Text>
                </Reveal>

                <Reveal
                  delay={180}
                  className="mt-11 flex flex-wrap items-center gap-x-9 gap-y-4"
                >
                  <ButtonLink href="#" size="lg">
                    Talk to someone
                  </ButtonLink>
                  <a href="#" className={quietLinkClass}>
                    For organizations
                    <ArrowRight
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className="size-4 transition-[translate] duration-[220ms] ease-[var(--ease-brand)] group-hover:translate-x-0.5"
                    />
                  </a>
                </Reveal>

                {/* Accreditation sits well below the CTA so it reads as a
                    footnote rather than a second thing to look at. */}
                <Reveal delay={260} className="mt-14 flex items-center gap-2.5">
                  <Image
                    src="/brand/CARF.webp"
                    alt=""
                    width={32}
                    height={32}
                    className="size-8"
                  />
                  <Text size="caption" tone="muted">
                    CARF accredited
                  </Text>
                </Reveal>
              </div>

              <Reveal delay={320}>
                <MediaPlaceholder
                  className="bg-surface aspect-[4/5] w-full"
                  label="Portrait — one person, unposed, natural light"
                />
              </Reveal>
            </div>
          </Container>
        </Section>

        {/* ---- 2. How it works ------------------------------------------ */}
        <Section>
          <Container>
            <div className="grid gap-14 lg:grid-cols-[19rem_1fr] lg:gap-24">
              <Reveal className="lg:sticky lg:top-28 lg:self-start">
                <Eyebrow>How it works</Eyebrow>
                <Heading as="h2" size="h1" className="mt-4">
                  Support that moves at your pace.
                </Heading>
                <Text size="body-lg" tone="muted" className="mt-5 max-w-[30ch]">
                  One conversation to start. What follows is yours to shape.
                </Text>
              </Reveal>

              <div className="relative">
                {/* This section's use of the brand gradient: a hairline
                    spine threading the three steps, in place of card borders. */}
                <span
                  aria-hidden="true"
                  className="bg-gradient-brand absolute inset-y-1 left-0 w-px"
                />

                <ol className="flex flex-col gap-14 pl-8 md:gap-20 md:pl-12">
                  {steps.map((step, index) => (
                    <Reveal as="li" key={step.title} delay={index * 90}>
                      <div className="flex items-center gap-2">
                        <step.icon
                          aria-hidden="true"
                          strokeWidth={1.25}
                          className="text-ink-100 size-[18px]"
                        />
                        <Eyebrow>{step.label}</Eyebrow>
                      </div>
                      <Heading as="h3" size="h3" className="mt-3">
                        {step.title}
                      </Heading>
                      <Text tone="muted" className="mt-2 max-w-[40ch]">
                        {step.body}
                      </Text>
                    </Reveal>
                  ))}
                </ol>
              </div>
            </div>
          </Container>
        </Section>

        {/* ---- 3. What people bring --------------------------------------- */}
        <Section tone="subtle" space="lg">
          <Container width="content">
            <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
              <Eyebrow>What people bring</Eyebrow>
              <Heading as="h2" size="h1">
                Whatever it is, there&rsquo;s probably a coach who&rsquo;s been there.
              </Heading>
              <Text size="body-lg" tone="muted">
                Peer coaches aren&rsquo;t clinicians. They&rsquo;re people who&rsquo;ve lived
                through something like yours, trained to help you work through what&rsquo;s
                next.
              </Text>
            </Reveal>

            <Reveal delay={120}>
              <ul
                aria-label="Situations peer coaches support"
                className="mt-10 flex flex-wrap justify-center gap-2.5"
              >
                {situations.map((situation, index) => (
                  <li key={situation}>
                    <Badge tone={badgeTones[index % badgeTones.length]}>{situation}</Badge>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={180} className="mt-8 text-center">
              <Text size="caption" tone="muted">
                Don&rsquo;t see yours? Say so anyway — that still counts as a conversation
                worth having.
              </Text>
            </Reveal>
          </Container>
        </Section>
      </main>

      <StickyCtaBar
        headline="Not sure where to start?"
        body="One short, no-commitment conversation is enough to find out."
        ctaLabel="Talk to someone"
        ctaHref="#"
        afterId="hero"
      />
    </>
  )
}
