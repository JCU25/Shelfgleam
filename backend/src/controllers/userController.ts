import type { Request, Response } from "express";
import { createUser } from "../services/userServices.js";

const signup = async (req: Request, res: Response) => {
	try {
		const { username, email, password, displayName } = req.body;
		if (!(username && email && password))
			throw new Error("Username, email and password are required");
		const user = await createUser(username, email, password, displayName);
		return res.status(201).json({
			user,
			message: "Successfully created User",
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			// todo: improve error messages based on error type
			message: "Failed to create user",
		});
	}
};

const login = async (req: Request, res: Response) => {};

const logout = async (req: Request, res: Response) => {};

export default { login, logout, signup };
