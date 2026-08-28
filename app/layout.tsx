import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Navbar12 } from '@/components/sections/navbar-12'
import { Footer4 } from '@/components/sections/footer-04'

/**
 * Playfair Display carries the headlines, Lexend Deca the body — a high-contrast
 * serif against a wide, open sans. The pairing is the approved concept direction
 * and supersedes the earlier Tenon/Figtree plan.
 *
 * Both faces are self-hosted: the woff2 files ship with the design system and
 * are declared as `@font-face` at the top of `globals.css`, pointing at
 * `/fonts/`. `next/font` is deliberately not used here — the design export
 * self-hosts on purpose, and one declaration site is easier to keep honest than
 * two. To change the pairing, swap the files and the `@font-face` blocks; the
 * families are named in `globals.css` and nowhere else.
 */

export const metadata: Metadata = {
  title: {
    default: 'Uplift Path — Uplifting Every Life We Serve',
    template: '%s | Uplift Path',
  },
  description:
    'Strategic consulting, coaching, and resources that create clear and sustainable pathways to meaningful growth.',
  icons: {
    icon: [{ url: '/brand/uplift-path-icon.svg', type: 'image/svg+xml' }],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ffffff',
}

/**
 * The navbar and footer are site chrome, not page sections — they live here so
 * every route gets them without repeating the import. Individual pages compose
 * only their own sections.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar12 />
        {children}
        <Footer4 />
      </body>
    </html>
  )
}
