import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { db } from "../db/database.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import type { StringValue } from "ms";
import fs from "fs";

dotenv.config({
	path: "./config/.env",
override: true,
});

interface CreateUserParams {
	username: string;
	email: string;
	password: string;
	displayName?: string;
}

/**
 * Create a user record in the database
 * @param username
 * @param email
 * @param password
 * @param displayName
 * @returns User.id, User.email, User.username, User.display_name
 */
export const createUser = async ({
	username,
	email,
	password,
	displayName,
}: CreateUserParams) => {
	const result = await db
		.insertInto("users")
		.values({
			id: uuidv4(),
			username,
			email,
			password_hash: await bcrypt.hash(password, 10),
			display_name: displayName,
		})
		.returning(["id", "email", "username", "display_name"])
		.executeTakeFirst();

	console.log(`Created user`, result);
	return result;
};

type LoginWithUsername = {
	username: string;
	email?: never;
	password: string;
};

type LoginWithEmail = {
	username?: never;
	email: string;
	password: string;
};

type UserLoginParams = LoginWithUsername | LoginWithEmail;

export const userLogin = async ({
	username,
	password,
	email,
}: UserLoginParams) => {
	let query = await db
		.selectFrom("users")
		.select(["id", "email", "username", "password_hash"]);
	if (username) query = query.where("username", "=", username);
	if (email) query = query.where("email", "=", email);

	// check if user exists based on username/email
	const user = await query.executeTakeFirst();
	if (!user) throw new Error("User not found");

	// check password; throw error if passwords don't match
	const password_match = await bcrypt.compare(password, user?.password_hash);
	if (!password_match) throw Error("Invalid Credentials");

	// create user token
	const privateKey = fs.readFileSync(`${process.cwd()}/private.key`);
	const accessTokenDuration = process.env
		.ACCESS_TOKEN_DURATION as StringValue;

	const token = jwt.sign(
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

	return token;
};
