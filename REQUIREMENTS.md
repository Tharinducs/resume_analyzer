# Software Requirements Specification
## AI-Powered Resume Analyzer

**Version:** 1.0  
**Date:** 2026-06-01

---

## 1. System Overview

An AI-powered web application that allows users to upload resumes, extract structured data, run ATS (Applicant Tracking System) quality analysis, and compare resumes against job descriptions. The system provides scores, actionable feedback, and a dashboard for tracking improvement over time.

---

## 2. System Architecture

### 2.1 Services

| Service | Technology | Port | Responsibility |
|---|---|---|---|
| Frontend | Next.js 14 (App Router) | 3000 | User interface |
| API | Node.js / Express | 3001 | REST API, business logic |
| Worker | BullMQ | 3002 | Async resume processing jobs |
| Python Agent | FastAPI | 8001 | PDF/DOC text extraction |
| Database | MongoDB | — | Persistent storage |
| Queue | Redis | — | BullMQ job queue |

### 2.2 Shared Package
- All Mongoose models are defined exclusively in `@ra/shared` package.
- All configuration (env vars, DB, Redis connections) is sourced exclusively from `@ra/config`.
- The AI provider is abstracted via `@ra/ai`; the active provider is configured by `AI_PROVIDER` env var (`gemini` | `groq`) and must never be called directly.

### 2.3 Frontend State Management
- Redux Toolkit with `redux-persist` for auth state.
- RTK Query (`createApi`) for all API communication.
- Theme state managed client-side (light / dark / system).

---

## 3. Authentication

### 3.1 Google OAuth Login
- Users sign in exclusively via Google OAuth 2.0.
- On first login, a new user record is created automatically with the Google profile data (name, email, profile picture URL).
- On subsequent logins, the existing user record is returned.
- A JWT is issued on successful authentication and stored in the Redux store (persisted across sessions).

### 3.2 Session Management
- All protected API routes require a valid JWT in the `Authorization` header.
- The frontend attaches the JWT automatically via RTK Query's `baseQuery`.
- On token expiry or invalid token, the user is redirected to the login page.

### 3.3 User Profile Data
- Fields stored: `name`, `email`, `picture` (URL), `bio`, `jobTitle`, `location`, `notifications` object.
- `picture` may be a Google CDN URL (from OAuth) or an absolute URL to an uploaded avatar served from the backend.

---

## 4. Resume Management

### 4.1 Upload
- Accepted formats: PDF, DOC, DOCX.
- On upload, the file is saved to `backend/root/uploads/resumes/` with a UUID-based filename (original extension preserved).
- A resume record is created in MongoDB with status `processing`.
- A BullMQ job is enqueued for the worker to process the file.

### 4.2 Processing Pipeline
1. Worker picks up the job from the queue.
2. Worker calls the Python Agent (`POST /extract`) with the file path.
3. Python Agent extracts raw text from the PDF/DOC and returns it.
4. Worker calls Gemini/Groq (via `@ra/ai`) to structure the extracted text into resume fields (name, contact, skills, experience, education, etc.).
5. Structured data is saved back to the resume record.
6. Resume status is updated to `processed`.

### 4.3 Resume Statuses

| Status | Meaning |
|---|---|
| `processing` | File uploaded; extraction job queued or running |
| `processed` | Text extracted and structured; ready for analysis |
| `analyzed` | AI analysis complete; score and feedback available |
| `failed` | Processing or analysis encountered an unrecoverable error |

### 4.4 Resume Listing Page (`/dashboard/resumes`)

**Display:**
- Grid layout (up to 3 columns).
- Each card shows: title, last updated (relative time), status badge, ATS score (if analyzed), file type, file size.
- Score is color-coded (green / amber / red) based on value.

**Search:**
- Debounced text search (500ms) by resume title.
- Search term is pre-populated from the URL query param `?search=` when navigating from Global Search.
- The search term is read synchronously at component initialization (lazy `useState`) so the correct filtered query fires on the very first render — no flash of unfiltered results.
- The search input on this page is focused automatically when a `?search=` param is present.

**Filtering:**
- Tab-based status filter: All / Analyzed / Processing / Processed / Failed.

