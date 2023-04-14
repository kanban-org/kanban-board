import { get, post, remove, update } from "../../../API";
import {
  addBoard,
  boardsLoadError,
  boardsLoaded,
  boardsLoading,
  changeCurrentBoard,
  deleteBoard,
  editBoard,
} from "../../actions";
import { fetchTasksOfBoard } from "./taskRequest";
import { fetchTracksOfBoard } from "./trackRequest";

export const fetchBoards = () => async (dispatch) => {
  dispatch(boardsLoading());
  try {
    const { data } = await get("board/getAll");

    const newBoards = {};

    data.forEach((board) => {
      newBoards[board.id] = board;
    });

    dispatch(boardsLoaded(newBoards));

    const initalBoardId = data[0].id || "";

    const currentBoardId =
      JSON.parse(localStorage.getItem("currentBoardId")) || initalBoardId;

    dispatch(changeCurrentBoard(currentBoardId));
    dispatch(fetchTracksOfBoard(currentBoardId));
    dispatch(fetchTasksOfBoard());
  } catch (error) {
    dispatch(boardsLoadError(error));
  }
};

export const addBoardRequest = (boardInfo) => async (dispatch) => {
  const { boardName } = boardInfo;
  try {
    const boardData = {
      boardName,
    };
    const { data } = await post("board/create", boardData);
    dispatch(addBoard(data));
    const boardId = data.id;
    dispatch(changeCurrentBoard(boardId));
    dispatch(fetchTracksOfBoard(boardId));
  } catch (error) {
    dispatch(boardsLoadError(error));
  }
};

export const deleteBoardRequest = (boardId) => async (dispatch, getState) => {
  try {
    const { data } = await remove(`board/delete/${boardId}`);

    dispatch(deleteBoard(boardId));

    const firstBoard = Object.keys(getState().boards.entities)[0];
    dispatch(changeCurrentBoard(firstBoard));
    dispatch(fetchTracksOfBoard(firstBoard));
  } catch (error) {
    dispatch(boardsLoadError(error));
  }
};

export const editBoardRequest = (boardInfo) => async (dispatch, getState) => {
  const { boardName } = boardInfo;
  try {
    const currentBoardId = getState().boards.currentBoardId;

    const boardData = {
      boardName,
    };

    const { data } = await update(`board/update/${currentBoardId}`, boardData);

    dispatch(editBoard(data));
  } catch (error) {
    dispatch(boardsLoadError(error));
  }
};
