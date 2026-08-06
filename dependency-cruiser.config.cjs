/** @type {import("dependency-cruiser").IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: "no-circular",
      severity: "error",
      comment: "循環依存はレイヤー境界と変更容易性を損なうため禁止する。",
      from: { path: "^apps/bff/src" },
      to: { circular: true },
    },
    {
      name: "domain-does-not-depend-on-outer-layers",
      severity: "error",
      comment: "domainはフレームワークや外側のレイヤーへ依存しない。",
      from: { path: "^apps/bff/src/domain" },
      to: {
        path: [
          "^apps/bff/src/(usecase|infrastructure|interface|runtime|routes|middlewares)",
          "^node_modules/(hono|drizzle-orm|wrangler|@cloudflare)",
        ],
      },
    },
    {
      name: "usecase-does-not-depend-on-adapters",
      severity: "error",
      comment: "usecaseはinfrastructure、HTTP、Cloudflare、DBの詳細へ依存しない。",
      from: { path: "^apps/bff/src/usecase" },
      to: {
        path: [
          "^apps/bff/src/(infrastructure|interface|runtime|routes|middlewares)",
          "^node_modules/(hono|drizzle-orm|wrangler|@cloudflare)",
        ],
      },
    },
  ],
  options: {
    doNotFollow: { path: "node_modules" },
    parser: "swc",
  },
};
