import React, { useState } from "react";
import Overlay from "../Overlay/Overlay";
import DotMenu from "../DotMenu/DotMenu";
import classes from "./Header.module.scss";
import icons from "../../img/symbol-defs.svg";

function Header() {
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
		<div className={classes.header}>
			<h2 className="heading--2">Platform launch</h2>
			<button className="btn btn-primary">+Add new task</button>
			<button className="btn" onClick={openMenu}>
				<svg className="svg">
					<use href={icons + "#icon-menu"}></use>
				</svg>
			</button>
			{isMenuOpen && <Overlay onClickAction={() => setIsMenuOpen(false)} />}
			{isMenuOpen && (
				<DotMenu
					onDeleteAction={onDeleteBoard}
					onEditAction={onEditBoard}
					comoponentName={"board"}
				/>
			)}
		</div>
	);
}

export default Header;
