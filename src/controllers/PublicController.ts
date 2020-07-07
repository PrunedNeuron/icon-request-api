import HttpStatusCodes from "http-status-codes";
import { getConnection } from "typeorm";
import { IconRequest } from "../models/IconRequest";
import { Context } from "koa";

// Handles requests without header X-API-KEY
export class PublicController {
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
				count: count[0]
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
}
