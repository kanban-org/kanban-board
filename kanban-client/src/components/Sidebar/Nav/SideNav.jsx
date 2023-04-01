import React, { useState } from "react";
import icons from "../../../img/symbol-defs.svg";
import AddBoardForm from "../../AddBoardForm";
import Modal from "../../UI/Modal";
import Overlay from "../../UI/Overlay";
import NavList from "./NavList";
import classes from "./SideNav.module.scss";

function SideNav() {
  const [openCreateBoardModal, setOpenCreateBoardModal] = useState(false);

  const createBoardModal = (
    <>
      <Overlay />
      <Modal
        styles={{ height: "max-content" }}
        onCloseModal={() => setOpenCreateBoardModal(false)}
      >
        <AddBoardForm />
      </Modal>
    </>
  );

  return (
    <div>
      <h4 className="heading--4 mb-sm">All boards (8)</h4>
      <NavList />
      <button
        className={"btn " + classes.btnAdd}
        onClick={() => setOpenCreateBoardModal(true)}
      >
        <svg className="svg svg-primary">
          <use href={icons + "#icon-trello"}></use>
        </svg>
        <span className="heading--3">+ Create board</span>
      </button>

      {openCreateBoardModal && createBoardModal}
    </div>
  );
}

export default SideNav;
