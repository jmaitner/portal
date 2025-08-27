# Road Ready Safety — Student Portal Implementation Rules (Single Source of Truth)

**Status:** Stable v2 (Nuxt UI Pro)  
**Audience:** Cursor (implementer)  
**Authority:** Follow this file over anything said elsewhere. If a conflict exists, this file wins.

---

## 1) Scope & Intent
- Build a production-grade **student portal** for Road Ready Safety using **Nuxt 3 + Vue 3**.
- Deliver: login → enrollment/payment → dashboard → course player (read/video/quiz/timer) → certificate.
- **All courses are in-house.** There are **no partner/affiliate courses** and no external redirects to partners.
- The marketing/landing site is separate and **out of scope** here.

## 2) Component System (Nuxt UI Pro)
- Use **Nuxt UI Pro (Nuxt Pro Elements)** for all primitives and layout (buttons, cards, progress, nav, modals, notifications, form groups).
- **Do not** include or rely on any other UI library (e.g., Flowbite, Headless UI, etc.) without approval.
- Use Tailwind utilities for spacing/layout, but visual styling must come from **our tokens** via UI Pro theme mapping.

### 2.1 Theme Bridge (tokens → Nuxt UI Pro)
- Primary color: `#2563EB` (brand blue). Hover/active shade may use `#1D4ED8`.
- Radii: map to `lg=.75rem`, `xl=1rem`, `2xl=1.25rem`.
- Card shadow: `0 1px 2px rgba(16,24,40,0.06), 0 1px 3px rgba(16,24,40,0.10)`.
- Container width: **1120px** max with ~24px side padding.
- Background: page bg `#F8FAFC` (muted); card bg white.
- Font: Inter (400/500/600). Headings weight 600.

> Outcome: UI Pro components render with our look and feel, matching the reference screenshot (clean white cards on soft gray).

## 3) Single Source of Truth
- **`/portal-blueprint/` is the source of truth** for: design tokens, copy, rules (this file), runbook, QA checklist, and **all course data** (courses, modules, lessons, quizzes).
- **Do not hardcode** course data, copy, or tokens inside components. Always load from blueprint artifacts.
- A prebuild script consolidates and validates the blueprint data into **`/public/data.json`** (and emits `/public/sitemap.xml`).

## 4) Data Flow (Build → Runtime)
- **Prebuild (always before build):** `node ./portal-blueprint/scripts/build-data.mjs` reads `/portal-blueprint/data/**`, validates, then writes `public/data.json`.
- **Runtime (static):** For Phase 1, the app may read `/data.json` directly (public asset). For later phases, internal Nuxt **mock API routes** (under `/server/api`) can proxy the same data for future backend parity:
  - `GET /api/courses`
  - `GET /api/course/:slug`
  - `GET /api/progress/:courseId`
  - `POST /api/progress/:courseId`
  - `POST /api/quiz/grade`
  - `POST /api/certificate`
- **No runtime calls** to external services or third-party APIs in v1.

## 5) Data Model (In-House Only)
### 5.1 Course (JSON)
```json
{
  "id": "fl-bdi",
  "slug": "fl-bdi",
  "title": "Florida Basic Driver Improvement",
  "state": "FL",
  "durationMin": 240,
  "passPercent": 80,
  "seatTime": true,
  "badges": ["Device friendly", "Stop & resume"],
  "summary": "Four-hour course with short lessons and quick checks."
}
```
- **Required fields:** `id`, `slug`, `title`, `state`, `durationMin`, `passPercent`, `seatTime`.
- **Disallowed fields:** `provider`, `partnerUrl`, or any partner/affiliate indicators.

### 5.2 Modules & Lessons
`/portal-blueprint/data/modules/<slug>.json`:
```json
{
  "courseId": "fl-bdi",
  "modules": [
    {
      "id": "m1",
      "title": "Introduction & Orientation",
      "durationMin": 10,
      "lessons": [
        { "id": "l1", "type": "read",  "title": "Welcome & How it Works", "durationMin": 4, "body": "..." },
        { "id": "l2", "type": "video", "title": "Orientation Video", "durationMin": 4, "videoSrc": "/videos/fl-bdi/m1/orientation.mp4" },
        { "id": "l3", "type": "quiz",  "title": "Module 1 Check", "durationMin": 2, "quizId": "fl-bdi-m1" }
      ]
    }
  ]
}
```
- `type ∈ {"read","video","quiz"}`. Provide `body` for `read`, `videoSrc` for `video`, and `quizId` for `quiz`.

### 5.3 Quiz
`/portal-blueprint/data/quiz/<quizId>.json`:
```json
{
  "questions": [
    {
      "id": "q1",
      "prompt": "This course helps you become:",
      "choices": ["A faster driver", "A safer, more confident driver", "A mechanic", "None"],
      "answerIndex": 1,
      "rationale": "Focus is on safety and confidence."
    }
  ]
}
```

### 5.4 Prebuild Derivatives
The prebuild script must aggregate into `public/data.json`:
- `courses` (array)
- `modulesByCourse[courseId]` with `modules[]` and `meta`:
  - `meta.totalModules`, `meta.totalLessons`, `meta.totalMinutes`
  - `meta.firstModuleId`, `meta.firstLessonId`

### 5.5 Progress (API response shape)
```json
{
  "completed": ["m1:l1"],
  "seatTime": 600,
  "last": { "moduleId": "m1", "lessonId": "l2" }
}
```

## 6) Build & Preview Policy
- **Scripts (package.json):**
  - `prebuild`: `node ./portal-blueprint/scripts/build-data.mjs` (must run every build)
  - `build`: `nuxt generate` (static)
  - `preview`: `npx http-server dist -p 4173 -c-1`
  - `kill-preview`: `pkill -f "http-server|nuxt|vite|node .*http-server" || true`
