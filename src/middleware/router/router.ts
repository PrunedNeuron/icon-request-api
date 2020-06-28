import path from "path";
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
		console.log("Routing...");

		// public
		app.route("/amphetamine/api/v1/requests").get(
			this.controller.getDistinctIconRequests
		);

		app.route("/amphetamine/api/v1/requests/count").get(
			this.controller.getIconRequestsCount
		);

		//private
		app.route("/amphetamine/api/v1/requests/all").get(
			this.controller.getSortedIconRequestsWithId
		);

		app.route(
			"/amphetamine/api/v1/requests/update/id/:id/status/:status"
		).put(this.controller.updateRequestStatusById);

		app.route(
			"/amphetamine/api/v1/requests/update/component/:component/status/:status"
		).put(this.controller.updateRequestStatusByComponent);

		app.route("/amphetamine/api/v1")
			.get(this.controller.getIconRequests)
			.post(this.controller.addIconRequests)
			.delete(this.controller.notFound)
			.put(this.controller.notFound);

		app.route("/amphetamine/api/v1/id/:id")
			.get(this.controller.getIconRequestById)
			.delete(this.controller.deleteIconRequestById)
			.put(this.controller.notFound)
			.post(this.controller.notFound);

		app.route("/amphetamine/api/v1/component/:component")
			.get(this.controller.getIconRequestByComponent)
			.delete(this.controller.deleteIconRequestByComponent)
			.post(this.controller.notFound)
			.put(this.controller.notFound);

		app.route("/amphetamine/api/v1/name/:name")
			.get(this.controller.getIconRequestByName)
			.put(this.controller.notFound)
			.post(this.controller.notFound)
			.delete(this.controller.notFound);

		app.route("/amp").get(
			(request: express.Request, response: express.Response) => {
				console.log();
				response.sendFile("client/amphetamine/main/index.html", {
					root: path.resolve(__dirname + "/../../../")
				});
			}
		);

		// app.route("/").all(this.controller.homePage);

		app.route("/*").all(this.controller.notFound);
	}
}

export default new Router().router;
