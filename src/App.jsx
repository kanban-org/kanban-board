import { useEffect, useContext } from "react";

import Header from "./containers/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Board from "./components/Board/Board";
import Overlay from "./components/UI/Overlay/Overlay";
import Modal from "./components/UI/Modal/Modal";
import AddTaskModal from "./components/Task/AddTask/AddTaskModal";

import { globalContext } from "./context/globalContext";

import "./App.scss";

function App() {
	const { theme, data, setData, currentBoard } = useContext(globalContext);

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

	const addNewTask = () => {
		console.log("Add a new task to the board!");
	};

	return (
		<div className="app">
			<Sidebar />
			<Header addNewTaskAction={addNewTask} />
			{data[currentBoard] && <Board boardData={data[currentBoard]} />}
			{/* <Overlay />
			<Modal>{<AddTaskModal />}</Modal> */}
		</div>
	);
}

export default App;
