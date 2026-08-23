import {
  ClipboardCheck,
  Compass,
  HeartHandshake,
  LifeBuoy,
  Sparkles,
  TrendingUp,
  Workflow,
  type LucideIcon,
} from 'lucide-react'

export interface SolutionItem {
  title: string
  description: string
  href: string
  /** Thin-stroke mark shown beside the title in the menu. */
  icon: LucideIcon
}

export interface SolutionGroup {
  heading: string
  items: SolutionItem[]
  /** Optional text link rendered under the group's items. */
  footerLink?: { label: string; href: string }
}

/**
 * Descriptions are written to fit on a single line in the mega-menu at desktop
 * width. Keep them under ~50 characters when editing.
 */
export const solutionGroups: SolutionGroup[] = [
  {
    heading: 'For Businesses',
    items: [
      {
        title: 'AI Consultation',
        icon: Sparkles,
        description: 'AI-driven strategy for operations and decisions',
        href: '#',
      },
      {
        title: 'Advisory Services',
        icon: Compass,
        description: 'Guidance for behavioral health, nonprofit, and education',
        href: '#',
      },
      {
        title: 'Systems & Technology',
        icon: Workflow,
        description: 'Scalable systems and operational efficiency',
        href: '#',
      },
      {
        title: 'Compliance Support',
        icon: ClipboardCheck,
        description: 'Operational readiness and compliance processes',
        href: '#',
      },
      {
        title: 'Business Consultation',
        icon: TrendingUp,
        description: 'Grow, optimize, and scale your business',
        href: '#',
      },
      {
        title: 'Resource Assistance',
        icon: LifeBuoy,
        description: 'Access to tools, systems, and operational support',
        href: '#',
      },
    ],
  },
  {
    heading: 'For Individuals',
    items: [
      {
        title: 'Peer Coaching Support (Telehealth)',
        icon: HeartHandshake,
        description: 'Virtual coaching for wellbeing and growth',
        href: '#',
      },
    ],
    footerLink: { label: 'Not sure where to start? Talk to us', href: '#' },
  },
]

export interface PlainNavLink {
  label: string
  href: string
}

/** Plain links, in the order they sit around the Solutions dropdown. */
export const plainLinks = {
  before: [{ label: 'About', href: '#' }] as PlainNavLink[],
  after: [
    { label: 'How we work', href: '#' },
    { label: 'Careers', href: '#' },
  ] as PlainNavLink[],
}
