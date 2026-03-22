# Mini Compliance Tracker

Monorepo setup for Mini Compliance Tracker.

## Structure

- `Frontend` — React + Vite frontend
- `server` — Node.js + Express backend
- `supabase/migrations` — SQL schema and seed files

## Local Setup

1. Install dependencies:
   - `npm install`
   - `cd server && npm install`
   - `cd ../Frontend && npm install`
2. Configure environment files from examples:
   - `server/.env.example`
   - `Frontend/.env.example`
3. Run both services:
   - `npm run dev`

## Scripts

- `npm run dev` — start frontend + backend in parallel
- `npm run dev:server` — start backend only
- `npm run dev:frontend` — start frontend only
