import { Request, Response, query } from "express";
import HttpStatusCodes from "http-status-codes";
import { getRepository, getConnection } from "typeorm";
import { IconRequest } from "../models/IconRequest";
import { Password } from "../models/Password";
import bcrypt from "bcrypt";

export class PublicController {
	public async getAllDistinctIconRequests(
		request: Request,
		response: Response
	): Promise<void> {
		try {
			const iconRequests = await getConnection()
				.createQueryBuilder()
				.select("*")
				.from(IconRequest, "ir")
				.orderBy("requesters", "DESC")
				.execute();

			console.log(
				"Query complete. iconRequests = " + JSON.stringify(iconRequests)
			);

			response.status(HttpStatusCodes.OK).json(iconRequests);
		} catch (error) {
			response.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
				status: "FAILURE",
				message: error.message
			});
			console.log(error.message);
		}
	}

	// GET: /api/iconrequests/:OFFSET/:LIMIT
	public async getSomeIconRequests(
		request: Request,
		response: Response
	): Promise<void> {
		try {
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
		} catch (error) {
			response.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
				status: "FAILURE",
				message: error.message
			});
			console.log(error.message);
		}
	}

	public async getDistinctIconRequestsCount(
		request: Request,
		response: Response
	): Promise<void> {
		try {
			const count = await getConnection()
				.createQueryBuilder()
				.select("COUNT(DISTINCT component)", "count")
				.from(IconRequest, "ir")
				.execute();

			console.log(
				"Query complete. DISTINCT component COUNT = " +
					JSON.stringify(count[0])
			);

			response.status(HttpStatusCodes.OK).json(count[0]);
		} catch (error) {
			response.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
				status: "FAILURE",
				message: error.message
			});
			console.log(error.message);
		}
	}

	// GET: /api/iconrequests/auth
	public async validateHashedPassword(
		request: Request,
		response: Response
	): Promise<void> {
		try {
			const username = request.body["username"];
			const plainText = request.body["password"];

			const queryResult = await getConnection()
				.getRepository(Password)
				.find({
					where: {
						username: username
					}
				});

			if (queryResult.length <= 0) {
				console.log("Does not exist.");
				response.status(HttpStatusCodes.UNAUTHORIZED).json({
					status: "FAILURE",
					authenticated: false
				});
			} else {
				const hash = queryResult[0].password;
				bcrypt
					.compare(plainText, hash)
					.then((result) => {
						if (result) {
							console.log("Authentication SUCCESSFUL");
							response.status(HttpStatusCodes.OK).json({
								status: "SUCCESS",
								authenticated: true
							});
						} else {
							console.log(
								"AUTHENTICATION FAILED, password doesn't match."
							);
							response.status(HttpStatusCodes.UNAUTHORIZED).json({
								status: "FAILURE",
								authenticated: false
							});
						}
					})
					.catch((err) => console.error(err));
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
