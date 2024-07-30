import "dotenv/config";
import { postgres, connection } from "@/lib/postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";

(async () => {
  // This will run migrations on the database, skipping the ones already applied
  await migrate(postgres , { migrationsFolder: "./database/migrations" });

  // Don't forget to close the connection, otherwise the script will hang
  await connection.end();
})();
