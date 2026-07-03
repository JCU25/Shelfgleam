import { jest } from "@jest/globals";

type CreatedUserData = {
	id: string;
	email: string;
	username: string;
	displayName?: string;
};

type QueriedUserData = {
	id: string;
	email: string;
	username: string;
	password_hash: string;
};

// Mocks
// mock db
const mockExecuteTakeFirst =
	jest.fn<() => Promise<QueriedUserData | undefined>>();
jest.unstable_mockModule("../../db/database.js", () => ({
	db: {
		selectFrom: () => ({
			select: () => ({
				where: () => ({
					executeTakeFirst: mockExecuteTakeFirst,
				}),
			}),
		}),
	},
}));

const mockCreateUser = jest.fn<() => Promise<CreatedUserData | undefined>>();
jest.unstable_mockModule("../../db/repository/userRepository.js", () => ({
	createUser: mockCreateUser,
}));

const mockCompare = jest.fn<() => Promise<boolean>>();
const mockHash = jest
	.fn<() => Promise<string>>()
	.mockResolvedValue("hashed_password");
jest.unstable_mockModule("bcrypt", () => ({
	default: {
		genSalt: jest.fn<() => Promise<string>>().mockResolvedValue("salt"),
		compare: mockCompare,
		hash: mockHash,
	},
}));

const mockReadFileSync = jest.fn();
jest.unstable_mockModule("fs", () => ({
	default: {
		readFileSync: mockReadFileSync,
	},
}));

const mockSign = jest.fn<() => string>();
jest.unstable_mockModule("jsonwebtoken", () => ({
	default: {
		sign: mockSign,
	},
}));

// reimport
const { userLogin, userSignUp } = await import("../userServices.js");

beforeEach(() => jest.clearAllMocks());

describe("userService test", () => {
	it("SignUp_ValidUser_Succeeds", async () => {
		mockCreateUser.mockResolvedValue({
			id: "123123",
			email: "sample@shelfgleam.com",
			username: "shelf",
			displayName: "Shelfgleam",
		});

		const result = await userSignUp({
			email: "sample@shelfgleam.com",
			username: "shelf",
			password: "123",
			displayName: "Shelfgleam",
		});

		expect(result).toBeDefined();

		expect(mockCreateUser).toHaveBeenCalledWith({
			id: expect.any(String),
			username: "shelf",
			email: "sample@shelfgleam.com",
			password: "hashed_password",
			displayName: "Shelfgleam",
		});
		// check the returnd User value
		expect(result).toEqual({
			id: "123123",
			email: "sample@shelfgleam.com",
			username: "shelf",
			displayName: "Shelfgleam",
		});
	});

	it("Login_ValidCredentials_Succeeds", async () => {
		mockExecuteTakeFirst.mockResolvedValue({
			id: "123",
			email: "sample@shelfgleam.com",
			username: "shelf",
			password_hash: "hashed_password",
		});
		mockCompare.mockResolvedValue(true);
		mockSign.mockReturnValue("Bearer token");

		const result = await userLogin({
			usernameOrEmail: "shelf",
			password: "password",
		});

		expect(mockExecuteTakeFirst).toHaveBeenCalled();
		expect(mockCompare).toHaveBeenCalledWith("password", "hashed_password");
		expect(result).toEqual({
			userId: expect.any(String),
			accessToken: expect.any(String),
		});
	});

	it("Login_InvalidCredentials_ThrowsError", async () => {
		mockExecuteTakeFirst.mockResolvedValue({
			id: "123",
			email: "sample@shelfgleam.com",
			username: "shelf",
			password_hash: "hashed_password",
		});
		mockCompare.mockResolvedValue(false);

		await expect(
			userLogin({
				usernameOrEmail: "shelf",
				password: "wrong_password",
			}),
		).rejects.toThrow("Invalid Credentials");
	});
});
