import { makeDBClient } from "@acme/db";
import { createMiddleware } from "hono/factory";

import type { HonoEnv } from "../types";

export const dbMiddleware = createMiddleware<HonoEnv>(async (c, next) => {
  c.set("db", makeDBClient(c.env.DB));
  await next();
});
