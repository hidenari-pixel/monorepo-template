import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";

async function executeMigration() {
	const client = createClient({ url: "file:local.db" });
	const db = drizzle(client);
	await migrate(db, { migrationsFolder: "./migrations" });
	client.close();
}

executeMigration()
	.then(() => {
		console.log("Migration completed");
		process.exit(0);
	})
	.catch((error) => {
		console.error("Migration failed", error);
		process.exit(1);
	});
