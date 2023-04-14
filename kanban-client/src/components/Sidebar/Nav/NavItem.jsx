import { useSelector } from "react-redux";
import icons from "../../../img/symbol-defs.svg";
import {
  selectBoardById,
  selectCurrentBoardId,
} from "../../../state/reducers/selectors/board";
import classes from "./NavItem.module.scss";
import { useActions } from "../../../hooks/useActions";
import { useCallback } from "react";
import Tooltip from "../../UI/Tooltip";

function NavItem({ boardId }) {
  const board = useSelector((state) => selectBoardById(state, boardId));
  const currentBoardId = useSelector((state) => selectCurrentBoardId(state));
  const {
    changeCurrentBoard,
    fetchTracksOfBoard,
    fetchTasksOfBoard,
    removeTasks,
  } = useActions();

  const onClickHandler = useCallback(() => {
    if (currentBoardId === boardId) {
      return;
    }
    changeCurrentBoard(boardId);
    fetchTracksOfBoard();
    fetchTasksOfBoard();
    removeTasks();
  }, [
    changeCurrentBoard,
    boardId,
    currentBoardId,
    fetchTracksOfBoard,
    fetchTasksOfBoard,
    removeTasks,
  ]);

  return (
    <Tooltip content={`${board.boardName}`} direction="right">
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
    </Tooltip>
  );
}

export default NavItem;
