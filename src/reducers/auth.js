const initialState = {
  email: "",
  password: ""
};

export default function auth(state = initialState, action) {
  if (action.type === "CHANGE_EMAIL") {
    return {
      ...state,
      email: action.payload,
      password: state.password
    };
  } else if (action.type === "CHANGE_PASSWORD") {
    return {
      ...state,
      email: state.email,
      password: action.payload
    };
  } else if (action.type === "CLEAR_SIGN_FIELDS") {
    return {
      ...state,
      email: "",
      password: ""
    };
  }
  return state;
}
