# ARCHITECTURE.md

## Overview

Resume Analyzer is a full-stack monorepo with four distinct runtimes:

| Service | Tech | Port |
|---------|------|------|
| Frontend | Next.js 14 (App Router) | 3000 |
| API | Express 5 + Node.js | 3001 |
| Worker | BullMQ consumer + Node.js | 3002 |
| Agent | Python FastAPI | 8001 |

The Node.js backend is structured as an npm workspace (`backend/root/`) with three internal packages (`@ra/ai`, `@ra/config`, `@ra/shared`) consumed by the API and Worker services.

---

## Repository Layout

```
multi-agent-task-manager/
├── frontend/                        # Next.js 14 application
├── backend/
│   ├── root/                        # npm workspace root
│   │   ├── services/
│   │   │   ├── api/                 # Express REST API
│   │   │   └── worker/              # BullMQ queue consumer
│   │   └── packages/
│   │       ├── ai/                  # @ra/ai — AI provider abstraction
│   │       ├── config/              # @ra/config — env, DB, Redis
│   │       └── shared/              # @ra/shared — models, repos, utilities
│   └── agents/                      # Python FastAPI document extractor
└── .claude/docs/                    # Project documentation
```

---

## Resume Processing Pipeline

This is the core flow of the application:

```
1. User uploads PDF/DOC/DOCX
        ↓
2. POST /api/resume/upload
   - Multer saves file to disk
   - Resume document created (status: "processing")
   - Job published to BullMQ queue "pdf-analysis"
        ↓
3. Worker picks up job
   - Calls FastAPI agent: POST /extract (PDF) or /extract-doc (DOC)
        ↓
4. FastAPI agent (Python)
   - Extracts raw text via PyMuPDF
   - Applies layout fixes
   - Detects LinkedIn CV vs. generic resume
   - Normalizes text accordingly
   - Returns { source: "linkedin"|"generic", parsedText }
        ↓
5. Worker → Gemini AI (gemini-2.5-flash)
   - Sends normalized text with strict extraction prompt
   - Returns structured JSON: personalInfo, workExperience, skills, education
   - Each workExperience.description must be 40+ words (enforced in prompt)
        ↓
6. Resume document updated
   - extractedData populated
   - status → "processed" (or "failed" on error)
        ↓
7. User triggers analysis: POST /api/analyze/:resumeId
   - API fetches Resume.extractedData
   - Sends to Gemini with quality analysis prompt
   - Returns: scores, ATS breakdown, skill radar, recommendations, AI feedback
   - Saved to Analysis collection
```

---

## Backend Internal Packages

### `@ra/config`
Single source of truth for environment, database, and cache connections.
- `ENV` — all env variables
- `connectDB()` — Mongoose connection
- `db` — Mongoose instance
- `redis` — IORedis instance
- `connectionConfig` — BullMQ-compatible Redis config

### `@ra/ai`
AI provider abstraction with factory pattern.
```typescript
createAIProvider("gemini" | "groq")  // → provider instance
provider.generateText({ prompt })     // → Promise<AIResponse>
```
- **Gemini** (`gemini-2.5-flash`) — primary provider
- **Groq** — fallback provider
- Active provider controlled by `AI_PROVIDER` env var

### `@ra/shared`
All Mongoose models and repositories. **Models must only be defined here.**
- Models: `Resume`, `Analysis`
- Repositories: `ResumeRepository`, `AnalysisRepository`
- Utilities, error classes, constants

---

## Database Models

### User (`/services/api/src/models/user.model.js`)
```
name, email (unique), picture, providerUserId, provider ("local"|"google"),
mobileNo, address, password (bcrypt, salt 12, excluded from JSON output)
```

### Resume (`@ra/shared`)
```
userId (ref: User), title, fileUrl, parsedText, jobId, size, fileType ("PDF"|"DOC"),
status ("processing"|"processed"|"analyzed"|"failed"),
extractedData: {
  personalInfo: { name, email, phone, location, summary, linkedIn, github, portfolio },
  education:    [{ institution, degree, fieldOfStudy, startDate, endDate, grade }],
  workExperience: [{ company, position, year, startDate, endDate, responsibilities, description }],
  skills:       [String]
},
qualityAssessment: { atsScore, formatScore, contentQuality, feedback }
```
Text index on `title` for search.

### Analysis (`@ra/shared`)
```
resumeId (ref: Resume), userId, jobDescription,
scores:             { overall, ats, jobMatch }  // 0–100
atsBreakdown:       [{ category, score }]       // Format, Keywords, Structure, Content, Length
skillsRadar:        [{ skill, current, required }]
jobMatchBreakdown:  [{ name, value, color }]    // Strong/Partial/No Match
sections:           [{ id, title, score, badge, feedback }]
recommendations:    [{ priority, text }]        // "High"|"Medium"|"Low"
aiFeedback:         [{ id, title, score, feedback, suggestions: [{ id, text, type, accepted }] }]
keyFindings:        [{ type ("positive"|"warning"), text }]
```

### RefreshToken (`/services/api/src/models/token.model.js`)
```
userId (ref: User), token, createdAt (TTL: 7 days / 604800s)
```

---

## API Routes

All routes are prefixed with `/api`.

