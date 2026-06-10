import { useEffect, useState } from "react";
import shelfLogo from "../assets/shelfgleam-logo.svg";
import { api } from "../utlils/authenticatedApi";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

interface LoginInput {
	usernameOrEmail: FormDataEntryValue | null;
	password: FormDataEntryValue | null;
}

export default function Login() {
	const [error, setError] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [success, setSucess] = useState(false);
	const navigate = useNavigate();
	const styles = {
		input: "px-2 py-1.5 md:px-2 bg-purple-200 focus:outline-purple-500 focus:bg-white placeholder:text-black/50 text-black text-sm rounded-sm border border-purple-800/10 ",
		label: "text-black text-xs dark:text-gray-300 text-gray-500",
		inputDiv: "flex flex-col gap-1",
		error: "text-shelf-red-400 text-xs md:text-sm",
	};

	const fetchApi = async (data: LoginInput) => {
		try {
			await api.post("/users/login", data);
			setSucess(true);
		} catch (error) {
			setError(true);
		}
	};

	const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		setSubmitting(true);
		e.preventDefault();

		const formData = new FormData(e.currentTarget);

		await fetchApi({
			usernameOrEmail: formData.get("username-email"),
			password: formData.get("password"),
		});
		setSubmitting(false);
	};

	useEffect(() => {
		if (success) navigate("/");
	}, [success]);

	return (
		<section className="min-h-svh flex flex-col md:items-center p-4 bg-linear-to-r from-purple-200 to-white dark:purple-500 dark:to-black">
			<div className="flex flex-col md:w-1/4 items-center mt-20 gap-4">
				<img
					className="w-10 h-10"
					src={shelfLogo}
					alt="Shelfgleam Logo"
				/>
				<h1 className="">SHELFGLEAM</h1>

				<form
					className="flex flex-col w-full gap-2"
					onSubmit={handleSubmit}
				>
					<div className={styles.inputDiv}>
						<label className={styles.label} htmlFor="username">
							Username or Email
						</label>
						<input
							className={styles.input}
							type="text"
							name="username-email"
						/>
					</div>
					<div className={styles.inputDiv}>
						<label className={styles.label} htmlFor="password">
							Password
						</label>
						<input
							className={styles.input}
							type="password"
							name="password"
						/>
					</div>

					<div>
						{error && (
							<p className={styles.error}>Invalid credentials</p>
						)}
					</div>

					<Button type="submit" disabled={submitting}>
						Login
					</Button>
				</form>
			</div>
		</section>
	);
}
