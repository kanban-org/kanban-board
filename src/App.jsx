import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Board from "./components/Board/Board";
import axios from "axios";
import "./App.scss";

function App() {
	const [theme, setTheme] = useState("dark");
	const [data, setData] = useState([]);
	const [currentBoard, setCurrentBoard] = useState(0);

	// set the theme
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

	// fetch data from json file
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("https://639cb62c42e3ad69273a14c8.mockapi.io/api/v1/boards");
				if (!response.ok) {
					throw new Error("No data found");
				}
				const jsonData = await response.json();
				console.log(jsonData);
				setData(jsonData);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);

	const onClickMode = () => {
		if (theme === "dark") {
			setTheme("light");
		} else {
			setTheme("dark");
		}
	};

	const addNewTask = () => {
		console.log("Add a new task to the board!");
	};

	return (
		<div className="app">
			<Sidebar theme={theme} onClickMode={onClickMode} />
			<Header addNewTaskAction={addNewTask} />
			{data[currentBoard] && <Board boardData={data[currentBoard]} />}
		</div>
	);
}

export default App;
