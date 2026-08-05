import { drizzle } from "drizzle-orm/d1";
import { getPlatformProxy } from "wrangler";

import { users } from "../src/schemas";

type Env = {
  DB: D1Database;
};

async function seed() {
  const proxy = await getPlatformProxy<Env>();
  const db = drizzle(proxy.env.DB);

  await db
    .insert(users)
    .values([
      { id: "1", email: "alice@example.com", name: "Alice" },
      { id: "2", email: "bob@example.com", name: "Bob" },
    ])
    .onConflictDoNothing();

  await proxy.dispose();
}

seed()
  .then(() => {
    console.log("Seed completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seed failed", error);
    process.exit(1);
  });
