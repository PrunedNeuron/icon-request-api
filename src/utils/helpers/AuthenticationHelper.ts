import { Context } from "koa";
import { Authenticator } from "../../middleware/authentication/Authenticator";

const authenticate = async (ctx: Context) =>
	await new Authenticator().authenticate(ctx.get("X-API-KEY"));

export default authenticate;
