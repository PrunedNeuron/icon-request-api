import { pool } from "database/database";

const authenticate = async (apiKey: string): Promise<boolean> => {
	console.log("apiKey = " + apiKey);
	const apiKeyQueryResult = await pool.query(
		"SELECT * FROM api_keys WHERE api_key = $1",
		[apiKey]
	);
	if (apiKeyQueryResult.rows.length >= 1) return true;

	return false;
};

export default authenticate;
