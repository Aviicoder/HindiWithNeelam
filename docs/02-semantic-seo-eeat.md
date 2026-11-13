# Semantic SEO, internal linking and E-E-A-T

## Semantic coverage

Every page owns one intent and answers it in the visible text. Use natural variants (Hindi lessons / online Hindi classes / Hindi tutor) without repeating a city list in every paragraph. Include connected concepts: heritage language, family communication, listening and speaking, Devanagari, swar, matras, transliteration, local time and parent participation. Do not treat Indian origin as identical to Hindi use.

## Link graph

Home -> learning pathways, both country hubs, teacher, resources, enquiry.
Country hub -> selected city guides + other-city anchors + time-zone planner + relevant pathways.
City guide -> its country hub + time planner + one relevant learning resource + enquiry prefilled with city.
Course page -> two relevant resources + both markets + teacher/approach + enquiry.
Resource -> relevant learning pathway + next resource + attribution/editorial policy.
About/approach -> contact and pathways. Footer -> trust, privacy, accessibility, contact and hubs.

Descriptive anchors identify the destination. Breadcrumbs mirror this hierarchy and use matching BreadcrumbList schema. Avoid orphan pages and sitewide exact-match city link stuffing. No duplicate page for every spelling or keyword variant. Same-intent uploaded keywords map to one URL in keyword-map.csv.

## Technical SEO

Static HTML, one H1, unique title/description, responsive layout, explicit image dimensions, semantic landmarks, keyboard-accessible navigation and native details accordions. JSON-LD: Organization + Person + WebSite; breadcrumbs; service pages use Service with an online channel and country areaServed. No fabricated course credentials, price Offers, AggregateRating or local addresses. Resource pages are ordinary WebPages until Neelam personally reviews them; no fabricated expert review or Article author attribution.

Use SITE_URL only after the actual domain is verified. That origin drives canonical, OG URL and sitemap. Unconfigured local builds are noindex with robots Disallow. Deploy previews must stay noindex. Country hubs use appropriate page language; do not add hreflang between unrelated articles. Real language translations would need their own equivalent pages and reciprocal hreflang.

## E-E-A-T implementation and evidence

- Real portrait reused with the user's permission from EnglishWithNeelam/public/Images/neelam-portrait.jpg. Do not reuse photos of children or testimonials as Hindi evidence.
- Teacher profile attributes B.Ed, M.Com and CTET Paper 1 to the existing teacher profile. These are teaching qualifications, not proof of specialist Hindi certification or US/AU school registration. Omit unconfirmed Hindi-specific experience years and outcomes.
- Clear online-from-India service statement, actual existing contact details, enquiry process, fees/times confirmed before commitment.
- Editorial policy distinguishes initial learning resources from personally reviewed teacher materials. Owner review is required before claiming Neelam authored or reviewed them.
- Privacy page explains third-party WhatsApp/email handoff. No server-side form, payment, tracking pixels or claims that a message was sent automatically.
- No invented student counts, testimonials, “best” claims, guaranteed fluency, physical overseas office or exam affiliation.

## Owner review before public launch

Confirm Hindi audience ages, teaching experience and curriculum; verify credentials, email and WhatsApp ownership; confirm prices, lesson length, cancellation terms and feasible timetable; review every Hindi example and transliteration; choose domain; confirm asset rights. These checks do not block development, but unverified details must not be represented as confirmed.

## Source ledger

1. Uploaded TARGET-COUNTRY-AND-KEYWORDS.md: secondary hypotheses, dated 9 Nov 2026. Pricing, competition, exam availability and timing claims are not independently verified.
2. Uploaded keywords-by-country.csv: 86 research keywords; 62 AU/US, 24 outside scope. No measured search volume/KD.
3. Uploaded US metro/state CSVs: counts without provenance/year. Retained in research; used only for provisional prioritisation, not public marketing statistics.
4. EnglishWithNeelam/src/routes/about.tsx: source of the teacher's existing self-reported qualifications/contact/profile.
5. ABS census portal https://www.abs.gov.au/census/find-census-data and US Census https://data.census.gov/: authoritative verification destinations; access blocked during initial work. No claim of validation.

## Domain shortlist (availability and trademarks not checked)

1. HindiWithNeelam.com — recommended: memorable personal brand, neutral across both markets.
2. LearnHindiWithNeelam.com — explicit learning intent, slightly longer.
3. HindiWithNeelam.online — useful fallback, but .com is easier to communicate verbally.

Use one global domain with /usa/ and /australia/ rather than splitting authority across country domains. Keyword inclusion alone does not ensure rankings. Do not buy .com.au without checking eligibility and trademark conflicts.
