import { Navbar12 } from '@/components/sections/navbar-12'
import { Footer4 } from '@/components/sections/footer-04'

/**
 * The site chrome. Every marketing route lives in this group and gets the navbar
 * and footer; the intake funnel routes sit outside it and get neither.
 *
 * `(site)` is a route group — it is not part of any URL.
 */
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navbar12 />
      {children}
      <Footer4 />
    </>
  )
}
