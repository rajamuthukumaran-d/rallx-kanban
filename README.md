# Rallx Kanban

A responsive developer-console Kanban PWA built with Next.js App Router and TypeScript. The current frontend runs on local mock state so the board is useful before a backend is provisioned.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000. Use `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build` for the quality gate.

## Architecture

`app/` is the App Router shell, `components/kanban-app.tsx` owns interactive board state, and `lib/mock-data.ts` is the replaceable local repository boundary. `prisma/schema.prisma` defines tenant-scoped persistence primitives for the planned PostgreSQL service layer. Auth/OIDC, GitHub and MCP secrets are deployment-only placeholders in `.env.example`.

The UI deliberately keeps private data out of the service worker cache; only the app shell and public assets are cached.
