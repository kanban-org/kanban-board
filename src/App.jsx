import { useState, useEffect } from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Board from "./components/Board/Board";

function App() {
	const [theme, setTheme] = useState("light");

	useEffect(() => {
		const changeTheme = () => {
			if (theme === "dark") {
				document.documentElement.className = "dark-theme";
			} else {
				document.documentElement.className = "";
			}
		};
		changeTheme();
	}, [theme]);

	return (
		<div className="app">
			<Sidebar theme={theme} />
			<Header />
			<Board />
		</div>
	);
}

export default App;
