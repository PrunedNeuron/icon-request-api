import * as dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") dotenv.config();

export const DB_HOST = process.env.DB_HOST;
export const DB_USER = process.env.DB_USER;
export const DB_PASS = process.env.DB_PASS;
export const DB_PORT = process.env.DB_PORT;
export const DB_DATABASE = process.env.DB_DATABASE;
export const DEV_PORT = process.env.DEV_PORT;
export const PORT = process.env.PORT == undefined ? DEV_PORT : process.env.PORT;

console.log(
	"PORT = " +
		PORT +
		", process.env.PORT = " +
		process.env.PORT +
		", DEV_PORT = " +
		DEV_PORT
);
