import { db } from "../db/database.js";
import { v4 as uuidv4, type UUIDTypes } from "uuid";
import bcrypt from "bcrypt";
import chalk from "chalk";
import util from "util";

export type CreateUserParams = {
	id: UUIDTypes;
	username: string;
	email: string;
	password: string;
	displayName: string | undefined;
};

export const createUser = async ({
	id,
	username,
	email,
	password,
	displayName,
}: CreateUserParams) => {
	const user = await db
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

	console.log(
		chalk.blueBright(
			`USER REPOSITORY: Successfully created user:`,
			util.inspect(user, {
				colors: true,
				depth: null,
			}),
		),
	);
	return user;
};
