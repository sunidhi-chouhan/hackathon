# CultureCompass AI

**CultureCompass AI** is a GenAI-powered travel platform for **Destination Discovery & Cultural Experiences**. It helps travelers discover destinations, uncover hidden gems, explore heritage, find local events, and connect with authentic cultural experiences.

Built for the **Google Build with AI / PromptWars** hackathon.

**Live demo:** `https://your-app.vercel.app` *(replace with your Vercel URL)*

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
- **Staggered card animations** for results (Framer Motion)

### AI model selection
Users can choose the Gemini model before generating:

| Option   | Model              | When to use |
|----------|--------------------|-------------|
| Fast     | `gemini-2.0-flash` | Quick demos, slower networks |
| **Balanced** | **`gemini-2.5-flash`** | **Better quality, moderate speed (recommended for judges)** |
| Quality  | `gemini-1.5-pro`   | Richest stories; may take longer |

> **Tip for best results:** Select **Balanced — “Better quality with moderate speed”** in the form before clicking **Discover My Cultural Journey**.

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
├── apps/web/ # Next.js app (UI + /api routes) ├── packages/shared/ # Schemas, types, constants ├── packages/ai/ # Gemini client, prompts, services └── packages/ui/ # Shared UI components