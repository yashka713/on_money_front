import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
// store
import { Provider } from "react-redux";
import { createStore } from "redux";
// reducer
import allReducers from "./reducers";

import registerServiceWorker from "./registerServiceWorker";
// import Bootstrap styles
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";

import "./dest/main.css";

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
