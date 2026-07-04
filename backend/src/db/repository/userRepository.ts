import { db } from "../database.js";
import chalk from "chalk";
import util from "util";

export type CreateUserParams = {
	id: string;
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
			id: id,
			username,
			email,
			password_hash: password,
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
