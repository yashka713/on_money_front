import checkUser from "../utils/session/checkUser";

function current_user() {
  const status = checkUser();
  return status >= 200 && status < 300;
}

const initialState = {
  email: "",
  password: "",
  isAuthenticated: current_user(),
  showSuccessAlert: !current_user()
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
      email: state.email,
      password: state.password,
      isAuthenticated: true,
      showSuccessAlert: true
    };
  } else if (action.type === "AUTH_FAIL") {
    return {
      ...state,
      email: state.email,
      password: state.password,
      isAuthenticated: false
    };
  } else if (action.type === "SHOW_SUCCESS_ALERT") {
    return {
      ...state,
      email: state.email,
      password: state.password,
      isAuthenticated: state.isAuthenticated,
      showSuccessAlert: action.payload
    };
  }
  return state;
}
