import util from "util";
import dotenv from "dotenv";
import chalk from "chalk";

import { db } from "../database.js";

dotenv.config({
	path: "./config/.env",
});

const findUserSessionByUsername = async (userId: string) => {
	const userSession = await db
		.selectFrom("user_sessions")
		.where("user_id", "=", userId)
		.select(["id", "user_id", "token_hash", "user_agent", "created_at"]);

	return userSession;
};

const findUserSessionById = async (userId: string) => {
	const userSession = await db
		.selectFrom("user_sessions")
		.where("user_id", "=", userId)
		.select(["id", "user_id", "token_hash", "user_agent", "created_at"]);

	return userSession;
};

interface createUserSessionInput {
	userId: string;
	userAgent: string;
	ipAddress: string;
	refreshToken: string;
	expiresAt: Date;
}

const create = async ({
	userId,
	userAgent,
	ipAddress,
	refreshToken,
	expiresAt,
}: createUserSessionInput) => {
	const userSession = await db
		.insertInto("user_sessions")
		.values({
			user_id: userId,
			token_hash: refreshToken,
			expires_at: expiresAt,
			ip_address: ipAddress,
			user_agent: userAgent,
		})
		.returning(["id", "created_at", "expires_at"])
		.executeTakeFirst();

	console.log(
		chalk.blueBright`USER SESSIONS REPOSITORY: Successfully created user Session:`,
		util.inspect(userSession, {
			colors: true,
			depth: null,
		}),
	);
};

export default {
	findUserSessionByUsername,
	findUserSessionById,
	create,
};
