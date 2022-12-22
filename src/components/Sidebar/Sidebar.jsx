import React, { useContext } from "react";

import classes from "./Sidebar.module.scss";
import logo_dark from "../../img/Dark-Mode-Logo.png";
import logo_light from "../../img/Light-Mode-Logo.png";
import icons from "../../img/symbol-defs.svg";
import { globalContext } from "../../context/globalContext";

function Sidebar() {
	const { theme, onChangeTheme } = useContext(globalContext);

	const lightMode = (
		<button className={classes.toggleBtn} onClick={onChangeTheme}>
			<span>Dark</span>
			<svg className="svg svg-dark">
				<use href={icons + "#icon-dark"}></use>
			</svg>
		</button>
	);

	const darkMode = (
		<button className={classes.toggleBtn} onClick={onChangeTheme}>
			<span>Light</span>
			<svg className="svg svg-white">
				<use href={icons + "#icon-light"}></use>
			</svg>
		</button>
	);

	return (
		<div className={classes.sidebar}>
			<div className={classes.logo}>
				{theme === "dark" ? (
					<img src={logo_dark} alt="logo" />
				) : (
					<img src={logo_light} alt="logo" />
				)}

				<h1
					className={`${theme === "dark" ? classes.brandLight : classes.brandDark} ${
						classes.brand
					}`}>
					kanban
				</h1>
			</div>

			{theme === "dark" ? darkMode : lightMode}
		</div>
	);
}

export default Sidebar;
