import { ACTION_TYPE } from "../action-types";

/* Tracks action-creators */
const tracksLoading = () => ({
  type: ACTION_TYPE.TRACKS_LOADING,
});

const tracksLoaded = (tracks) => ({
  type: ACTION_TYPE.TRACKS_LOADED,
  payload: tracks,
});

const tracksLoadError = (error) => ({
  type: ACTION_TYPE.TRACKS_LOAD_ERROR,
  payload: error,
});

const tracksDelete = (boardId) => ({
  type: ACTION_TYPE.TRACKS_DELETE,
  payload: boardId,
});

const addNewTrack = (track) => ({
  type: ACTION_TYPE.ADD_NEW_TRACK,
  payload: track,
});

const deleteTrack = (trackId) => ({
  type: ACTION_TYPE.DELETE_TRACK,
  payload: trackId,
});

const editTrack = (track) => ({
  type: ACTION_TYPE.EDIT_TRACK,
  payload: track,
});

export {
  tracksLoading,
  tracksLoaded,
  tracksLoadError,
  tracksDelete,
  addNewTrack,
  deleteTrack,
  editTrack,
};
