import { Hono } from "hono";
import type { HonoEnv } from "../types";

const app = new Hono<HonoEnv>();

app.get("/", async (c) => {
  const db = c.get("db");
  const users = await db.query.users.findMany();

  return c.json({
    status: "ok",
    users,
  });
});

export default app;
