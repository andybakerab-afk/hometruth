# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Next.js, hot reload)
npm run build     # Production build
npm run start     # Run production build locally
```

No test suite is configured.

## Architecture

This is a Next.js App Router demo — a mobile phone mockup UI for the Hometruth product (by Pickle, Melbourne). There is no routing (beyond Next.js), no backend, no state management library.

**File structure:**
- `app/layout.tsx` — root layout with metadata and Google Fonts link
- `app/page.tsx` — main page, imports `HometruthApp`
- `components/HometruthApp.jsx` — the full app component (`'use client'`)
- `src/theme.js` — design token palette

**Key patterns:**

- All inline styles are defined in a single `S` object at the top of the `Hometruth` component. The design token palette is in the `P` constant (colors, fonts, shadows), imported from `src/theme.js`. Design tokens must never be hardcoded in components — always reference `P`.
- Two verticals: `"homes"` and `"cars"`, each with their own ordered screen list (`HOME_SCREENS` / `CAR_SCREENS`). Screen navigation is a simple integer index via `go(n)`.
- `HomesScreen` and `CarsScreen` are inner components that switch on `screen` index with `if (screen === N)` blocks — no routing.
- Two shared screen components reused across verticals: `GateScreen` (freemium paywall at $49) and `TransparencyScreen` (how Hometruth makes money). Both accept a `context` prop (`"homes"` | `"cars"`) to vary copy.
- Screen transition is handled by an `entered` boolean toggled via `useEffect` + `setTimeout` on screen/vertical change, driving CSS opacity/transform.
- Google Fonts (Playfair Display, DM Sans) are loaded inline via a `<link>` tag inside the render tree.

## Product Context

HomeTruth by Pickle is an AI-powered property and car buying app for Australian buyers. Built for Nick (Andy's son, 28, works at BMW South Yarra, has a real estate licence).

**Taglines:**
- "Real advice. Real homes. Home truths."
- "Nick will bring it home."
- "Just show up for the bow."

**The bow story:** The family bought an Audi and asked Nick to handle all negotiation — they just picked it up with a gift box and bow on it. That story is the heart of the Cars product.

## Commercial Model

- Free browsing with snapshot data.
- $49 per report (one deep-dive, no subscription).
- Full service on request, priced case by case.
- Spotter fees from broker, conveyancer, building inspector, car finance, and insurance partners.
- Modelled on a financial advisor: free consult surfaces what you don't know; paid report is the statement of advice.
- Free answers "should I be interested?" — the report answers "should I buy this specific one and what should I pay?"

## Key Product Decisions

- Nick is a buyer's advocate, not a listing agent. No conflict of interest.
- Passive income first — Nick stays at BMW in Phase 1.
- First home buyers are a key demographic.
- Notes field preferred over complex filter dropdowns — AI handles natural language better than structured filters.
- The database of qualified subscribers is a long-term asset.
- A percentage of revenue goes to a homeless charity.

## Design System

**Palette:**
- Accent: `#C2522A`
- Background: `#F7F3EE`
- Surface: `#FFFFFF`
- Surface Alt: `#F0EBE4`
- Text: `#1C1A17`
- Text Sub: `#6E6560`
- Gold: `#B8832A`

**Fonts:** Playfair Display for headings, DM Sans for body.

All design tokens must live in `src/theme.js` only. Never hardcode colour values, font stacks, or shadow strings in components.

## Australian Context

- Victorian stamp duty rules apply.
- First Home Owner Grant (FHOG): $10k for new builds; stamp duty exemption under $600k.
- ASIC disclosure requirements for referral fees — always disclose spotter fees explicitly.
- Data residency in Australia when Supabase is added (Sydney region ap-southeast-2).

## Technical Environment

- Always use GitHub Codespaces — never local Windows git.
- Never paste files into the GitHub web editor (adds BOM silently).
- Vercel auto-deploys on push to main.
- No environment variables yet — pure frontend demo.

**Future stack:**
- Supabase PostgreSQL, Sydney region, RLS from day one.
- Two-client auth pattern: anon client for token verification, service role client for DB writes.
- Anthropic Claude API for suburb and dealer reports.
- Stripe for payments.
- API keys go in Vercel dashboard only — never in code.

## Working Principles

- Security first — never expose credentials.
- Privacy by design — minimum data collection.
- Mobile first — optimise for iPhone.
- Avoid hardcoding — use constants and configuration files for anything that might change, including colours, copy, pricing, and screen lists.
- Keep code simple and readable; avoid over-engineering.
- The founder has a terminal illness — keep work enjoyable and low stress.

## Current State

Pure frontend demo. All data is hardcoded. Fitzroy and BMW 3 Series are placeholder examples.

**Next steps (in order):**
1. Make the three fixes to the demo: transparency screen numbers, charity pledge, Nick's licence framing.
2. Refactor palette to `src/theme.js` (done — P is now imported from theme.js).
3. Add real Anthropic API calls for suburb and dealer reports.
