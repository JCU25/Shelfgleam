import type { UUID } from "node:crypto";
import type { UserTable } from "./userSchema.js";

export interface Database {
	users: UserTable;
}
