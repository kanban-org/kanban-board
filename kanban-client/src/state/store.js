import { applyMiddleware, createStore } from "redux";
import reducers from "./reducers";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const composedEnhancer = composeWithDevTools(
  applyMiddleware(thunkMiddleware)
  // other store enhancers if any
);

const store = createStore(reducers, composedEnhancer);

export default store;
