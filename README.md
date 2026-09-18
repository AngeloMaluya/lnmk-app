# Lakas ng may Kapansanan — Assistance Request Portal (Frontend Demo)

A fully functional Next.js frontend implementation of the PWD assistance request app
designs: login/signup, dashboard, a 4-step "Request Assistance" wizard (choose type →
details → document upload → review & submit), request tracking, notifications, history,
and profile.

**There is no backend or database.** All data (your account and your submitted requests)
is stored in your own browser via `localStorage`/`sessionStorage`, so it's fully
functional to click through end-to-end, and will persist across refreshes on your
machine — but it is not shared between users or devices.

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## How it works

- **Sign up** (`/signup`) creates one local account (first/last name, address, disability
  type, birthdate, sex, phone, plus email/password so sign-in works) and logs you in.
- **Sign in** (`/login`) checks the email/password against the account you created.
  "Continue with Google" is mocked — it signs you into a sample demo account if you
  haven't signed up yet.
- **Dashboard** (`/dashboard`) shows a greeting, quick stats derived from your submitted
  requests, and your most recent request's progress.
- **Request Assistance** (`/dashboard/request`) is a 4-step wizard:
  1. Choose Financial Assistance or Assistive Device
  2. Fill in type-specific details
  3. "Upload" the required documents (filenames only — no files are actually stored)
  4. Review everything and submit
- **My Request / History / Notifications** (under the sidebar) read from the same list of
  submitted requests. Each request detail page has an **"Advance to next stage (demo)"**
  button so you can see the Submitted → Verified → Assessment → Approved → Released
  progression without a real backend.
- **Profile** lets you view/edit the info you signed up with.

## Tech

- Next.js 14 (App Router), React 18
- Tailwind CSS for styling
- `lucide-react` for icons
- Plain client-side state (`React Context`) + `localStorage`/`sessionStorage` — no server,
  no database, no API routes.

## Resetting the demo data

Open your browser's dev tools → Application/Storage tab, and clear `localStorage` for
this site (or clear keys `lnmk_account`, `lnmk_session`, `lnmk_requests`) to start over
as a brand-new user.
