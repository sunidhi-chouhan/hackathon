# Vercel Deployment Guide — CultureCompass AI

This project deploys as a **single Vercel project** (frontend + API routes).

## Prerequisites

- GitHub repository with this code pushed
- [Vercel account](https://vercel.com)
- [Gemini API key](https://aistudio.google.com/apikey)

## Step 1: Push to GitHub

```bash
git add .
git commit -m "feat: CultureCompass AI monorepo"
git push origin main
```

## Step 2: Import in Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Configure the project:

| Setting | Value |
|---------|-------|
| **Framework Preset** | Next.js |
| **Root Directory** | `apps/web` |
| **Build Command** | (auto from `vercel.json`) `cd ../.. && pnpm turbo build --filter=@culturecompass/web` |
| **Install Command** | (auto from `vercel.json`) `cd ../.. && pnpm install` |
| **Output Directory** | `.next` (default) |

## Step 3: Environment Variables

In Vercel → Project → Settings → Environment Variables, add:

| Name | Value | Environments |
|------|-------|--------------|
| `GEMINI_API_KEY` | Your Google AI Studio API key | Production, Preview, Development |
| `GEMINI_MODEL` | `gemini-2.0-flash` (optional) | Production, Preview, Development |
| `NEXT_PUBLIC_APP_NAME` | `CultureCompass AI` (optional) | Production, Preview, Development |

**Important:** Never add `GEMINI_API_KEY` as a `NEXT_PUBLIC_*` variable.

## Step 4: Deploy

Click **Deploy**. Vercel will:

1. Install dependencies from monorepo root via pnpm
2. Build `@culturecompass/shared`, `@culturecompass/ai`, `@culturecompass/ui`
3. Build and deploy `@culturecompass/web`

## Step 5: Verify Production

Replace `YOUR_APP` with your Vercel domain:

```bash
# Health check (no API key needed for this route to respond, but key needed for AI routes)
curl https://YOUR_APP.vercel.app/api/health

# Expected response:
# {"status":"ok","timestamp":"2026-..."}
```

Then open `https://YOUR_APP.vercel.app` in a browser:

1. Fill out the discovery form on the home page
2. Submit → redirects to `/discover`
3. Wait for Gemini to generate your cultural plan
4. Click a destination → view tabs
5. Click "Read immersive story" → `/story/[id]`

## Troubleshooting

### Build fails: "Cannot find module @culturecompass/*"

Ensure Root Directory is `apps/web` and install command runs from monorepo root (`cd ../.. && pnpm install`).

### API returns 502 "Missing GEMINI_API_KEY"

Add `GEMINI_API_KEY` in Vercel environment variables and redeploy.

### `/api/compass/plan` times out

Vercel Hobby plan has a 10s serverless timeout. Options:

- Use `gemini-2.0-flash` (default, fastest)
- Upgrade to Vercel Pro (60s timeout)
- Simplify the compass plan prompt

### pnpm not found on Vercel

The root `package.json` specifies `"packageManager": "pnpm@9.15.0"`. Vercel should auto-detect this. If not, set Install Command explicitly to `cd ../.. && corepack enable && pnpm install`.

## Local Production Preview

```bash
pnpm build
cd apps/web && pnpm start
```

Set `apps/web/.env.local` with your `GEMINI_API_KEY` before testing AI routes locally.
