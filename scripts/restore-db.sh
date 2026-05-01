#!/usr/bin/env sh
set -e

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
LOCAL_D1_DIR="${ROOT_DIR}/apps/bff/.wrangler/state/v3/d1"

echo "==> Removing local D1 storage at ${LOCAL_D1_DIR}"
rm -rf "${LOCAL_D1_DIR}"

echo "==> Generating migrations from schema"
pnpm --filter @acme/db generate

echo "==> Applying migrations to local D1"
pnpm --filter bff db:migrate:local

echo "==> Seeding local D1"
pnpm --filter bff db:seed:local

echo "==> Database restored"
