# Architecture

Back to [[Home]].

## Services (Docker Compose)

- `vite`: frontend dev server. `node_modules` is in a named volume (`frontend_node_modules`). Install packages with `docker compose exec vite npm install ...`.
- `nginx`: serves the Laravel API. The Vite dev proxy sends `/api` to `http://nginx:80`.
- Laravel (PHP) backend.
- Postgres database.
- pgAdmin (`docker/pgadmin/`).

## Frontend

- Routes are in `frontend/src/main.tsx`. `AppLayout` wraps all pages.
- `/`: Find a Game (uses mock data from `frontend/src/mocks/matches.ts`).
- `/dev/health`: health check for the Docker/nginx/Postgres chain.

## Backend API

- `/api/ping`: health check.
- `/api/matches`: planned. The mock `Match` type shows the expected shape.
