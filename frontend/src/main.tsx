import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { Provider } from "react-redux";
import store from "./redux/app/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
)
