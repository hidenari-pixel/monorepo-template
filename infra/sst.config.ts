/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "notion-light",
      removal: input?.stage === "prd" ? "retain" : "remove",
      protect: ["prd"].includes(input?.stage),
      home: "cloudflare",
    };
  },
  async run() {
    const { createBffStack } = await import("./src/stacks/bff");
    const { createWebStack } = await import("./src/stacks/web");

    const bff = createBffStack();
    const web = createWebStack({ bff });

    return {
      bff: bff.url,
      web: web.url,
    };
  },
});
