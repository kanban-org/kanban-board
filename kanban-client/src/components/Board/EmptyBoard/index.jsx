import NoDataSvg from "./NoDataSvg.jsx";
import classes from "./EmptyBoard.module.scss";
import { memo } from "react";

const EmptyBoard = () => {
  return (
    <div className={classes.noBoardsContainer}>
      <NoDataSvg />
      <div className={classes.noBoards}>
        <h3 className="heading--1">No boards found!</h3>
        <h5 className="heading--5">
          Create a board to start adding tracks and tasks to it.
        </h5>
      </div>
    </div>
  );
};

export default memo(EmptyBoard);
