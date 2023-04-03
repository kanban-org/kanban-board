import ACTION_TYPE from "../action-types";

const initialState = {
  currentBoardId: null,
  entities: {},
  status: "idle",
  error: null,
};

export default function boardsReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPE.BOARDS_LOADED:
      return {
        ...state,
        status: "idle",
        entities: action.payload,
      };

    case ACTION_TYPE.BOARDS_LOADING:
      return {
        ...state,
        status: "loading",
      };

    case ACTION_TYPE.BOARDS_LOAD_ERROR:
      return {
        ...state,
        status: "error",
        error: action.payload,
      };

    case ACTION_TYPE.CHANGE_CURRENT_BOARD:
      return {
        ...state,
        currentBoardId: action.payload,
      };

    default:
      return state;
  }
}
