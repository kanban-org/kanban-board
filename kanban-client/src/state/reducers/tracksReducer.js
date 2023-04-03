import ACTION_TYPE from "../action-types";

const initialState = {
  entities: {},
  status: "idle",
  error: null,
};

export default function tracksReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPE.TRACKS_LOADED:
      return {
        ...state,
        entities: action.payload,
        status: "idle",
      };

    case ACTION_TYPE.TRACKS_LOADING:
      return {
        ...state,
        status: "loading",
      };

    case ACTION_TYPE.TRACKS_LOAD_ERROR:
      return {
        ...state,
        status: "error",
        error: action.payload,
      };

    default:
      return state;
  }
}