**Pagination:**
- Page size: configurable constant (`PAGE_SIZE`).
- Prev / Next buttons plus numbered page buttons (showing ±2 pages from current).
- Shows "Page X of Y — Z total" summary.

**Per-card Actions (dropdown menu):**
- **View Details** — navigates to the resume upload/edit page.
- **Download** — downloads the original uploaded file.
- **Delete** — deletes the resume record and file.
- Actions are disabled based on resume status (e.g. cannot download a `processing` resume).

**Analyze / View Analysis Button:**
- Visible only when the resume status is `processed` or `analyzed`.
- If `analysisId` exists → "View Analysis" (navigates to analysis page).
- If no `analysisId` → "Analyze" (triggers analysis and then navigates to analysis page).
- On analysis completion, a browser push notification is sent if the user has enabled `resumeAnalysis` notifications.

### 4.5 Empty State
- When no resumes exist (and no error), show a centered empty-state card with an "Upload Resume" call-to-action.
- When an API error occurs, the upload CTA is hidden.

---

## 5. Resume Analysis

### 5.1 Triggering Analysis
- User clicks "Analyze" on a `processed` resume.
- `POST /analysis` is called with `userId` and `resumeId`.
- The API calls Gemini/Groq to analyze the structured resume data.
- An analysis record is created and the `analysisId` is stored on the resume record.
- Resume status is updated to `analyzed`.

### 5.2 Analysis Output
The analysis result contains at minimum:
- **ATS Score** (0–100): how well the resume passes ATS filters.
- **Job Match Score** (0–100): relevance to general job market (or a specific job if matched).
- **Overall Score** (0–100): composite score.
- **Feedback sections**: strengths, weaknesses, specific improvement recommendations.
- **Section-by-section breakdown**: contact info, summary, skills, experience, education.

### 5.3 Analysis Page (`/dashboard/resumes/analysis`)
- Loaded via `?resumeId=X&analysisId=Y` query params.
- Displays full analysis report with scores and recommendations.
- Navigated to automatically after analysis completes.

---

## 6. Job Analyzer

### 6.1 Job Description Input
- User pastes or types a job description (free text).
- User selects a resume from their library.
- `POST /job-analyzer/match` is called.

### 6.2 Matching
- The API sends both the resume data and job description to the AI provider.
- Returns: job match score, matched skills, missing skills, tailoring recommendations.
- A `JobAnalysis` record is created in MongoDB.
- On success, if the resume–job pair existed in Pending Comparisons, that pending record is automatically removed.

### 6.3 Pending Comparisons
- Users can save a resume–job pairing as "pending" to be analyzed later.
- Pending comparisons are stored in MongoDB (not localStorage) so they persist across sessions and browsers.
- Fields: `userId`, `jobAnalysisId`, `jobTitle`, `resumeId`, `resumeTitle`.
- API endpoints:
  - `GET /job-analyzer/pending-comparisons` — list all pending for the user.
  - `POST /job-analyzer/pending-comparisons` — add a pending comparison.
  - `DELETE /job-analyzer/pending-comparisons/:id` — remove one.

---

## 7. Dashboard (`/dashboard`)

### 7.1 Stats Cards
Displays summary metrics for the logged-in user:
- **Last Resume Score**: ATS score of the most recently analyzed resume (with resume title).
- **Total Resumes**: count of all uploaded resumes.
- **Total Analyzed**: count of resumes with status `analyzed`.
- **Total Jobs Analyzed**: count of job analysis records.
- **Avg Job Match Rate**: average job match score across all job analyses.

### 7.2 Recent Activity
- Shows the **5 most recent** items across resumes and job analyses, sorted by `updatedAt` descending.
- Each item shows: title, type (resume / job), status, score (if available), relative time.
- Clicking a resume item navigates to the resume analysis page (if analyzed) or resume listing.
- "View All Activity" link at the bottom of the section navigates to `/dashboard/history`.

### 7.3 Resume Improvement
- Shows a before/after comparison card if the user has at least two analyzed resumes, highlighting score improvement.
- Fields: `atsScore`, `jobMatchScore`, `overallScore`, `resumeTitle`.

---

## 8. Activity History (`/dashboard/history`)

