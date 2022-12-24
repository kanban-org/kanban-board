import React, { useState } from "react";

export const globalContext = React.createContext();

export const GlobalContextProvider = (props) => {
	const [theme, setTheme] = useState("light");
	const [allBoards, setAllBoards] = useState([]);
	const [boardData, setBoardData] = useState(null);
	// change board id
	const [currentBoardId, setCurrentBoardId] = useState("1");

	const onChangeTheme = () => {
		if (theme === "dark") {
			setTheme("light");
		} else {
			setTheme("dark");
		}
	};

	const getHeader = () => {
		let header = "Your board name";
		allBoards.forEach((board) => {
			if (board.id === currentBoardId) {
				header = board.name;
			}
		});
		return header;
	};

	return (
		<globalContext.Provider
			value={{
				theme,
				setTheme,
				onChangeTheme,
				allBoards,
				setAllBoards,
				boardData,
				setBoardData,
				currentBoardId,
				setCurrentBoardId,
				getHeader
			}}>
			{props.children}
		</globalContext.Provider>
	);
};
