# Monorepo Template

`TypeScript + pnpm workspaces + Turborepo` によるモノレポテンプレート。
pnpmとnodeのバージョンは `mise` で管理しています。

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | TanStack Start (React SPA) |
| Backend | Hono |
| UI | shadcn/ui + Tailwind CSS v4 |
| Infra | SST v3 + Cloudflare |
| Tools | Biome, Storybook |

## Structure

```
apps/
  web/          # Frontend (TanStack Start SPA)
  bff/          # Backend for Frontend (Hono)
packages/
  ui/           # Shared UI components (shadcn/ui)
  common/       # Shared types & utilities
  biome/        # Shared Biome config
infra/          # SST deployment config
```

## Setup

```bash
# Install tools
mise install

# Install dependencies
pnpm install

# Start development servers
pnpm dev
```

## Development

```bash
# Web only
cd apps/web && pnpm dev

# BFF only
cd apps/bff && pnpm dev

# Storybook
cd packages/ui && pnpm sb:dev
```

## Deployment

```bash
cd infra

# Deploy to dev
pnpm deploy:dev

# Deploy to production
pnpm deploy:prd
```

Requires Cloudflare API token. Run `npx sst install` for initial setup.

## Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all dev servers |
| `pnpm build` | Build all packages |
| `pnpm typecheck` | Run type checking |
| `pnpm format-and-lint` | Run Biome |
| `pnpm format-and-lint:fix` | Fix lint issues |
