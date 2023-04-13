import icons from "../../../img/symbol-defs.svg";
import Modal from "../../UI/Modal";
import Overlay from "../../UI/Overlay";
import NavList from "./NavList";
import classes from "./SideNav.module.scss";
import ModalForm from "../../ModalForm";
import withModalForm from "../../HOC/withModalForm";
import { useActions } from "../../../hooks/useActions";
import { useSelector } from "react-redux";
import { selectBoardCount } from "../../../state/reducers/selectors/board";
import { useCallback } from "react";

function SideNav() {
  const { addBoardRequest, toggleCreateBoardModal } = useActions();
  const boardModal = useSelector((state) => state.boards.createBoardModal);
  const boardCount = useSelector((state) => selectBoardCount(state));

  const handleAddBoardModal = useCallback(() => {
    toggleCreateBoardModal();
  }, [toggleCreateBoardModal]);

  const AddBoardForm = withModalForm(ModalForm);

  const createBoardModal = (
    <>
      <Overlay />
      <Modal
        styles={{ height: "max-content" }}
        onCloseModal={handleAddBoardModal}
      >
        <AddBoardForm
          handleModal={handleAddBoardModal}
          initialValues={{
            heading: "Add new board",
            buttonTitle: "Create new board",
            label: "Board Name",
          }}
          submitAction={addBoardRequest}
        />
      </Modal>
    </>
  );

  return (
    <div>
      <h4 className="heading--4 mb-sm">All boards ({boardCount})</h4>
      <NavList />
      <button className={"btn " + classes.btnAdd} onClick={handleAddBoardModal}>
        <svg className="svg svg-primary">
          <use href={icons + "#icon-trello"}></use>
        </svg>
        <span className="heading--3">+ Create board</span>
      </button>

      {boardModal && createBoardModal}
    </div>
  );
}

export default SideNav;
