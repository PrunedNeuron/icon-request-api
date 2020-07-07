import "reflect-metadata";
import Koa from "koa";
import { createConnection } from "typeorm";
import { App } from "./App";
import { PORT } from "./utils/Constants";

createConnection().then(async (connection) => {
	
	const app: Koa = new App().app;

	app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
});
