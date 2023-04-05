import { ACTION_TYPE } from "../action-types";

/* Boards action-creators */
const boardsLoading = () => ({
  type: ACTION_TYPE.BOARDS_LOADING,
});

const boardsLoaded = (boards) => ({
  type: ACTION_TYPE.BOARDS_LOADED,
  payload: boards,
});

const boardsLoadError = (error) => ({
  type: ACTION_TYPE.BOARDS_LOAD_ERROR,
  payload: error,
});

const changeCurrentBoard = (boardId) => ({
  type: ACTION_TYPE.CHANGE_CURRENT_BOARD,
  payload: boardId,
});

const addBoard = (board) => ({
  type: ACTION_TYPE.BOARD_ADD,
  payload: board,
});

const deleteBoard = (boardId) => ({
  type: ACTION_TYPE.BOARD_DELETE,
  payload: boardId,
});

const editBoard = (board) => ({
  type: ACTION_TYPE.BOARD_EDIT,
  payload: board,
});

export {
  boardsLoading,
  boardsLoaded,
  boardsLoadError,
  addBoard,
  deleteBoard,
  editBoard,
  changeCurrentBoard,
};
