import {
  addNewTrack,
  addBoard,
  deleteBoard,
  editBoard,
  boardsLoaded,
  boardsLoadError,
  boardsLoading,
  changeCurrentBoard,
  deleteTrack,
  editTrack,
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

export const addBoardRequest = (boardInfo) => async (dispatch) => {
  try {
    const boardData = {
      boardName: boardInfo.input,
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
  try {
    const currentBoardId = getState().boards.currentBoardId;

    const boardData = {
      boardName: boardInfo.input,
    };

    const { data } = await update(`board/update/${currentBoardId}`, boardData);

    dispatch(editBoard(data));
  } catch (error) {
    dispatch(boardsLoadError(error));
  }
};

export const addNewTrackRequest = (trackInfo) => async (dispatch, getState) => {
  try {
    const currentBoardId = getState().boards.currentBoardId;

    const trackData = {
      trackName: trackInfo.input,
      boardId: currentBoardId,
      colorCode: trackInfo.color,
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
    const { trackId } = trackInfo;

    const trackData = {
      trackName: trackInfo.input,
      boardId: currentBoardId,
      colorCode: trackInfo.color,
    };

    const { data } = await update(`track/update/${trackId}`, trackData);

    dispatch(editTrack(data));
  } catch (error) {
    dispatch(tracksLoadError(error));
  }
};
