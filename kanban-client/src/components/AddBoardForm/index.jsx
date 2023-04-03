import React, { useState } from "react";
import classes from "../Forms/Forms.module.scss";
import { useActions } from "../../hooks/useActions";

function AddBoardForm({ handleModal }) {
  const [boardName, setBoardName] = useState("");
  const { addBoardRequest } = useActions();

  const handleFormChange = (e) => {
    setBoardName(e.target.value);
  };

  const handleAddBoardSubmit = (e) => {
    e.preventDefault();
    const boardData = {
      boardName,
    };
    addBoardRequest(boardData);
    handleModal();
  };

  return (
    <>
      <h3 className="heading--3 mb-sm">Add new board</h3>
      <form
        className={classes.form}
        autoComplete="off"
        onSubmit={handleAddBoardSubmit}
      >
        <div className={classes.form__group}>
          <label htmlFor="boardName" className={classes.form__label}>
            Board Name
          </label>
          <input
            type="text"
            id="boardName"
            className={classes.form__input}
            placeholder="e.g. Platform launch"
            value={boardName}
            onChange={handleFormChange}
          />
        </div>
        <button className="btn btn-primary btn-sm">Create new board</button>
      </form>
    </>
  );
}

export default AddBoardForm;
