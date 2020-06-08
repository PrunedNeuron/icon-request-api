import { PORT } from "./configuration/env.configurer";
import app from "./app";

export const server = app.listen(PORT, () => {
	console.log(`Express server running on http://localhost:${PORT}`);
});
