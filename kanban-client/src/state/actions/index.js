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
