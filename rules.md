# Road Ready Safety — Portal UI Showcase (Nuxt UI Pro)
**File:** `rules.md` • **Authority:** This document is the source of truth. If anything conflicts, follow this.

---

## 1) Scope & Intent
Build a **static Nuxt 3 UI** (no backend) that demonstrates the Road Ready Safety student portal as a **single “Course Workspace” page**:
- Left rail: course title, **Continue Course**, and a **numbered roadmap** (Steps 1–12, **Final Exam**, **Certificate**).
- Right: **course player** (read + quiz), with **progress bar** and a **TimerCard** that gates “Next”.

**No** real auth, payments, seat-time persistence, or runtime fetching. All content renders from **local JSON fixtures imported at build time**.  
SSR **enabled**. **Zero hydration warnings** allowed.

---

## 2) Tech & Constraints (hard rules)
- Framework: **Nuxt 3** (`nuxt generate` for static output)
- UI Kit: **@nuxt/ui-pro** (includes @nuxt/ui) — dev usage is free
- Styling: Tailwind via Nuxt UI Pro (do **not** install `@nuxtjs/tailwindcss`)
- Icons: **@heroicons/vue**
- Data: **import** JSON fixtures from `/static-data/**` (do **not** `useFetch`)
- Preview: serve `/dist` on **http://localhost:4173**
- No additional libraries without approval

**pnpm note:** Either set `.npmrc` → `shamefully-hoist=true` or install `tailwindcss` at the repo root (UI Pro requirement).  
**License:** If you have a Nuxt UI Pro key, set env `NUXT_UI_PRO_LICENSE` (do not commit the key).

---

## 3) Setup (Nuxt UI Pro)
1. **Install**
   ```bash
   pnpm add @nuxt/ui-pro
   # or npm i @nuxt/ui-pro
   ```
2. **Enable module & CSS**
   ```ts
   // nuxt.config.ts
   export default defineNuxtConfig({
     ssr: true,
     modules: ['@nuxt/ui-pro'],
     css: ['~/assets/css/main.css'],
     uiPro: { mdc: true, content: true },
     ui: {
       theme: {
         colors: ['primary','success','warning','error'],
         defaultVariants: { color: 'primary', size: 'md' },
         transitions: true
       }
     }
   })
   ```
   ```css
   /* assets/css/main.css */
   @import "tailwindcss";
   @import "@nuxt/ui-pro";
   @import "./tokens.css";
   ```
3. **Wrap the app**
   ```vue
   <!-- app.vue -->
   <template>
     <UApp>
       <NuxtPage />
     </UApp>
   </template>
   ```

---

## 4) Design Tokens (brand)
Use these values consistently (define in `assets/css/tokens.css` and via Nuxt UI theme):
- **Primary blue:** `#2563EB` (hover `#1D4ED8`)
- **Text ink:** slate 900→500 hierarchy
- **Border:** `#E5E7EB` • **Surface:** `#FFFFFF` • **Subtle bg:** `#F8FAFC`
- **Success:** `#10B981` (success states only)
- **Radii:** `lg .75rem`, `xl 1rem`, `2xl 1.25rem`
- **Shadow (card):** `0 1px 2px rgba(16,24,40,.06), 0 1px 3px rgba(16,24,40,.10)`
- **Typography:** **Inter** 400/500/600; headings 600

**Rules**
- Primary CTAs/progress use **brand blue**, **not green**. Green is for *success* (e.g., passed checkmarks).
- Header uses `/public/branding/logo.svg` (height ≈ 24px) plus text “Road Ready Safety”.

---

## 5) Repository Layout
```
/portal
  app.vue
  nuxt.config.ts
  package.json
  /assets/css/main.css
  /assets/css/tokens.css
  /components
    HeaderBar.vue    FooterBar.vue
    CourseRail.vue   LessonRenderer.vue   QuizBlock.vue
    TimerCard.vue    ProgressPill.vue
  /layouts/default.vue
  /pages
    index.vue                  # redirect → /course/fl-bdi
    /course/[slug].vue         # Unified “Course Workspace” page
    support.vue
    /legal/privacy.vue
    /legal/terms.vue
  /public/branding/logo.svg
  /static-data
    courses.json
    /modules/fl-bdi.json
    /quiz/fl-bdi-m1.json
    /quiz/fl-bdi-final.json
  /portal-ui-blueprint
    rules.md        # this file
    runbook.md      # optional
    qa-checklist.md # optional
```
---

## 6) Fixtures (import only)
> Import at the top of files. **Do not** use `useFetch`.

### `/static-data/courses.json` (demo)
```json
[{
  "id": "fl-bdi",
  "slug": "fl-bdi",
  "title": "Florida Basic Driver Improvement",
  "state": "FL",
  "durationMin": 240,
  "passPercent": 80,
  "summary": "Four-hour course with short lessons and quick checks.",
  "meta": {
    "firstModuleId": "m1",
    "firstLessonId": "l1",
    "totalModules": 12,
    "demoProgressPercent": 8,
    "demoCompletedModules": 1,
    "demoMinutesRemaining": 180
  }
}]
```

