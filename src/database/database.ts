import {
	DB_DATABASE,
	DB_HOST,
	DB_PASSWORD,
	DB_PORT,
	DB_USER
} from "../configuration/env.configurer";

import { Pool } from "pg";

const isProduction = process.env.NODE_ENV === "production";

export const connectionURI = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
console.log("Connection URI = " + connectionURI);

console.log("isProduction = " + isProduction)

/* export const pool: Pool = new Pool({
	user: DB_USER,
	password: DB_PASS,
	host: DB_HOST,
	port: parseInt(DB_PORT),
	database: DB_DATABASE
}); */

export const pool = new Pool(
	{
		connectionString: isProduction
			? process.env.DATABASE_URL
			: connectionURI,
		ssl: isProduction ? { rejectUnauthorized: isProduction } : isProduction
	}
	//isProduction
);
