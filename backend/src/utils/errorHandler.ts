import { DatabaseError } from "pg";

const handleDbException = async (error: DatabaseError) => {
	let errorMessage = "An unexpected error occured. Please try again later.";
	// check if error is due to duplicate entry
	if (error.code === "23505") {
		const constraint = error.constraint?.split("_")[1];
		errorMessage = `${constraint} already exists.`;
	}
	return errorMessage;
};

export const handleException = async (error: unknown) => {
	const errorMessage = "An unexpected error occured. Please try again later.";

	// if error is a DatabaseError, handle using handleDbException
	if (error instanceof DatabaseError) {
		return await handleDbException(error);
	}
	return errorMessage;
};
