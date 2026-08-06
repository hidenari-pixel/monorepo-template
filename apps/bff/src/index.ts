import { Hono } from "hono";

import health from "./interface/routes/health";
import { dbMiddleware } from "./middlewares/db";
import type { HonoEnv } from "./types";

const app = new Hono<HonoEnv>();

app.use(dbMiddleware);

app.route("/health", health);

export default app;
