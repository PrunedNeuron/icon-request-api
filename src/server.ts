import { DB_HOST } from "./configuration/env.configurer";
import app from "./app";

export const server = app.listen(process.env.PORT, () => {
	console.log(
		`Express server running on http://${DB_HOST}:${process.env.PORT}`
	);
});
