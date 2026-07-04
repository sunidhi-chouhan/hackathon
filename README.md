# CultureCompass AI

GenAI-powered platform for destination discovery and authentic cultural experiences. Built for the Google Build with AI hackathon.

## Features

- **Destination Discovery** — AI-recommended destinations based on interests, budget, and travel style
- **Hidden Gems** — Off-the-beaten-path spots locals love
- **Immersive Storytelling** — Rich cultural narratives powered by Gemini
- **Heritage & Traditions** — Local customs, etiquette, and cultural significance
- **Events & Experiences** — Festivals, workshops, and authentic cultural activities

## Tech Stack

- **Monorepo**: Turborepo + pnpm workspaces
- **Frontend & API**: Next.js 15 (App Router + Route Handlers)
- **AI**: Google Gemini API (`@google/generative-ai`)
- **Validation**: Zod schemas in `@culturecompass/shared`
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (single deployment for FE + BE)

## Repository Structure

```
├── apps/web/           # Next.js app (pages + API routes)
├── packages/shared/    # Zod schemas, types, constants
├── packages/ai/        # Gemini client, prompts, services
└── packages/ui/        # Reusable UI components
```

## Local Development

### Prerequisites

- Node.js 18+
- pnpm 9+
- Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey)

### Setup

```bash
# Install dependencies
pnpm install

# Configure environment
cp apps/web/.env.local.example apps/web/.env.local
# Edit apps/web/.env.local and set GEMINI_API_KEY

# Start development server
pnpm dev:web
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
pnpm build
```

## Environment Variables

| Variable | Where | Required | Description |
|----------|-------|----------|-------------|
| `GEMINI_API_KEY` | Server only | Yes | Google AI Studio API key |
| `GEMINI_MODEL` | Server only | No | Default: `gemini-2.0-flash` |
| `NEXT_PUBLIC_APP_NAME` | Client | No | App display name |

**Never expose `GEMINI_API_KEY` to the browser.**

## API Routes

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/compass/plan` | Full cultural journey plan (primary endpoint) |
| POST | `/api/discover/destinations` | Destination recommendations |
| POST | `/api/discover/attractions` | Attraction recommendations |
| POST | `/api/discover/hidden-gems` | Hidden gem recommendations |
| POST | `/api/culture/story` | Immersive storytelling |
| POST | `/api/culture/heritage` | Heritage and traditions |
| POST | `/api/culture/events` | Local events and festivals |
| POST | `/api/culture/experiences` | Authentic cultural experiences |

## Deploy to Vercel

1. Push this repository to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. Set **Root Directory** to `apps/web`.
4. Vercel will use [`apps/web/vercel.json`](apps/web/vercel.json) for monorepo build commands.
5. Add environment variables in Vercel dashboard:
   - `GEMINI_API_KEY` (Production, Preview, Development)
   - `GEMINI_MODEL` (optional)
   - `NEXT_PUBLIC_APP_NAME` (optional)
6. Deploy.

### Post-deploy verification

```bash
curl https://your-app.vercel.app/api/health
# Expected: {"status":"ok","timestamp":"..."}
```

Submit the discovery form on the live site to test `/api/compass/plan`.

## Demo Flow

1. Landing page → fill discovery form (interests, budget, duration, style)
2. `/discover` → view AI-generated destinations and featured pick
3. `/destination/[id]` → explore tabs (attractions, hidden gems, heritage, events, experiences)
4. `/story/[id]` → read immersive cultural narrative

## License

Private — hackathon project.
