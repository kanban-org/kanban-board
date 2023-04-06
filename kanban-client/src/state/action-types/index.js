import { boardsActionType } from "./boardsActionType";
import { displayActionType } from "./displayActionType";
import { tracksActionType } from "./tracksActionType";
import { tasksActionType } from "./tasksActionType";

export const ACTION_TYPE = {
  ...displayActionType,
  ...boardsActionType,
  ...tracksActionType,
  ...tasksActionType,
};
