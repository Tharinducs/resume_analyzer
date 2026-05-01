# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> For full architecture, data models, API routes, and data flow see `.claude/docs/ARCHITECTURE.md`.

## What This Project Is

AI-powered resume analyzer. Users upload PDF/DOC resumes → text is extracted (Python agent) → structured by Gemini → analyzed for ATS quality scores and recommendations.

## Development Commands

### Frontend (`frontend/`)
```bash
npm run dev       # port 3000
npm run build
npm run lint
```

### Backend (`backend/root/`)
```bash
npm run build:packages      # required before first run and after package changes
npm run start:api:dev       # API on port 3001
npm run start:worker:dev    # BullMQ worker on port 3002
npm run docker:build        # starts Redis via docker compose
```

### Python Agent (`backend/agents/`)
```bash
uvicorn app.main:app --reload --port 8001
```

### Tests
```bash
cd backend/root/services/api && npm test
```

## Environment Files

- Backend: `backend/root/env/development.env` (see `env/example.env` for all keys — includes `MONGO_URI`, `GEMINI_API_KEY`, `REDIS_HOST`, `AI_PROVIDER`, `AGENT_APP_URL`)
- Frontend: `frontend/.env.development` (`NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_GOOGLE_CLIENT_ID`)

## Critical Rules

- **Models only in `@ra/shared`** — never define Mongoose models in the API or worker services
- **Config only from `@ra/config`** — use `ENV`, `db`, `redis`, `connectionConfig` from this package
- **Backend packages are TypeScript** — always run `build:packages` after editing anything in `backend/root/packages/`
- **AI provider is swappable** — set `AI_PROVIDER=gemini` or `AI_PROVIDER=groq` in env; use `createAIProvider()` from `@ra/ai`, never call Gemini/Groq SDKs directly
