import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GlobalContextProvider } from "./context/globalContext";
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<GlobalContextProvider>
			<App />
		</GlobalContextProvider>
	</React.StrictMode>
);
