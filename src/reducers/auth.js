import checkUser from "../utils/session/checkUser";

function user_present() {
  const status = checkUser();
  return status >= 200 && status < 300;
}

const logged = user_present();

const initialState = {
  email: "",
  password: "",
  isAuthenticated: logged,
  showSuccessAlert: !logged
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
  } else if (action.type === "LOGOUT") {
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
