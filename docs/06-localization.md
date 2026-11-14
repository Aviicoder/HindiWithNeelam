# Localized landing pages

The five country landing pages are `/fr/` (France, French), `/ja/` (Japan, Japanese), `/de/` (Germany, German), `/es/` (Spain, Spanish), and `/nl/` (Netherlands, Dutch).

All five render `src/components/LocalizedLanding.astro`. Only the data in `src/data/locales/*.json` changes: keep the same fields, list lengths, section order, heading levels, inline emphasis and deliberate line breaks. Use the shared CSS and spacing; allow translated text to wrap naturally rather than adding per-language markup, margins or fixed heights. `ContactLinks.astro` supplies the same phone, WhatsApp and email controls in each language. The WhatsApp draft is translated and never sent automatically.

These are localized landing pages, not translations of every existing English article. Resource, privacy, accessibility and editorial-policy destinations are explicitly labelled as English. A language switcher is available across the site. Production home/landing pages have reciprocal language alternates and self-canonical URLs; unconfigured builds and deployment preview branches retain noindex behaviour.

No French, Japanese, German, Spanish or Dutch keyword-volume data was supplied in the existing research. Copy uses natural equivalents of online Hindi lessons, Hindi for children, family language and beginner learning without claiming keyword research or market rankings. The page language does not establish which languages Neelam can use for teaching explanations; visitors are asked to confirm suitability, teaching language, fees and availability.

Run `npm run validate`, `npm run test:seo`, then start `npm run preview -- --port 4322` and run `npm run test:browser`. The SEO check restores an unconfigured local build, so complete it before browser testing. The browser suite checks all five pages at desktop/mobile sizes, compares their rendered element hierarchy and classes, verifies localized contact destinations, runs accessibility checks and verifies navigation/contact links without JavaScript. Screenshots are written to ignored `test-results/`.
