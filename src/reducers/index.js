import { combineReducers } from "redux";
import auth from "./auth";
import notice from "./notice";
import current_user from "./current_user";
import trashIcon from "./trashIcon";
import destroyer from "./destroyer";
import accounts from "./accounts";
import transactions from "./transactions";
import categories from "./categories";
// routing
import { routerReducer } from "react-router-redux";

const allReducers = combineReducers({
  router: routerReducer,
  auth,
  current_user,
  notice,
  trashIcon,
  accounts,
  transactions,
  categories,
  destroyer
});

export default allReducers;
