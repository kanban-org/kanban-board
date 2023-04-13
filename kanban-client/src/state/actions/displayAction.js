import { ACTION_TYPE } from "../action-types";

/* Display action-creators */
export const changeTheme = (theme) => ({
  type: ACTION_TYPE.THEME_CHANGE,
  payload: theme,
});
