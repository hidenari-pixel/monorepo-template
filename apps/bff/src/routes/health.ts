import type { DB } from "@acme/db";
import { Data, Effect } from "effect";
import { Hono } from "hono";

import type { HonoEnv } from "../types";

const app = new Hono<HonoEnv>();

class FindUsersError extends Data.TaggedError("FindUsersError")<{
  cause: unknown;
}> {}

const findUsers = Effect.fn("findUsers")((db: DB) =>
  Effect.tryPromise({
    try: () => db.query.users.findMany(),
    catch: (cause) => new FindUsersError({ cause }),
  }),
);

app.get("/", async (c) => {
  const db = c.get("db");
  const users = await Effect.runPromise(findUsers(db));

  return c.json({
    status: "ok",
    users,
  });
});

export default app;
