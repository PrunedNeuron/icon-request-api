import { getConnection } from "typeorm";
import { ApiKey } from "../../models/ApiKey";

export class Authenticator {
	public async authenticate(apiKey: string): Promise<boolean> {
		const apiKeyQueryResult = await getConnection()
			.getRepository(ApiKey)
			.find({
				where: {
					apiKey: apiKey
				}
			});

		if (apiKeyQueryResult.length > 0) return true;
		return false;
	}
}
