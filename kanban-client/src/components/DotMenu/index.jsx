import React from "react";
import classes from "./DotMenu.module.scss";
import icons from "../../img/symbol-defs.svg";

function DotMenu({
  comoponentName,
  onDeleteAction,
  onEditAction,
  onMenuChange,
}) {
  const handleEditChange = () => {
    onEditAction();
    onMenuChange();
  };

  return (
    <div className={classes.menu}>
      <ul role={["list"]} className={classes.menuList}>
        <li key="deleteButton">
          <button className="btn" onClick={onDeleteAction}>
            <svg className="svg">
              <use href={icons + "#icon-delete"}></use>
            </svg>
            <span>Delete {comoponentName}</span>
          </button>
        </li>

        <li key="editButton">
          <button className="btn" onClick={handleEditChange}>
            <svg className="svg">
              <use href={icons + "#icon-edit"}></use>
            </svg>
            <span>Edit {comoponentName}</span>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default DotMenu;
