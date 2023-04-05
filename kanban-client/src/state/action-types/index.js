import { boardsActionType } from "./boardsActionType";
import { displayActionType } from "./displayActionType";
import { tracksActionType } from "./tracksActionType";

export const ACTION_TYPE = {
  ...displayActionType,
  ...boardsActionType,
  ...tracksActionType,
};
