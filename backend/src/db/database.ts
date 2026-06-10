import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";
import dotenv from "dotenv";
import type { DB } from "kysely-codegen";

dotenv.config({
	path: "./config/.env",
	override: true,
});

const dialect = new PostgresDialect({
	pool: new Pool({
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		port: 5432,
		max: 10,
	}),
});

export const db = new Kysely<DB>({
	dialect,
});
