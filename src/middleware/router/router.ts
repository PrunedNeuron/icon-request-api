import { Controller } from "./../../controller/controller";
import IconRequest from "../../model/icon.request.model";
import express from "express";
import { pool } from "../../database/database";

export class Router {
	public router: express.Router;
	public controller: Controller;

	constructor() {
		this.router = express.Router();
		this.controller = new Controller();
	}
	public routes(app: express.Application): void {
		console.log("Routing now...");

		app.route("/").get(this.controller.home);

		app.route("/amphetamine")
			.get(this.controller.getIconRequests)
			.post(this.controller.addIconRequest);

		app.route("/amphetamine/id/:id")
			.get(this.controller.getIconRequestById)
			.delete(this.controller.deleteIconRequestById);

		app.route("/amphetamine/component/:component")
			.get(this.controller.getIconRequestByComponent)
			.delete(this.controller.deleteIconRequestByComponent);
	}
}

export default new Router().router;
