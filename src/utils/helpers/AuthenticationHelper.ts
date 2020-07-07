import { Request } from "express";
import { Authenticator } from "../../middleware/authentication/Authenticator";

const authenticate = async (request: Request) =>
	(await new Authenticator().authenticate(request.get("X-API-KEY")));

export default authenticate;
