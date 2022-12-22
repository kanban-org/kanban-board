import React, { useState } from "react";

export const globalContext = React.createContext();

export const GlobalContextProvider = (props) => {
	const [theme, setTheme] = useState("dark");
	const [data, setData] = useState([]);
	const [currentBoard, setCurrentBoard] = useState(0);

	const onChangeTheme = () => {
		if (theme === "dark") {
			setTheme("light");
		} else {
			setTheme("dark");
		}
	};

	return (
		<globalContext.Provider
			value={{ theme, setTheme, onChangeTheme, data, setData, currentBoard, setCurrentBoard }}>
			{props.children}
		</globalContext.Provider>
	);
};
