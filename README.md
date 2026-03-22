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

## Tech Stack

The Mini Compliance Tracker is a blazing-fast full-stack monorepo designed with a React (Vite) frontend heavily styled using Tailwind CSS for a premium glassmorphic interface. Its robust RESTful backend is powered by Node.js and Express, communicating securely with a Supabase PostgreSQL database for persistent storage. For production, the entire application architecture is seamlessly bundled into serverless functions, easily deployable in a single click on cloud platforms like Netlify.

## Reviewer Verification

1. Wait for the Netlify deployment to complete and navigate to the provided production URL.
2. Under the specific client ledger, add a new compliance task setting the due date strictly to "yesterday" and the status to "Pending". Verify that the app's dynamic time-zone logic immediately flags the task with a red overdue border.
3. Create a brand new client via the sidebar, fill out the form, and verify they seamlessly appear in the interface without needing a manual refresh.
4. Try editing an existing task's category and status, and double-check that the interface reliably updates the badge visualizations in real-time.
