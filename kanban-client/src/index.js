import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GlobalContextProvider } from "./context/globalContext";
import "./index.scss";
import store from "./state/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </GlobalContextProvider>
  </React.StrictMode>
);
