import type { Request, Response } from "express";

const signup = async (req: Request, res: Response) => {
	try {
		const { username, email, password, displayName } = req.body;
		if (!(username && email && password)) throw new Error("Username, email and password is required");

		return res.status(201).json({
			message: "Successfully created User",
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "Failed to create user",
		});
	}
};

const login = async (req: Request, res: Response) => {};

const logout = async (req: Request, res: Response) => {};

export default { login, logout, signup };
