# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Commands

```bash
npm run dev       # Start dev server (Next.js, hot reload)
npm run build     # Production build
npm run preview   # Build then serve production build locally
```

No test suite is configured.

## Architecture

Next.js App Router, TypeScript, mobile-first full-screen responsive app (no phone frame).

**Styling:** CSS modules via `styles/globals.css`. All design tokens in `styles/tokens.css` as CSS custom properties. No inline styles anywhere — CSS classes only. No hardcoded colour values or font stacks in components.

**File structure:**
- `app/layout.tsx` — root layout, Google Fonts, viewport meta with viewport-fit=cover
- `app/page.tsx` — conversation screen, renders ConversationFlow
- `app/results/page.tsx` — results screen, renders PropertyResults
- `app/api/search/route.ts` — takes buyer answers, calls Serper, calls Claude, returns 3 analysed properties
- `components/conversation/` — ConversationFlow, Question, AnswerInput
- `components/property/` — PropertyCard, SignalBadge, GateCard
- `components/ui/` — Button, Badge
- `lib/prompts.ts` — SYSTEM_PROMPT, QUERY_GENERATION_PROMPT, ANALYSE_PROPERTIES_PROMPT
- `lib/serper.ts` — Serper API client
- `styles/globals.css` — all component styles using CSS custom properties
- `styles/tokens.css` — all CSS custom properties for the Ironbark palette

## Product

**HomeTruth by Pickle** — AI-powered property buying intelligence for Melbourne.

Nick is a licensed real estate agent acting as buyer's advocate. No conflict of interest — he works for the buyer, not the vendor.

**The flow:**
1. Six-question conversation learns what the buyer needs
2. Serper API finds real Melbourne listings
3. Claude analyses them and adds honest insider intelligence
4. Three property cards shown free
5. Full deep report is $49

## The Conversation

Six questions in order. One at a time. No skipping.

1. Where are you looking — suburb, area, or describe the kind of place
2. What's your budget — the real number they'd stretch to
3. Who's moving in
4. What does a typical week look like
5. What are their hard nos
6. Lifestyle context — ask it naturally, surfaces how they actually live (do NOT frame it as "Saturday morning")

**Nick's acknowledgements between questions** (use only these, no variation):
- "Got it."
- "Noted."
- "Makes sense."
- "Good to know."
- "Alright."

After all six answers: "On it. Give me a moment." — then navigate to results.

## Nick's Voice

Direct, warm, expert, zero filler words. No "Great answer!" or "Absolutely!" Speaks like a trusted friend who knows the Melbourne market cold. Between questions uses only the acknowledgements above. In analysis, honest insider intelligence — the kind of thing a buyer's advocate tells you over coffee, not what a selling agent would say.

## Commercial Model

- **Free:** 3 property cards with photo, address, price, match reason, Nick's brief, 3 signals
- **Paid ($49):** Full report — comparable sales, true reserve estimate, auction strategy, building/pest flags, suburb deep dive, Nick's recommendation
- One payment. One property. No subscription.
- Spotter fees from broker, conveyancer, building inspector, car finance, and insurance partners — always disclosed.
- A portion of every report goes to a Melbourne homeless charity.

## Design System — Ironbark Palette

All tokens live in `styles/tokens.css` as CSS custom properties:

| Token | Value |
|-------|-------|
| `--bg` | `#F7F3EE` |
| `--surface` | `#FFFDF9` |
| `--surface2` | `#F2ECE4` |
| `--border` | `rgba(88,66,48,0.11)` |
| `--text` | `#1F1A17` |
| `--text-sub` | `#645C55` |
| `--text-hint` | `#9B9188` |
| `--accent` | `#C65A32` |
| `--accent-dark` | `#A94724` |
| `--accent-mid` | `#D47146` |
| `--sage` | `#7F978F` |
| `--sage-dark` | `#6E877F` |
| `--sage-light` | `#9FB2AB` |
| `--gold` | `#B7842C` |
| `--ink` | `#1B1B18` |

**Fonts:** Playfair Display (headings), DM Sans (body) — loaded via Google Fonts in layout.tsx.

Never hardcode colour values, font stacks, or shadow strings in components. Always reference CSS custom properties.

## API Route Flow

`POST /api/search`

1. Receive buyer answers (location, budget, household, weeklyLife, hardNos, lifestyle)
2. Call Claude to generate 2–3 targeted search queries based on answers
3. Call Serper with those queries — searches Melbourne residential properties for sale
4. Pass Serper results + buyer answers to Claude
5. Claude returns structured JSON: intro + 3 properties with address, suburb, type, beds, baths, quotedPrice, trueRange, matchReason, nicksBrief, sourceUrl, imageUrl, signals (3 × label/value/type)
6. Return to frontend

Prompts live in `lib/prompts.ts`. Never put prompt text inline in route handlers.

## Responsive Design Rules

- Use `100svh` not `100vh`
- `viewport-fit=cover` in viewport meta (set via Next.js `viewport` export)
- `env(safe-area-inset-bottom)` for bottom padding on fixed/sticky elements
- Test mentally for iPhone SE, XR, Pro Max, and tablet
- No fixed pixel widths except `max-width` constraints
- Conversation and results panels use `max-width: 640px` centred

## Environment

- Codespaces only — never local Windows git
- Vercel auto-deploys on push to main
- Environment variables: `ANTHROPIC_API_KEY`, `SERPER_API_KEY` — both in Vercel dashboard only, never in code

## Key Technical Decisions

- No inline styles anywhere — CSS classes only
- No hardcoded content — everything from API or props
- Serper fetches real Melbourne listings; Claude adds intelligence layer
- Property cards link to source listing but experience stays inside HomeTruth
- `useSearchParams` wrapped in Suspense boundary (required by Next.js 14)
- Buyer answers passed to results page via URL search params
- `@/` path alias resolves to project root (configured in tsconfig.json)

## Working Principles

- Security first — never expose credentials
- Privacy by design — minimum data collection
- Mobile first — optimise for iPhone
- Keep code simple and readable; avoid over-engineering
- The founder has a terminal illness — keep work enjoyable and low stress
