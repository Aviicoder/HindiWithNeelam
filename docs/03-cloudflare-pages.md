# Deploy to Cloudflare Pages

This is a static Astro build. No Cloudflare adapter, Worker, database or runtime secret is required. The domain examples below are examples, not claims of registration or deployment.

## Option A: connect a GitHub repository

1. Create the separate `HindiWithNeelam` repository in the intended GitHub account. Push this project (including package-lock.json, source and the generated PDF; excluding node_modules and dist). Do not replace EnglishWithNeelam.
2. In Cloudflare, choose Workers & Pages -> create a Pages project -> connect the repository. Select production branch `main`.
3. Use these settings:
   - Framework preset: Astro.
   - Build command: `npm run build`.
   - Build output directory: `dist`.
   - Root directory: repository root.
   - Node version: 24 (`NODE_VERSION=24` if needed).
   - `ASTRO_TELEMETRY_DISABLED=1` (optional).
4. Confirm the actual Pages project hostname assigned by Cloudflare. Set the production build environment variable `SITE_URL` to that exact HTTPS origin (or your verified custom domain), with no path. Rebuild after setting it.
5. Preview branches remain noindex because the Astro configuration checks `CF_PAGES_BRANCH`. Production must use `main`, or update this check if you choose another branch.

The `_headers` file applies security headers and immutable caching for Astro assets. A root `404.html` supplies a real not-found page; there is no SPA wildcard redirect to the homepage.

## Option B: direct upload

Choose the actual Pages hostname/custom domain first. Then build locally with the chosen origin:

```sh
npm ci
SITE_URL=https://YOUR-ACTUAL-HOSTNAME ASTRO_TELEMETRY_DISABLED=1 npm run build
node scripts/check-build.mjs
```

Upload the **contents of `dist/`** through Cloudflare Pages Direct Upload. The optional generated ZIP puts index.html at the archive root. Do not upload the source ZIP or node_modules as the website. A preview ZIP built without SITE_URL is safe for visual review but remains noindex until you rebuild with the actual origin.

A Direct Upload project and a Git-connected project have different deployment workflows; choose Git integration if you want automatic deployments from commits.

## Verify after deployment

- Home, /usa/, /australia/, city guides, /contact/ and /time-zones/ return rendered HTML.
- A nonexistent URL returns 404.
- /resources/hindi-vowel-practice.pdf downloads and displays Hindi characters.
- The enquiry handoff opens a prefilled message; nobody is messaged automatically.
- /robots.txt allows crawling on production and points to /sitemap-index.xml.
- Canonical and OG URLs use the actual domain. sitemap-index.xml and sitemap-0.xml contain that origin, not an example or local origin.
- Preview deployments stay noindex.
- Test contact links and confirm ownership of the inherited phone/email.
- Submit the verified sitemap to Search Console only after public content review.

## Custom domain

Recommended candidate: `HindiWithNeelam.com`. Alternatives: `LearnHindiWithNeelam.com`, `HindiWithNeelam.online`. Availability and trademark checks have not been performed. Register the chosen domain with your registrar, attach it in the Pages custom-domain settings, and follow Cloudflare's displayed DNS instructions. Update SITE_URL and rebuild when switching to the final domain. Use a single origin and redirect the alternate www/non-www hostname through Cloudflare.

## Current external blockers

Read access to the existing GitHub repository works through the platform Git proxy, but the GitHub API returns Forbidden. This blocks creating a GitHub repository from this session; a present GH_TOKEN is not evidence of API permission. No Cloudflare credentials were requested because the user intends to upload the project. Neither GitHub publication nor a public Cloudflare deployment is claimed.
