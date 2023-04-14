import { applyMiddleware, createStore } from "redux";
import reducers from "./reducers";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { addCurrentBoardToLocalStorage } from "./middleware";

const middleware = [thunkMiddleware, addCurrentBoardToLocalStorage];

const composedEnhancer = composeWithDevTools(
  applyMiddleware(...middleware)
  // other store enhancers if any
);

const store = createStore(reducers, composedEnhancer);

export default store;
