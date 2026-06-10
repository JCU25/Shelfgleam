import { Link } from "react-router-dom";
import Header from "../components/Header";
export default function Home() {
	return (
		<>
			<Header></Header>

			<section className="relative dark:bg-linear-to-b from-black to-shelf-black-700 min-h-svh">
				<img
					src="/src/assets/bookshelf-image.png"
					alt="bookshelf image"
					className="hidden md:flex md:w-full"
				/>

				<div className="px-4 md:px-8 py-4">
					<div className="flex flex-row justify-between">
						<h1 className="text-md">What's Trending?</h1>
						<Link
							className="relative text-purple-800 hover:text-purple-700 group py-0.5"
							to={"/products"}
						>
							See all
							<div className="absolute bottom-0 right-0 w-12 border-b border-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
						</Link>
					</div>

					{/* items here */}
				</div>
			</section>
		</>
	);
}
