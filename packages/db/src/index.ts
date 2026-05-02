import { type DrizzleD1Database, drizzle } from "drizzle-orm/d1";
import * as schema from "./schemas";

export function makeDBClient(d1: D1Database): DrizzleD1Database<typeof schema> {
  return drizzle(d1, { schema });
}

export type DB = ReturnType<typeof makeDBClient>;

export { schema };
