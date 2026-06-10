import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { db } from "../db/database.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import type { StringValue } from "ms";
import fs from "fs";
import { createUser } from "../db/repository/userRepository.js";

dotenv.config({
	path: "./config/.env",
	override: true,
});

type SignUpParams = {
	email: string;
	username: string;
	password: string;
	displayName?: string;
};

export const userSignUp = async ({
	email,
	username,
	password,
	displayName,
}: SignUpParams) => {
	// create user
	const user = await createUser({
		id: uuidv4(),
		email,
		username,
		password: await bcrypt.hash(password, 10),
		displayName,
	});

	// todo: verification

	console.log("Successfully signed up User.");
	return user;
};

type UserLoginParams = {
	usernameOrEmail: string;
	password: string;
};

export const userLogin = async ({
	usernameOrEmail,
	password,
}: UserLoginParams) => {
	let query = await db
		.selectFrom("users")
		.select(["id", "email", "username", "password_hash"])
		.where((eb) =>
			eb.or([
				eb("username", "=", usernameOrEmail),
				eb("email", "=", usernameOrEmail),
			]),
		);

	// check if user exists based on username/email
	const user = await query.executeTakeFirst();
	if (!user) throw new Error("User not found");

	// check password; throw error if passwords don't match
	const password_match = await bcrypt.compare(password, user?.password_hash);
	if (!password_match) throw Error("Invalid Credentials");

	// create user token
	const privateKey = fs.readFileSync(`${process.cwd()}/config/private.key`);
	const accessTokenDuration = process.env
		.ACCESS_TOKEN_DURATION as StringValue;

	const accessToken = jwt.sign(
		{
			id: user.id,
			email: user.email,
			username: user.username,
		},
		privateKey,
		{
			algorithm: "RS256",
			...(accessTokenDuration && { expiresIn: accessTokenDuration }),
		},
	);

	return {
		userId: user.id,
		accessToken,
	};
};
