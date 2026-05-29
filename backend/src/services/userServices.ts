import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { db } from "../db/database.js";
import dotenv from "dotenv";
dotenv.config({
	path: ".env",
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
