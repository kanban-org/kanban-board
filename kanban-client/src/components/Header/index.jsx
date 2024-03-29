import { useState, useCallback } from "react";
import Overlay from "../UI/Overlay";
import DotMenu from "../DotMenu";
import classes from "./Header.module.scss";
import icons from "../../img/symbol-defs.svg";
import Modal from "../UI/Modal";
import { useSelector } from "react-redux";
import {
  selectBoardById,
  selectCurrentBoardId,
} from "../../state/reducers/selectors/board";
import { useActions } from "../../hooks/useActions";
import withModalForm from "../HOC/withModalForm";
import ModalForm from "../ModalForm";
import { EDIT_BOARD_FORM } from "../../utils/constants";

function Header(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [editBoard, setEditboard] = useState(false);

  const currentBoardId = useSelector((state) => selectCurrentBoardId(state));
  const board = useSelector((state) => selectBoardById(state, currentBoardId));
  const { deleteBoardRequest, tracksDelete, editBoardRequest } = useActions();

  const EditBoardForm = withModalForm(ModalForm);

  const handleMenuChange = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  const handleEditBoardModal = useCallback(() => {
    setEditboard(!editBoard);
  }, [editBoard]);

  const onDeleteBoard = useCallback(() => {
    deleteBoardRequest(currentBoardId);
    tracksDelete(currentBoardId);
    handleMenuChange();
  }, [deleteBoardRequest, currentBoardId, tracksDelete, handleMenuChange]);

  const editBoardModal = (
    <>
      <Overlay onClick={handleEditBoardModal} />
      <Modal onCloseModal={handleEditBoardModal}>
        <EditBoardForm
          handleModal={handleEditBoardModal}
          submitAction={editBoardRequest}
          formId={EDIT_BOARD_FORM}
        />
      </Modal>
    </>
  );

  return (
    <>
      <div className={classes.header}>
        <h2 className="heading--2">{board?.boardName}</h2>
        <button className="btn" onClick={handleMenuChange}>
          <svg className="svg">
            <use href={icons + "#icon-menu"}></use>
          </svg>
        </button>
        {isMenuOpen && <Overlay onClick={handleMenuChange} />}
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
    </>
  );
}

export default Header;
