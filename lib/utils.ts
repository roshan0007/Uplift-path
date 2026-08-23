import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * tailwind-merge has no view of `app/globals.css`, so it cannot tell that
 * `text-display` is a font size while `text-foreground` is a color — it files
 * both under `text-color` and drops the earlier one. That silently stripped the
 * size off every `Heading` and `Text` in the system (each one pairs a size
 * class with a tone class), leaving the whole site at the inherited 16px.
 *
 * Registering the scale's own names under `font-size` separates the two groups.
 * Keep this list in sync with the `--text-*` tokens in `globals.css`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: ['display', 'h1', 'h2', 'h3', 'h4', 'body-lg', 'body', 'caption'],
        },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
