import {
	DB_DATABASE,
	DB_HOST,
	DB_PASS,
	DB_PORT,
	DB_USER
} from "../configuration/env.configurer";

import { Pool } from "pg";

const isProduction = process.env.NODE_ENV === "production";

const connectionURI = `postgresql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

/* export const pool: Pool = new Pool({
	user: DB_USER,
	password: DB_PASS,
	host: DB_HOST,
	port: parseInt(DB_PORT),
	database: DB_DATABASE
}); */

export const pool = new Pool({
	connectionString: isProduction ? process.env.DATABASE_URL : connectionURI,
	ssl: {
		rejectUnauthorized: false
	}
	//isProduction
});
