import { logged } from "../utils/session/checkUser";

const initialState = {
  email: "",
  password: "",
  isAuthenticated: logged
};

export default function auth(state = initialState, action) {
  if (action.type === "CHANGE_EMAIL") {
    return {
      ...state,
      email: action.payload,
      password: state.password,
      isAuthenticated: state.isAuthenticated
    };
  } else if (action.type === "CHANGE_PASSWORD") {
    return {
      ...state,
      email: state.email,
      password: action.payload,
      isAuthenticated: state.isAuthenticated
    };
  } else if (action.type === "AUTH_SUCCESS") {
    return {
      ...state,
      email: "",
      password: "",
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
