import {
  boardAdd,
  boardDelete,
  boardEdit,
  boardsLoaded,
  boardsLoadError,
  boardsLoading,
  changeCurrentBoard,
  tracksLoaded,
  tracksLoadError,
  tracksLoading,
} from "../../actions";
import { get, post, remove, update } from "../../../API";

export const fetchBoards = () => async (dispatch, state) => {
  dispatch(boardsLoading());
  try {
    const { data } = await get("board/getAll");

    const newBoards = {};

    data.forEach((board) => {
      newBoards[board.id] = board;
    });

    dispatch(boardsLoaded(newBoards));

    const initalBoardId = data[0].id || "";

    dispatch(changeCurrentBoard(initalBoardId));

    dispatch(fetchTracksOfBoard(initalBoardId));
  } catch (error) {
    dispatch(boardsLoadError(error));
  }
};

export const fetchTracksOfBoard = (boardId) => async (dispatch) => {
  dispatch(tracksLoading());
  try {
    const { data } = await get(`board/getAllTracks/${boardId}`);

    const newTracks = {};

    data.forEach((track) => {
      newTracks[track.id] = track;
    });

    dispatch(tracksLoaded(newTracks));
  } catch (error) {
    dispatch(tracksLoadError(error));
  }
};

export const addBoardRequest = (boardData) => async (dispatch) => {
  try {
    const { data } = await post("board/create", boardData);
    dispatch(boardAdd(data));
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

    dispatch(boardDelete(boardId));

    const firstBoard = Object.keys(getState().boards.entities)[0];
    dispatch(changeCurrentBoard(firstBoard));
    dispatch(fetchTracksOfBoard(firstBoard));
  } catch (error) {
    dispatch(boardsLoadError(error));
  }
};

export const editBoardRequest = (boardData) => async (dispatch, getState) => {
  try {
    const currentBoardId = getState().boards.currentBoardId;

    const { data } = await update(`board/update/${currentBoardId}`, boardData);

    dispatch(boardEdit(data));
  } catch (error) {
    dispatch(boardsLoadError(error));
  }
};
