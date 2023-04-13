import { ACTION_TYPE } from "../action-types";

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
