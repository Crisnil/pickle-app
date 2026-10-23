# PickleMatch Frontend — UI Foundation + "Find a Game" Screen

## Context

The Docker-based dev environment (Laravel 13 + React/Vite + Postgres, prior plan) is done, verified, committed, and pushed to `github.com/Crisnil/pickle-app`. The frontend currently has no real product UI — `frontend/src/App.tsx` only renders the "Dev Stack Check" page built to prove the Docker stack wires together (calls `/api/ping`). No router, no styling framework, no actual screens exist yet.

This task adds the first real UI: a shared app layout (header/nav) plus the **"Find a Game"** screen from the product summary's example flow (filter chips for skill level/format/timing, a list of match cards). The backend has no domain endpoints yet (only `/api/ping`), so this screen uses realistic mock data shaped like a plausible future `/api/matches` response — this previews the API contract Laravel will need later without blocking UI work on backend work.

Confirmed decisions:
1. Scope: UI foundation (routing + styling + layout) **plus** the Find a Game screen only — not Matchmaking or Match Confirmed yet.
2. Styling: **Tailwind CSS** (v4, via `@tailwindcss/vite` — no `tailwind.config.js`/PostCSS needed, that setup is v3-only).
3. Routing: **react-router** v8 (the unified `react-router` package, not `react-router-dom` — that's superseded since v7).
4. The existing health-check page is **kept, not deleted** — moved to `/dev/health` as a standing diagnostic for verifying the Docker/nginx/Postgres chain, since it's cheap to keep and the user built it deliberately.

## Key technical notes

- `frontend/node_modules` lives in a **named Docker volume** (`frontend_node_modules`), and the `vite` container's entrypoint only runs `npm install` if `node_modules` is absent. New packages must be installed via `docker compose exec vite npm install ...` — not on the host, and not just by editing `package.json`.
- `frontend/tsconfig.app.json` has `verbatimModuleSyntax: true` (type-only imports must use `import type { ... }`) and `erasableSyntaxOnly: true` (no TS `enum` — use string literal unions instead, as the mock `Match` type already does).
- Existing dev-proxy pattern in `frontend/vite.config.ts` (`/api` → `http://nginx:80`) stays untouched; any future real API calls should follow the same pattern as `frontend/src/api/health.ts`.

## Changes

**Install (inside the `vite` container):**
```
docker compose exec vite npm install tailwindcss@^4.3.3 @tailwindcss/vite@^4.3.3 react-router@^8.4.0
```

**Tailwind setup:**
- `frontend/vite.config.ts` — add `tailwindcss()` (from `@tailwindcss/vite`) to the `plugins` array, alongside the existing `react()` plugin and proxy config.
- `frontend/src/index.css` — replace entirely with `@import "tailwindcss";` (v4 needs nothing else; no `content: []` array, scanning is automatic).
- `frontend/src/App.css` — now unused once `App.tsx` is removed; safe to delete.

**Routing + layout:**
- `frontend/src/main.tsx` — rewritten to wire `BrowserRouter`/`Routes`/`Route` instead of rendering `<App />` directly. Route tree: a layout route (`AppLayout`) wrapping an `index` route (`FindGamePage` at `/`) and `dev/health` (`HealthCheckPage`).
- `frontend/src/layouts/AppLayout.tsx` (new) — header with "PickleMatch" brand + nav links ("Find a Game", "Dev Health"), renders children via `<Outlet />`. Mobile-first: `max-w-screen-sm`/`md` constrained column, `min-h-dvh` (not `100vh`, to avoid the mobile-Safari viewport bug — relevant since this becomes a PWA later).
- `frontend/src/App.tsx` — **deleted**; its layout chrome moves into `AppLayout`, its health-check body moves into `HealthCheckPage`.
- `frontend/src/pages/HealthCheckPage.tsx` (new) — the existing health-check logic verbatim (reuses `fetchPing`/`PingResponse` from `frontend/src/api/health.ts` unchanged), restyled with Tailwind classes instead of inline styles.

**Find a Game screen:**
- `frontend/src/mocks/matches.ts` (new) — `Match` interface (id, venueName, venueSuburb, startTime as ISO string, skillLevel, format, playersJoined, playerCapacity, costPerPlayer, currency) + a `mockMatches` array of 4 entries (one at full capacity, to exercise the "Full" button state).
- `frontend/src/components/FilterBar.tsx` (new) — chip-style filters for skill level / format / timing (matches the "Intermediate · Doubles · Tonight" style from the product summary). Timing filter is display-only for now (no real date-bucketing logic against mock data yet).
- `frontend/src/components/MatchCard.tsx` (new) — one match's venue, suburb, formatted start time, skill/format/cost badges, players-joined count, and a Join/Full button (disabled + grayed out when at capacity).
- `frontend/src/pages/FindGamePage.tsx` (new) — owns filter state (`useState` x3), filters `mockMatches` via `useMemo`, renders `FilterBar` + a list of `MatchCard`s (or an empty state).

Full component code for all of the above was drafted during planning and should be written as specified — see the breakdown above for exact responsibilities per file.

## File list

| File | Action |
|---|---|
| `frontend/package.json` / `package-lock.json` | modify (new deps) |
| `frontend/vite.config.ts` | modify (add Tailwind plugin) |
| `frontend/src/index.css` | replace (Tailwind import only) |
| `frontend/src/App.css` | delete |
| `frontend/src/App.tsx` | delete |
| `frontend/src/main.tsx` | modify (router wiring) |
| `frontend/src/layouts/AppLayout.tsx` | create |
| `frontend/src/pages/FindGamePage.tsx` | create |
| `frontend/src/pages/HealthCheckPage.tsx` | create |
| `frontend/src/components/FilterBar.tsx` | create |
| `frontend/src/components/MatchCard.tsx` | create |
| `frontend/src/mocks/matches.ts` | create |
| `frontend/src/api/health.ts` | unchanged, reused by `HealthCheckPage` |

Kept deliberately flat (no `features/` folders, no barrel files, no separate `types/` dir yet) — appropriate for a solo dev at pre-MVP stage; revisit once a real `src/api/matches.ts` exists and types need sharing.

## Verification

1. `docker compose exec vite npm install tailwindcss@^4.3.3 @tailwindcss/vite@^4.3.3 react-router@^8.4.0` — installs into the named volume.
2. Vite should hot-reload on its own after `vite.config.ts` changes; if not, `docker compose restart vite`.
3. In the browser at `http://localhost:5173`:
   - `/` shows "Find a Game" with header nav, 3 rows of filter chips, and 4 mock match cards; clicking chips visibly filters the list (e.g. "Singles" narrows to the one singles match).
   - The full-capacity match shows a disabled gray "Full" button instead of green "Join".
   - Narrow the viewport (phone width) — single column, no horizontal scroll, chips wrap.
   - Click "Dev Health" nav link → navigates to `/dev/health` without a full reload, still shows live JSON from `/api/ping` (proves nginx/Laravel/Postgres chain still works).
   - Inspect an element's computed styles in DevTools to confirm Tailwind utilities are actually applying, not just present as class strings.
4. Edit a string in `FilterBar.tsx` and save — confirm HMR updates the browser without a full reload or losing filter state.
5. `docker compose exec vite npm run build` — confirms `tsc -b` passes (catches `verbatimModuleSyntax`/`erasableSyntaxOnly` violations) and the production Vite build succeeds with the Tailwind plugin.
6. `docker compose exec vite npm run lint` (oxlint) — no new lint errors.

claude --resume 28d44457-2c81-4be7-8cca-b42616f916b5

claude --resume 1ac85119-94e5-409e-8dbc-4d34dcd21da6