- Displays a paginated list of all activity (resumes + job analyses) for the user.
- Page size: 10 items per page.
- Items are merged from two collections and sorted by `updatedAt` descending (in-memory merge in the service layer).
- Columns: title, type badge, status badge, score, date.
- Pagination: Previous / Next buttons with current page indicator.

---

## 9. Global Search

### 9.1 Location
- Embedded in the dashboard header, visible on all dashboard pages on medium+ screens.

### 9.2 Behavior
- Activates after 2 characters of input (debounced 300ms).
- Sends `GET /search?q=<query>` to the backend.
- Results appear in a grouped dropdown below the input.
- Dropdown closes on outside click or after navigation.
- A loading spinner appears while fetching.
- "No results" message shown when query returns nothing.

### 9.3 Result Groups

| Group | Source | Navigation on click |
|---|---|---|
| Resumes | Resume titles matching query | `/dashboard/resumes?search=<title>` |
| Analyses | Resumes that have an `analysisId` | `/dashboard/resumes/analysis?resumeId=X&analysisId=Y` |
| Job Analyses | JobAnalysis titles matching query | `/dashboard/history` |
| Pending Comparisons | PendingComparison job/resume titles | `/dashboard/job-analyzer` |

### 9.4 Restriction
- **When the user is already on `/dashboard/resumes`**, the "Resumes" group is hidden from global search results. The user should use the search input on that page directly.

### 9.5 Backend Search
- Uses case-insensitive MongoDB regex.
- Special regex characters in the query are escaped before building the regex.
- Result limits: 6 resumes, 6 job analyses, 4 pending comparisons.
- Resumes that have an `analysisId` are also returned as a separate "analyses" group.

---

## 10. Settings (`/dashboard/settings`)

### 10.1 Profile Tab
- Displays and allows editing of: **Display Name**, **Bio**, **Job Title**, **Location**.
- Email is shown read-only (sourced from OAuth, cannot be changed).
- Changes are saved via `PATCH /auth/me`.
- Updated fields are merged into the Redux store immediately on success.

### 10.2 Avatar Upload
- The user's current avatar is displayed (Google picture or uploaded image).
- Clicking the avatar (or a Camera icon overlay) opens a file picker.
- Accepted types: JPEG, PNG, WebP, GIF.
- Max file size: 2 MB.
- On select, the file is sent via `POST /auth/me/picture` (multipart/form-data).
- The backend saves the file to `backend/root/uploads/avatars/` with a UUID filename.
- The stored picture URL is an absolute URL (`http(s)://host/uploads/avatars/<filename>`).
- The Redux store is updated with the new picture URL immediately on success.

### 10.3 Notifications Tab
Four toggles, each persisted to the database via `PATCH /auth/me`:

| Toggle | Description |
|---|---|
| Resume Analysis Complete | Browser push notification when a resume finishes analysis |
| Job Match Complete | Browser push notification when a job match completes |
| Weekly Digest | Email digest of activity (informational toggle) |
| Marketing Emails | Product updates and tips (informational toggle) |

**Push notification toggles (Resume Analysis, Job Match):**
- Turning **on** requests `Notification.requestPermission()` from the browser.
- If permission is denied, the toggle is reverted and a toast is shown explaining the browser blocked it.
- If permission is granted, the preference is saved and push notifications will fire via the Web Notifications API.
- Turning **off** saves the preference; no further browser prompts.

### 10.4 Preferences Tab
- **Theme selector**: Light / Dark / System.
- Selection is applied immediately to the document and persisted client-side.

---

## 11. Push Notifications

- Implemented using the browser-native **Web Notifications API** (no external push service).
- Notifications fire in the browser tab where the action was initiated.
- **Resume Analysis notification**: fires when `analyzeResume` completes successfully, if `notifications.resumeAnalysis === true`.
  - Title: "Resume Analysis Complete"
  - Body: `"<resume title>" has been analysed. Tap to view your results.`
- **Job Match notification**: fires when `matchResume` completes successfully, if `notifications.jobMatch === true`.
- Helper functions: `isPushSupported()`, `getPushPermission()`, `requestPushPermission()`, `sendPushNotification(title, body)`.

---

## 12. File Serving

