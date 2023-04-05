import { ACTION_TYPE } from "../action-types";

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

    case ACTION_TYPE.TRACKS_DELETE:
      return {
        ...state,
        entities: {},
      };

    case ACTION_TYPE.DELETE_TRACK:
      const trackId = action.payload;
      const { [trackId]: deletedTrack, ...remainingEntities } = state.entities;

      return {
        ...state,
        status: "idle",
        entities: remainingEntities,
      };

    case ACTION_TYPE.EDIT_TRACK: {
      const data = action.payload;

      return {
        ...state,
        status: "idle",
        entities: {
          ...state.entities,
          [data.id]: data,
        },
      };
    }

    case ACTION_TYPE.ADD_NEW_TRACK: {
      const data = action.payload;

      return {
        ...state,
        status: "idle",
        entities: {
          ...state.entities,
          [data.id]: data,
        },
      };
    }

    default:
      return state;
  }
}
