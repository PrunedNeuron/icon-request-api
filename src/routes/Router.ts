import express from "express";
import { PrivateRouter } from "./PrivateRouter";
import { PublicRouter } from "./PublicRouter";

export class Router {
	privateRouter: PrivateRouter;
	publicRouter: PublicRouter;

	constructor(app: express.Application) {
		this.privateRouter = new PrivateRouter(app);
		this.publicRouter = new PublicRouter(app);
	}
}
