import { Context } from "koa";
import Koa from "koa";
import { PublicController } from "../controllers/PublicController";
import Router from "@koa/router";

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
		this.router.get("/iconrequests", this.controller.getIconRequests);

		/*
		 * @GET(/api/iconrequests/count)
		 * Returns the total number of
		 * icon requests
		 */
		this.router.get("/iconrequests/count", this.controller.getCount);

		/*
		 * @GET(/api/iconrequests/auth)
		 *	Checks if passsword is valid
		 */
		this.router.post("/iconrequests/auth", this.controller.verifyPassword);
	}
}
