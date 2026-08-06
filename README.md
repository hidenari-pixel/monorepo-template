# Monorepo Template

`TypeScript 7 + pnpm workspaces + Turborepo` によるモノレポテンプレート。
pnpmとnodeのバージョンは `mise` で管理しています。

## Tech Stack

| Layer    | Technology                                 |
| -------- | ------------------------------------------ |
| Frontend | TanStack Start (React SPA)                 |
| Backend  | Hono                                       |
| UI       | shadcn/ui + Tailwind CSS v4                |
| Infra    | SST v4 + Cloudflare                        |
| Tools    | Oxlint, Oxfmt, Vitest, Storybook, Lefthook |

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

# Install the browser used by UI tests
pnpm --filter @acme/ui exec playwright install chromium

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

| Command              | Description                        |
| -------------------- | ---------------------------------- |
| `pnpm dev`           | Start all dev servers              |
| `pnpm build`         | Build all packages                 |
| `pnpm typecheck`     | Run type checking                  |
| `pnpm test`          | Run all Vitest projects            |
| `pnpm test:watch`    | Run tests in watch mode            |
| `pnpm test:coverage` | Run tests with coverage            |
| `pnpm format`        | Check formatting with Oxfmt        |
| `pnpm format:fix`    | Format files with Oxfmt            |
| `pnpm lint`          | Lint with Oxlint                   |
| `pnpm lint:fix`      | Fix lint issues with Oxlint        |
| `pnpm knip`          | Find unused files and dependencies |
| `pnpm deps:check`    | Check BFF dependency boundaries    |
| `pnpm check`         | Run all quality checks             |

## Quality gates

- Vitest Projects runs the BFF, web, and UI test environments from the root.
- BFF tests run in the Cloudflare Workers runtime with an isolated D1 database.
- UI tests run in Chromium using Vitest Browser Mode and Playwright.
- Lefthook formats and lints staged files before commit, then runs affected typechecks and tests before push.
- Knip detects unused code and dependencies, while dependency-cruiser enforces BFF architecture boundaries.
- Adding the `trigger-ci` label to a pull request runs formatting, linting, typechecking, tests, static checks, and builds in GitHub Actions.
- Renovate groups related dependency updates and maintains the pnpm catalog.
