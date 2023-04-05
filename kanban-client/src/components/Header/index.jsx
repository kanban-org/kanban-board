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
import withModalForm from "../HOC/withModalForm";
import ModalForm from "../ModalForm";

function Header(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openAddTaskModal, setOpenAddTaskModal] = useState(false);
  const [editBoard, setEditboard] = useState(false);

  const currentBoardId = useSelector((state) => selectCurrentBoardId(state));
  const { deleteBoardRequest, tracksDelete, editBoardRequest } = useActions();

  const EditBoardForm = withModalForm(ModalForm);

  const handleMenuChange = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAddTaskModal = () => {
    setOpenAddTaskModal(!openAddTaskModal);
  };

  const handleEditBoardModal = () => {
    setEditboard(!editBoard);
  };

  const onDeleteBoard = () => {
    deleteBoardRequest(currentBoardId);
    tracksDelete(currentBoardId);
    handleMenuChange();
  };

  const addTaskModal = (
    <>
      <Overlay />
      <Modal onCloseModal={handleAddTaskModal}>
        <AddTaskForm />
      </Modal>
    </>
  );

  const editBoardModal = (
    <>
      <Overlay />
      <Modal
        styles={{ height: "max-content" }}
        onCloseModal={handleEditBoardModal}
      >
        <EditBoardForm
          handleModal={handleEditBoardModal}
          initialValues={{
            heading: "Edit board",
            buttonTitle: "Edit board",
            label: "Board Name",
          }}
          submitAction={editBoardRequest}
        />
      </Modal>
    </>
  );

  return (
    <>
      <div className={classes.header}>
        <h2 className="heading--2">{}</h2>
        <button className="btn btn-primary" onClick={handleAddTaskModal}>
          + Add new task
        </button>
        <button className="btn" onClick={handleMenuChange}>
          <svg className="svg">
            <use href={icons + "#icon-menu"}></use>
          </svg>
        </button>
        {isMenuOpen && <Overlay onClickAction={handleMenuChange} />}
        {isMenuOpen && (
          <DotMenu
            onDeleteAction={onDeleteBoard}
            onEditAction={handleEditBoardModal}
            comoponentName={"board"}
            onMenuChange={handleMenuChange}
          />
        )}
      </div>
      {editBoard && editBoardModal}
      {openAddTaskModal && addTaskModal}
    </>
  );
}

export default Header;
