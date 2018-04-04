const initialState = {
  email: "",
  password: "",
  login: false
};

export default function auth(state = initialState, action) {
  if (action.type === "CHANGE_EMAIL") {
    return {
      ...state,
      email: action.payload,
      password: state.password,
      login: state.login
    };
  } else if (action.type === "CHANGE_PASSWORD") {
    return {
      ...state,
      email: state.email,
      password: action.payload,
      login: state.login
    };
  } else if (action.type === "SET_LOGIN") {
    return {
      ...state,
      email: state.email,
      password: state.password,
      login: action.payload
    };
  }
  return state;
}
