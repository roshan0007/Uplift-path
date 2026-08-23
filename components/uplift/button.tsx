import type * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * Button.
 *
 * Flat and crisp: no shadow, no lift, an 8px radius (the brand guideline
 * figure) and generous horizontal padding. `primary` is the logo green with ink
 * text; `outline` is white behind a full-strength ink border of the same
 * weight. The pair comes straight from the approved concept sheet.
 *
 * Labels are set in the body face — the heading face is a display serif and
 * reads wrong at button size.
 *
 * Accessibility: the guidelines show white text on the mint fill, but that is
 * 1.96:1 and fails WCAG AA. Ink on `teal-100` is 5.6:1 and is the only approved
 * pairing. Never put white text on the green.
 */
const buttonVariants = cva(
  [
    'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md',
    'font-[family-name:var(--font-body)] font-semibold',
    'transition-[background-color,border-color,color] duration-[var(--duration-base)] ease-[var(--ease-brand)]',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  ],
  {
    variants: {
      variant: {
        /** Logo green with ink text. The default call to action. */
        primary:
          'bg-primary text-primary-foreground hover:bg-teal-120 active:bg-teal-120',
        /** White behind a solid ink border. Pairs with `primary`. */
        outline:
          'border-[1.5px] border-ink-100 bg-surface text-foreground hover:bg-surface-subtle active:bg-ink-10',
        /** Filled deep blue with white text (4.5:1+). */
        secondary:
          'bg-secondary text-secondary-foreground hover:brightness-95 active:brightness-90',
        /** Borderless, for tertiary actions and nav. */
        ghost: 'text-foreground hover:bg-surface-subtle active:bg-ink-10',
        /** Inline text action with an underline on hover. */
        link: 'text-secondary underline-offset-4 hover:underline',
        /** On dark or gradient backgrounds only. */
        onDark: 'bg-surface text-foreground hover:bg-surface-subtle active:bg-ink-10',
        /** Alert accent. Use rarely — urgent or destructive actions. */
        alert:
          'bg-alert text-alert-foreground hover:brightness-95 active:brightness-90',
      },
      size: {
        sm: 'text-caption h-9 px-4 [&_svg]:size-4',
        md: 'text-body h-11 px-6 [&_svg]:size-4',
        lg: 'text-body h-13 px-8 [&_svg]:size-4',
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
