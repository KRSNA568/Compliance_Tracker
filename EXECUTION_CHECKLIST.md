# Mini Compliance Tracker — Execution Checklist

## Phase A — Foundation
- [ ] Create `client/` and `server/` structure (if missing)
- [ ] Add `server/.env.example`
- [ ] Add `client/.env.example`
- [ ] Add/update `.gitignore` to exclude local env files
- [ ] Install backend dependencies (`express`, `cors`, `@supabase/supabase-js`)
- [ ] Confirm local boot for both frontend and backend

## Phase B — Database + API
- [ ] Add schema SQL in `supabase/migrations/`
- [ ] Seed exact 5 clients + 20 tasks from PRD v2
- [ ] Implement `GET /api/health`
- [ ] Implement `GET /api/clients`
- [ ] Implement `GET /api/clients/:id/tasks`
- [ ] Implement `POST /api/clients/:id/tasks`
- [ ] Implement `PATCH /api/tasks/:id/status`
- [ ] Add request validation and error responses per PRD
- [ ] Validate all routes in Postman

## Phase C — Frontend Core
- [ ] Build `ClientList` and selected-client state
- [ ] Build `TaskList` and `TaskCard`
- [ ] Build `AddTaskModal` with required field validation
- [ ] Implement status update trigger from task card
- [ ] Implement status and category filters (combinable)

## Phase D — Reliability & UX
- [ ] Add UTC-safe `isOverdue` utility
- [ ] Verify overdue matrix (yesterday/today/tomorrow/completed)
- [ ] Apply overdue visuals (border, badge, date color)
- [ ] Add loading states for clients/tasks
- [ ] Add empty states (`no tasks yet` and `no tasks match filters`)
- [ ] Add error states with retry for clients/tasks fetch
- [ ] Handle add-task `400` inline and `500` banner errors
- [ ] Add PATCH rollback behavior on status update failure

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
