import type { DB } from "@acme/db";

export type HonoEnv = {
	Bindings: {
		DB: D1Database;
	};
	Variables: {
		db: DB;
	};
};
