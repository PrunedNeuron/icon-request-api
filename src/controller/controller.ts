/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response } from "express";

import IconRequest from "../model/icon.request.model";
import { pool } from "../database/database";

export class Controller {
	async home(request: Request, response: Response) {
		response.status(200).send({
			message:
				"GET request received for /amphetamine. However, this is not a URL the API uses."
		});
	}
	async addIconRequest(request: Request, response: Response) {
		try {
			const body = request.body;
			console.log(request.body);
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
		} catch (error) {
			console.error(error.message);
			response.send(error.message);
		}
	}

	async getIconRequests(request: Request, response: Response) {
		try {
			const queryResult = await pool.query("SELECT * FROM icon_requests");
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
		} catch (error) {
			console.error(error.message);
		}
	}

	async deleteIconRequestByComponent(request: Request, response: Response) {
		try {
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
}
