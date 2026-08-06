# Crate Lite

Entertainer booking demo: browse performers by category, search and filter, view profiles, and submit a mock booking request.

- **Frontend:** Next.js (App Router) + React + Tailwind CSS — port `3000`
- **Backend:** Express health API stub — port `4000` (optional; UI uses mock data today)

---

## Prerequisites

- [Node.js](https://nodejs.org/) 20+ (22 recommended)
- npm (comes with Node)
- For Docker: [Docker Desktop](https://www.docker.com/products/docker-desktop/) (or Docker Engine + Compose)

---

## Run with Docker

From the **repository root**:

```bash
docker compose up
```

Open [http://localhost:3000](http://localhost:3000).

Stop with `Ctrl+C`, or run detached:

```bash
docker compose up --build -d
docker compose down
```

This builds and serves the Next.js frontend in production mode (`next start` via the standalone image).

---

## Run locally (without Docker)

### Frontend (required)

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

### Backend (optional)

The UI does not call the API yet; this is a stub for future wiring.

```bash
cd backend
npm install
npm run dev
```

API listens on [http://localhost:4000](http://localhost:4000) (`GET /health`).

---

<!-- ## Project structure

```
crate-lite/
├── docker-compose.yml          # Frontend-only Docker Compose
├── frontend/                   # Next.js app (main product UI)
│   ├── Dockerfile
│   ├── app/                    # App Router pages & layouts
│   │   ├── page.tsx            # Home
│   │   ├── search/             # Search results
│   │   ├── performers/[id]/   # Performer profile
│   │   └── book/[id]/         # Booking form
│   ├── components/
│   │   ├── home/               # Hero, category rows, directory
│   │   ├── search/             # Toolbar, filters, sort, grid, pagination
│   │   ├── performer/          # Profile sections, gallery, dialogs
│   │   ├── booking/            # Booking form & summary
│   │   ├── shared/             # Header, footer, cards, calendar, etc.
│   │   └── ui/                 # Primitives (OrangeButton, TextLink, …)
│   ├── hooks/                  # Client state & effects
│   ├── lib/                    # Domain helpers (search, booking, availability)
│   ├── data/                   # Mock performer catalog
│   ├── types/                  # Shared TypeScript types
│   └── public/                 # Static assets
└── backend/                    # Express API stub
    ├── Dockerfile
    └── src/index.js
``` -->

### Frontend Structure

| Area | Role |
|------|------|
| `app/` | Routes and pagesaw |
| `components/` | UI by feature (`home`, `search`, `performer`, `booking`) plus `shared` / `ui` |
| `hooks/` | React state, listeners, scroll, menus, form logic |
| `lib/` | Pure helpers (filters, validation, dates, formatting) |
| `data/` | Seed/mock performers |
| `types/` | Domain types (`Performer`, search filters, etc.) |

---

## Notes

- Performer catalog and booked dates are **mock data** in `frontend/data/` and `frontend/lib/`.
- Remote images (Unsplash, YouTube thumbs) are allowed via `next.config.ts`.
- Docker frontend image uses Next.js `output: "standalone"` for a smaller production container.
