import { getConnection, getRepository } from "typeorm";
import { Request, Response } from "express";
import { IconRequest } from "../models/IconRequest";
import HttpStatusCodes from "http-status-codes";
import authenticate from "../utils/helpers/AuthenticationHelper";

export class PrivateController {
	// @GET: /api/requests
	public async getAllIconRequests(
		request: Request,
		response: Response
	): Promise<void> {
		try {
			if (false) {
				console.log(
					"Received private GET request with invalid api key. Rejecting it..."
				);
				response.status(HttpStatusCodes.UNAUTHORIZED).json({
					status: "FAILURE",
					message: "Failed to authenticate api key!"
				});
			} else {
				console.log(
					"Received private GET request with valid api_key. Proceeding..."
				);
				const iconRequests = await getRepository(IconRequest)
					.createQueryBuilder("query")
					.select([
						"id",
						"name",
						"component",
						"subquery.url",
						"requesters",
						"status"
					])
					.innerJoin(
						(q) => {
							return q
								.from(IconRequest, "subquery")
								.select("url, COUNT(*)", "requesters")
								.groupBy("url");
						},
						"subquery",
						"query.url = subquery.url"
					)
					.orderBy("requesters", "DESC")
					.execute();

				response.json(iconRequests);
			}
		} catch (error) {
			response.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
				status: "FAILURE",
				message: error.message
			});
			console.log(error.message);
		}
	}

	// GET: /api/requests/:OFFSET/:LIMIT
	public async getSomeIconRequests(
		request: Request,
		response: Response
	): Promise<void> {
		try {
			if (false) {
				console.log(
					"Received private GET request with invalid api key. Rejecting it..."
				);
				response.status(HttpStatusCodes.UNAUTHORIZED).json({
					status: "FAILURE",
					message: "Failed to authenticate api key!"
				});
			} else {
				console.log(
					"Received private GET request with valid api_key. Proceeding..."
				);
				console.log(
					"About to return " +
						request.params.limit +
						" with offset " +
						request.params.offset
				);
				const iconRequests = await getConnection()
					.createQueryBuilder()
					.select("*")
					.from(IconRequest, "ir")
					.orderBy("requesters", "DESC")
					.offset(parseInt(request.params.offset))
					.limit(parseInt(request.params.limit))
					.execute();

				response.json(iconRequests);
			}
		} catch (error) {
			response.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
				status: "FAILURE",
				message: error.message
			});
			console.log(error.message);
		}
	}

	// GET: /api/requests/ids/
	public async getIdsByComponent(
		request: Request,
		response: Response
	): Promise<void> {
		try {
			const component = request.body["component"];
			console.log(JSON.stringify(request.body["component"]));
			const queryResult = await getConnection()
				.createQueryBuilder()
				.select("id")
				.from(IconRequest, "ir")
				.where("component = :component", {
					component: component
				})
				.execute();

			const queryObject = JSON.parse(JSON.stringify(queryResult));
			const ids = [];
			queryObject.forEach((id) => ids.push(id.id));
			response.status(HttpStatusCodes.OK).json({
				ids: ids
			});
		} catch (error) {
			response.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
				status: "FAILURE",
				message: error.message
			});
			console.log(error.message);
		}
	}

	// GET: /api/requests/requesters
	public async getRequestersByComponent(
		request: Request,
		response: Response
	): Promise<void> {
		try {
			const component = request.body["component"];
			console.log(JSON.stringify(request.body["component"]));
			const queryResult = await getConnection()
				.createQueryBuilder()
				.select("COUNT(*)", "requesters")
				.from(IconRequest, "ir")
				.where("component = :component", {
					component: component
				})
				.execute();

			const queryObject = JSON.parse(JSON.stringify(queryResult));
			const requesters = queryObject[0].requesters;
			console.log(queryObject);
			response.status(HttpStatusCodes.OK).json({
				requesters: requesters
			});
		} catch (error) {
			response.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
				status: "FAILURE",
				message: error.message
			});
			console.log(error.message);
		}
	}

	// GET: /api/requests/status
	public async getStatusByComponent(
		request: Request,
		response: Response
	): Promise<void> {
		try {
			const component = request.body["component"];
			console.log(JSON.stringify(request.body["component"]));
			const queryResult = await getConnection()
				.createQueryBuilder()
				.select("status")
				.from(IconRequest, "ir")
				.where("component = :component", {
					component: component
				})
				.execute();

			const queryObject = JSON.parse(JSON.stringify(queryResult));
			const status = queryObject[0].status;
			console.log(queryObject);
			response.status(HttpStatusCodes.OK).json({
				status: status
			});
		} catch (error) {
			response.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
				status: "FAILURE",
				message: error.message
			});
			console.log(error.message);
		}
	}

	// GET /api/request/extras
	public async getExtrasByComponent(request: Request, response: Response) {
		try {
			const component = request.body["component"];
			console.log(JSON.stringify(request.body["component"]));
			const queryResult = await getConnection()
				.createQueryBuilder()
				.select("id")
				.addSelect("requesters")
				.addSelect("status")
				.from(IconRequest, "ir")
				.addFrom((subQuery) => {
					return subQuery
						.select("COUNT(*)", "requesters")
						.from(IconRequest, "ir")
						.where("component = :component", {
							component: component
						});
				}, "irSub")
				.where("component = :component", {
					component: component
				})
				.execute();

			const queryObject = JSON.parse(JSON.stringify(queryResult));
			const ids = [];
			const requesters = queryObject[0].requesters;
			const status = queryObject[0].status;

			console.log(queryObject[0].requesters);

			queryObject.forEach((extra) => {
				console.log(extra);
				ids.push(extra.id);
			});
			response.status(HttpStatusCodes.OK).json({
				ids: ids,
				requesters: requesters,
				status: status
			});
		} catch (error) {
			response.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
				status: "FAILURE",
				message: error.message
			});
			console.log(error.message);
		}
	}

	// @POST: /api/requests
	public async addAllIconRequests(
		request: Request,
		response: Response
	): Promise<void> {
		try {
			if (!authenticate(request)) {
				response.status(HttpStatusCodes.UNAUTHORIZED).json({
					status: "FAILURE",
					message: "Failed to authenticate api key!"
				});
			} else {
				const iconRequests = request.body["icons"];

				iconRequests.forEach(async (iconRequest: IconRequest) => {
					/* getConnection().getRepository(IconRequest).save({
						name: iconRequest.name,
						component: iconRequest.component,
						url: iconRequest.url
					}); */

					console.log("Selecting for checking whether it exists.");

					const selection = await getConnection()
						.createQueryBuilder()
						.select("*")
						.from(IconRequest, "ir")
						.where("component = :component", {
							component: iconRequest.component
						})
						.execute();

					console.log("LENGTH = " + selection.length);
					console.log("Stringified selection result: ");
					console.log(JSON.stringify(selection));

					if (selection.length == 0) {
						// INSERT
						await getConnection().getRepository(IconRequest).save({
							name: iconRequest.name,
							component: iconRequest.component,
							url: iconRequest.url
						});
					} else {
						// UPDATE - increment requesters
						await getConnection()
							.createQueryBuilder()
							.update(IconRequest)
							.set({ requesters: () => "requesters + 1" })
							.where("component = :component", {
								component: iconRequest.component
							})
							.execute();
					}
				});
				response.status(HttpStatusCodes.OK).json({
					status: "SUCCESS",
					message:
						"Added / Updated " +
						iconRequests.length +
						" icon requests."
				});
			}
		} catch (error) {
			response.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
				status: "FAILURE",
				message: error.message
			});
			console.log(error.message);
		}
	}

	// @PUT: /api/requests/update/id
	public async updateIconRequestsById(
		request: Request,
		response: Response
	): Promise<void> {
		try {
			console.log(
				"Received PUT request with body: " +
					JSON.stringify(request.body)
			);

			if (!authenticate(request)) {
				response.status(HttpStatusCodes.UNAUTHORIZED).json({
					status: "FAILURE",
					message: "Failed to authenticate api key!"
				});
			} else {
				const body = JSON.parse(JSON.stringify(request.body));
				await getConnection()
					.createQueryBuilder()
					.update(IconRequest)
					.set({ status: body.status })
					.where("id = :id", { id: body.id })
					.execute();

				response.status(HttpStatusCodes.OK).json({
					status: "SUCCESS",
					message: "Updated icon request with id = " + body.id
				});
			}
		} catch (error) {
			response.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
				status: "FAILURE",
				message: error.message
			});
			console.log(error.message);
		}
	}

	// @PUT: /api/requests/update/component
	public async updateIconRequestsByComponent(
		request: Request,
		response: Response
	): Promise<void> {
		try {
			console.log(
				"Received PUT request with body: " +
					JSON.stringify(request.body)
			);

			if (!authenticate(request)) {
				response.status(HttpStatusCodes.UNAUTHORIZED).json({
					status: "FAILURE",
					message: "Failed to authenticate api key!"
				});
			} else {
				const body = JSON.parse(JSON.stringify(request.body));
				await getConnection()
					.createQueryBuilder()
					.update(IconRequest)
					.set({ status: body.status })
					.where("component = :component", {
						component: body.component
					})
					.execute();

				response.status(HttpStatusCodes.OK).json({
					status: "SUCCESS",
					message:
						"Updated icon request with component = " +
						body.component
				});
			}
		} catch (error) {
			response.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
				status: "FAILURE",
				message: error.message
			});
			console.log(error.message);
		}
	}

	public async getAllIconRequestsCount(
		request: Request,
		response: Response
	): Promise<void> {
		try {
			if (!authenticate(request)) {
				response.status(HttpStatusCodes.UNAUTHORIZED).json({
					status: "FAILURE",
					message: "Failed to authenticate api key!"
				});
			} else {
				const count = await getConnection()
					.createQueryBuilder()
					.select("COUNT(*)", "count")
					.from(IconRequest, "ir")
					.execute();

				console.log(
					"Query complete. Total COUNT = " + JSON.stringify(count[0])
				);

				response.status(HttpStatusCodes.OK).json(count[0]);
			}
		} catch (error) {
			response.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
				status: "FAILURE",
				message: error.message
			});
			console.log(error.message);
		}
	}
}
