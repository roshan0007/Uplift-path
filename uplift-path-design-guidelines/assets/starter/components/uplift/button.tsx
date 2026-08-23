import type * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * Button. Padding 24px horizontal / 10px vertical and ~8px radius come from
 * the brand guidelines button spec.
 *
 * Accessibility: the guidelines show white text on the teal fill, but that is
 * 1.96:1 and fails WCAG AA. The `primary` variant therefore uses ink text on
 * teal. Never override it to white.
 */
const buttonVariants = cva(
  [
    'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md',
    'font-[family-name:var(--font-heading)] font-semibold',
    'transition-all duration-[var(--duration-base)] ease-[var(--ease-brand)]',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  ],
  {
    variants: {
      variant: {
        /** Filled teal with ink text. The default call to action. */
        primary:
          'bg-primary text-primary-foreground shadow-sm hover:bg-teal-70 active:bg-teal-70',
        /** Filled deep blue with white text (4.5:1+). */
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:brightness-95 active:brightness-90',
        /** White background, ink border, ink text. */
        outline:
          'border border-ink-100 bg-surface text-foreground hover:bg-surface-subtle active:bg-ink-10',
        /** Borderless, for tertiary actions and nav. */
        ghost: 'text-foreground hover:bg-surface-subtle active:bg-ink-10',
        /** Inline text action with an underline on hover. */
        link: 'text-secondary underline-offset-4 hover:underline',
        /** On dark or gradient backgrounds only. */
        onDark:
          'bg-surface text-foreground shadow-sm hover:bg-surface-subtle active:bg-ink-10',
        /** Alert accent. Use rarely — urgent or destructive actions. */
        alert:
          'bg-alert text-alert-foreground shadow-sm hover:brightness-95 active:brightness-90',
      },
      size: {
        sm: 'text-caption h-9 px-4 py-2 [&_svg]:size-4',
        /** Brand spec: 24px / 10px padding. */
        md: 'text-body h-11 px-6 py-2.5 [&_svg]:size-4',
        lg: 'text-body-lg h-13 px-8 py-3 [&_svg]:size-5',
        icon: 'size-11 [&_svg]:size-5',
      },
      block: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      block: false,
    },
  },
)

export interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {}

export function Button({ variant, size, block, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, block }), className)}
      {...props}
    />
  )
}

export interface ButtonLinkProps
  extends React.ComponentProps<'a'>,
    VariantProps<typeof buttonVariants> {}

/** Anchor styled as a button. Use for navigation, not for actions. */
export function ButtonLink({
  variant,
  size,
  block,
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <a className={cn(buttonVariants({ variant, size, block }), className)} {...props} />
  )
}

export { buttonVariants }
