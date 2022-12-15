import { useState, useEffect } from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Board from "./components/Board/Board";

function App() {
	const [theme, setTheme] = useState("dark");

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

	const onClickMode = () => {
		if (theme === "dark") {
			setTheme("light");
		} else {
			setTheme("dark");
		}
	};

	return (
		<div className="app">
			<Sidebar theme={theme} onClickMode={onClickMode} />
			<Header />
			<Board />
		</div>
	);
}

export default App;
