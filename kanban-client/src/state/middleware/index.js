import { ACTION_TYPE } from "../action-types";

export const addCurrentBoardToLocalStorage = (store) => (next) => (action) => {
  if (action.type === ACTION_TYPE.CHANGE_CURRENT_BOARD) {
    localStorage.setItem("currentBoardId", JSON.stringify(action.payload));
  }
  next(action);
};
