import ACTION_TYPE from "../action-types";

/* Display action-creators */
export const changeTheme = (theme) => ({
  type: ACTION_TYPE.THEME_CHANGE,
  payload: theme,
});

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

export const boardAdd = (board) => ({
  type: ACTION_TYPE.BOARD_ADD,
  payload: board,
});

export const boardDelete = (boardId) => ({
  type: ACTION_TYPE.BOARD_DELETE,
  payload: boardId,
});

export const boardEdit = (board) => ({
  type: ACTION_TYPE.BOARD_EDIT,
  payload: board,
});

/* Tracks action-creators */
export const tracksLoading = () => ({
  type: ACTION_TYPE.TRACKS_LOADING,
});

export const tracksLoaded = (tracks) => ({
  type: ACTION_TYPE.TRACKS_LOADED,
  payload: tracks,
});

export const tracksLoadError = (error) => ({
  type: ACTION_TYPE.TRACKS_LOAD_ERROR,
  payload: error,
});

export const tracksDelete = (boardId) => ({
  type: ACTION_TYPE.TRACKS_DELETE,
  payload: boardId,
});

export const addNewTrack = (track) => ({
  type: ACTION_TYPE.ADD_NEW_TRACK,
  payload: track,
});

export const deleteTrack = (trackId) => ({
  type: ACTION_TYPE.DELETE_TRACK,
  payload: trackId,
});

export const editTrack = (track) => ({
  type: ACTION_TYPE.EDIT_TRACK,
  payload: track,
});
