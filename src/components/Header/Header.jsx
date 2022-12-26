import React, { useContext, useState } from "react";
import Overlay from "../../components/UI/Overlay/Overlay";
import DotMenu from "../../components/DotMenu/DotMenu";
import classes from "./Header.module.scss";
import icons from "../../img/symbol-defs.svg";
import AddTaskForm from "../Task/AddTaskForm/AddTaskForm";
import { globalContext } from "../../context/globalContext";
import Modal from "../UI/Modal/Modal";

function Header(props) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [openAddTaskModal, setOpenAddTaskModal] = useState(false);
	const { getHeader } = useContext(globalContext);

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

	const addTaskModal = (
		<>
			<Overlay />
			<Modal onCloseModal={() => setOpenAddTaskModal(false)}>
				<AddTaskForm />
			</Modal>
		</>
	);

	return (
		<>
			<div className={classes.header}>
				<h2 className="heading--2">{getHeader()}</h2>
				<button className="btn btn-primary" onClick={() => setOpenAddTaskModal(true)}>
					+Add new task
				</button>
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

			{openAddTaskModal && addTaskModal}
		</>
	);
}

export default Header;
