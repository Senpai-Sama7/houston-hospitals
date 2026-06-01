# Houston Medical Analytics — AGENTS.md

## Project map

This repo has **3 separate implementations** of the same hospital comparison app:

| Directory | Stack | Status |
|-----------|-------|--------|
| `app/` | React 19 + Vite 7 + TS 5.9 + shadcn/ui + Tailwind 3 | **active** |
| `workspace-.../` | Next.js 16 + Prisma/SQLite + Bun + z-ai-web-dev-sdk | enhanced version |
| `OKComputer_.../` | Pre-built static site | archive |
| Root `*.tsx` files | Standalone earlier iterations | archive |

The `app/` directory is the canonical source of truth. Workspace is a separate enhanced experiment.

## Commands (app/)

All work in `app/`:

- `npm run dev` — Vite dev server on port 3000
- `npm run build` — runs `tsc -b` (typecheck) **then** `vite build`; both must pass
- `npm run lint` — ESLint flat config (`eslint.config.js`)
- `npm run preview` — Vite preview of production build

**IMPORTANT: `build` runs `tsc -b` first.** If the typecheck fails, the build fails. Run `lint` before `build` to avoid wasted cycles. Order: `lint → build`.

## Commands (workspace-.../)

- `npm run dev` — `next dev -p 3000 | tee dev.log`
- `npm run build` — `next build && cp ...` (custom standalone output)
- `npm run start` — `bun .next/standalone/server.js` (uses Bun, not Node)
- `npm run lint` — ESLint
- `npm run db:push`, `db:generate`, `db:migrate`, `db:reset` — Prisma commands

## Architecture quirks

- **No automated tests.** 0% coverage. No test framework installed. Do not add — would be adding from scratch.
- **Data is entirely hardcoded.** Primary app: `app/src/data/hospitals.ts` (6 hospitals). Workspace: `src/lib/hospital-data.ts` (8 hospitals). Scores are synthetic composites. Sources are narrative strings, not live URLs.
- **State:** React `useState` + `useLocalStorage`; no Zustand/Redux. Props are drilled through 2-3 levels.
- **Path alias:** `@/` → `./src/` in both apps (tsconfig paths + vite resolve).
- **shadcn/ui:** "new-york" style, `rsc: false`, lucide icons. Components in `src/components/ui/` (53 components).
- **kimi-plugin-inspect-react** is loaded as a Vite plugin (dev-only, adds React component inspection attributes).

## Workspace-specific quirks

- `typescript.ignoreBuildErrors: true` and `reactStrictMode: false` in next.config.ts
- Prisma schema has a generic `User`/`Post` model (not hospital-related — unused scaffolding)
- `.env` has `DATABASE_URL` pointing to an absolute path (`file:/home/z/my-project/db/custom.db`) — **will not work on this machine**
- Tailwind v4 (app uses v3.4.19)
- AI features (`/api/recommend`, `/api/search`) use `z-ai-web-dev-sdk` — API keys required

## Project status

- Prototype/demo, not production-ready
- No CI, no pre-commit hooks, no deployment config
- No SSR, no auth, no API layer (in primary app)
- No formatter config (Prettier not installed)
