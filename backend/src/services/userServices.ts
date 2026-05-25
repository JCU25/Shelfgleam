import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { db } from "../db/database.js";
import dotenv from "dotenv";
dotenv.config({
	path: ".env",
});

/**
 * Create a user in database
 * @param username
 * @param email
 * @param password
 * @param displayName
 * @returns User.id, User.email, User.username, User.display_name
 *
 */
export const createUser = async (
	username: string,
	email: string,
	password: string,
	displayName: string,
) => {
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

	return result;
};

export default { createUser };
