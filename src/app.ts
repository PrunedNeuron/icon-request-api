import { Logger } from "./logger/logger";
import { Router } from "./middleware/router/router";
import cors from "cors";
import express from "express";

class App {
	public app: express.Application;
	public logger: Logger;
	public router: Router;

	constructor() {
		this.app = express();
		this.logger = new Logger();
		this.attachMiddleware();
		this.router = new Router();
		this.router.routes(this.app);
	}

	private attachMiddleware(): void {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(cors());
	}
}

export default new App().app;
