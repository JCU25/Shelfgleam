import type { UserTable } from "./userSchema.js";

export interface Database {
	users: UserTable;
}
