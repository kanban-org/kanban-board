import { get, post, remove, update } from "../../../API";
import {
  addNewTrack,
  deleteTrack,
  editTrack,
  tracksLoadError,
  tracksLoaded,
  tracksLoading,
} from "../../actions";

export const fetchTracksOfBoard = () => async (dispatch, getState) => {
  dispatch(tracksLoading());
  try {
    const currentBoardId = getState().boards.currentBoardId;
    const { data } = await get(`board/getAllTracks/${currentBoardId}`);

    const newTracks = {};

    data.forEach((track) => {
      newTracks[track.id] = track;
    });

    dispatch(tracksLoaded(newTracks));
  } catch (error) {
    dispatch(tracksLoadError(error));
  }
};

export const addNewTrackRequest = (trackInfo) => async (dispatch, getState) => {
  const { trackName, color } = trackInfo;
  try {
    const currentBoardId = getState().boards.currentBoardId;

    const trackData = {
      trackName,
      boardId: currentBoardId,
      colorCode: color,
    };

    const { data } = await post(`track/create`, trackData);

    dispatch(addNewTrack(data));
  } catch (error) {
    dispatch(tracksLoadError(error));
  }
};

export const deleteTrackRequest = (trackId) => async (dispatch) => {
  try {
    const { data } = await remove(`track/delete/${trackId}`);

    if (data.success === true) {
      dispatch(deleteTrack(trackId));
    }
  } catch (error) {
    dispatch(tracksLoadError(error));
  }
};

export const editTrackRequest = (trackInfo) => async (dispatch, getState) => {
  try {
    const currentBoardId = getState().boards.currentBoardId;
    const { trackName, trackId, color } = trackInfo;

    const trackData = {
      trackName,
      boardId: currentBoardId,
      colorCode: color,
    };

    const { data } = await update(`track/update/${trackId}`, trackData);

    dispatch(editTrack(data));
  } catch (error) {
    dispatch(tracksLoadError(error));
  }
};
