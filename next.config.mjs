/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Emit a plain static site to `out/` instead of a server bundle. The site has
   * no API routes, middleware, or server actions, so nothing needs a runtime —
   * Cloudflare Workers serves `out/` directly as static assets.
   *
   * If a server action or API route is ever added, this line has to go and the
   * project moves to `@opennextjs/cloudflare`.
   */
  output: 'export',

  images: {
    // Required by `output: 'export'` — there is no image optimization server.
    unoptimized: true,
  },
}

export default nextConfig
