import { combineReducers } from "redux";
import displayReducer from "./displayReducer";
import boardsReducer from "./boardsReducer";
import tracksReducer from "./tracksReducer";
import tasksReducer from "./tasksReducer";

const reducers = combineReducers({
  display: displayReducer,
  boards: boardsReducer,
  tracks: tracksReducer,
  tasks: tasksReducer,
});

export default reducers;
