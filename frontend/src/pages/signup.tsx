import Button from "../components/Button";
import { useState } from "react";
import { api } from "../utlils/publicApi";
import { Link } from "react-router-dom";
import CheckIcon from "../assets/icon-park-outline_check-one.svg?react";
import Header from "../components/Header";

interface FormDataInput {
	username: FormDataEntryValue | null;
	email: FormDataEntryValue | null;
	displayName?: FormDataEntryValue | null;
	password: FormDataEntryValue | null;
}
interface SignUpResponse {
	user?: {
		id: string;
		email: string;
		username: string;
		displayName?: string;
	};
	message: string;
}

interface InputFieldErrors {
	username?: string | null;
	email?: string | null;
	displayName?: string;
	password?: string;
	global?: string;
}

export default function Signup() {
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [success, setSuccess] = useState<boolean>(false);
	const [errors, setErrors] = useState<InputFieldErrors>(
		{} as InputFieldErrors,
	);

	const fetchApi = async (data: FormDataInput) => {
		try {
			const response = await api.post<SignUpResponse>(
				`${import.meta.env.VITE_API_ENDPOINT}/users/signup`,
				data,
			);
			setIsSubmitting(false);
			setSuccess(true);
			setErrors({} as InputFieldErrors);
			return response.data;
		} catch (error) {
			if (error instanceof Error) {
				if (error?.message?.toLowerCase().includes("username")) {
					setErrors({
						username: "Username already exists.",
					});
				} else if (error?.message?.toLowerCase().includes("email")) {
					setErrors({
						email: "Email already in use.",
					});
				}
			}
			setIsSubmitting(false);
		}
	};

	const verifyPassword = (
		password: FormDataEntryValue | null,
		confirmPassword: FormDataEntryValue | null,
	) => {
		return password === confirmPassword;
	};

	const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		setIsSubmitting(true);
		e.preventDefault();

		const formData = new FormData(e.currentTarget);

		if (
			!verifyPassword(
				formData.get("password"),
				formData.get("confirmPassword"),
			)
		) {
			setErrors({
				password: "Passwords don't match",
			});
		} else {
			await fetchApi({
				username: formData.get("username"),
				email: formData.get("email"),
				password: formData.get("password"),
				displayName: formData.get("displayName"),
			});
		}
		setIsSubmitting(false);
	};

	const styles = {
		input: "px-2 py-1.5 md:px-2 bg-purple-200 focus:outline-purple-500 focus:bg-white placeholder:text-black/50 text-black text-sm rounded-sm border border-white/10",
		label: "text-black text-xs text-gray-300",
		inputDiv: "flex flex-col gap-1",
		error: "text-red-600 text-xs md:text-sm ",
	};

	return success ? (
		<section className="flex flex-col min-h-svh">
			<Header></Header>
			<div className="px-4 py-16 md:py-20 w-fit self-center">
				<div className="relative flex flex-col gap-8 h-fit p-10 rounded-lg bg-radial from-purple-200 to-white justify-center md:items-center shadow-md ld:shadow-lg">
					<div className="flex flex-row items-center justify-center gap-4">
						<h1 className="font-bold text-3xl md:text-3xl md:mt-6">
							Success!
						</h1>
					</div>
					<div className="flex flex-col gap-8 items-center">
						<CheckIcon className="w-20 h-20 md:absolute top-[-15%] md:w-20 md:h-20 fill-white"></CheckIcon>

						<p className="text-center">
							You've successfully created a Shelfgleam account!
							Make sure to verify your email.
						</p>
						<Link className="flex justify-center" to={"/login"}>
							<Button customStyle="self-center">
								Proceed to Login
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</section>
	) : (
		<>
			<section className="min-w-svw flex flex-row items-center bg-purple-500 min-h-svh">
				<div className="absolute z-0 bottom-0 left-0 flex bg-black w-full h-[50%]"></div>

				<div className="hidden md:flex z-1 w-1/2 min-h-svh bg-white">
					<p>LEARN MORE ABOUT BOOKS AND EXPAND YOUR SHELVES!</p>
				</div>

				<div className="z-1 flex flex-col w-[100%] md:w-1/2 px-2 py-4">
					<div className="flex flex-col items-center z-1 px-6">
						<h1 className="flex flex-col gap-2 text-center text-white text-3xl md:text-3xl lg:text-4xl mt-10 font-bold">
							<span>Welcome</span>
							<span>to Shelfgleam</span>

							<span></span>
						</h1>
						<p className="text-xs md:text-sm text-center text-white/60 mt-2">
							A place to explore, and expand your bookshelf
						</p>
					</div>

					<form
						id="form"
						onSubmit={handleSubmit}
						className="flex flex-col gap-3 w-full md:w-5/6 lg:w-4/5 self-center rounded-lg z-1 px-4 py-4 md:py-8 lg:px-8 bg-zinc-800 mt-10 mb-4"
					>
						<div className={styles.inputDiv}>
							<label htmlFor="username" className={styles.label}>
								Username
							</label>
							<input
								className={styles.input}
								required={true}
								name="username"
								type="text"
								placeholder="username"
							/>
							{errors.username && (
								<p className={styles.error}>
									{errors.username}
								</p>
							)}
						</div>

						<div className={styles.inputDiv}>
							<label htmlFor="email" className={styles.label}>
								Email
							</label>
							<input
								className={styles.input}
								required={true}
								name="email"
								type="text"
								placeholder="email"
							/>
							{errors.email && (
								<p className={styles.error}>{errors.email}</p>
							)}
						</div>

						<div className={styles.inputDiv}>
							<label
								htmlFor="displayName"
								className={styles.label}
							>
								Display Name
							</label>
							<input
								className={styles.input}
								name="displayName"
								type="text"
								placeholder="Display Name"
							/>
						</div>

						<div className={styles.inputDiv}>
							<label htmlFor="password" className={styles.label}>
								Password
							</label>
							<input
								className={styles.input}
								required={true}
								name="password"
								type="password"
								placeholder="password"
							/>
							{errors.password && (
								<p className={styles.error}>
									{errors.password}
								</p>
							)}
						</div>

						<div className={styles.inputDiv}>
							<label
								htmlFor="confirmPassword"
								className={styles.label}
							>
								Confirm Password
							</label>
							<input
								className={styles.input}
								required={true}
								name="confirmPassword"
								type="password"
								placeholder="confirm password"
							/>
							{errors.password && (
								<p className={styles.error}>
									{errors.password}
								</p>
							)}
						</div>

						{errors.global && (
							<div className="p-1 rounded-sm">
								<p className="text-red-500 text-sm">
									{errors.global}
								</p>
							</div>
						)}

						<Button
							type="submit"
							disabled={isSubmitting}
							customStyle="mt-10 self-center px-8 py-2.5 md:px-8 md:py-2.5"
						>
							Sign Up
						</Button>
					</form>
				</div>
			</section>
		</>
	);
}
