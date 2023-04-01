import ACTION_TYPE from "../action-types";

const initialState = {
  theme: "light",
};

export default function displayReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPE.THEME_CHANGE:
      return {
        ...state,
        theme: action.payload,
      };

    default:
      return state;
  }
}
