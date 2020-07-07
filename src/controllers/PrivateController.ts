import { getConnection, getRepository } from "typeorm";
import { IconRequest } from "../models/IconRequest";
import HttpStatusCodes from "http-status-codes";
import authenticate from "../utils/helpers/AuthenticationHelper";
import { Context } from "koa";

// Handles requests with header X-API-KEY
export class PrivateController {
	// @GET: /api/requests
	public async getIconRequests(ctx: Context): Promise<void> {
		try {
			if (!(await authenticate(ctx))) {
				console.log(
					"Received private GET request with invalid api key. Rejecting it..."
				);
				ctx.status = HttpStatusCodes.UNAUTHORIZED;
				ctx.body = {
					status: "FAILURE",
					message: "Failed to authenticate api key!"
				};
			} else {
				const iconRequests = await getConnection()
					.createQueryBuilder()
					.select("name, component, url, requesters, status")
					.from(IconRequest, "ir")
					.execute();

				ctx.status = HttpStatusCodes.OK;
				ctx.body = iconRequests;
			}
		} catch (error) {
			ctx.status = HttpStatusCodes.INTERNAL_SERVER_ERROR;
			ctx.body = {
				status: "FAILURE",
				message: error.message
			};
			console.log(error.message);
		}
	}

	// @POST: /api/requests
	public async addIconRequests(ctx: Context): Promise<void> {
		try {
			if (!authenticate(ctx)) {
				ctx.status = HttpStatusCodes.UNAUTHORIZED;
				ctx.body = {
					status: "FAILURE",
					message: "Failed to authenticate api key!"
				};
			} else {
				const iconRequests = ctx.request.body["icons"];
				iconRequests.forEach(async (iconRequest: IconRequest) => {
					const selection = await getConnection()
						.createQueryBuilder()
						.select("*")
						.from(IconRequest, "ir")
						.where("component = :component", {
							component: iconRequest.component
						})
						.execute();

					if (selection.length == 0) {
						// Insert
						await getConnection().getRepository(IconRequest).save({
							name: iconRequest.name,
							component: iconRequest.component,
							url: iconRequest.url
						});
					} else {
						// Update - increment requesters
						await getConnection()
							.createQueryBuilder()
							.update(IconRequest)
							.set({
								requesters: () => "requesters + 1"
							})
							.where("component = :component", {
								component: iconRequest.component
							})
							.execute();
					}
				});
				ctx.status = HttpStatusCodes.OK;
				ctx.body = {
					status: "SUCCESS",
					message: "Inserted / updated icon requests."
				};
			}
		} catch (error) {
			ctx.status = HttpStatusCodes.INTERNAL_SERVER_ERROR;
			ctx.body = {
				status: "FAILURE",
				message: error.message
			};
			console.log(error.message);
		}
	}

	// @PUT: /api/requests/update/component
	public async updateIconRequestStatus(ctx: Context): Promise<void> {
		try {
			if (!authenticate(ctx)) {
				ctx.status = HttpStatusCodes.UNAUTHORIZED;
				ctx.body = {
					status: "FAILURE",
					message: "Failed to authenticate api key!"
				};
			} else {
				const component = ctx.request.body["component"];
				const status = ctx.request.body["status"];

				await getConnection()
					.createQueryBuilder()
					.update(IconRequest)
					.set({
						status: status
					})
					.where("component = :component", {
						component: component
					})
					.execute();

				ctx.status = HttpStatusCodes.OK;
				ctx.body = {
					status: "SUCCESS",
					message: "Updated icon request status."
				};
			}
		} catch (error) {
			ctx.status = HttpStatusCodes.INTERNAL_SERVER_ERROR;
			ctx.body = {
				status: "FAILURE",
				message: error.message
			};
			console.log(error.message);
		}
	}

	public async getCount(ctx: Context): Promise<void> {
		try {
			if (!authenticate(ctx)) {
				ctx.status = HttpStatusCodes.UNAUTHORIZED;
				ctx.body = {
					status: "FAILURE",
					message: "Failed to authenticate api key!"
				};
			} else {
				const count = await getConnection()
					.createQueryBuilder()
					.select("COUNT(*)", "count")
					.from(IconRequest, "ir")
					.execute();

				ctx.status = HttpStatusCodes.OK;
				ctx.body = {
					status: "SUCCESS",
					count: count[0]
				};
			}
		} catch (error) {
			ctx.status = HttpStatusCodes.INTERNAL_SERVER_ERROR;
			ctx.body = {
				status: "FAILURE",
				message: error.message
			};
			console.log(error.message);
		}
	}
}
