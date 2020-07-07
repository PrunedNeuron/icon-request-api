import express from "express";
import { PrivateController } from "../controllers/PrivateController";

export class PrivateRouter {
	router: express.Router;
	controller: PrivateController;

	constructor(app: express.Application) {
		this.router = express.Router();
		this.controller = new PrivateController();
		this.setPrivateRoutes(app);
	}

	async setPrivateRoutes(app: express.Application) {
		// These routes are accessible only if the requester includes a valid api key header. Currently used only by me.

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
		 * *
		 * @PUT(/api/iconrequests)
		 * Takes a JSON object of type { id: number, status: "" }
		 * as request and updates the status for the icon request
		 * with the corresponding id.
		 * Returns the status and message associated with the outcome.
		 */
		app.route("/api/requests")
			.get(this.controller.getAllIconRequests)
			.post(this.controller.addAllIconRequests);

		/*
		 * @PUT(/api/iconrequests)
		 * Takes a JSON object of type { id: number, status: "" }
		 * as request and updates the status for the icon request
		 * with the corresponding id.
		 * Returns the status and message associated with the outcome.
		 */
		app.route("/api/requests/update/id").put(
			this.controller.updateIconRequestsById
		);

		/*
		 * @PUT(/api/iconrequests)
		 * Takes a JSON object of type { component: string, status: "" }
		 * as request and updates the status for the icon request
		 * with the corresponding component.
		 * Returns the status and message associated with the outcome.
		 */
		app.route("/api/requests/update/component").put(
			this.controller.updateIconRequestsByComponent
		);

		/*
		 * @GET(/api/requests/:offset/:limit)
		 * Returns icon requests from position =
		 * offset to offset + limit from the list
		 * returned by /api/requests
		 */
		app.route("/api/requests/:offset/:limit").get(
			this.controller.getSomeIconRequests
		);

		/*
		 * @GET(/api/requests/ids)
		 * Returns ids of icon requests with a
		 * matching component/activity id
		 */
		app.route("/api/requests/ids")
			// .get(this.controller.getIdsByComponent)
			.post(this.controller.getIdsByComponent);

		/*
		 * @GET(/api/requests/requesters)
		 * Returns # requesters of icon request
		 * with a matching component/activity id
		 */
		app.route("/api/requests/requesters").post(
			this.controller.getRequestersByComponent
		);

		/*
		 * @GET(/api/requests/status)
		 * Returns status of icon request
		 * with a matching component/activity id
		 */
		app.route("/api/requests/status").post(
			this.controller.getStatusByComponent
		);

		/*
		 * @GET(/api/requests/extras)
		 * Returns id, requesters, status of icon
		 * request with a matching component/activity
		 * id
		 */
		app.route("/api/requests/extras").post(
			this.controller.getExtrasByComponent
		);

		/*
		 * @GET(/api/requests/count)
		 * Returns the total, number of icon requests
		 * in the database.
		 */
		app.route("/api/requests/count").get(
			this.controller.getAllIconRequestsCount
		);

		/*
		 * !!!DEPRECATED, temporary support for older versions
		 * @POST(/amphetamine/api/v1)
		 * Accepts an array of icon requests stored in a JSON
		 * array called "icons".
		 */
		app.route("/amphetamine/api/v1").post(
			this.controller.addAllIconRequests
		);
	}
}
