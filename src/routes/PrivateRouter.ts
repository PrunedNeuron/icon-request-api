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
		 * @PUT(/api/iconrequests)
		 * Takes a JSON object of type { component: string, status: string }
		 * as request and updates the status for the icon request
		 * with the corresponding id.
		 * Returns the status and message associated with the outcome.
		 */
		this.router.put(
			"/requests/update/component",
			this.controller.updateIconRequestStatus
		);

		/*
		 * @GET(/api/iconrequests/count)
		 * Returns the total number of icon requests
		 * in the database.
		 */
		this.router.get("/requests/count", this.controller.getCount);

		/*
		 * @GET(/api/iconrequests/count/pending)
		 * Returns the number of icon requests
		 * that are still pending.
		 */
		this.router.get(
			"/requests/count/pending",
			this.controller.getPendingCount
		);

		/*
		 * @GET(/api/iconrequests/count/done)
		 * Returns the number of icon requests
		 * that are marked as done.
		 */
		this.router.get("/requests/count/done", this.controller.getDoneCount);

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
			.get("/requests/:offset/:limit", this.controller.getIconRequests)
			.post("/requests", this.controller.addIconRequests);

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
