import type { Request, Response } from "express";
import { createUser, userLogin } from "../services/userServices.js";

const signup = async (req: Request, res: Response) => {
	try {
		const { username, email, password, displayName } = req.body;
		if (!(username && email && password))
			throw new Error("Username, email and password are required");
		const user = await createUser({
			username,
			email,
			password,
			displayName,
		});
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

const login = async (req: Request, res: Response) => {
	try {
		const { username, password, email } = req.body;

		if (!(username || email) && !password) {
			throw new Error("Please enter your email/username and password.");
		}

		let result;

		if (username) {
			// call user service login
			result = await userLogin({
				username,
				password,
			});
		} else if (email) {
			result = await userLogin({
				email,
				password,
			});
		}

		// todo: create user Session

		return res.status(200).json({
			result,
			message: "Log in successful.",
		});
	} catch (error) {
		console.log(error);
		return res.json({
			message: "Login failed. Please verify your credentials.",
		});
	}
};

const logout = async (req: Request, res: Response) => {};

export default { login, logout, signup };
