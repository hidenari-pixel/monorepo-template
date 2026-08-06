import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: [
      "./apps/bff/vitest.config.ts",
      "./apps/web/vitest.config.ts",
      "./packages/ui/vitest.config.ts",
    ],
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json-summary", "html"],
      reportsDirectory: "./coverage",
      include: ["apps/*/src/**/*.{ts,tsx}", "packages/*/src/**/*.{ts,tsx}"],
      exclude: [
        "**/*.d.ts",
        "**/*.stories.tsx",
        "**/*.test.{ts,tsx}",
        "apps/web/src/routeTree.gen.ts",
      ],
    },
  },
});
