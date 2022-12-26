import React, { useContext } from "react";
import { globalContext } from "../../../context/globalContext";
import icons from "../../../img/symbol-defs.svg";
import classes from "./NavItem.module.scss";

function NavItem({ boardName, id }) {
	const { currentBoardId, setCurrentBoardId } = useContext(globalContext);

	const onClickHandler = () => {
		if (currentBoardId === id) {
			return;
		}
		setCurrentBoardId(id);
	};

	return (
		<li
			className={`${classes.navItem} ${currentBoardId === id ? classes.active : ""}`}
			onClick={onClickHandler}>
			<svg className="svg">
				<use href={icons + "#icon-trello"}></use>
			</svg>
			<span>{boardName}</span>
		</li>
	);
}

export default NavItem;
