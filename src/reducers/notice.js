import Token from "../services/session/localStorageProvider";

let logged = Token.getToken();

const initialState = {
  showSignInAlert: false,
  showSuccessAlert: !logged,
  errorMessages: ""
};

export default function notice(state = initialState, action) {
  if (action.type === "SHOW_ERROR_ALERT") {
    return {
      ...state,
      showSignInAlert: action.payload,
      errorMessages: action.payload.body
    };
  } else if (action.type === "SHOW_SUCCESS_ALERT") {
    return {
      ...state,
      showSuccessAlert: action.payload
    };
  }
  return state;
}
