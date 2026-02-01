# Insurance Websites Monorepo

This repository contains multiple insurance agency websites.

## Apps

- `apps/sanmarinoinsurance` — San Marino Insurance Agency (Tracy Cuiying Zhang, Allstate)

## Local Development

Run the San Marino site:

```bash
npm run dev
```

Or explicitly:

```bash
npm run dev:sanmarino
```

Open `http://localhost:3000`.

## Deployment Model (Vercel)

Recommended setup:

- **One Vercel project per app** (each points to the same Git repo)
- Configure the Vercel project **Root Directory** to the app folder (example: `apps/sanmarinoinsurance`)
- Attach the custom domain for that site in the Vercel project settings

