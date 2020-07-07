import Koa from "koa";
import { PrivateController } from "../controllers/PrivateController";
import Router from "@koa/router";

export class PrivateRouter {
	router: Router;
	controller: PrivateController;

	constructor(app: Koa) {
		this.router = new Router();
		this.controller = new PrivateController();
		this.setPrivateRoutes();
		this.attachRoutes(app);
	}

	public attachRoutes(app: Koa) {
		app.use(this.router.routes());
		app.use(this.router.allowedMethods());
	}

	async setPrivateRoutes() {
		console.log("Setting private routes...");

		/*
		 * @GET(/api/iconrequests)
		 * Returns a list of distinct icon requests
		 * sorted by popularity in descending order.
		 * *
		 * @POST(/api/iconrequests)
		 * Takes a JSON object of type IconRequest as request
		 * and adds it to the database.
		 * Returns the status and message associated with the outcome.
		 *
		 */

		this.router
			.get("/api/requests", this.controller.getIconRequests)
			.post("/api/requests", this.controller.addIconRequests);

		/*
		 * @PUT(/api/iconrequests)
		 * Takes a JSON object of type { id: number, status: "" }
		 * as request and updates the status for the icon request
		 * with the corresponding id.
		 * Returns the status and message associated with the outcome.
		 */
		this.router.put(
			"/api/requests/update/component",
			this.controller.updateIconRequestStatus
		);

		/*
		 * @GET(/api/iconrequests)
		 * Returns a list of distinct icon requests
		 * sorted by popularity in descending order.
		 */
		this.router.get("/api/requests/count", this.controller.getCount);

		/*
		 * !!!DEPRECATED
		 * @POST (/amphetamine/api/v1)
		 * Same functionality as @POST(/api/requests)
		 */
		this.router.post(
			"/amphetamine/api/v1",
			this.controller.addIconRequests
		);
	}
}
