import HeaderRight from "./headerRight";
import logo from "../assets/vite.svg";

export default function Header() {
	const styles = {
		a: "flex flex-row align-center justify-center",
	};
	return (
		<>
			<header className="h-8 flex flex-row align-center justify-between px-4">
				<img className="w-10" src={logo} alt="logo" />

				<div className="hidden md:flex bg-white flex-row gap-7 justify-center">
					<a className={styles.a} href="/home">
						<p>Home</p>
					</a>
					<a className={styles.a} href="/products">
						<p>Products</p>
					</a>
					<a className={styles.a} href="/contact-us">
						<p>Contact Us</p>
					</a>
					<a className={styles.a} href="/about">
						<p>About</p>
					</a>
				</div>

				<HeaderRight />
			</header>
		</>
	);
}
