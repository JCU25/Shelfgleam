import type { Request, Response } from "express";
import { userSignUp, userLogin } from "../services/userServices.js";
import { handleException } from "../utils/errorHandler.js";

// const get = async (req: Request, res: Response) => {
// 	try {
// 	} catch (error) {}
// };

const signup = async (req: Request, res: Response) => {
	try {
		const { username, email, password, displayName } = req.body;
		if (!(username && email && password))
			throw new Error("Username, email and password are required");
		const user = await userSignUp({
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
		const errorMessage = await handleException(error);
		return res.status(500).json({
			// todo: improve error messages based on error type
			message: errorMessage,
		});
	}
};

const login = async (req: Request, res: Response) => {
	try {
		let result;
		const { username, password, email } = req.body;

		if (!(username || email) && !password) {
			throw new Error("Please enter your email/username and password.");
		}

		// login user with username/email
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
		const errorMessage = await handleException(error);
		console.log(error);
		return res.json({
			message: errorMessage,
		});
	}
};

// const logout = async (req: Request, res: Response) => {};

export default { login, signup };
