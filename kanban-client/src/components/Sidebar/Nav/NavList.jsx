import React, { useContext } from "react";

import NavItem from "./NavItem";
import { globalContext } from "../../../context/globalContext";

import classes from "./NavList.module.scss";

function NavList() {
	const { allBoards } = useContext(globalContext);

	return (
		<ul className={classes.navList} role={["list"]}>
			{allBoards &&
				allBoards.map((board) => {
					return <NavItem boardName={board.name} key={board.id} id={board.id} />;
				})}
		</ul>
	);
}

export default NavList;
