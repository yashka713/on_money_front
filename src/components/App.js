import React, { Component } from "react";
import MainPage from "./MainPage";
import SignInPage from "./SignInPage";
// reducers
import allReducers from "../reducers";
// routing
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { Route } from "react-router";
import { createStore } from "redux";
import { syncHistoryWithStore } from "react-router-redux";

import createHistory from "../utils/history";

const histories = createHistory;

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const history = syncHistoryWithStore(histories, store);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div>
            <Route exact path="/" component={SignInPage} />
            <Route exact path="/main" component={MainPage} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
