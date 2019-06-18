import { combineReducers } from "redux";
import auth from "./auth";
import notice from "./notice";
import current_user from "./current_user";
import trashIcon from "./trashIcon";
import destroyer from "./destroyer";
import accounts from "./accounts";
import transactions from "./transactions";
import categories from "./categories";
import tags from "./tags";
// routing
import { routerReducer } from "react-router-redux";
import LSProvider from "../services/session/localStorageProvider";

const appReducer = combineReducers({
  router: routerReducer,
  auth,
  current_user,
  notice,
  trashIcon,
  accounts,
  tags,
  transactions,
  categories,
  destroyer
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    LSProvider.clearLS();
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
