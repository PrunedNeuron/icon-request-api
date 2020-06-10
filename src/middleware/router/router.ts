import { Controller } from "./../../controller/controller";
import express from "express";

export class Router {
	public router: express.Router;
	public controller: Controller;

	constructor() {
		this.router = express.Router();
		this.controller = new Controller();
	}
	public routes(app: express.Application): void {
		console.log("Routing now...");

		// https://icon-requests-api.herokuapp.com/amphetamine/api/v1

		app.route("/amphetamine/api/v1")
			.get(this.controller.getIconRequests)
			.post(this.controller.addIconRequests);

		app.route("/amphetamine/api/v1/id/:id")
			.get(this.controller.getIconRequestById)
			.delete(this.controller.deleteIconRequestById);

		app.route("/amphetamine/api/v1/component/:component")
			.get(this.controller.getIconRequestByComponent)
			.delete(this.controller.deleteIconRequestByComponent);

		app.route("/amphetamine/api/v1/name/:name").get(
			this.controller.getIconRequestByName
		);

		app.route("/*").all(this.controller.notFound);
	}
}

export default new Router().router;
