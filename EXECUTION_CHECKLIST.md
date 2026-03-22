# Mini Compliance Tracker — Execution Checklist

## Phase A — Foundation
- [x] Create `Frontend/` and `server/` structure (if missing)
- [x] Add `server/.env.example`
- [x] Add `Frontend/.env.example`
- [x] Add/update `.gitignore` to exclude local env files
- [x] Install backend dependencies (`express`, `cors`, `@supabase/supabase-js`)
- [x] Confirm local boot for both frontend and backend

## Phase B — Database + API
- [x] Add schema SQL in `supabase/migrations/`
- [x] Seed exact 5 clients + 20 tasks from PRD v2
- [x] Implement `GET /api/health`
- [x] Implement `GET /api/clients`
- [x] Implement `GET /api/clients/:id/tasks`
- [x] Implement `POST /api/clients/:id/tasks`
- [x] Implement `PATCH /api/tasks/:id/status`
- [x] Add request validation and error responses per PRD
- [x] Validate all routes in Postman

## Phase C — Frontend Core
- [x] Build `ClientList` and selected-client state
- [x] Build `TaskList` and `TaskCard`
- [x] Build `AddTaskModal` with required field validation
- [x] Implement status update trigger from task card
- [x] Implement status and category filters (combinable)

## Phase D — Reliability & UX
- [x] Add UTC-safe `isOverdue` utility
- [x] Verify overdue matrix (yesterday/today/tomorrow/completed)
- [x] Apply overdue visuals (border, badge, date color)
- [x] Add loading states for clients/tasks
- [x] Add empty states (`no tasks yet` and `no tasks match filters`)
- [x] Add error states with retry for clients/tasks fetch
- [x] Handle add-task `400` inline and `500` banner errors
- [x] Add PATCH rollback behavior on status update failure

## Phase E — Deploy + Reviewability
- [ ] Deploy backend to Railway
- [ ] Deploy frontend to Vercel
- [ ] Configure CORS for localhost + deployed frontend URL
- [ ] Set production env vars
- [ ] Update README with live URL, screenshot, setup, env notes
- [ ] Verify no CORS errors in browser console
- [ ] Run full reviewer walkthrough in incognito

## Submission Gates
- [ ] Live URL loads reliably and is shareable
- [ ] 15+ meaningful commits with conventional prefixes
- [ ] Overdue tasks visible immediately on first load
- [ ] Status changes persist after refresh
- [ ] Filters work independently and together
- [ ] All required acceptance checks pass
