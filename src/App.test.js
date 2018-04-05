import React from "react";
import ReactDOM from "react-dom";
import SignInPage from "./components/SignInPage";

// store
import { Provider } from "react-redux";
import { createStore } from "redux";
// reducer
import allReducers from "./reducers";

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <SignInPage />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
