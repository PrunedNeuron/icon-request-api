import Koa from "koa";
import { PrivateRouter } from "./PrivateRouter";
import { PublicRouter } from "./PublicRouter";

export class Router {
	privateRouter: PrivateRouter;
	publicRouter: PublicRouter;

	constructor(app: Koa) {
		this.privateRouter = new PrivateRouter(app);
		this.publicRouter = new PublicRouter(app);
	}

	public attachRoutes(app: Koa) {
		this.privateRouter.attachRoutes(app);
		this.publicRouter.attachRoutes(app);
	}
}
