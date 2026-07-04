# AI Cooking Planner

A full-stack hackathon application for generating meal plans, grocery lists, ingredient substitutions, and budget feasibility guidance.

## Repository structure

- `frontend/` - React + Vite + Tailwind client application
- `backend/` - Node.js + Express API server

## Local setup

1. Install dependencies from the repository root:
   ```bash
   npm install
   ```
2. Start the backend in development mode:
   ```bash
   npm --workspace backend run dev
   ```
3. Start the frontend in development mode:
   ```bash
   npm --workspace frontend run dev
   ```
4. Open the frontend URL shown by Vite (usually `http://localhost:5173`).

## Production build

Build both apps from the root:

```bash
npm run build
```

Or build each workspace explicitly:

```bash
npm --workspace frontend run build
npm --workspace backend run build
```

## Environment variables

### Frontend

Create `frontend/.env` with:

```bash
VITE_API_BASE_URL=https://your-backend-url/api
```

### Backend

Create `backend/.env` with:

```bash
PORT=4000
GEMINI_API_KEY=your_api_key_here
GEMINI_PROJECT_ID=your_project_id
GEMINI_LOCATION=us-central1
GEMINI_ENDPOINT_ID=your_endpoint_id
```

For Render, set these environment variables in the service settings.

## Deployment guide

### Frontend: Vercel

1. Connect the repository to Vercel.
2. Set the root directory to `frontend`.
3. Use the following settings:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Set the environment variable:
   - `VITE_API_BASE_URL` = `https://<your-backend-url>/api`

### Backend: Render

1. Create a new Web Service on Render.
2. Connect the repository and set the root directory to `backend`.
3. Use the following settings:
   - Build command: `npm install && npm run build`
   - Start command: `npm start`
4. Add environment variables:
   - `GEMINI_API_KEY`
   - `GEMINI_PROJECT_ID`
   - `GEMINI_LOCATION`
   - `GEMINI_ENDPOINT_ID`
   - `PORT=4000`

## Deployment commands

Local commands for preparing deployment:

```bash
npm install
npm --workspace frontend run build
npm --workspace backend run build
```

## Notes

- The frontend is ready for Vercel deployment and uses `VITE_API_BASE_URL` to connect to the backend.
- The backend uses environment variables and is ready for deployment on Render.
- The backend currently integrates with Google Gemini via the official Google Cloud AI SDK.
