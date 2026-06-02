import { Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  return (
		<Routes>
			<Route index element={<Home />}></Route>
		</Routes>
	);
}

export default App;
