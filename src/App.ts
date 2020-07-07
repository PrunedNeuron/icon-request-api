import Koa from "koa";

import bodyParser from "koa-bodyparser";
import helmet from "koa-helmet";
import cors from "@koa/cors";
import compression from "koa-compress";
import { Router } from "./routes/Router";

export class App {
	app: Koa;
	router: Router;

	constructor() {
		this.app = new Koa();
		this.attachMiddleware();
		this.router = new Router(this.app);
	}

	private attachMiddleware(): void {
		this.app.use(compression());
		this.app.use(bodyParser());
		this.app.use(helmet());
		this.app.use(cors());
	}
}
