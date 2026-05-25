import type { ColumnType, Insertable, Selectable, Updateable } from "kysely";
import type { UUIDTypes } from "uuid";

export interface UserTable {
	id: UUIDTypes;
	username: string;
	email: string;
	display_name?: string;
	password_hash: string;

	// selected as Date, optionally provided as string in inserts, can never be updated
	created_at: ColumnType<Date, string | undefined, never>;
	updated_at: ColumnType<Date, string | undefined, never>;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UpdateUser = Updateable<UserTable>;
