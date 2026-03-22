# Mini Compliance Tracker — Implementation Plan (from PRD v1.0 → v2.0)

## 1) Analysis Summary

The v2 PRD keeps the core product scope from v1 (clients, tasks, add task, status updates, filters, overdue highlighting) and adds **execution-critical delivery requirements** that directly affect reviewer success:

- Deployment reliability standard changed to **fast live load with no cold-start risk**.
- Added explicit **commit strategy** requirement (15–20 meaningful commits).
- Added mandatory **README quality bar** and reviewer-first documentation.
- Added production-ready **seed data narrative** (5 clients, 20 tasks, 7 overdue visible on first load).
- Added mandatory **CORS + env setup** requirements.
- Added timezone-safe **overdue logic test matrix**.
- Added exhaustive **error-state UX** requirements.
- Added **Tailwind token consistency** constraints.
- Added explicit **end-to-end reviewer walkthrough** on live deployment.

## 2) v1 → v2 Delta Matrix

| Area | v1.0 | v2.0 | Implementation Impact |
|---|---|---|---|
| Deployment | Render/Railway acceptable | Railway strongly preferred + `/api/health` + uptime ping | Add health route, deploy backend first, verify <3s load |
| API Surface | 4 core routes | 4 core routes + health check | Add `GET /api/health` contract |
| Seed Data | Mentioned | Fully specified 5 clients + 20 tasks + overdue IDs | Seed SQL must exactly mirror v2 list |
| Overdue Logic | Frontend render-time check | UTC-midnight normalized + test matrix | Centralize `isOverdue` utility and validate edge cases |
| Error Handling | Generic requirement | Component-by-component required states | Add retry, inline errors, patch rollback, filter/empty variants |
| CORS | Not explicit | Required for Vercel→Railway | Add middleware + `CLIENT_URL` env |
| Env Setup | Mentioned | Strict `.env.example` files required | Commit both templates and verify local run |
| Styling | Tailwind implied | Explicit token map and status/priority colors | Normalize all badges/cards to token classes |
| Reviewability | Acceptance checklist | Full incognito reviewer simulation checklist | Add pre-submit QA script and runbook |
| Git Process | 15+ commits target | Commit cadence and message policy | Execute commit-by-feature workflow |

## 3) Migration / Gap-Closure Plan

### Gap 1 — Commit Strategy
- Use feature-scoped commits only (`feat:`, `fix:`, `chore:`, `docs:`).
- Minimum target: 15 commits before submission, each tied to a visible behavior change.

### Gap 2 — Deployment Reliability
- Backend: Railway.
- Add `GET /api/health` returning `{ status: 'ok', timestamp }`.
- Validate live URL in incognito and ensure normal first paint + data fetch within expected reviewer tolerance.

### Gap 3 — README Quality
- Add top-line live URL.
- Add one-paragraph product summary.
- Add screenshot/GIF showing overdue tasks.
- Include clean local setup + env configuration + seed expectations.

### Gap 4 — Seed Data Story
- Seed exact 5 Indian entities and 20 tasks from v2.
- Ensure the seven specified overdue tasks appear immediately on initial load.

### Gap 5 — CORS
- Add `cors` middleware before routes.
- Allow `http://localhost:5173` and `process.env.CLIENT_URL`.

### Gap 6 — Environment Templates
- Commit:
  - `server/.env.example`
  - `client/.env.example`

### Gap 7 — Timezone-Safe Overdue
- Implement UTC date boundary comparison utility.
- Validate matrix:
  - yesterday + Pending => overdue true
  - today + Pending => false
  - tomorrow + Pending => false
  - yesterday + Completed => false

### Gap 8 — Error States
- Client list failure: message + retry.
- Task list failure: message + retry.
- Add task 400: inline field errors; modal stays open.
- Add task 500: generic banner; modal stays open.
- PATCH failure: revert optimistic UI and show error toast/message.
- Empty cases: separate copy for “no tasks yet” vs “no filter matches”.

