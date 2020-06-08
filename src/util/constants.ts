import * as environment from "dotenv";

environment.config();

export const PORT = process.env.PORT;
export const NODE_ENV = process.env.NODE_ENV;
