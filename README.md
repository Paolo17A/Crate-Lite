# Crate Lite

Entertainer booking demo: browse performers by category, search and filter, view profiles, and submit a mock booking request.

Built with **Next.js** (App Router) + React + Tailwind CSS — port `3000`.

---

## Prerequisites

- [Node.js](https://nodejs.org/) 20+ (22 recommended)
- npm (comes with Node)
- For Docker: [Docker Desktop](https://www.docker.com/products/docker-desktop/) (or Docker Engine)

---

## Run with Docker

From the repo root:

```bash
docker build -t crate-lite .
docker run --rm -p 3000:3000 crate-lite
```

Open [http://localhost:3000](http://localhost:3000).

Stop with `Ctrl+C`.

This builds and serves the Next.js app in production mode (`next start` via the standalone image in `Dockerfile`).

---

## Run locally (without Docker)

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

| Command | Description |
|---------|-------------|
| `npm run build` | Production build |
| `npm start` | Serve production build (after `build`) |
| `npm run lint` | ESLint |

---

### Project structure

| Area | Role |
|------|------|
| `app/` | Routes and pages |
| `components/` | UI by feature (`home`, `search`, `performer`, `booking`) plus `shared` / `ui` |
| `hooks/` | React state, listeners, scroll, menus, form logic |
| `lib/` | Pure helpers (filters, validation, dates, formatting) |
| `data/` | Seed/mock performers |
| `types/` | Domain types (`Performer`, search filters, etc.) |

---

## Notes

- Performer catalog and booked dates are **mock data** in `data/` and `lib/`.
- Remote images (Unsplash, YouTube thumbs) are allowed via `next.config.ts`.
- Docker image uses Next.js `output: "standalone"` for a smaller production container.

---

## Backend connection

crate-lite talks to the Crate Backend repo. Copy `.env.example` to `.env.local` (already gitignored) and point it at the backend origin:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

On the backend, `CORS_ORIGIN` can be a comma-separated list of frontend origins (for example `http://localhost:3000,http://localhost:3002`). Restart both servers after env or Helmet/CORS changes.

An unlisted live health page polls `GET /health` every 5 seconds. There is no nav link — open it on whatever port the frontend is using, e.g. [http://localhost:3002/dev/health](http://localhost:3002/dev/health).
