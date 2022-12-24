import React from "react";
import NavList from "./NavList";
import icons from "../../../img/symbol-defs.svg";
import classes from "./SideNav.module.scss";

function SideNav() {
	return (
		<div>
			<h4 className="heading--4 mb-sm">All boards (8)</h4>
			<NavList />
			<button className={"btn " + classes.btnAdd}>
				<svg className="svg svg-primary">
					<use href={icons + "#icon-trello"}></use>
				</svg>
				<span className="heading--3">+ Create board</span>
			</button>
		</div>
	);
}

export default SideNav;
