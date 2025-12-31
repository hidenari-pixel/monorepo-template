export function createWebStack({ bff }: { bff: sst.cloudflare.Worker }) {
  const web = new sst.cloudflare.StaticSite(`Web-${$app.stage}`, {
    path: "../apps/web",
    build: {
      command: "pnpm run build",
      output: "dist/client",
    },
    environment: {
      VITE_API_URL: bff.url.apply((url) => url ?? ""),
    },
  });

  return web;
}