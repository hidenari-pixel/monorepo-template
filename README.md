# Monorepo Template

`TypeScript 7 + pnpm workspaces + Turborepo` によるモノレポテンプレート。
pnpmとnodeのバージョンは `mise` で管理しています。

## Tech Stack

| Layer    | Technology                  |
| -------- | --------------------------- |
| Frontend | TanStack Start (React SPA)  |
| Backend  | Hono                        |
| UI       | shadcn/ui + Tailwind CSS v4 |
| Infra    | SST v4 + Cloudflare         |
| Tools    | Oxlint, Oxfmt, Storybook    |

## Structure

```
apps/
  web/          # Frontend (TanStack Start SPA)
  bff/          # Backend for Frontend (Hono)
packages/
  ui/           # Shared UI components (shadcn/ui)
  common/       # Shared types & utilities
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
pnpm sst:deploy --stage dev

# Deploy to production
pnpm sst:deploy --stage prd
```

Requires Cloudflare API token. Run `npx sst install` for initial setup.

### Migrating an existing SST v3 stage

SST v4 state migration is one-way. Review and migrate each deployed stage before deploying it with v4:

```bash
cd infra
pnpm sst:diff --stage <stage>
pnpm sst:refresh --stage <stage>
pnpm sst:deploy --stage <stage>
```

## Commands

| Command           | Description                 |
| ----------------- | --------------------------- |
| `pnpm dev`        | Start all dev servers       |
| `pnpm build`      | Build all packages          |
| `pnpm typecheck`  | Run type checking           |
| `pnpm format`     | Check formatting with Oxfmt |
| `pnpm format:fix` | Format files with Oxfmt     |
| `pnpm lint`       | Lint with Oxlint            |
| `pnpm lint:fix`   | Fix lint issues with Oxlint |
