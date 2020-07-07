import express from "express";
import { PublicController } from "../controllers/PublicController";

export class PublicRouter {
	router: express.Router;
	controller: PublicController;

	constructor(app: express.Application) {
		this.router = express.Router();
		this.controller = new PublicController();
		this.setPublicRoutes(app);
	}

	setPublicRoutes(app: express.Application) {
		// These routes are accessible by everyone.

		console.log("Setting public routes...");

		/*
		 * @GET(/api/iconrequests)
		 * Returns a list of distinct icon requests
		 * sorted by popularity in descending order.
		 */
		app.route("/api/iconrequests").get(
			this.controller.getAllDistinctIconRequests
		);

		/*
		 * @GET(/api/iconrequests/:offset/:limit)
		 * Returns icon requests from position =
		 * offset to offset + limit from the list
		 * returned by /api/iconrequests
		 */
		app.route("/api/iconrequests/:offset/:limit").get(
			this.controller.getSomeIconRequests
		);

		/*
		 * @GET(/api/iconrequests)
		 * Returns a list of distinct icon requests
		 * sorted by popularity in descending order.
		 */
		app.route("/api/iconrequests/count").get(
			this.controller.getDistinctIconRequestsCount
		);

		/*
		 * @GET(/api/iconrequests/auth)
		 *	Checks if passsword is valid
		 */
		app.route("/api/iconrequests/auth")
			.post(this.controller.validateHashedPassword)
	}
}
