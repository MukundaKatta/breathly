# Breathly

> Five minutes. Regulate your nervous system.

Guided breathwork for anxiety, sleep, and focus. No subscription paywall on the first week.

## Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4
- **Package manager:** pnpm

## Run

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Push to a Vercel project linked to this repo. Zero config — the Next.js preset handles everything.

## Routes

| Path | Description |
| --- | --- |
| `/` | Landing page with waitlist form |
| `/try` | Interactive 4-7-8 guided breath cycle |
| `/api/waitlist` | POST proxy to waitlist API |

## Status

v0 skeleton — landing page ported, interactive breathing exercise, waitlist API wired up.
