import { Pool } from "pg";
import * as schema from "../../../database/schema";
import { drizzle } from "drizzle-orm/node-postgres";

export const connection = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const postgres = drizzle(connection, { schema });