- **Port:** Only use **http://localhost:4173** for static preview. This avoids conflicts with Nuxt dev servers and keeps a consistent workflow.
- Always run `npm run kill-preview` before starting a new preview.

## 7) Allowed / Disallowed
**Allowed (v1):** Nuxt 3, Vue 3 (Composition API), Pinia, Tailwind CSS, **Nuxt UI Pro**, @heroicons/vue, Day.js, VueUse.  
**Disallowed (v1):** TypeScript, new libraries without approval, analytics, external runtime fetches, partner integrations, markdown/MDX renderers, path alias changes, barrel files, **Flowbite** or any other UI kit.

## 8) UI Tokens & Style
- Respect **design tokens** from `/portal-blueprint/design-tokens.json`. Mirror in `assets/css/tokens.css` and Tailwind/NUIP theme.
- Fonts: Inter (400/500/600). Headings use 600 weight.
- No emojis. Icons via Heroicons (outline).
- Cards: rounded-xl, border, white bg, `shadow-card`, padding per tokens.
- Page background: soft gray (`ui.muted`); card background: white.
- Container: max 1120px, 24px side padding, 32px vertical rhythm.

## 9) Accessibility (WCAG AA)
- All interactive elements keyboard reachable with **visible focus**.
- Labels must bind via `for/id`; show `aria-invalid` when errors.
- Announce quiz results with `aria-live="polite"`.
- No information by color alone; ensure contrast AA+.
- Sidebar module tree supports full keyboard navigation (Up/Down, Enter).

## 10) Routes
- `/login` — email+password (MFA step is a UI placeholder only in v1).
- `/dashboard` — **one active course**; no course catalog.
- `/course/:slug` — overview (facts/benefits/what you’ll learn).
- `/course/:slug/learn/:moduleId/:lessonId` — player (read/video/quiz, timer, prev/next, save & exit).
- `/support`, `/faq`, `/legal/privacy`, `/legal/terms` — static doc pages.
- `index.vue` → redirects to `/dashboard` if logged in, else `/login`.

## 11) Onboarding, MFA, and Payment (UI only in v1)
- Registration collects email/password and ToS/Privacy acceptance.
- MFA screen exists as a placeholder page; real flow is backend work (v2).
- Payment: “Enroll Now” button navigates to **Stripe Checkout (external link)**; Stripe returns to `/dashboard?enrolled=:slug`. On success, finalize **in-house enrollment** and route to dashboard.

## 12) Player Rules
- Timer-gated lessons (when `seatTime`/lesson timer is enabled) must **disable Next** until the timer completes.
- Quizzes require `passPercent` to unlock the next lesson/module; allow retries and show rationale.
- “Save & Exit” stores last visited lesson; resume returns to it.

## 13) Prebuild Validator (Must Fail Loudly)
- Validate: required course fields, unique `slug`, positive `durationMin`, `passPercent`, non-empty modules/lessons, valid lesson `type`, quizzes with ≥1 question and valid `answerIndex`.
- Derive and emit `meta` fields (`total*`, first IDs).
- Emit human-readable errors with offending file paths.
- Write `public/data.json` and `public/sitemap.xml`.
- The build **must stop** on validation failure.

## 14) Mock API Contracts (Phase 2+)
- `GET /api/courses` → array of in-house courses (subset for dashboard).
- `GET /api/course/:slug` → full detail + modules/lessons.
- `GET /api/progress/:courseId` → progress payload.
- `POST /api/progress/:courseId` → persist progress (local mock).
- `POST /api/quiz/grade` → `{correct,total,passed}`.
- `POST /api/certificate` → `{certificateId,url}` (stub PDF path).
- Internally, these read from `public/data.json` and/or a local in-memory store (no external I/O).

## 15) QA Gate (Every Phase)
- No console errors/warnings.
- Responsive; no horizontal scroll on mobile.
- Keyboard-only path works: login → enroll → dashboard → course → quiz → certificate.
- Progress persists; “Save & Exit” resumes correctly.
- Color contrast AA+; heading order logical.
- Static build renders all touched routes. Preview strictly on :4173.

## 16) Runbook Discipline
- Execute **one phase at a time**. After each phase: post **file diffs** and a brief summary (2–3 bullets).
- If anything is ambiguous, **state the assumption explicitly** and proceed.
- If a schema/validation error occurs, **stop immediately** and post the exact error.

## 17) Security & Privacy
- Do not log PII to console.
- Do not commit secrets or tokens.
- Certificates are stubbed; no external reporting in v1.

## 18) Performance & Stability
- Avoid layout shift; use skeletons for loading.
- Lazy-load heavy media.
- Include Nuxt UI Pro CSS once (via module). No duplicate injections.
- Use Heroicons components instead of raw SVG paths.

## 19) Future Hooks (v2+)
- Real auth + MFA (WebAuthn/TOTP).
- Real Stripe webhook → server confirms enrollment.
- Electronic state reporting & signed certificate IDs.
- Role-based access and audit logs.

---

### TL;DR for Cursor
- Everything lives in **`/portal-blueprint/`**. Prebuild always validates & emits `public/data.json` with derived `meta` fields.
- **All courses are in-house.** One schema for all; no partner logic anywhere.
- Use **Nuxt UI Pro** only as the component library; theme it to our tokens and 1120px container.
- **No external fetch at runtime.** Read from `/public/data.json` (Phase 1) or internal mocks (Phase 2+).
- Respect tokens, a11y, and QA gates. Always stop after each runbook phase with diffs.
- Preview only on **:4173** and keep the console clean.
