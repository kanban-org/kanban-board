import React from "react";
import classes from "./Sidebar.module.scss";
import logo_dark from "../../img/Dark-Mode-Logo.png";
import logo_light from "../../img/Light-Mode-Logo.png";

function Sidebar(props) {
	return (
		<div className={classes.sidebar}>
			<div className={classes.logo}>
				{props.theme === "dark" ? (
					<img src={logo_dark} alt="logo" />
				) : (
					<img src={logo_light} alt="logo" />
				)}

				<h1
					className={`${props.theme === "dark" ? classes.brandLight : classes.brandDark} ${
						classes.brand
					}`}>
					kanban
				</h1>
			</div>
		</div>
	);
}

export default Sidebar;
