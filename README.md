# Hindi with Neelam

A separate, static Astro website for online Hindi learning enquiries from families in the USA and Australia. It reuses Neelam’s portrait with the project owner’s permission and leaves EnglishWithNeelam independent.

## Stack

Astro 7, static output; Tailwind CSS 4; TypeScript strict mode; `astro:assets` responsive WebP images; self-hosted fonts; `@astrojs/sitemap`; centralized SEO head management. Vanilla TypeScript is bundled only for the time-zone planner and enquiry builder. Marketing, resources, navigation and FAQs work without client JavaScript. No database, tracking, payment processor or server runtime is required.

## Run

Node 24 LTS is recommended (minimum 22.23.4).

```sh
npm ci
npm run dev
```

The development server uses port 4321. In a restricted environment that cannot write Astro telemetry preferences, set `ASTRO_TELEMETRY_DISABLED=1` before running Astro commands. Run ordinary tools as the current user.

```sh
export ASTRO_TELEMETRY_DISABLED=1
npm run validate
npm run preview -- --port 4322
# In another terminal, with the preview running:
npm run test:browser
```

Browser checks use `/usr/bin/chromium` when present, otherwise the Playwright browser. On a local machine without Chromium, run `npx playwright install chromium`. `CHROMIUM_PATH` can select an existing browser. The browser test writes screenshots and JSON results under ignored `test-results/` and does not send messages to anyone.

## Public deployment and indexing

Read [Cloudflare Pages deployment](docs/03-cloudflare-pages.md). `SITE_URL` is a **build-time environment variable**, not a domain purchase or registration. Set it to the exact verified HTTPS origin. Supply it through your shell or Cloudflare build settings; the example file documents the value but is not automatically loaded by the configuration.

Without `SITE_URL`, builds intentionally have `noindex`, a robots disallow rule, and no canonical or sitemap. A configured production build generates canonical URLs and an automatic sitemap. Cloudflare branches other than `main` remain noindex even if the production origin is set.

## Project map

- `src/pages/index.astro`: homepage.
- `src/data/pages.json`: editable content for learning, country, city, resource and trust pages.
- `src/pages/[...slug].astro`: static page templates.
- `src/layouts/Layout.astro`: metadata, structured data, header and footer.
- `src/components/`: progressive-enhancement tools and reusable content.
- `src/lib/time.ts`: date-aware conversion and enquiry text.
- `public/resources/hindi-vowel-practice.pdf`: real downloadable starter sheet.
- `docs/01-topical-map.md`: strategy, city prioritisation and intent ownership.
- `docs/keyword-map.csv`: mapping of all 86 supplied keywords.
- `docs/02-semantic-seo-eeat.md`: semantic entities, link graph, trust and source ledger.
- `research/`: original user-provided research, not independently verified census facts.

## Functional boundaries

The contact tool prepares a WhatsApp/email message and leaves sending to the visitor. It never claims a booking or successful transmission. Fees, age suitability and schedules are confirmed by Neelam. The planner converts local date/time with IANA time zones and identifies daylight-saving gaps and repeated times. It does not promise availability.

No specialist exam service, Hindi-specific qualification, overseas teaching registration, local office, testimonial, star rating or student outcome is invented. Review teacher details, language examples and actual service terms before public launch; see the editorial policy and strategy documents.

## Source control

Repository: https://github.com/Aviicoder/HindiWithNeelam — production branch `main`.

This project was pushed through the platform Git connection after the owner created the empty repository. GitHub API access remains restricted in the development environment; this does not prevent the verified Git push. EnglishWithNeelam remains a separate project. Cloudflare Pages deployment is still pending; use the deployment guide to connect this repository.
