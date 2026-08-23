import { Heading, Text, Eyebrow } from './text'
import { cn } from '@/lib/utils'

export interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'start' | 'center'
  /** `on-dark` when placed inside a dark Section. */
  tone?: 'default' | 'on-dark'
  className?: string
}

/** Eyebrow + title + description block that opens a section. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'start',
  tone = 'default',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        align === 'center' && 'mx-auto max-w-2xl items-center text-center',
        className,
      )}
    >
      {eyebrow ? <Eyebrow tone={tone === 'on-dark' ? 'on-dark' : 'default'}>{eyebrow}</Eyebrow> : null}
      <Heading as="h2" size="h2" tone={tone === 'on-dark' ? 'on-dark' : 'default'}>
        {title}
      </Heading>
      {description ? (
        <Text size="body-lg" tone={tone === 'on-dark' ? 'on-dark-muted' : 'muted'} className="max-w-2xl">
          {description}
        </Text>
      ) : null}
    </div>
  )
}
