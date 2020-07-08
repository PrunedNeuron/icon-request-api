import HttpStatusCodes from "http-status-codes";
import { getConnection } from "typeorm";
import { IconRequest } from "../models/IconRequest";
import { Context } from "koa";
import { Password } from "../models/Password";
import bcrypt from "bcrypt";

// Handles requests without header X-API-KEY
export class PublicController {
	public async getPaginatedIconRequests(ctx: Context): Promise<void> {
		try {
			const iconRequests = await getConnection()
				.createQueryBuilder()
				.select("name, component, url")
				.from(IconRequest, "ir")
				.where("status = :status", { status: "pending" })
				.orderBy("requesters", "DESC")
				.offset(ctx.params.offset)
				.limit(ctx.params.limit)
				.execute();

			ctx.status = HttpStatusCodes.OK;
			ctx.body = iconRequests;
		} catch (error) {
			ctx.status = HttpStatusCodes.INTERNAL_SERVER_ERROR;
			ctx.body = {
				status: "FAILURE",
				message: error.message
			};
			console.log(error.message);
		}
	}

	public async getIconRequests(ctx: Context): Promise<void> {
		try {
			const iconRequests = await getConnection()
				.createQueryBuilder()
				.select("name, component, url")
				.from(IconRequest, "ir")
				.execute();

			ctx.status = HttpStatusCodes.OK;
			ctx.body = iconRequests;
		} catch (error) {
			ctx.status = HttpStatusCodes.INTERNAL_SERVER_ERROR;
			ctx.body = {
				status: "FAILURE",
				message: error.message
			};
			console.log(error.message);
		}
	}

	public async getPendingCount(ctx: Context): Promise<void> {
		try {
			const count = await getConnection()
				.createQueryBuilder()
				.select("COUNT(*)", "count")
				.from(IconRequest, "ir")
				.where("status = :status", { status: "pending" })
				.execute();

			ctx.status = HttpStatusCodes.OK;
			ctx.body = {
				status: "SUCCESS",
				count: count[0].count
			};
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
			const count = await getConnection()
				.createQueryBuilder()
				.select("COUNT(*)", "count")
				.from(IconRequest, "ir")
				.execute();

			ctx.status = HttpStatusCodes.OK;
			ctx.body = {
				status: "SUCCESS",
				count: count[0].count
			};
		} catch (error) {
			ctx.status = HttpStatusCodes.INTERNAL_SERVER_ERROR;
			ctx.body = {
				status: "FAILURE",
				message: error.message
			};
			console.log(error.message);
		}
	}

	public async validateHashedPassword(ctx: Context): Promise<void> {
		try {
			const username = ctx.request.body["username"];
			const plainText = ctx.request.body["password"];

			const queryResult = await getConnection()
				.getRepository(Password)
				.find({
					where: {
						username: username
					}
				});

			if (queryResult.length <= 0) {
				console.log("Does not exist.");
				ctx.status = HttpStatusCodes.UNAUTHORIZED;
				ctx.body = {
					status: "FAILURE",
					authenticated: false
				};
			} else {
				let outcome: boolean;
				const hash = queryResult[0].password;
				if (bcrypt.compareSync(plainText, hash)) {
					ctx.status = HttpStatusCodes.OK;
					ctx.body = {
						status: "SUCCESS",
						authenticated: true
					};
				} else {
					ctx.status = HttpStatusCodes.UNAUTHORIZED;
					ctx.body = {
						status: "FAILURE",
						authenticated: false
					};
				}
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
