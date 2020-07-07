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

export const BASE_URL = "http://localhost:4000/api";
export const PUBLIC_URL = "http://localhost:4000/api/iconrequests";
export const API_KEY = "so9ZcJc1jm";