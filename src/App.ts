import express from "express";
import helmet from "helmet";
import cors from "cors";
import { Router } from "./routes/Router";
import compression from "compression";

export class App {
	public app: express.Application;
	public router: Router;

	constructor() {
		this.app = express();
		this.attachMiddleware();

		// This statement will set both private and public routes for "app"
		this.router = new Router(this.app);
	}

	private attachMiddleware(): void {
		this.app.use(compression());
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(helmet());
		this.app.use(cors());
	}
}
