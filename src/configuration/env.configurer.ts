import dotenv from "dotenv";

dotenv.config();

if (!process.env.PORT) {
	process.exit(1);
}

export const PORT = process.env.PORT;