- All uploaded files (resumes and avatars) are served from `backend/root/uploads/` via Express static middleware.
- Mounted at `/uploads`, served with `express.static(join(process.cwd(), "uploads"))` where `process.cwd()` is `backend/root/`.
- Avatar files are in `uploads/avatars/`.
- Resume files are in `uploads/resumes/`.

---

## 13. API Endpoints Summary

### Auth (`/api/auth`)
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/google` | No | Exchange Google OAuth token; return JWT + user |
| GET | `/me` | Yes | Return current user record |
| PATCH | `/me` | Yes | Update profile fields (name, bio, jobTitle, location, notifications) |
| POST | `/me/picture` | Yes | Upload and set avatar image |

### Resumes (`/api/resumes`)
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/` | Yes | Upload a new resume |
| GET | `/user/:userId` | Yes | List resumes with pagination, search, status filter |
| GET | `/:resumeId` | Yes | Get single resume details |
| PUT | `/:resumeId` | Yes | Update resume structured data |
| DELETE | `/:resumeId` | Yes | Delete resume and file |
| GET | `/:resumeId/download` | Yes | Download original resume file |

### Analysis (`/api/analysis`)
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/` | Yes | Trigger AI analysis for a resume |
| GET | `/:analysisId` | Yes | Get analysis result |

### Job Analyzer (`/api/job-analyzer`)
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/match` | Yes | Match resume against job description |
| GET | `/pending-comparisons` | Yes | List pending comparisons for user |
| POST | `/pending-comparisons` | Yes | Save a pending comparison |
| DELETE | `/pending-comparisons/:id` | Yes | Remove a pending comparison |

### Dashboard (`/api/dashboard`)
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/:userId` | Yes | Get dashboard stats, recent activity, resume improvement |
| GET | `/:userId/activity` | Yes | Paginated activity history (resumes + job analyses) |

### Search (`/api/search`)
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/?q=<query>` | Yes | Search resumes, analyses, jobs, pending comparisons |

---

## 14. Data Models

### User
```
_id, name, email, picture, bio, jobTitle, location,
notifications: { resumeAnalysis, jobMatch, weeklyDigest, marketingEmails },
createdAt, updatedAt
```

### Resume
```
_id, userId, title, originalName, filename, fileType, size, status,
extractedText, structuredData, analysisId, score, createdAt, updatedAt
```

### Analysis
```
_id, resumeId, userId, atsScore, jobMatchScore, overallScore,
feedback: { strengths[], weaknesses[], recommendations[] },
sections: { contact, summary, skills, experience, education },
createdAt, updatedAt
```

### JobAnalysis
```
_id, userId, title, jobDescription, resumeId,
matchScore, matchedSkills[], missingSkills[], recommendations[],
createdAt, updatedAt
```

### PendingComparison
```
_id, userId, jobAnalysisId, jobTitle, resumeId, resumeTitle,
createdAt, updatedAt
```

---

## 15. Non-Functional Requirements

### Performance
- Search inputs are debounced (300ms global search, 500ms resume page search) to minimize API calls.
- Resume listing uses server-side pagination; page size is a configurable constant.
- The dashboard limits recent activity to 5 items; full history is paginated at 10 items per page.

### Security
- All API routes except auth endpoints require a valid JWT.
- File uploads validate MIME type and file size server-side.
- MongoDB regex queries escape special characters to prevent ReDoS.
- Avatar and resume file paths use UUID names (no user-controlled filename in path).
- Whitelisted fields only are accepted on `PATCH /auth/me` (no mass-assignment).

### Availability / Reliability
- Async resume processing is handled by a BullMQ worker; the API returns immediately after enqueuing.
- Failed processing jobs update resume status to `failed` so the UI can surface the error.
- The AI provider is swappable via environment variable without code changes.

### Browser Compatibility
- Push notifications degrade gracefully — if `Notification` is not supported or permission is denied, the feature is disabled with user feedback (toast).
- Theme preference falls back to system default if no preference is stored.

---

## 16. Environment Configuration

### Backend (`backend/root/env/development.env`)
```
MONGO_URI=
GEMINI_API_KEY=
REDIS_HOST=
AI_PROVIDER=gemini|groq
AGENT_APP_URL=http://localhost:8001
JWT_SECRET=
```

### Frontend (`frontend/.env.development`)
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
```
