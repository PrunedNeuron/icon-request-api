import { getConnection } from "typeorm";
import { ApiKey } from "../../models/ApiKey";

export class Authenticator {
	public async authenticate(apiKey: string): Promise<boolean> {
		if (process.env.NODE_ENV != "production")
			console.log("API Key = " + apiKey);

		const apiKeyQueryResult = await getConnection()
			.getRepository(ApiKey)
			.find({
				where: {
					apiKey: apiKey
				}
			});

		console.log("API Key query result = " + apiKeyQueryResult.length);
		if (apiKeyQueryResult.length > 0) return true;
		return false;
	}
}
