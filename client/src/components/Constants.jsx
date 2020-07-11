import { createMuiTheme } from "@material-ui/core";

export const PrimaryTheme = createMuiTheme({
	palette: {
		primary: {
			main: "#2196f3"
		}
	}
});

export const SecondaryTheme = createMuiTheme({
	palette: {
		primary: {
			main: "#11cb5f"
		}
	}
});

export const env = process.env.NODE_ENV || "development";
export const isProduction = env == "production" ? true : false;

export const PORT = 3000;
export const BASE_URL = isProduction
	? "https://ayushm.dev/api"
	: `http://localhost:${PORT}`;
export const API_KEY = "so9ZcJc1jm";
