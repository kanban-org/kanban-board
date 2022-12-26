import { useEffect, useContext } from "react";

import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Board from "./components/Board/Board";
// import Overlay from "./components/UI/Overlay/Overlay";
// import Modal from "./components/UI/Modal/Modal";
// import AddTaskModal from "./components/Task/AddTaskForm/AddTaskForm";

import { globalContext } from "./context/globalContext";
import KanbanApi from "./APIs/KanbanApi";

import "./App.scss";

function App() {
	const { theme, setAllBoards, boardData, setBoardData, currentBoardId } =
		useContext(globalContext);

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
				const response = await KanbanApi.get("/boards");
				const data = response.data;
				setAllBoards(data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, [setAllBoards]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await KanbanApi.get(`/boards/${currentBoardId}/tasks`);
				const data = response.data[0];
				setBoardData(data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, [currentBoardId, setBoardData]);

	return (
		<div className="app">
			<Sidebar />
			<Header />
			{boardData && <Board boardData={boardData} />}
			{/* <Overlay />
			<Modal>{<AddTaskModal />}</Modal> */}
		</div>
	);
}

export default App;
