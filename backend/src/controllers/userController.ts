import type { Request, Response } from "express";
import { userSignUp, userLogin } from "../services/userServices.js";
import { handleException } from "../utils/errorHandler.js";
import { createUserSession } from "../services/userSessionService.js";


const signup = async (req: Request, res: Response) => {
	try {
		const { username, email, password, displayName } = req.body;
		if (!(username && email && password))
			return res.status(400).json({
				message: "Username, email, and password are required fields.",
			});
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
		console.log(errorMessage);
		return res.status(500).json({
			// todo: improve error messages based on error type
			message: errorMessage,
		});
	}
};

const login = async (req: Request, res: Response) => {
	try {
		const { usernameOrEmail, password } = req.body;
		const userAgent = req.headers["user-agent"];
		const ipAddress = req.ip;

		// checking required params
		if (!usernameOrEmail || !password) {
			throw new Error("Please enter your email/username and password.");
		}
		if (!userAgent || !ipAddress)
			return res.status(400).json({
				message: "Missing user session params",
			});

		// login user with username/email
		const result = await userLogin({
			usernameOrEmail,
			password,
		});

		if (!result.accessToken)
			return res.status(500).json({
				message: "Access token not found",
			});

		// create userSession -> put in controller
		const userSession = await createUserSession({
			userAgent,
			userId: result.userId,
			ipAddress,
		});

		if (!userSession.refreshToken) {
			return res.status(500).json({
				message: "Refresh token not found.",
			});
		}

		res.cookie("refreshToken", userSession.refreshToken, {
			httpOnly: true,
			sameSite: "strict",
		});

		return res.status(200).json({
			message: "Log in successful.",
		});
	} catch (error) {
		const errorMessage = await handleException(error);
		console.log(error);
		return res.status(500).json({
			message: errorMessage,
		});
	}
};

// const logout = async (req: Request, res: Response) => {};

export default { login, signup };
