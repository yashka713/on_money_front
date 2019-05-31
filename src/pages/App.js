import React, { Component } from "react";
// reducers
import allReducers from "../reducers/index";
// routing
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { ConnectedRouter, routerMiddleware } from "react-router-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import createHistory from "../services/history";
import Main from "./Main";
import { Route } from "react-router";
import SignInPage from "./loginPage/SignInPage";

const history = createHistory;
const middleware = routerMiddleware(history);

export const store = createStore(
  allReducers,
  composeWithDevTools(applyMiddleware(thunk), applyMiddleware(middleware))
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Main />
            {/*Here should be all Routes*/}
            <Route path="/login" component={SignInPage} />
            {/*Here should be all Routes*/}
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
