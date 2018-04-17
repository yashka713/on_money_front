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
      isAuthenticated: true,
      email: action.payload.email || "",
      name: action.payload.name || "",
      nickname: action.payload.nickname || ""
    };
  } else if (action.type === "LOGOUT") {
    return {
      ...state,
      isAuthenticated: false
    };
  } else if (action.type === "UPDATE_USER") {
    return {
      ...state,
      name: action.payload.name || "",
      nickname: action.payload.nickname || ""
    };
  }
  return state;
}
