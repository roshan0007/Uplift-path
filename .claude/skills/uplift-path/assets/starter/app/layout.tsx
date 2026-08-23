import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Figtree } from 'next/font/google'
import './globals.css'

/**
 * Tenon is the primary brand typeface (licensed via Adobe Fonts, added at
 * deploy). Figtree is the stand-in with the same geometric-humanist character.
 *
 * To swap in Tenon: load it here and point `--font-figtree` at it, or update
 * `--font-heading` / `--font-body` in globals.css. Do not set font-family
 * anywhere else.
 */
const figtree = Figtree({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-figtree',
})

export const metadata: Metadata = {
  title: {
    default: 'Uplift Path — Uplifting Every Life We Serve',
    template: '%s | Uplift Path',
  },
  description:
    'Strategic consulting, coaching, and resources that create clear and sustainable pathways to meaningful growth.',
  generator: 'v0.app',
  icons: {
    icon: [{ url: '/brand/uplift-path-icon.svg', type: 'image/svg+xml' }],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={figtree.variable}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
