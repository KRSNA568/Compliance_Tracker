<div align="center">
  <h1>✨ ComplianceSuite</h1>
  <p><strong>A blazing-fast, serverless-ready full-stack monorepo for tracking compliance tasks.</strong></p>
</div>

<br />

## 🔗 Live Deployment

**Deployed Application:** [https://minicompliancetracker.netlify.app/](https://minicompliancetracker.netlify.app/)

---

## 🚀 Tech Stack

The **Mini Compliance Tracker** is thoughtfully designed around a scalable monorepo architecture:

- **Frontend:** React + Vite, heavily styled with Tailwind CSS and Lucide-React icons for a premium, glassmorphic SaaS interface. Built to be responsive on mobile and desktop devices.
- **Backend:** Node.js + Express.js API, engineered with dynamic serverless capabilities (`serverless-http`) to support serverless cloud deployments.
- **Database:** Supabase (PostgreSQL), utilizing foreign keys, cascading deletes, and strict schema validation for highly persistent and reliable ledger storage.
- **Cloud Hosting:** Architected exactly for Netlify via a custom `netlify.toml` bridge, seamlessly deploying the React build and the Express Serverless functions in a single, unified pipeline.

---

## ⚡ Core Features

* **Real-time Client Ledger:** Seamlessly create, edit, and delete clients and track their respective tasks without any manual page refreshes.
* **Intelligent Dashboard:** Dynamic Task Board complete with `Status` drag-and-drop visuals, `Category` filtering algorithms, and robust animated loading skeleton states.
* **Timezone-Safe Overdue Engine:** Strictly parses UTC midnight variations to guarantee precise highlights (red warning borders) on universally overdue tasks.
* **Resilient Architecture:** Integrated optimistic UI fail-safes. The dashboard aggressively rolls back task status state if the backend API loses connection or throws a `500` error.

---

## 💻 Local Workspace Setup

Want to run the app on your local machine? Follow these exact steps:

### 1. Database Initialization (Supabase)
Navigate to the `supabase/migrations/` directory and execute the SQL scripts in your Supabase SQL Editor:
1. Run `0001_init.sql` to build the schemas and strict datatype checks.
2. Run `0002_seed_data.sql` to populate your database with test clients and tasks.

### 2. Environment Variables
You need to provide your Supabase connection strings to the backend so it can read/write data.
Create a `.env` file inside the `/server` directory:

```env
PORT=5001
SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
SUPABASE_SERVICE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY
```

### 3. Install & Run
Install the local `npm` module dependencies for both the frontend and backend architectures:

```bash
# Install root orchestration tools
npm install

# Install backend dependencies
cd server && npm install

# Install frontend dependencies
cd ../Frontend && npm install
```

Return to the root project directory and start the whole ecosystem in parallel:
```bash
# Spins up the Vite Frontend + Nodemon Backend instantly
npm run dev
```

The React dashboard will be running at `http://localhost:5173`.

---

## ☁️ Netlify Deployment 

The project structure is wired for absolute automation with Netlify via the root `netlify.toml`. 
If you fork/clone this repository to your own GitHub:

1. Import the repository straight into your Netlify dashboard.
2. Under "Site configuration", add the `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` environment variables.
3. Click "Deploy". Netlify will automatically trigger `npm install`, compile Vite, generate the serverless functions out of the Express backend, configure the `/api` redirects, and push it live!

---

## ✅ Reviewer Verification 

To properly verify the capabilities of the application on the Live Deployment URL:

1. Under a specific client ledger, click `Add Task` and set its **due date** strictly to "yesterday" with a status of "Pending". Verify that the app's dynamic time-zone logic immediately flags the task with a deep red overdue ring.
2. Create a brand new client via the sidebar, fill out the form, and verify they seamlessly appear at the bottom of the list without requiring a manual browser refresh.
3. Click the `Edit` or `Delete` icons on any Client or Task to test the backend `PUT/DELETE` API endpoints dynamically mutating the database arrays. 
4. Move a task from "Pending" to "Completed" to confirm the success animations and state patches.