### `/static-data/modules/fl-bdi.json`
- Shape:
  ```json
  {
    "courseId": "fl-bdi",
    "modules": [
      { "id":"m1","title":"Introduction & Orientation","durationMin":10,
        "lessons":[
          { "id":"l1","type":"read","title":"Welcome to Your Course","durationMin":2,
            "body":[
              {"type":"h3","text":"Welcome"},
              {"type":"p","text":"This sample lesson demonstrates the timer and controls. In the live course, your time spent here would count toward seat time."},
              {"type":"ul","items":["Read through at your pace.","Pause/Resume the timer to test behavior.","When the timer finishes, 'Next' becomes available."]}
            ]
          },
          { "id":"l2","type":"quiz","title":"Module 1 Check","durationMin":1,"quizId":"fl-bdi-m1" }
        ]
      },
      { "id":"m2","title":"Traffic Laws & Regulations","durationMin":30,
        "lessons":[ { "id":"l1","type":"read","title":"Florida Traffic Laws Overview","durationMin":1,
          "body":[{"type":"p","text":"Florida's traffic laws keep all road users safe."}]} ]
      }
      /* m3–m12 similarly with placeholder read lessons */
    ]
  }
  ```

### `/static-data/quiz/fl-bdi-m1.json` & `/static-data/quiz/fl-bdi-final.json`
- Shape:
  ```json
  {"questions":[
    {"id":"q1","prompt":"What is the primary goal of BDI?","choices":["Drive faster","Avoid citations","Improve safe driving habits","Repair cars"],"answerIndex":2,"rationale":"Focus is on safety and defensive driving."}
  ]}
  ```

---

## 7) Unified “Course Workspace” (single page)
**Route:** `/course/[slug]` (page-level state chooses current module/lesson).  
*(Allowed alternative: keep `/course/:slug/learn/:moduleId/:lessonId` but render the same unified layout.)*

### HeaderBar
- Left: logo + “Road Ready Safety”
- Center: **course title** with breadcrumb “My Course › FL BDI”
- Right: **ProgressPill** (“8%”), **Support**, avatar

### Layout
- **Left rail (CourseRail)** — width ≈ 300px; sticky with internal scroll
  - Title: **“Florida Basic Driver Improvement Course”**
  - Primary button: **Continue Course** (brand blue)
  - Divider
  - **Numbered roadmap**: 1–12 modules, then **Final Exam**, **Certificate**
    - Status icons: current (blue), not-started (hollow), complete (check), locked (exam/cert in demo)
    - Clicking an item selects that lesson in the right pane

- **Right content**
  - Top strip: module title; thin **UProgress** (bind to `meta.demoProgressPercent`)
  - **LessonRenderer** (card): full width of right column, `min-h` to visually fill down to TimerCard
  - **TimerCard** (see next section)

---

## 8) TimerCard (all-in-one)
A single card that replaces any bottom toolbar.

**Desktop layout**
- Top row: **Play/Pause** (left), **“Time remaining: mm:ss”** (center, `aria-live="polite"`), **Next** (right, primary blue) — **disabled** until timer finishes.
- Bottom: centered **Exit** (text button with icon) + helper text: “Time must finish before ‘Next’ becomes available.”

**Mobile layout**
- Stack: Time → Play/Pause → Next (full width) → Exit + helper text

**Behavior (UI-only)**
- On **any** lesson enter (Start/Continue/Next/Prev/rail click): `reset()` then `start()` automatically.
- **Pause/Resume** toggles the countdown.
- At `0:00`: `finished=true` → enable **Next**.
- Navigating away resets & restarts for the new lesson.
- No persistence (demo). If SSR drift occurs, wrap TimerCard in `<ClientOnly>` with a static fallback label.

**A11y**
- Play/Pause is a toggle button with `aria-pressed`.
- Next uses `aria-disabled` when locked.

---

## 9) Accessibility & Quality
- Visible focus rings on all interactive elements.
- Logical heading order (H1 page, H2 module, H3 lesson sections).
- Progress has `role="progressbar"` + label.
- Quiz shows inline feedback; results announced textually.
- **No console warnings**; **no hydration mismatches**.

---

## 10) SSR & Hydration Rules
- SSR remains **enabled** everywhere.
- Do **not** `useFetch` or rely on `localStorage`. **Only import fixtures.**
- No `Date.now()`/`Math.random()`/non-deterministic markup in SSR paths.
- If a widget requires client-only behavior (Timer), render a deterministic SSR fallback or wrap with `<ClientOnly>`.

---

## 11) Build & Preview
- `build`: `nuxt generate` → outputs `/dist`
- `preview`: `npx http-server dist -p 4173 -c-1`
- Confirm all routes render with **no hydration warnings**.

---

## 12) Acceptance Checklist
- Unified workspace page shows **left rail** roadmap + **right** player.
- Header includes logo, breadcrumb, progress pill, Support, avatar.
- Lesson card is **full width** of right column and **fills to TimerCard** (no big gap).
- **TimerCard** contains Play/Pause, “Time remaining”, **Exit**, **Next**, helper text.
- **Timer auto-starts on lesson enter**; **Next** unlocks at `0:00`.
- **Final Exam** (quiz) and **Certificate** preview exist in the left list.
- Brand fonts/colors match site (Inter; primary blue).
- No console errors; responsive behavior polished.
