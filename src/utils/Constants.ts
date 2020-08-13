export const env = process.env.NODE_ENV || "development";
// export const isProduction = env == "production" ? true : false;

export const isProduction = true;
export const PORT = 3000;
export const BASE_URL = true
	? "https://ayushm.dev/api"
	: `http://localhost:${PORT}`;
export const API_KEY = "so9ZcJc1jm";