### Auth (`/api/auth`)
| Method | Path | Description |
|--------|------|-------------|
| POST | `/auth/register` | Email/password registration |
| POST | `/auth/login` | Email/password login |
| POST | `/auth/provider` | Google OAuth login |
| POST | `/auth/logout` | Logout (clears cookies) |
| POST | `/auth/refresh-token` | Rotate access token |
| GET | `/auth/me` | Current user (requires auth) |

### Resume (`/api/resume`)
| Method | Path | Description |
|--------|------|-------------|
| POST | `/resume/upload` | Upload PDF/DOC/DOCX |
| GET | `/resume/list/:userId` | Paginated list (supports page, limit, status, search filters) |
| GET | `/resume/:resumeId` | Resume details + extractedData |
| GET | `/resume/download/:resumeId` | Stream file download |
| DELETE | `/resume/delete/:resumeId` | Delete resume + file |
| POST | `/resume/update/:resumeId` | Update extractedData |

### Analysis (`/api/analyze`)
| Method | Path | Description |
|--------|------|-------------|
| POST | `/analyze/:resumeId` | Run Gemini quality analysis, save + return Analysis doc |

---

## BullMQ Queue

- **Queue name:** `pdf-analysis`
- **Job name:** `"analyze"`
- **Retry policy:** 3 attempts, exponential backoff starting at 5000ms
- **Cleanup:** keep last 100 completed, 50 failed jobs

**Job payload:**
```javascript
{ userId, title, path, file: { path, name, mimetype, size }, id, resumeId }
```

---

## Python FastAPI Agent

**Entry point:** `/backend/agents/app/main.py`

| Endpoint | Input | Output |
|----------|-------|--------|
| `POST /extract` | PDF file (multipart) | `{ source, parsedText }` |
| `POST /extract-doc` | DOC/DOCX file (multipart) | `{ source, parsedText }` |

**Processing steps:**
1. Extract raw text (PyMuPDF for PDF)
2. `apply_layout_fixes(text)` — fix spacing/formatting
3. `is_linkedin_cv(text)` — detect LinkedIn export
4. Normalize: `normalize_linkedin_cv()` or `normalize_resume_text()`
5. Return normalized text with source tag

---

## Authentication

1. Google OAuth token sent to `/auth/provider` → verified via `google-auth-library`
2. Email/password hashed with bcrypt (salt rounds: 12)
3. JWT access token + refresh token issued as httpOnly cookies
4. Refresh token stored in MongoDB with 7-day TTL
5. `authenticate.js` middleware verifies JWT on protected routes; auto-refreshes if access token expired

---

## Frontend Architecture

### App Router Structure
```
app/
├── page.tsx                  # Landing page
├── login/page.tsx            # Login (email + Google OAuth)
├── signup/page.tsx           # Registration
└── dashboard/
    ├── layout.tsx            # Sidebar + auth guard
    ├── page.tsx              # Dashboard home
    ├── resumes/
    │   ├── page.tsx          # Resume list
    │   ├── upload/page.tsx   # Upload flow
    │   └── analysis/page.tsx # Analysis results
    ├── job-analyzer/page.tsx
    ├── reports/page.tsx
    ├── history/page.tsx
    ├── portfolio/page.tsx
    └── settings/page.tsx
```

### Redux Store (`frontend/store/`)
```
Store
├── authSlice          — user object, loading state
│   actions: loginSuccess(user), logout()
├── loaderSlice        — global loading flag
│   actions: showLoader(), hideLoader()
├── commonSlice        — placeholder for shared UI state
├── authApi (RTK Query)
│   googleLogin(token)           → POST /auth/provider
│   refreshToken(userId)         → POST /auth/refresh-token
│   getMe()                      → GET  /auth/me
│   logoutAPI(userId)            → POST /auth/logout
├── resumeApi (RTK Query)        tag: "Resumes"
│   uploadFile({file,title,userId})              → POST /resume/upload (120s timeout)
│   getResumesListByUser({userId,page,...})       → GET  /resume/list/:userId
│   getResumeById(resumeId)                      → GET  /resume/:resumeId
│   deleteResumeById(resumeId)                   → DELETE /resume/delete/:resumeId
│   downloadResumeById(resumeId)                 → GET  /resume/download/:resumeId (blob)
└── analysisApi (RTK Query)
    analyzeResume({resumeId,userId})             → POST /analyze/:resumeId (120s timeout)
```

Redux Persist keeps `auth` state in localStorage across page reloads.

---

## Key File Locations

| Concern | Path |
|---------|------|
| Queue config | `backend/root/services/api/src/config/queue.js` |
| Resume quality analysis prompt | `backend/root/services/api/src/utils/qulity.anlayser.js` |
| Resume extraction prompt | `backend/root/services/worker/src/utils/resume.parser.js` |
| Worker main loop | `backend/root/services/worker/src/worker/index.js` |
| Auth middleware | `backend/root/services/api/src/midlewares/authenticate.js` |
| Gemini provider | `backend/root/packages/ai/src/providers/gemini.provider.ts` |
| Resume model | `backend/root/packages/shared/src/models/resume.model.ts` |
| Analysis model | `backend/root/packages/shared/src/models/analysis.model.ts` |
| Python agent entry | `backend/agents/app/main.py` |
| Redux store | `frontend/store/rootReducer.ts` |
