import jwt from "jsonwebtoken";
import config from "config";
import _ from "lodash";

/**
 * Generate auth token
 * @param name user name as payload
 * @param id user id as payload
 * @returns a jwt token as string
 */
export function generateAccessToken(name: string) {
	return jwt.sign({ name }, config.get("app.tokenSecret"), {
		expiresIn: "30 days",
	});
}

/**
 * Authenticate Token Middleware to be plugged in all queries
 * @param req The request object from express
 * @param res The response object from express
 * @param next Call the next listener in line
 * @returns
 */
export function authenticateToken(req, res, next) {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (token == null) return res.sendStatus(401);

	jwt.verify(token, config.get("app.tokenSecret"), (err: any, user: any) => {
		if (err) {
			console.error(err);
			return res.sendStatus(403);
		}
		req.user = user;
		next();
	});
}
