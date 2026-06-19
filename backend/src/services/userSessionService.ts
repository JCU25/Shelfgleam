import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

import userSessionRepository from "../db/repository/userSessionRepository.js";

dotenv.config({
	path: "./config/.env",
	override: true,
});

interface userSessionInput {
	userId: string;
	userAgent: string;
	ipAddress: string;
}

export const createUserSession = async ({
	userId,
	userAgent,
	ipAddress,
}: userSessionInput) => {
	const expiresAt = new Date();
	const refreshTokenDuration = process.env.REFRESH_TOKEN_DURATION?.trim();

	if (!refreshTokenDuration)
		throw new Error("Refresh token duration not set");

	switch (refreshTokenDuration?.charAt(refreshTokenDuration.length - 1)) {
		case "d":
			expiresAt.setDate(
				expiresAt.getDate() + Number(refreshTokenDuration.slice(0, -1)),
			);
			break;
		case "h":
			expiresAt.setHours(
				expiresAt.getHours() +
					Number(refreshTokenDuration.slice(0, -1)),
			);
			break;
		case "m":
			expiresAt.setMinutes(
				expiresAt.getMinutes() +
					Number(refreshTokenDuration.slice(0, -1)),
			);
			break;

		case "s":
			expiresAt.setSeconds(
				expiresAt.getSeconds() +
					Number(refreshTokenDuration.slice(0, -1)),
			);
			break;
	}
	const saltRounds = await bcrypt.genSalt(10);
	const newRefreshToken = await bcrypt.hash(
		jwt.sign(
			{
				user_id: userId,
				user_agent: userAgent,
			},
			process.env.REFRESH_SECRET as string,
		),
		saltRounds,
	);

	// create userSession
	await userSessionRepository.create({
		userId,
		refreshToken: newRefreshToken,
		userAgent,
		expiresAt,
		ipAddress,
	});

	return {
		refreshToken: newRefreshToken,
	};
};
