import type * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * Form field primitives.
 *
 * `Field` is a plain wrapper — it does NOT use a render prop, so it works from
 * Server Components. Pass a matching `id` to Field and to the control, and pass
 * the control's `error` so aria wiring stays consistent:
 *
 *   <Field id="email" label="Work email" required error={errors.email}>
 *     <Input id="email" type="email" aria-invalid={!!errors.email} />
 *   </Field>
 */

const controlBase = [
  'text-body w-full rounded-md border border-border bg-surface px-4 py-2.5 text-foreground',
  'placeholder:text-ink-40',
  'transition-colors duration-[var(--duration-fast)] ease-[var(--ease-brand)]',
  'hover:border-border-strong',
  'disabled:cursor-not-allowed disabled:bg-surface-subtle disabled:opacity-60',
  'aria-[invalid=true]:border-alert',
].join(' ')

export interface FieldProps extends Omit<React.ComponentProps<'div'>, 'children'> {
  /** Must match the control's `id`. */
  id: string
  label: string
  /** Helper text below the control. Rendered at `{id}-hint`. */
  hint?: string
  /** Error message. Rendered at `{id}-error`; set `aria-invalid` on the control. */
  error?: string
  required?: boolean
  children: React.ReactNode
}

export function Field({
  id,
  label,
  hint,
  error,
  required,
  className,
  children,
  ...props
}: FieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)} {...props}>
      <label htmlFor={id} className="text-caption font-semibold text-foreground">
        {label}
        {required ? (
          <span className="text-alert ml-0.5" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-caption text-foreground font-medium">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-caption text-foreground-muted">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

export function Input({ className, ...props }: React.ComponentProps<'input'>) {
  return <input className={cn(controlBase, className)} {...props} />
}

export function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea className={cn(controlBase, 'min-h-28 resize-y', className)} {...props} />
  )
}

export function Select({ className, ...props }: React.ComponentProps<'select'>) {
  return <select className={cn(controlBase, 'pr-10', className)} {...props} />
}

export interface CheckboxProps extends React.ComponentProps<'input'> {
  /** Must match the input's `id`. */
  id: string
  label: string
  wrapperClassName?: string
}

export function Checkbox({ id, label, className, wrapperClassName, ...props }: CheckboxProps) {
  return (
    <div className={cn('flex items-start gap-2.5', wrapperClassName)}>
      <input
        id={id}
        type="checkbox"
        className={cn(
          'border-border-strong accent-primary mt-1 size-4 shrink-0 rounded-sm',
          className,
        )}
        {...props}
      />
      <label htmlFor={id} className="text-caption text-foreground-muted">
        {label}
      </label>
    </div>
  )
}
