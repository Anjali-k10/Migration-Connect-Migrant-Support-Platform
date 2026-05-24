# Migrant Connect

A platform that helps migrants find shelters, food centers, NGOs, government schemes, and emergency support.

## Quick start (frontend + backend together)

```bash
cd Migration-Connect-Migrant-Support-Platform
npm run install:all
npm run dev
```

This starts **both** servers:

| Service  | URL |
|----------|-----|
| Frontend | http://127.0.0.1:5173 |
| Backend API | http://127.0.0.1:5001/api |
| Health check | http://127.0.0.1:5001/api/health |

The frontend proxies `/api` → backend, so login, registration, help centers, and emergency requests work from the UI.

## How integration works

- **Development:** Vite (`frontend`) proxies `/api/*` to Express (`backend`). Cookies are sent with `credentials: "include"`.
- **Production (single server):** `npm run start:integrated` builds the frontend and serves it from the backend on port 5001.
- **Production (split):** Set `VITE_API_BASE_URL=http://your-api-host/api` when building the frontend.

## API endpoints used by the UI

| Feature | Method | Endpoint |
|---------|--------|----------|
| Register | POST | `/api/migrants/register` |
| Login | POST | `/api/migrants/login` |
| Profile | GET | `/api/migrants/me/profile` |
| Update profile | PUT | `/api/migrants/me/profile` |
| Help centers | GET | `/api/help-centers` |
| Nearest centers | GET | `/api/help-centers/nearest?lat=&lng=` |
| Emergency | POST | `/api/emergency/create` |
| Health | GET | `/api/health` |

## Environment

**Backend** (`backend/.env`):

```
PORT=5001
MONGO_URI=memory
JWT_SECRET=your-secret
CLIENT_URL=http://localhost:5173,http://127.0.0.1:5173
SERVE_CLIENT=false
```

**Frontend** (`frontend/.env.development`):

```
VITE_API_BASE_URL=/api
VITE_PROXY_TARGET=http://127.0.0.1:5001
```

For a real database, set `MONGO_URI` to your MongoDB connection string.

## Pushing to GitHub

```bash
git fetch origin
git pull --rebase origin main
git push origin main
```

If push fails (403, auth, or non-fast-forward), see **[docs/PUSHING.md](docs/PUSHING.md)**.

Current remote: `Anjali-k10/Migration-Connect-Migrant-Support-Platform` — you must have write access or push to your own fork.

## Troubleshooting

- **Yellow banner “Backend is offline”** — run `npm run dev` from the project root (or `npm run dev:backend` in another terminal).
- **UI looks old** — open http://127.0.0.1:5173 and hard-refresh (`Cmd+Shift+R`).
- **CORS errors** — add your frontend URL to `CLIENT_URL` in `backend/.env`.

## Tech stack

- Frontend: React, Vite, Tailwind CSS, Framer Motion
- Backend: Node.js, Express, MongoDB (in-memory for local dev)
