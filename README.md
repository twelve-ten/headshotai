# HeadshotAI

Professional AI headshots from your selfies. Upload photos, pick a style, get studio-quality results.

**App** at `/app` — upload and generate headshots. **Auth** at `/auth` — sign in.

## Quick start

```bash
cp .env.example .env.local  # add Gemini, Stripe, Turso, and NextAuth keys
npm install
npx prisma db push
npm run dev
```

## Features

- Multiple headshot styles — corporate, creative, casual, and more
- Credit-based pricing with Stripe payments
- Authentication via NextAuth
- Studio-quality output from regular selfies

## Stack

Next.js · Tailwind CSS · Gemini AI · Prisma · Turso · Stripe · NextAuth
