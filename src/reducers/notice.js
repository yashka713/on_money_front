import { logged } from "../utils/session/checkUser";

const initialState = {
  showSignInAlert: false,
  showSuccessAlert: !logged
};

export default function notice(state = initialState, action) {
  if (action.type === "SHOW_ERROR_ALERT") {
    return {
      ...state,
      showSignInAlert: action.payload
    };
  } else if (action.type === "SHOW_SUCCESS_ALERT") {
    return {
      ...state,
      showSuccessAlert: action.payload
    };
  }
  return state;
}
