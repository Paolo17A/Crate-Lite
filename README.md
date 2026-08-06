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

From the **frontend** directory:

```bash
cd frontend
docker build -t crate-lite .
docker run --rm -p 3000:3000 crate-lite
```

Open [http://localhost:3000](http://localhost:3000).

Stop with `Ctrl+C`.

This builds and serves the Next.js app in production mode (`next start` via the standalone image in `frontend/Dockerfile`).

---

## Run locally (without Docker)

```bash
cd frontend
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

### Frontend structure

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

- Performer catalog and booked dates are **mock data** in `frontend/data/` and `frontend/lib/`.
- Remote images (Unsplash, YouTube thumbs) are allowed via `next.config.ts`.
- Docker image uses Next.js `output: "standalone"` for a smaller production container.
