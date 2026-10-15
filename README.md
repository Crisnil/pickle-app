# PickleMatch

Pickleball matchmaking platform. Local dev runs entirely in Docker — no PHP, Composer, or Node install required on the host.

## Prerequisites

- Docker Desktop (or OrbStack) with Compose v2+

## First-time setup

```bash
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Edit `backend/.env` to match the root `.env` values (`DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`, `DB_HOST=postgres`, `APP_URL=http://localhost:8080`, `FRONTEND_URL=http://localhost:5173`).

```bash
docker compose up --build
```

First boot installs Composer and npm dependencies inside the containers, generates the Laravel app key, and runs migrations automatically.

## URLs

- Frontend (Vite dev server, HMR): http://localhost:5173
- API directly through nginx: http://localhost:8080/api/ping

## Common commands

```bash
docker compose exec app php artisan migrate
docker compose exec app php artisan tinker
docker compose exec app composer require <package>
docker compose exec vite npm install <package>
docker compose logs -f vite
```

`vendor/` and `node_modules/` live in named Docker volumes, not on the host — always install packages via `docker compose exec`, not locally.

## Resetting the database

```bash
docker compose down -v
docker compose up -d
```

`down -v` also removes the Postgres data volume; use a plain `down` to keep data between restarts.

## Dev-only notes

- `storage/` and `bootstrap/cache/` are bind-mounted from the host; if you hit permission errors, run `chmod -R 777 backend/storage backend/bootstrap/cache` (dev-only, not a production pattern).
- Vite is exposed on its own port rather than proxied through nginx, to keep HMR simple. The frontend's `/api` calls are proxied by Vite itself to nginx.
