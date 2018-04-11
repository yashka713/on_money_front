import { combineReducers } from "redux";
import auth from "./auth";
import notice from "./notice";
import current_user from "./current_user";
// routing
import { routerReducer } from "react-router-redux";

const allReducers = combineReducers({
  router: routerReducer,
  auth,
  current_user,
  notice
});

export default allReducers;
