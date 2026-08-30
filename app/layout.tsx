import type { Metadata, Viewport } from 'next'
import './globals.css'

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
 * The root layout is the document shell and nothing else — no navbar, no footer.
 *
 * The site chrome moved down into `app/(site)/layout.tsx` so the individual
 * intake funnel can opt out of it. `/cmps`, `/booking` and `/consent-form` sit
 * outside the `(site)` group and render full-screen with only a close control,
 * matching the Application modal that starts the flow: once someone is filling
 * in an intake form, a nav bar offering to take them to Careers is a way out of
 * the funnel, not a convenience.
 *
 * Route groups do not appear in the URL, so every existing path is unchanged.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
