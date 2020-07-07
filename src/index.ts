import "reflect-metadata";
import * as express from "express";
import { createConnection, Repository } from "typeorm";
import { App } from "./App";
import { IconRequest } from "./models/IconRequest";

createConnection().then(async (connection) => {
	const iconRequestRepository: Repository<IconRequest> = connection.getRepository(
		IconRequest
	);
	console.log("Repository = " + iconRequestRepository);
	const app: express.Application = new App().app;

	app.listen(3000, () => {
		console.log("Running on http://localhost:3000");
	});
});
