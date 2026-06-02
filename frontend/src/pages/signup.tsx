export default function Signup() {
	const styles = {
		input: "px-1 py-0.5 md:px-2 md:py-1 bg-purple-200 focus:outline-purple-500 focus:bg-white placeholder:text-black/50 text-black text-xs md:text-lg rounded-sm border border-white/10",
	};

	return (
		<>
			<section className="min-w-svw flex flex-row items-center px-4 md:px-0 bg-purple-700 min-h-svh overflow:auto">
				<div className="absolute z-0 bottom-0 left-0 flex bg-black w-full h-[50%]"></div>

				<div className="hidden md:flex z-1 w-1/2 min-h-svh bg-white">
					{/* <p>LEARN MORE ABOUT BOOKS AND EXPAND YOUR SHELVES!</p> */}
				</div>

				<div className="z-1 md:py-4 flex flex-col px-2 w-[100%] md:w-1/2">
					<div className="flex flex-col items-center z-1">
						<h1 className="text-center text-white text-3xl md:text-4xl mt-10 md:mt-20 font-bold">
							Welcome to Shelfgleam
						</h1>
						<p className="text-xs md:text-lg text-white/60 mt-2">
							A place to explore, and expand your bookshelf!
						</p>
					</div>

					<form
						method="POST"
						className="flex flex-col gap-3 w-full md:w-3/5 self-center rounded-lg z-1 px-4 py-8 md:px-8 bg-zinc-800 mt-10"
					>
						<input
							className={styles.input}
							name="username"
							type="text"
							placeholder="username"
						/>
						<input
							className={styles.input}
							name="email"
							type="text"
							placeholder="email"
						/>
						<input
							className={styles.input}
							name="password"
							type="password"
							placeholder="password"
						/>
						<input
							className={styles.input}
							name="confirmPassword"
							type="password"
							placeholder="confirm password"
						/>
						<input
							className={styles.input}
							name="displayName"
							type="text"
							placeholder="Display Name"
						/>
						<a
							href=""
							className="bg-purple-600 text-white rounded-md px-4 py-0.5 text-center text-sm md:text-lg mt-10 "
							type="submit"
						>
							Sign Up
						</a>
					</form>
				</div>
			</section>
		</>
	);
}
