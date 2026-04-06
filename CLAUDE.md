# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Oser Réussir is a fullstack monorepo for a French coaching school platform (coaching scolaire). Three services:

- **frontend/** — Nuxt 4 (Vue 3, TypeScript, SCSS) — public one-pager website — port 3000
- **backoffice/** — Vue 3 + Vite + shadcn-vue + Tailwind v4 + SCSS — admin dashboard — port 3001
- **backend/** — NestJS 10 + TypeORM + PostgreSQL 16 — REST API with JWT auth — port 4000

## Development Commands

### Start all services (Docker)
```bash
cp .env.example .env   # first time only
docker compose up --build
```

### Individual service commands (run from service directory)

**Backend** (`cd backend`):
```bash
npm run start:dev          # dev server with watch
npm run build              # production build
npm run lint               # eslint with auto-fix
npm run test               # jest unit tests
npm run test:watch         # jest in watch mode
npm run test:e2e           # e2e tests
npm run migration:generate -- -n MigrationName
npm run migration:run
npm run migration:revert
```

**Frontend** (`cd frontend`):
```bash
npm run dev                # nuxt dev server
npm run build              # nuxt production build
npm run typecheck          # vue-tsc type checking
```

**Backoffice** (`cd backoffice`):
```bash
npm run dev                # vite dev server
npm run build              # vue-tsc --noEmit && vite build
npm run typecheck          # vue-tsc --noEmit
```

### Docker utilities
```bash
docker compose logs -f <service>        # follow logs
docker compose up --build <service>     # rebuild single service
```

## Architecture

### Backend (NestJS)

- Entry: `backend/src/main.ts` — bootstraps with global ValidationPipe, Swagger (dev), CORS
- Root module: `backend/src/app.module.ts` — ConfigModule with Joi validation, TypeORM async config
- Feature modules go in `backend/src/modules/` — entities at `modules/**/*.entity.ts`
- Shared code in `backend/src/common/` (health controller lives here)
- TypeORM config: `backend/src/config/typeorm.config.ts` — synchronize is **false**, use migrations
- Path aliases: `@common/*`, `@modules/*`, `@config/*`
- Swagger docs at `/api/docs` in development
- Health check at `GET /health`

### Frontend (Nuxt 4)

- Source in `frontend/app/` (Nuxt 4 srcDir convention)
- Single page site with section components (`SectionHero`, `SectionValeurs`, `SectionApropos`, etc.)
- Layout: `app/layouts/default.vue` with `TheNavbar` and `TheFooter`
- Pinia store: `app/stores/app.ts`
- Composable: `app/composables/useScrollReveal.ts` for scroll animations
- Styles: SCSS in `app/assets/styles/main.scss`
- Fonts: Playfair Display (headings) + Nunito (body) via Google Fonts
- API base URL via `NUXT_PUBLIC_API_BASE` runtime config

### Backoffice (Vue 3 + Vite)

- UI components: shadcn-vue (reka-ui primitives) + Tailwind v4
- Icons: lucide-vue-next
- Vite proxy: `/api` requests forwarded to backend:4000
- Path alias: `@` → `src/`
- Views map to CMS-like sections for editing site content
- SCSS variables in `src/assets/styles/_variables.scss`
- Tailwind styles in `src/assets/styles/tailwind.css`

### Shared Patterns

- All services use strict TypeScript
- All services run in Docker with hot-reload in dev
- Production: multi-stage Docker builds, Traefik reverse proxy with SSL (docker-compose.prod.yml)
- Backoffice production serves via Nginx with SPA fallback

## Environment Variables

See `.env.example` for all required variables. Key ones:
- `DATABASE_URL` — PostgreSQL connection string
- `JWT_SECRET` — min 32 chars for JWT signing
- `CORS_ORIGINS` — comma-separated allowed origins
- `NUXT_PUBLIC_API_BASE` — backend URL for frontend
- `VITE_API_BASE_URL` — backend URL for backoffice

## Language

The project targets a French audience. UI content, labels, and user-facing text should be in French.
