import * as HttpStatusCodes from "http-status-codes";

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response } from "express";

import IconRequest from "../model/icon.request.model";
import { pool } from "../database/database";

export class Controller {
	/* homePage(request: Request, response: Response) {
		response.status(200).send(path.join(__dirname, "../client/public"));
	} */

	static async authenticate(apiKey: string): Promise<boolean> {
	
		console.log("apiKey = " + apiKey);
		const apiKeyQueryResult = await pool.query(
			"SELECT * FROM api_keys WHERE api_key = $1",
			[apiKey]
		);
		console.log("HELP" + apiKeyQueryResult.rows[0])
		if (apiKeyQueryResult.rows[0]) return true;
	
		return false;
	}

	notFound(request: Request, response: Response) {
		response.status(404).send({
			message:
				"HTTP request received. However, this is not a valid URL for this api. Try /amphetamine/api/v1/ instead"
		});
	}

	compressor(req: Request, res: Response) {
		res.setHeader("Content-Type", "text/event-stream");
		res.setHeader("Cache-Control", "no-cache");

		// send a ping approx every 2 seconds
		const timer = setInterval(function () {
			res.write("data: ping\n\n");

			// !!! this is the important part
			res.flush();
		}, 2000);

		res.on("close", function () {
			clearInterval(timer);
		});
	}

	async addIconRequests(request: Request, response: Response) {
		console.log("Entered addIconRequests().");
		try {
			if (! await Controller.authenticate(request.get("X-API-KEY"))) {
				response.status(HttpStatusCodes.UNAUTHORIZED).json({
					status: "FAILURE",
					message: "Failed to authenticate api key!"
				});
			} else {
				console.log("Entered try-catch.");
				const iconRequests: IconRequest[] = request.body["icons"];

				console.log("Icon requests assigned to variable.");

				iconRequests.forEach((iconRequest) => {
					console.log("Entered loop.");
					// Add requests to the database
					console.log("About to query the database.");
					console.log(
						"IconRequest = " +
							iconRequest.name +
							"\n" +
							iconRequest.component +
							"\n" +
							iconRequest.url +
							"\n"
					);
					const queryResult = pool.query(
						"INSERT INTO icon_requests (name, component, url) VALUES ($1, $2, $3) RETURNING *",
						[
							iconRequest.name,
							iconRequest.component,
							iconRequest.url
						]
					);
					console.log("Queried the database.");
					console.log("Completed postgres query await");
					console.log(queryResult);
				});

				console.log("Exited loop.");
				response.status(HttpStatusCodes.OK).json({
					status: "SUCCESS",
					message: `Added ${iconRequests.length} icon requests.`
				});

				console.log(
					`"Response status = ${response.statusCode}. BTW, iconRequests.length = ${iconRequests.length}"`
				);
				console.log("DONE.");
			}
		} catch (error) {
			console.error(error.message);
		}
	}
	async addIconRequest(request: Request, response: Response) {
		try {
			if (! await Controller.authenticate(request.get("X-API-KEY"))) {
				response.json({
					status: "FAILURE",
					message: "Failed to authenticate api key!"
				});
			} else {
				const body = JSON.parse(request.body);
				console.log(body);
				const iconRequest: IconRequest = new IconRequest(
					body["name"],
					body["component"],
					body["url"]
				);

				const queryResult = await pool.query(
					"INSERT INTO icon_requests (name, component, url) VALUES ($1, $2, $3) RETURNING *",
					[iconRequest.name, iconRequest.component, iconRequest.url]
				);
				response.json({
					message: "Icon request successfully added.",
					icon: queryResult.rows[0]
				});
				// return queryResult;
			}
		} catch (error) {
			console.error(error.message);
			response.send(error.message);
		}
	}

	async getIconRequests(request: Request, response: Response) {
		try {
			const queryResult = await pool.query("SELECT * FROM icon_requests");
			// response.json(queryResult.rows);
			response.json(queryResult.rows);
		} catch (error) {
			console.error(error.message);
		}
	}

	async getIconRequestById(request: Request, response: Response) {
		try {
			const { id } = request.params;
			const queryResult = await pool.query(
				"SELECT * FROM icon_requests WHERE id = $1",
				[id]
			);
			response.json(queryResult.rows[0]);
		} catch (error) {
			console.error(error.message);
		}
	}

	async getIconRequestByComponent(request: Request, response: Response) {
		try {
			const { component } = request.params;
			const queryResult = await pool.query(
				"SELECT * FROM icon_requests WHERE component = $1",
				[component]
			);
			response.json(queryResult.rows[0]);
		} catch (error) {
			console.error(error.message);
		}
	}

	async deleteIconRequestById(request: Request, response: Response) {
		try {
			if (! await Controller.authenticate(request.get("X-API-KEY"))) {
				response.json({
					status: "FAILURE",
					message: "Failed to authenticate api key!"
				});
			} else {
				const { id } = request.params;
				const iconRequest = this.findIconRequestById(id);
				const queryResult = await pool.query(
					"DELETE FROM icon_requests WHERE id = $1",
					[id]
				);
				console.log(queryResult.rows);
				response.json({
					message: "success",
					deleted_request: { iconRequest }
				});
			}
		} catch (error) {
			console.error(error.message);
		}
	}

	async deleteIconRequestByComponent(request: Request, response: Response) {
		try {
			if (! await Controller.authenticate(request.get("X-API-KEY"))) {
				response.json({
					status: "FAILURE",
					message: "Failed to authenticate api key!"
				});
			} else {
				const { component } = request.params;
				const iconRequest = this.findIconRequestByComponent(component);
				const queryResult = await pool.query(
					"DELETE FROM icon_requests WHERE component = $1",
					[component]
				);
				response.json({
					message: "success",
					deleted_request: { iconRequest }
				});
				console.log(queryResult.rows);
			}
		} catch (error) {
			console.error(error.message);
		}
	}

	async findIconRequestByComponent(component: string): Promise<IconRequest> {
		try {
			const queryResult = await pool.query(
				"SELECT * FROM icon_requests WHERE component = $1",
				[component]
			);
			const result = queryResult.rows[0];
			const iconRequest = new IconRequest(
				result["name"],
				result["component"],
				result["url"]
			);
			return iconRequest;
		} catch (error) {
			console.error(error.message);
		}
	}

	async findIconRequestById(id: string): Promise<IconRequest> {
		try {
			const queryResult = await pool.query(
				"SELECT * FROM icon_requests WHERE id = $1",
				[id]
			);
			const result = queryResult.rows[0];
			const iconRequest = new IconRequest(
				result["name"],
				result["component"],
				result["url"]
			);
			return iconRequest;
		} catch (error) {
			console.error(error.message);
		}
	}

	async getIconRequestByName(request: Request, response: Response) {
		try {
			const { name } = request.params;
			const param = "%" + name.toLowerCase() + "%";
			console.log(name);
			const queryResult = await pool.query(
				"SELECT * FROM icon_requests WHERE LOWER(name) LIKE $1",
				[param]
			);
			console.log(queryResult.rows);
			response.json(queryResult.rows);
		} catch (error) {
			console.error(error.message);
		}
	}
}
