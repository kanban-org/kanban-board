import { ACTION_TYPE } from "../action-types";

const initialState = {
  currentBoardId: null,
  entities: {},
  status: "idle",
  error: null,
  createBoardModal: false,
};

export default function boardsReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPE.BOARDS_LOADED:
      return {
        ...state,
        status: "idle",
        entities: action.payload,
      };

    case ACTION_TYPE.BOARD_ADD:
      const data = action.payload;
      return {
        ...state,
        status: "idle",
        entities: {
          ...state.entities,
          [data.id]: data,
        },
      };

    case ACTION_TYPE.BOARD_DELETE:
      const boardId = action.payload;
      const { [boardId]: deletedBoard, ...remainingEntities } = state.entities;

      return {
        ...state,
        status: "idle",
        entities: remainingEntities,
      };

    case ACTION_TYPE.BOARD_EDIT: {
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

    case ACTION_TYPE.TOGGLE_CREATE_BOARD_MODAL:
      return {
        ...state,
        createBoardModal: !state.createBoardModal,
      };

    default:
      return state;
  }
}
