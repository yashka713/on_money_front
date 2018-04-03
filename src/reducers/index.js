import { combineReducers } from "redux";
import auth from "./auth";
import notice from "./notice";

const allReducers = combineReducers({
  auth,
  notice
});

export default allReducers;
