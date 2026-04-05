# Oser Réussir — Monorepo Fullstack

## Stack
- **Frontend** : Nuxt 4 (Vue 3, TypeScript, SCSS) — port 3000
- **Backoffice** : Vue 3 + Vite + shadcn-vue + Tailwind v4 + SCSS — port 3001
- **Backend** : NestJS + TypeORM — port 4000
- **Base de données** : PostgreSQL 16 — port 5432

## Démarrage rapide (dev)

```bash
cp .env.example .env
docker compose up --build
```

## Commandes utiles

```bash
# Logs d'un service
docker compose logs -f frontend

# Rebuild d'un seul service
docker compose up --build backend

# Prod (simulation locale)
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build
```

## Structure
- `frontend/` — Nuxt 4, srcDir = app/
- `backoffice/` — Vue 3 + Vite + shadcn-vue
- `backend/` — NestJS + TypeORM
