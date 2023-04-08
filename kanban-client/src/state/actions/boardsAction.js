import { ACTION_TYPE } from "../action-types";

/* Boards action-creators */
export const boardsLoading = () => ({
  type: ACTION_TYPE.BOARDS_LOADING,
});

export const boardsLoaded = (boards) => ({
  type: ACTION_TYPE.BOARDS_LOADED,
  payload: boards,
});

export const boardsLoadError = (error) => ({
  type: ACTION_TYPE.BOARDS_LOAD_ERROR,
  payload: error,
});

export const changeCurrentBoard = (boardId) => ({
  type: ACTION_TYPE.CHANGE_CURRENT_BOARD,
  payload: boardId,
});

export const addBoard = (board) => ({
  type: ACTION_TYPE.BOARD_ADD,
  payload: board,
});

export const deleteBoard = (boardId) => ({
  type: ACTION_TYPE.BOARD_DELETE,
  payload: boardId,
});

export const editBoard = (board) => ({
  type: ACTION_TYPE.BOARD_EDIT,
  payload: board,
});

export const toggleCreateBoardModal = () => ({
  type: ACTION_TYPE.TOGGLE_CREATE_BOARD_MODAL,
});
