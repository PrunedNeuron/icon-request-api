import { DB_HOST, DB_PASS, DB_PORT } from "./env.configurer";
import dotenv from "dotenv";

dotenv.config();

if (
	!process.env.PORT ||
	!process.env.DB_HOST ||
	!process.env.DB_USER ||
	!process.env.DB_PASS ||
	!process.env.DB_PORT ||
	!process.env.DB_DATABASE
) {
	process.exit(1);
}

export const PORT = process.env.PORT;
export const DB_HOST = process.env.DB_HOST;
export const DB_USER = process.env.DB_USER;
export const DB_PASS = process.env.DB_PASS;
export const DB_PORT = process.env.DB_PORT;
export const DB_DATABASE = process.env.DB_DATABASE;
