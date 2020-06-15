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

console.log("isProduction = " + isProduction);

export const pool = new Pool({
	connectionString: process.env.DATABASE_URL || connectionURI,
	ssl: process.env.DATABASE_URL ? true : false
});
