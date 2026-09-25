# Rallx Kanban

A responsive developer-console Kanban PWA built with Next.js App Router and TypeScript. The current frontend is a visual prototype backed by local in-memory mock state; no authentication, API, GitHub sync, MCP service, or durable ticket persistence is wired yet.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Verification

```bash
npm run prisma:validate
npm run lint
npm run typecheck
npm test
npm run build
# Optional container check (requires Docker, DATABASE_URL, POSTGRES_PASSWORD, and AUTH_SECRET):
docker compose config
docker build -t rallx-kanban .
```

For a local database, copy `.env.example` to `.env` and set non-production development values. The committed baseline is `prisma/migrations/0001_initial/migration.sql`; apply it with `npm run prisma:migrate:deploy` (or `npx prisma migrate dev` for local schema iteration). Compose requires an explicit `DATABASE_URL`, `POSTGRES_PASSWORD`, and `AUTH_SECRET`; set `DATABASE_URL` using the same `POSTGRES_USER` and `POSTGRES_DB` values as the database service, for example `postgresql://appuser:password@db:5432/rallx`.

### Release procedure

Run `docker compose build`, then apply migrations before starting the web process:

```bash
docker compose run --rm app ./node_modules/.bin/prisma migrate deploy
docker compose up -d
```

The compose `app` command also runs `prisma migrate deploy` before the standalone server starts. This is an explicit deployment step for the planned database service; the browser prototype itself does not run migrations or provide an API.

## Architecture and limitations

`app/` is the App Router shell, `components/kanban/` contains the interactive board components, and `lib/mock-data.ts` is the replaceable local repository boundary. The Prisma schema is split into `prisma/schema.prisma` for the generator/datasource and one model per file under `prisma/models/`. Child records carry `tenantId`; composite foreign keys bind projects, tickets, memberships, actors, and integrations to the same tenant. PostgreSQL constraints therefore reject cross-tenant references, but application authorization and a backend service are still required.

Archive/restore/delete and comments currently update local browser state only and reset on refresh. GitHub, OIDC/Auth, and MCP settings are explicitly labelled scaffolded/not connected. The service worker uses an allowlisted public shell cache and bypasses API, auth, and attachment paths; it is not an offline data store.
