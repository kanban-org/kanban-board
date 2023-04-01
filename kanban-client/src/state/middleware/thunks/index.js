import fetchJsonData from "../../../APIs/fetchData";
import {
  boardsLoaded,
  boardsLoadError,
  boardsLoading,
  tracksLoaded,
  tracksLoadError,
  tracksLoading,
} from "../../actions";

export const fetchBoards = () => async (dispatch) => {
  dispatch(boardsLoading());
  try {
    const { boards } = await fetchJsonData("/data/boards.json");

    const newBoards = {};

    boards.forEach((board) => {
      newBoards[board.id] = board;
    });

    dispatch(boardsLoaded(newBoards));
  } catch (error) {
    dispatch(boardsLoadError(error));
  }
};

export const fetchTracks = () => async (dispatch) => {
  dispatch(tracksLoading());
  try {
    const { tracks } = await fetchJsonData("/data/tracks.json");

    const newTracks = {};

    tracks.forEach((track) => {
      newTracks[tracks.id] = track;
    });
    console.log(tracks);
    dispatch(tracksLoaded(newTracks));
  } catch (error) {
    dispatch(tracksLoadError(error));
  }
};
