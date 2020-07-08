import Koa from "koa";
import Router from "@koa/router";
import { PublicController } from "../controllers/PublicController";
import { Context } from "koa";

export class PublicRouter {
	router: Router;
	controller: PublicController;

	constructor(app: Koa) {
		console.log("In public router");
		this.router = new Router();
		this.controller = new PublicController();
		this.setPublicRoutes();
		this.attachRoutes(app);
	}

	public attachRoutes(app: Koa) {
		app.use(this.router.routes());
		app.use(this.router.allowedMethods());
	}

	async setPublicRoutes() {
		// These routes are accessible by everyone.

		console.log("Setting public routes...");

		/*
		 * @GET(/api/iconrequests)
		 * Returns a list of distinct icon requests
		 * sorted by popularity in descending order.
		 */
		this.router.get("/api/iconrequests", this.controller.getIconRequests);

		/*
		 * @GET(/api/iconrequests)
		 * Returns a list of distinct icon requests
		 * sorted by popularity in descending order.
		 */
		this.router.get("/api/iconrequests/count", this.controller.getCount);

		this.router.all("/", function (ctx: Context) {
			ctx.body = "Routing from /.";
		});
	}
}
