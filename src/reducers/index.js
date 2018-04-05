import { combineReducers } from "redux";
import auth from "./auth";
import notice from "./notice";
// routing
import { routerReducer } from "react-router-redux";

const allReducers = combineReducers({
  router: routerReducer,
  auth,
  notice
});

export default allReducers;
