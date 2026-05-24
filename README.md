# Dev Tinder Frontend

A React + Vite frontend for a developer networking app that helps developers discover, connect, and review incoming requests.

## What this project does

Dev Tinder Frontend is a modern UI for matching developers with a swipe-style feed, profile management, and connection handling.

Key functionality:

- Login with email/password authentication
- Protected routes for feed, profile, connections, and request review
- Swipe-like feed with "Interested" and "Ignore" actions
- Edit and preview your developer profile
- View accepted connections
- Accept or reject incoming connection requests

## Core pages

- `/login` — user login page with validation
- `/feed` — developer discovery feed with action buttons
- `/profile` — edit profile details and preview the current user card
- `/connections` — list of connected developer matches
- `/request-review` — review pending incoming connection requests

## Tech stack

- React 19
- Vite
- React Router DOM
- Redux Toolkit
- Axios
- Tailwind CSS + DaisyUI
- ESLint

## Setup

1. Clone the repository

```bash
git clone <repo-url>
cd devTinderFE
```

2. Install dependencies

```bash
npm install
```

3. Update backend URL if needed

The frontend expects an API backend at `http://localhost:7777` by default.
Change `BASE_URL` in `src/utils/constant.js` if your backend uses a different host or port.

4. Run the app

```bash
npm run dev
```

Then open the local Vite URL printed in your terminal.

## Available scripts

- `npm run dev` — start the development server
- `npm run build` — build the production bundle
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint across the project

## Backend API expectations

This frontend calls the following backend endpoints:

- `POST /login`
- `POST /logout`
- `GET /profile/view`
- `PUT /profile/update`
- `GET /feed`
- `GET /user/requests/received`
- `POST /request/review/:status/:requestId`
- `GET /user/connections`
- `POST /request/send/:status/:receiverId`

All requests are sent with credentials enabled (`withCredentials: true`).

## App structure

- `src/App.jsx` — router configuration and protected route handling
- `src/main.jsx` — app entry point
- `src/pages/` — page views for login, feed, profile, connections, and review flow
- `src/components/` — reusable UI atoms, molecules, organisms, and layout templates
- `src/services/` — API client functions using Axios
- `src/utils/` — store setup, auth utilities, route protection, and constants

## Notes

- Authentication state is loaded on app start using the `useAuth` hook.
- Protected pages redirect unauthenticated users to `/login`.
- The live feed uses card animations for interest/ignore actions.
- Profile edits are saved and immediately updated in the Redux store.

---

Powered by React, Redux, Tailwind CSS, and Vite.
