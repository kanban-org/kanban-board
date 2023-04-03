import { useSelector } from "react-redux";
import icons from "../../../img/symbol-defs.svg";
import {
  selectBoardById,
  selectCurrentBoardId,
} from "../../../state/reducers/selectors/board";
import classes from "./NavItem.module.scss";
import { useActions } from "../../../hooks/useActions";
import { useCallback } from "react";

function NavItem({ boardId }) {
  const board = useSelector((state) => selectBoardById(state, boardId));
  const currentBoardId = useSelector((state) => selectCurrentBoardId(state));
  const { changeCurrentBoard, fetchTracksOfBoard } = useActions();

  const onClickHandler = useCallback(() => {
    if (currentBoardId === boardId) {
      return;
    }
    changeCurrentBoard(boardId);
    fetchTracksOfBoard(currentBoardId);
  }, [changeCurrentBoard, boardId, currentBoardId, fetchTracksOfBoard]);

  return (
    <li
      className={`${classes.navItem} ${
        currentBoardId === boardId ? classes.active : ""
      }`}
      onClick={onClickHandler}
    >
      <svg className="svg">
        <use href={icons + "#icon-trello"}></use>
      </svg>
      <span>{board.boardName}</span>
    </li>
  );
}

export default NavItem;
