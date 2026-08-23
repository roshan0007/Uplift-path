import Image from 'next/image'
import { cn } from '@/lib/utils'

/**
 * Logo. Renders the supplied brand files as-is.
 *
 * Never redraw, recolor, stretch, add strokes/shadows/bounding boxes, or remove
 * elements. Clear space around the lockup equals the height of the icon mark.
 *
 * - `lockup`  → full logo, light backgrounds only  (uplift-path-logo.svg)
 * - `icon`    → icon mark, nav / favicon / mobile  (uplift-path-icon.svg)
 * - `onDark`  → white-text lockup, dark or gradient backgrounds only
 */
export interface LogoProps {
  variant?: 'lockup' | 'icon' | 'onDark'
  /** Rendered height in px. Width scales from the asset's aspect ratio. */
  height?: number
  className?: string
  /** Set to a decorative empty string when adjacent text already names the brand. */
  alt?: string
  priority?: boolean
}

const assets = {
  lockup: { src: '/brand/uplift-path-logo.svg', ratio: 996 / 345 },
  icon: { src: '/brand/uplift-path-icon.svg', ratio: 282 / 345 },
  onDark: { src: '/brand/uplift-path-logo-white.png', ratio: 996 / 345 },
} as const

export function Logo({
  variant = 'lockup',
  height = 40,
  className,
  alt = 'Uplift Path',
  priority = false,
}: LogoProps) {
  const asset = assets[variant]
  return (
    <Image
      src={asset.src}
      alt={alt}
      width={Math.round(height * asset.ratio)}
      height={height}
      priority={priority}
      className={cn('w-auto', className)}
      style={{ height }}
    />
  )
}
