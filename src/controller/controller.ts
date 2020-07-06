/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as HttpStatusCodes from "http-status-codes";

import { Request, Response } from "express";

import IconRequestRequest from "../model/icon.request.request";
import { pool } from "../database/database";
import IconRequestResponse from "../model/icon.request.response";

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
		console.log("HELP" + apiKeyQueryResult.rows[0]);
		if (apiKeyQueryResult.rows[0]) return true;

		return false;
	}

	notFound(request: Request, response: Response) {
		response.status(404).send({
			message:
				"HTTP request received. However, this is not a valid URL for this api. Try /amphetamine/api/v1/all instead"
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
			if (!(await Controller.authenticate(request.get("X-API-KEY")))) {
				response.status(HttpStatusCodes.UNAUTHORIZED).json({
					status: "FAILURE",
					message: "Failed to authenticate api key!"
				});
			} else {
				console.log("Entered try-catch.");
				const iconRequests: IconRequestRequest[] =
					request.body["icons"];

				console.log("Icon requests assigned to variable.");

				iconRequests.forEach(async (iconRequest) => {
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

					let queryResult;

					const exists = async (comp) => {
						const result = await pool.query(
							"SELECT * FROM icon_requests WHERE component = $1",
							[iconRequest.component]
						);

						console.log("ROWS LENGTH = " + result.rows.length);

						// Exists in DB
						if (result.rows.length > 0) return true;
						else return false; // Does not exist in DB yet
					};

					if (await exists(iconRequest.component)) {
						// Update
						queryResult = await pool.query(
							"UPDATE icon_requests SET requesters = requesters + 1 WHERE component = $1",
							[iconRequest.component]
						);
					} else {
						// Insert
						queryResult = await pool.query(
							"INSERT INTO icon_requests (name, component, url) VALUES ($1, $2, $3) RETURNING *",
							[
								iconRequest.name,
								iconRequest.component,
								iconRequest.url
							]
						);
					}
					console.log("Queried the database.");
					console.log("Completed postgres query await");
					// console.log(queryResult);
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
			// response.send(error.message);
			response.status(HttpStatusCodes.OK).json({
				status: "SUCCESS",
				message: `Added icon requests.`
			});
		}
	}

	// Returns true if it exists ( UPDATE requesters++ ), false if it does not ( INSERT  )
	async iconRequestExists(component: string) {
		try {
			const queryResult = await pool.query(
				"SELECT * FROM icon_requests WHERE component = $1",
				[component]
			);

			console.log("Query Result length = " + queryResult.rows.length);
			// Exists in DB
			if (queryResult.rows.length > 0) return true;
			else return false; // Does not exist in DB yet
		} catch (error) {
			console.log(error.message);
		}
	}

	async addIconRequest(request: Request, response: Response) {
		try {
			if (!(await Controller.authenticate(request.get("X-API-KEY")))) {
				response.json({
					status: "FAILURE",
					message: "Failed to authenticate api key!"
				});
			} else {
				const body = JSON.parse(request.body);
				console.log(body);
				const iconRequest: IconRequestRequest = new IconRequestRequest(
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
			}
		} catch (error) {
			console.error(error.message);
			response.send(error.message);
		}
	}

	async getIconRequestsCount(request: Request, response: Response) {
		try {
			const queryResult = await pool.query("SELECT * FROM icon_requests");
			response.json({
				total: queryResult.rowCount
			});
		} catch (error) {
			console.error(error.message);
			response.send(error.message);
		}
	}

	async getIconRequests(request: Request, response: Response) {
		try {
			const queryResult = await pool.query(
				"SELECT name, component, url FROM icon_requests"
			);
			response.json(queryResult.rows);
		} catch (error) {
			console.error(error.message);
			response.send(error.message);
		}
	}

	async getSortedIconRequestsWithId(request: Request, response: Response) {
		try {
			const queryResult = await pool.query(
				"SELECT\
							ir1.id,\
							ir2.*\
						FROM\
							icon_requests ir1\
						INNER JOIN (\
								SELECT\
									name, component, url, COUNT(*) AS requesters, status\
								FROM\
									icon_requests\
								GROUP BY\
									name, component, url, status\
							) ir2 ON\
							ir1.component = ir2.component\
						ORDER BY\
							requesters DESC"
			);
			console.log("Query returned " + queryResult.rowCount + " rows.");
			response.json(queryResult.rows);
		} catch (error) {
			console.error(error.message);
			response.send(error.message);
		}
	}

	async getDistinctIconRequests(request: Request, response: Response) {
		try {
			const queryResult = await pool.query(
				"SELECT\
							name, component, url\
						FROM\
							(\
								SELECT\
									name, component, url, COUNT(*) AS requesters\
								FROM\
									icon_requests\
								GROUP BY\
									name, component, url\
								ORDER BY\
									requesters DESC\
							) ir;"
			);
			console.log("Query returned " + queryResult.rowCount + " rows.");
			response.json(queryResult.rows);
		} catch (error) {
			console.error(error.message);
			response.send(error.message);
		}
	}

	async updateRequestStatusById(request: Request, response: Response) {
		try {
			const id = request.params.id;
			const status = request.params.status;

			if (status == "done" || status == "pending") {
				console.log("Updating status for icon request with id = " + id);
				const originalRow = this.findIconRequestById(id);
				const queryResult = await pool.query(
					"UPDATE icon_requests\
					SET status = $1\
					WHERE id = $2",
					[status, id]
				);
				console.log("Updated " + queryResult.rowCount + " row(s)");
				const updatedRow = this.findIconRequestById(id);
				response.json({
					status: "success",
					message:
						"Updated the following row's status to " + status + ".",
					original_row: { originalRow },
					updated_row: { updatedRow }
				});
			} else {
				console.log(
					"Received invalid PUT request with params: " +
						request.params
				);
			}
		} catch (error) {
			console.log(error.message);
			response.send(error.message);
		}
	}

	async updateRequestStatusByComponent(request: Request, response: Response) {
		try {
			const component = request.params.component;
			const status = request.params.status;

			if (status == "done") {
				console.log(
					"Updating status for icon request with component = " +
						component
				);
				const originalRow = this.findIconRequestByComponent(component);
				const queryResult = await pool.query(
					"UPDATE icon_requests\
					SET status = $1\
					WHERE component = $2",
					[status, component]
				);
				console.log("Updated " + queryResult.rowCount + " row(s)");
				const updatedRow = this.findIconRequestByComponent(component);
				response.json({
					status: "success",
					message:
						"Updated the following row's status to " + status + ".",
					original_row: { originalRow },
					updated_row: { updatedRow }
				});
			} else {
				console.log(
					"Received invalid PUT request with params: " +
						request.params
				);
			}
		} catch (error) {
			console.log(error.message);
			response.send(error.message);
		}
	}

	async getIconRequestById(request: Request, response: Response) {
		try {
			if (!(await Controller.authenticate(request.get("X-API-KEY")))) {
				response.json({
					status: "FAILURE",
					message: "Failed to authenticate api key!"
				});
			} else {
				const { id } = request.params;
				const queryResult = await pool.query(
					"SELECT * FROM icon_requests WHERE id = $1",
					[id]
				);
				response.json(queryResult.rows[0]);
			}
		} catch (error) {
			console.error(error.message);
			response.send(error.message);
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
			response.send(error.message);
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
			response.send(error.message);
		}
	}

	async deleteIconRequestById(request: Request, response: Response) {
		try {
			if (!(await Controller.authenticate(request.get("X-API-KEY")))) {
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
			response.send(error.message);
		}
	}

	async deleteIconRequestByComponent(request: Request, response: Response) {
		try {
			if (!(await Controller.authenticate(request.get("X-API-KEY")))) {
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
			response.send(error.message);
		}
	}

	async findIconRequestByComponent(component: string) {
		try {
			const queryResult = await pool.query(
				"SELECT * FROM icon_requests WHERE component = $1",
				[component]
			);
			const result = queryResult.rows[0];
			const iconRequest = new IconRequestResponse(
				result["id"],
				result["name"],
				result["component"],
				result["url"],
				result["status"]
			);
			return iconRequest;
		} catch (error) {
			console.error(error.message);
		}
	}

	async findIconRequestById(id: string) {
		try {
			const queryResult = await pool.query(
				"SELECT * FROM icon_requests WHERE id = $1",
				[id]
			);
			const result = queryResult.rows[0];
			const iconRequest = new IconRequestResponse(
				result["id"],
				result["name"],
				result["component"],
				result["url"],
				result["status"]
			);
			return iconRequest;
		} catch (error) {
			console.error(error.message);
		}
	}
}
