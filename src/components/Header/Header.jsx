import React from "react";
import classes from "./Header.module.scss";
import icons from "../../img/symbol-defs.svg";

function Header() {
	return (
		<div className={classes.header}>
			<h2 className="heading--2">Platform launch</h2>
			<button className="btn btn-primary">+Add new task</button>
			<button className="btn">
				<svg className="svg">
					<use href={icons + "#icon-menu"}></use>
				</svg>
			</button>
		</div>
	);
}

export default Header;
