import { Hono } from "hono";

import { dbMiddleware } from "./middlewares/db";
import health from "./routes/health";
import type { HonoEnv } from "./types";

const app = new Hono<HonoEnv>();

app.use(dbMiddleware);

app.route("/health", health);

export default app;
