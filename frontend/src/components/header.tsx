import HeaderRight from "./headerRight";
import logo from "../assets/shelfgleam-logo.svg";
import { NavLink } from "react-router-dom";

export default function Header() {
	const styles = {
		link: "whitespace-nowrap px-4 py-2 bg-transparent hover:bg-radial from-purple-200 to-white ",
	};
	return (
		<>
			<header className="relative h-14 px-2 md:px-4 w-full flex flex-row items-center justify-between bg-white py-2 shadow-sm">
				<img className="w-6" src={logo} alt="logo" />

				<div className="absolute bottom-[50%] top-[50%] left-[50%] right-[50%] hidden md:flex flex-row gap-7 items-center justify-center">
					<NavLink className={styles.link} to="/">
						Home
					</NavLink>
					<NavLink className={styles.link} to="/products">
						Products
					</NavLink>
					<NavLink className={styles.link} to="/contact">
						Contact Us
					</NavLink>
					<NavLink className={styles.link} to="/about">
						About
					</NavLink>
				</div>

				<HeaderRight />
			</header>
		</>
	);
}
