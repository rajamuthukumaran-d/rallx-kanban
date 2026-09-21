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
# Optional container check (requires Docker and POSTGRES_PASSWORD/AUTH_SECRET):
docker compose config
docker build -t rallx-kanban .
```

For a local database, copy `.env.example` to `.env`, set non-production development values, then run `npx prisma migrate dev --name init` before adding a database-backed service layer. Compose intentionally requires `POSTGRES_PASSWORD` and `AUTH_SECRET`; it does not contain real credentials.

## Architecture and limitations

`app/` is the App Router shell, `components/kanban-app.tsx` owns interactive board state, and `lib/mock-data.ts` is the replaceable local repository boundary. `prisma/schema.prisma` defines tenant-scoped persistence primitives for the planned PostgreSQL service layer, including membership, lifecycle/versioned tickets, discussions, files, audit history, integrations, identity providers, MCP token hashes, and GitHub sync metadata.

Archive/restore/delete and comments currently update local browser state only and reset on refresh. GitHub, OIDC/Auth, and MCP settings are explicitly labelled scaffolded/not connected. The service worker uses an allowlisted public shell cache and bypasses API, auth, and attachment paths; it is not an offline data store.
