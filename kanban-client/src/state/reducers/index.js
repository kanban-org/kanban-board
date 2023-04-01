import { combineReducers } from "redux";
import displayReducer from "./displayReducer";
import boardsReducer from "./boardsReducer";
import tracksReducer from "./tracksReducer";

const reducers = combineReducers({
  display: displayReducer,
  boards: boardsReducer,
  tracks: tracksReducer,
});

export default reducers;
