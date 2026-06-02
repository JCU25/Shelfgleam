import { Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Signup from "./pages/signup";

function App() {
	return (
		<Routes>
			<Route index element={<Home />}></Route>
			<Route path="/signup" element={<Signup />}></Route>
		</Routes>
	);
}

export default App;
