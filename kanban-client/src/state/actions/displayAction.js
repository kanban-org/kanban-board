import { ACTION_TYPE } from "../action-types";

/* Display action-creators */
const changeTheme = (theme) => ({
  type: ACTION_TYPE.THEME_CHANGE,
  payload: theme,
});

export { changeTheme };
