import jwt from "jsonwebtoken";

import userSessionRepository from "../db/repository/userSessionRepository.js";

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

	const newRefreshToken = jwt.sign(
		{
			user_id: userId,
			user_agent: userAgent,
		},
		process.env.REFRESH_SECRET as string,
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
