# Tune Tech Automotive — Blueprint WebStudio Concept

Independent, non-official redesign concept for https://www.tunetechautomotive.org/ (Aurora, CO).
Preview: https://tta.blueprintwebstudio.com (noindex; the demo code lives in the Neon `demos` table).

All business content is in `src/site.js`; colors and fonts are in `src/theme.css`. `src/App.jsx` is the shared layout.

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

Vercel project `tune-tech-automotive` (framework: Vite). Connect the repo under Vercel → Settings → Git so pushes to `main` deploy automatically.
Domain `tta.blueprintwebstudio.com` is a CNAME at Porkbun pointing to the target Vercel shows for this project.

Environment variables (all optional):

| Variable | Purpose |
|---|---|
| `VITE_CONCEPT_END_DATE` | Countdown end date in the concept widget (defaults to 2026-11-20) |
| `GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID` | Live Google rating and review excerpts (`api/google-reviews.js`) |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Request-form emails (`api/contact.js`). Without them the form shows a demo message |

The "I'm Interested" form posts to `api/demo-interest.js`, which proxies to the main studio site.

## What changed from the current site

- Real Tune Tech logo (from the current site) in the header and footer; favicon cropped from its tachometer.
- Palette built from the logo (red #EC2129, yellow #FFF200), the site's espresso header (#201311), crimson nav (#C71633), gold/maroon buttons (#FBB60F / #4A1818) and the navy/red/orange/yellow fascia stripe on the shop building, which is now the page's signature divider. The tachometer from the logo is the hero's anniversary gauge.
- Hero uses the shop's own storefront photo (the current site only shows it darkened behind the NAPA section); the about section uses their Colfax sign photo.
- Fixed the "celebrating more than 40 years" banner: the count is computed from 1978 (48 in 2026) in the hero gauge and the credentials strip.
- Credentials strip with every badge on the current site: NAPA AutoCare Center, ASE-certified, the anniversary banner, plus the Google rating.
- One phone number everywhere (the current footer and accessibility statement use a different number).
- Booking stays "call and describe the problem" (big call buttons in the hero, services and booking section), with an optional request form added.
- Six customer reviews quoted verbatim from the current homepage and reviews page, labelled as from the current website.
- Specials shown as clip-out coupons; the NAPA 24/24 warranty gets its own band; the homepage FAQ is kept as an accordion.
- Dropped the previous concept's invented 30K/60K/90K/100K checklist, the stock "Since 1978" car hero (text baked into the image), the template leftovers and the placeholder NAPA logo.

## Before client presentation

- Confirm the main number. The concept uses (303) 327-9176 (header, body, contact); the footer and accessibility statement of the current site show (303) 364-3391.
- Confirm the Google rating and count. The concept shows 4.8 / 298 from our lead research; the current site's header says "698 reviews". Live data replaces it once the Places env vars are set.
- The ASE badge image is the standard ASE "Certified" logo (not downloaded from tunetechautomotive.org, which only shows ASE on the street sign and in text). Confirm the shop is entitled to display it.
- The four service photos (brakes, electrical, tune-ups, maintenance) come from the blog on the current site and look like generic stock or AI images, not Tune Tech's bays. Replace with real shop photos if Ken has them.
- Confirm the NAPA AutoCare 24-month / 24,000-mile warranty, the 10% military discount and the coupon amounts.
- The reviews are copied from the current website; confirm the shop is happy to reuse them.
- Add the shop's email and decide where appointment requests go.
- Keep the independent-concept disclaimer visible; do not imply this is the company's official site.
- The countdown is display-only, not access control. The subdomain is public to anyone with the URL.
