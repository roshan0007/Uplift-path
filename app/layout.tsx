import type { Metadata, Viewport } from 'next'
import { Lexend_Deca, Playfair_Display } from 'next/font/google'
import './globals.css'

/**
 * Playfair Display carries the headlines, Lexend Deca the body — a high-contrast
 * serif against a wide, open sans. The pairing is the approved concept direction
 * and supersedes the earlier Tenon/Figtree plan.
 *
 * These two variables are the only place families are declared. To change the
 * pairing, load different faces here and repoint `--font-heading` / `--font-body`
 * in globals.css. Do not set font-family anywhere else.
 */
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
})

const lexendDeca = Lexend_Deca({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-text',
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
    <html lang="en" className={`${playfairDisplay.variable} ${lexendDeca.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
