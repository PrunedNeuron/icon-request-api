import { Logger } from "./logger/logger";
import { Router } from "./middleware/router/router";
import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import path from "path";
import rateLimit from "express-rate-limit";

const isProduction = process.env.NODE_ENV === "production";
/* 
const origin = {
	origin: isProduction ? "https://ayushm.dev" : "*"
}; 
*/

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute
	max: isProduction ? 60 : 1000 // 60 Requests during production / 1000 during development
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
		this.attachMiddleware();
		this.logger = new Logger();
		this.router = new Router();
		this.router.routes(this.app);
	}

	private attachMiddleware(): void {
		this.compress();
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(cors());
		this.app.use(helmet());
		this.app.use(limiter);
		console.log(path.join(__dirname, "../client/public"));
		this.app.use(express.static(path.join(__dirname, "../client/public")));
		this.app.use(
			express.static(path.join(__dirname, "../client/amphetamine/main"))
		);

		if (isProduction) {
			// Serve static content
			// npm run build / yarn build
			this.app.use(express.static(path.join(__dirname, "client/public")));
			console.log("Dirname = " + __dirname);
		}
	}
	private compress() {
		const shouldCompress = (req, res) => {
			if (req.headers["x-no-compression"]) {
				// don't compress responses if this request header is present
				return false;
			}

			// fallback to standard compression
			return compression.filter(req, res);
		};
		this.app.use(
			compression({
				filter: shouldCompress,
				threshold: 0 // kB
			})
		);
	}
}

export default new App().app;
