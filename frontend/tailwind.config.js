/** @type {import("tailwindcss").Config} */
export default {
	// content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			fontFamily: {
				sans: ["Quicksand", "sans-serif"],
			},
			colors: {
				"shelf-red": {
					400: "#F32323",
				},
				"shelf-black": {
					700: "#4B4B4B",
				},
				"shelf-purple": {
					200: "#EDE1FF",
				},
			},
		},
	},
	plugins: [],
};
