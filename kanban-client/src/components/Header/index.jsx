import { useState } from "react";
import Overlay from "../UI/Overlay";
import DotMenu from "../DotMenu";
import classes from "./Header.module.scss";
import icons from "../../img/symbol-defs.svg";
import AddTaskForm from "../Task/AddTaskForm";
import Modal from "../UI/Modal";
import { useSelector } from "react-redux";
import { selectCurrentBoardId } from "../../state/reducers/selectors/board";
import { useActions } from "../../hooks/useActions";

function Header(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openAddTaskModal, setOpenAddTaskModal] = useState(false);
  const currentBoardId = useSelector((state) => selectCurrentBoardId(state));
  const { deleteBoardRequest, tracksDelete } = useActions();

  const openMenu = (e) => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    } else {
      setIsMenuOpen(true);
    }
  };

  const onDeleteBoard = () => {
    deleteBoardRequest(currentBoardId);
    tracksDelete(currentBoardId);
    setIsMenuOpen(!isMenuOpen);
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
        <h2 className="heading--2">{}</h2>
        <button
          className="btn btn-primary"
          onClick={() => setOpenAddTaskModal(true)}
        >
          + Add new task
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
