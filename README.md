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

- Fixed the "celebrating more than 40 years" banner: the shop opened in 1978, so the concept computes the years automatically.
- One phone number everywhere (the current footer and accessibility statement use a different number).
- Booking was "call and describe the problem"; the concept adds an online request form.
- Removed the template leftovers (meta keywords, placeholder links, a 1x1 placeholder NAPA logo, visible tag-manager text).
- Adds a factory maintenance guide (30K/60K/90K/100K) and puts the military discount and coupons up front.

## Before client presentation

- Confirm the main number. The concept uses (303) 327-9176; the footer of the current site shows (303) 364-3391.
- Confirm the Google rating and count. The concept shows 4.8 / 698: 698 is what the current site links as Google reviews, and our lead list showed 298. Live data replaces it once the Places env vars are set.
- Confirm the NAPA AutoCare 24-month / 24,000-mile warranty, the 10% military discount and the coupon amounts.
- The maintenance-interval guide is general guidance written for the concept; have Ken review it against what he actually recommends.
- The two quotes are copied from reviews on the current site; confirm the shop is happy to reuse them.
- Add the shop's email and decide where appointment requests go.
- Replace the icon wordmark with the business's real logo, and add real photos with permission.
- Keep the independent-concept disclaimer visible; do not imply this is the company's official site.
- The countdown is display-only, not access control. The subdomain is public to anyone with the URL.
