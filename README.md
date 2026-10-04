# MT-haCks Hackathon — Fall 2026

Hacker registration site for **MT-haCks**, the Muslim Tech Collaborative (MTC) at Rutgers hackathon.

- **Date:** Saturday, Nov 21, 2026, 9:00 AM – 9:00 PM
- **Venue:** Rutgers University, New Brunswick (exact location TBD)
- **Team size:** 1-4 (solo registrants get matched into teams day-of)
- **Expected turnout:** 75-100 hackers, ~200 registrant cap

## Stack

- [Next.js](https://nextjs.org) (App Router, TypeScript, Tailwind)
- Registration submissions are appended to a Google Sheet via a Google service account
- Optional resume uploads go to a Google Drive folder (link stored in the sheet)

## Setup

See [SETUP.md](./SETUP.md) for the Google Cloud / Sheets / Drive configuration needed to run this locally.

```bash
npm install
cp .env.example .env.local   # then fill in the values, see SETUP.md
npm run dev
```

## Feature flags

MLH-standard fields (Code of Conduct agreement, data sharing consent, demographic questions) are gated behind a flag in [`src/config/features.ts`](./src/config/features.ts) — flip `MLH_FIELDS_ENABLED` to `false` to hide them if this ends up not being an MLH-affiliated event.
