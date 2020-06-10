"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = exports.connectionURI = void 0;
const env_configurer_1 = require("../configuration/env.configurer");
const pg_1 = require("pg");
const isProduction = process.env.NODE_ENV === "production";
exports.connectionURI = `postgresql://${env_configurer_1.DB_USER}:${env_configurer_1.DB_PASSWORD}@${env_configurer_1.DB_HOST}:${env_configurer_1.DB_PORT}/${env_configurer_1.DB_DATABASE}`;
console.log("Connection URI = " + exports.connectionURI);
/* export const pool: Pool = new Pool({
    user: DB_USER,
    password: DB_PASS,
    host: DB_HOST,
    port: parseInt(DB_PORT),
    database: DB_DATABASE
}); */
exports.pool = new pg_1.Pool({
    connectionString: isProduction
        ? process.env.DATABASE_URL
        : exports.connectionURI,
    ssl: isProduction ? { rejectUnauthorized: isProduction } : isProduction
}
//isProduction
);
//# sourceMappingURL=database.js.map