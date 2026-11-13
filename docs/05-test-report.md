# Final validation report

Validated on 13 November 2026 against the local static production output (not a deployed Cloudflare site).

- Clean npm ci: passed with the committed package lock.
- Strict Astro/TypeScript check: zero errors, warnings or hints.
- Unit tests: 8 passed; winter/summer US and Australian offsets, nonexistent/repeated local times, Adelaide half-hour offsets, next-day conversion, invalid dates and enquiry text encoding.
- Static build: 26 HTML pages (25 content pages plus 404).
- Build inspection: 991 local references resolve; unique titles/descriptions, one H1 per page and parseable structured data.
- Executable JavaScript: only two page scripts, for contact and time-zone tools. Homepage and other content pages have none.
- Browser checks: 50 route/viewport combinations, 1440 px desktop and 390 px mobile; no horizontal overflow, broken images, browser exceptions or failed asset requests.
- Automated accessibility: axe WCAG 2 A/AA and 2.1 AA scan of all 25 content pages; zero violations. This is not a claim of comprehensive manual accessibility certification.
- Navigation, native FAQ, form validation, safe WhatsApp/email link preparation, stale-message hiding, PDF download, JavaScript-disabled navigation/contact fallback and 404: passed.
- Planner event-handler processing: 4.6 ms; enquiry handler: 0.3 ms on this machine. These are processing measurements, not a promise of total page loading speed or performance on every device.
- Production-origin SEO test: 25 sitemap URLs, canonical origin, production robots and noindex 404 passed using the reserved example.com test origin. That test origin was removed from the final preview output.
- Cloudflare preview-branch test: noindex, robots disallow, no sitemap passed.
- PDF: one A4 page, Hindi font embedded, tagged PDF generated and downloaded successfully.

## Not exercised

No real messages, bookings, payments or external account actions were performed. No public Cloudflare deployment, DNS, production email delivery, WhatsApp account response, real-user performance, Search Console indexing or search ranking was validated. GitHub API remained blocked. Official demographic verification remains pending. Source artefacts are independent of EnglishWithNeelam.

## Repeat

npm run validate; npm run test:seo; start npm run preview -- --port 4322; npm run test:browser. Set ASTRO_TELEMETRY_DISABLED=1 if the runtime cannot write user-level configuration. Browser checks use Chromium and write ignored test-results/ artefacts.