### Gap 9 — Tailwind Consistency
- Normalize classes for spacing, overdue treatments, status/priority badges, selected client state per v2 tokens.

### Gap 10 — Reviewer Walkthrough
- Execute full v2 checklist on deployed app in incognito before submission.

## 4) Engineering Implementation Plan (Execution Order)

## Phase A — Foundation (0.5 day)
1. Monorepo structure validation (`client`, `server`, `supabase/migrations`).
2. Add `.env.example` templates.
3. Install and configure backend dependencies including `cors`.

**Exit Criteria**
- Both apps boot locally with documented env vars.

## Phase B — Data and API (0.75 day)
1. Create Supabase schema and seed script (exact v2 data).
2. Build/verify core APIs:
   - `GET /api/clients`
   - `GET /api/clients/:id/tasks`
   - `POST /api/clients/:id/tasks`
   - `PATCH /api/tasks/:id/status`
3. Add `GET /api/health`.
4. Validate all routes via Postman.

**Exit Criteria**
- API contracts and status codes match PRD v2.

## Phase C — Frontend Core UX (1 day)
1. ClientList + selected state.
2. TaskList + TaskCard + status update flow.
3. AddTaskModal with form validation.
4. Filters (status/category), combinable.

**Exit Criteria**
- Full CRUD-lite flow works end-to-end without page reloads.

## Phase D — Critical Reliability UX (0.75 day)
1. Add UTC-safe overdue logic utility.
2. Add overdue sort/highlight/badge treatments.
3. Add required error/empty/loading states.
4. Add optimistic status update with rollback on failure.

**Exit Criteria**
- No blank-screen/silent-fail paths.

## Phase E — Production Hardening & Reviewability (0.5 day)
1. Deploy backend to Railway and frontend to Vercel.
2. Configure `CLIENT_URL` and CORS.
3. Update README with screenshot/live URL/setup.
4. Run reviewer walkthrough checklist in incognito.

**Exit Criteria**
- Reviewer can evaluate app unassisted from live URL.

## 5) Product Roadmap & Milestones

| Milestone | Target | Outcome |
|---|---|---|
| M1: Architecture + Env Ready | Day 1 AM | Local startup, env templates, dependency baseline |
| M2: API + Seed Stable | Day 1 PM | All routes + health route + exact demo data |
| M3: Usable Frontend Flow | Day 2 AM | Client/task browsing, add task, status update, filters |
| M4: Quality Gates Complete | Day 2 PM | Overdue logic correctness + required error states |
| M5: Production + Submission Pack | Day 3 | Live URL, README, reviewer simulation, final checks |

## 6) Work Breakdown Backlog (Priority)

### Must-Have (Ship Blockers)
- Seed data parity with v2 (5 clients/20 tasks/7 overdue).
- Health endpoint and Railway deployment.
- CORS configured for Vercel origin.
- UTC-safe overdue function + matrix verification.
- All critical error states and retries.
- README quality sections and live URL.

### Should-Have
- Optimistic status update with explicit rollback.
- Better empty-state copy and accessibility labels.

### Nice-to-Have
- Additional smoke tests around overdue and filters.
- Small UX polish for visual hierarchy.

## 7) Quality Gates (Definition of Done)

- Functional
  - All API endpoints return expected status and payload shapes.
  - Status updates persist after refresh.
  - Filters work independently and together.

- Data
  - First load visibly contains overdue tasks from seed set.

- Reliability
  - No CORS errors in production browser console.
  - Health endpoint returns valid heartbeat payload.

- UX
  - Required loading/empty/error states present.
  - Tailwind tokens are consistently applied for badges/cards.

- Reviewer Experience
  - README complete and usable from clean clone.
  - Incognito walkthrough completed end-to-end.

## 8) Immediate Next Actions

1. Scaffold implementation tracker from this plan into issue-sized tasks.
2. Start with Phase A + B (env templates, schema/seed, API + health endpoint).
3. Keep commit cadence aligned with Gap 1 from first code change onward.
