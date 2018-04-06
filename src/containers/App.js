import React, { Component } from "react";
import MainPage from "./MainPage";
import SignInPage from "./SignInPage";
import PrivateRoute from "./PrivateRoute";
// reducers
import allReducers from "../reducers/index";
// routing
import { Provider } from "react-redux";
import { Route, Switch } from "react-router";
import { createStore, applyMiddleware } from "redux";
import { ConnectedRouter, routerMiddleware } from "react-router-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import createHistory from "../utils/history";

const history = createHistory;
const middleware = routerMiddleware(history);

const store = createStore(
  allReducers,
  composeWithDevTools(applyMiddleware(thunk), applyMiddleware(middleware))
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/login" component={SignInPage} />
            <PrivateRoute exact path="/" component={MainPage} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
