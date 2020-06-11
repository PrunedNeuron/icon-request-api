import { Logger } from "./logger/logger";
import { Router } from "./middleware/router/router";
import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const isProduction = process.env.NODE_ENV === "production";
/* 
const origin = {
	origin: isProduction ? "https://ayushm.dev" : "*"
}; 
*/

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute
	max: isProduction ? 5 : 1000 // 5 Requests
});

// Rate limit specific endpoint:

/* 
const postLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 1,
})

app.post('/books', postLimiter, addBook)
 */

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
		this.app.use(compression());
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(cors());
		this.app.use(helmet());
		this.app.use(limiter);
	}
}

export default new App().app;
