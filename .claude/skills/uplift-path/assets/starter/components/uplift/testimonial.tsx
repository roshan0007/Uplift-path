import { Card } from './card'
import { Text } from './text'
import { cn } from '@/lib/utils'

export interface TestimonialProps {
  quote: string
  author: string
  role?: string
  className?: string
}

/** Single pull quote. The teal rule on the left carries the brand accent. */
export function Testimonial({ quote, author, role, className }: TestimonialProps) {
  return (
    <Card tone="subtle" className={cn('flex flex-col gap-5', className)}>
      <blockquote className="border-primary border-l-2 pl-5">
        <Text size="body-lg" className="italic">
          {`“${quote}”`}
        </Text>
      </blockquote>
      <footer className="flex flex-col gap-0.5 pl-5">
        <Text size="caption" className="font-semibold not-italic">
          {author}
        </Text>
        {role ? (
          <Text size="caption" tone="muted">
            {role}
          </Text>
        ) : null}
      </footer>
    </Card>
  )
}
