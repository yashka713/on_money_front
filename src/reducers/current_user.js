import { logged } from "../utils/session/checkUser";

const initialState = {
  email: logged.current_user.email || "",
  name: logged.current_user.name || "",
  nickname: logged.current_user.nickname || "",
  isAuthenticated: logged.status >= 200 && logged.status < 300
};

export default function current_user(state = initialState, action) {
  if (action.type === "AUTH_SUCCESS") {
    return {
      ...state,
      isAuthenticated: true
    };
  } else if (action.type === "LOGOUT") {
    return {
      ...state,
      isAuthenticated: false
    };
  }
  return state;
}
