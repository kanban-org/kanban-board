import React, { useState } from "react";
import Overlay from "../Overlay/Overlay";
import DotMenu from "../DotMenu/DotMenu";
import icons from "../../img/symbol-defs.svg";
import classes from "./TaskStatusBar.module.scss";

function TaskStatusBar({ colorCode, statusName, taskCount }) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const openMenu = (e) => {
		if (isMenuOpen) {
			setIsMenuOpen(false);
		} else {
			setIsMenuOpen(true);
		}
	};

	const onDeleteBoard = () => {
		console.log("Board deleted");
	};

	const onEditBoard = () => {
		console.log("Edit board");
	};

	return (
		<div className={classes.statusBar}>
			<div className={classes.statusColorBox} style={{ backgroundColor: `${colorCode}` }}></div>
			<h4 className="heading--4">
				{statusName} <span>({taskCount})</span>
			</h4>
			<button className="btn" onClick={openMenu}>
				<svg className="svg">
					<use href={icons + "#icon-horizontal-dots"}></use>
				</svg>
			</button>
			{isMenuOpen && <Overlay onClickAction={() => setIsMenuOpen(false)} />}
			{isMenuOpen && (
				<DotMenu
					onDeleteAction={onDeleteBoard}
					onEditAction={onEditBoard}
					comoponentName={"column"}
				/>
			)}
		</div>
	);
}

export default TaskStatusBar;
