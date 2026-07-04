# CultureCompass AI

**CultureCompass AI** is a GenAI-powered travel platform for **Destination Discovery & Cultural Experiences**. It helps travelers discover destinations, uncover hidden gems, explore heritage, find local events, and connect with authentic cultural experiences.

Built for the **Google Build with AI / PromptWars** hackathon.

**Live demo:** Deploy on Vercel with Root Directory `apps/web` and set `GEMINI_API_KEY`.

---

## For judges — quick demo flow

1. Open the home page — two-column **Plan Your Cultural Journey** + **Cultural Portal**
2. Select **Balanced** AI model (recommended for best quality/speed tradeoff)
3. Pick interests (e.g. history, food, festivals), enter budget & duration
4. Click **Discover My Cultural Journey** — portal shows animated loading, then results
5. Explore tabs: **Heritage & Attractions**, **Hidden Gems**, **Local Events**, **Authentic Experiences**
6. Click **Read the full legend** for immersive AI storytelling
7. Toggle **dark/light theme** in the header

### Problem statement alignment

| Requirement | Implementation |
|-------------|----------------|
| Recommend attractions | Heritage tab — categorized attractions with insider tips |
| Uncover hidden gems | Hidden Gems tab — local tips and why-visit rationale |
| Immersive storytelling | Hero quote + `/story/[id]` full narrative page |
| Promote heritage | Heritage highlights, traditions, etiquette, cultural significance |
| Suggest local events | Events tab — timeline of festivals and happenings |
| Authentic experiences | Experiences tab — workshops, food tours, authenticity notes |
| GenAI-powered | All content generated server-side via Google Gemini |

---

## What’s in the deployed version

### Core experience
- **Interactive dashboard** — two-column layout: planning form (left) + Cultural Portal (right)
- **AI journey planner** — one submit generates a full cultural plan in the portal
- **Location search** — “Where are you going?” input with suggested destinations (blank = AI picks for you)
- **Interest-based discovery** — tags for history, art, food, festivals, local life, etc.
- **Dark / Light theme toggle** — black & white theme with smooth switching (saved in browser)

### AI-generated results UI
- **Local Lore & Storytelling** hero with immersive quote/story preview
- **Tabbed exploration:** Heritage & Attractions, Hidden Gems, Local Events, Authentic Experiences
- **Animated loading** — parchment-style skeleton while Gemini generates
- **Staggered card animations** for results (respects `prefers-reduced-motion`)

### AI model selection

| Option   | Model              | When to use |
|----------|--------------------|-------------|
| Fast     | `gemini-2.0-flash` | Quick demos, slower networks |
| **Balanced** | **`gemini-2.5-flash`** | **Better quality, moderate speed (recommended)** |
| Quality  | `gemini-1.5-pro`   | Richest stories; may take longer |

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15, React, Tailwind CSS, Framer Motion |
| Backend | Next.js Route Handlers (serverless API) |
| AI | Google Gemini API (`@google/generative-ai`) |
| Validation | Zod (`@culturecompass/shared`) |
| Monorepo | Turborepo + pnpm |
| Deploy | Vercel (single deployment for FE + BE) |

---

## Project structure

```
├── apps/web/           # Next.js app (UI + /api routes)
├── packages/shared/    # Schemas, types, constants
├── packages/ai/        # Gemini client, prompts, services
└── packages/ui/        # Shared UI components
```

---

## Gen AI usage (summary)

All AI runs **server-side** via `GEMINI_API_KEY` (never exposed to the browser).

| Feature | API route | Gemini service |
|---------|-----------|----------------|
| Full cultural plan | `POST /api/compass/plan` | `generateCompassPlan()` |
| Destinations | `POST /api/discover/destinations` | `generateDestinations()` |
| Attractions | `POST /api/discover/attractions` | `generateAttractions()` |
| Hidden gems | `POST /api/discover/hidden-gems` | `generateHiddenGems()` |
| Immersive story | `POST /api/culture/story` | `generateStory()` |
| Heritage | `POST /api/culture/heritage` | `generateHeritage()` |
| Events | `POST /api/culture/events` | `generateEvents()` |
| Experiences | `POST /api/culture/experiences` | `generateExperiences()` |

Granular APIs support extensibility; the dashboard uses the composite `/api/compass/plan` for a single fast round-trip.

Prompts live in `packages/ai/src/prompts/`. User input is sanitized and wrapped in XML delimiters before interpolation. Responses are structured JSON, validated with Zod.

---

## Quality, security & accessibility

| Area | Approach |
|------|----------|
| **Code quality** | Turborepo monorepo, strict TypeScript, layered packages, consistent API error handling |
| **Testing** | Node.js test runner — schema validation, API error handler, rate limit tests (`pnpm test`) |
| **Security** | Server-only API key, Zod input limits, prompt sanitization, rate limiting on POST `/api/*`, security headers |
| **Accessibility** | Semantic HTML, form labels, ARIA tabs, `aria-pressed` toggles, skip link, `prefers-reduced-motion`, live regions |
| **Efficiency** | Single composite AI call, Gemini JSON mode, client singleton, 55s timeout, bounded input lengths |

---

## Local setup

```bash
pnpm install
cp .env.example apps/web/.env.local
# Add GEMINI_API_KEY from https://aistudio.google.com/apikey
pnpm dev:web
```

### Scripts

```bash
pnpm dev:web      # Start development server
pnpm build        # Production build
pnpm typecheck    # TypeScript check
pnpm test         # Run Vitest tests
```

---

## Deployment (Vercel)

- **Root Directory:** `apps/web`
- **Environment variable:** `GEMINI_API_KEY` (required)
- Optional: `GEMINI_MODEL` to override default model

See `DEPLOYMENT.md` for full steps.
