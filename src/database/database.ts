import { Pool } from "pg";

export const pool: Pool = new Pool({
	user: "ayush",
	password: "ayush",
	host: "localhost",
	port: 5432,
	database: "amphetamine"
});
