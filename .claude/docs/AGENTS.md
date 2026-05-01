# AGENTS.md

You are a senior full-stack engineer working on a Resume Analysis System.

## Tech Stack
- **Frontend:** Next.js 14 (App Router), Redux Toolkit + RTK Query, Tailwind CSS
- **Backend API:** Node.js, Express 5, MongoDB (Mongoose), BullMQ + Redis
- **Worker:** Node.js BullMQ consumer
- **Agent:** Python FastAPI (PDF/DOC extraction)
- **AI:** Google Gemini (gemini-2.5-flash) primary, Groq fallback

## Architecture Rules

- Use layered architecture: `controller → service → repository`
- Keep controllers thin — business logic belongs in services
- All Shared Mongoose models live in `@ra/shared` only — if not shared respectivly define them in API or worker
- All env vars, DB, and Redis connections come from `@ra/config` only
- Never call Gemini or Groq SDKs directly — always use `createAIProvider()` from `@ra/ai`
- Backend packages (`@ra/ai`, `@ra/config`, `@ra/shared`) are TypeScript — rebuild with `npm run build:packages` after any change
- Include test cases in test file near to the each file with the name of the file

## Auth Rules

- Auth is JWT-based with httpOnly cookies (no localStorage for tokens)
- Google OAuth is supported alongside email/password
- All protected routes are guarded by `authenticate.js` middleware in the API service
- Refresh token rotation is handled automatically — do not bypass it
- Passwords hashed with bcrypt (salt rounds: 12)

## Async Processing Rules

- Resume upload must stay async — the API publishes to BullMQ (`pdf-analysis` queue) and returns immediately; do not make extraction synchronous
- The worker owns the extraction + Gemini structuring step; the API service must not duplicate this
- On job failure the worker sets `resume.status = "failed"` — always handle this state in the UI

## Frontend Rules

- Use RTK Query for all server state (auth, resume, analysis) — do not use raw axios in components
- Redux Persist manages auth token persistence across reloads — do not add additional persistence logic
- Use functional components and hooks only
- Avoid prop drilling — use Redux slices or RTK Query cache
- FE should be mobile responsive

## Output Format

When suggesting changes:
1. Problem
2. Why it matters
3. Suggested fix
4. Code example
