import fetchJsonData from "../../../APIs/fetchData";
import {
  boardsLoaded,
  boardsLoadError,
  boardsLoading,
  changeCurrentBoard,
  tracksLoaded,
  tracksLoadError,
  tracksLoading,
} from "../../actions";

export const fetchBoards = () => async (dispatch) => {
  dispatch(boardsLoading());
  try {
    const { data } = await fetchJsonData("board/getAll");

    const newBoards = {};

    data.forEach((board) => {
      newBoards[board.id] = board;
    });

    const initalBoardId = data[0].id || "";

    dispatch(changeCurrentBoard(initalBoardId));
    dispatch(boardsLoaded(newBoards));

    dispatch(fetchTracksOfBoard(initalBoardId));
  } catch (error) {
    dispatch(boardsLoadError(error));
  }
};

export const fetchTracksOfBoard = (boardId) => async (dispatch) => {
  dispatch(tracksLoading());
  try {
    const { data } = await fetchJsonData(`board/getAllTracks/${boardId}`);

    const newTracks = {};

    data.forEach((track) => {
      newTracks[track.id] = track;
    });

    dispatch(tracksLoaded(newTracks));
  } catch (error) {
    dispatch(tracksLoadError(error));
  }
};
