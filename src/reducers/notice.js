import Token from "../services/session/localStorageProvider";

const DEFAULT_MESSAGE = [
  {
    detail: "Something going wrong... Please contact with support"
  }
];

let logged = Token.getToken();

const initialState = {
  showSignInErrorAlert: false,
  showSuccessAlert: !logged,
  showErrorAlert: !logged,
  errorMessages: "",
  noticeMessage: ""
};

export default function notice(state = initialState, action) {
  if (action.type === "SHOW_SIGNIN_ERROR_ALERT") {
    return {
      ...state,
      showSignInErrorAlert: action.payload,
      showSignInSuccessAlert: false,
      showSuccessAlert: false,
      errorMessages: action.payload.body || DEFAULT_MESSAGE
    };
  } else if (action.type === "SHOW_SUCCESS_ALERT") {
    return {
      ...state,
      showSuccessAlert: action.payload.status,
      noticeMessage: action.payload.message
    };
  } else if (action.type === "SHOW_SIGNIN_SUCCESS_ALERT") {
    return {
      ...state,
      showSignInSuccessAlert: action.payload,
      noticeMessage: action.payload,
      showSignInErrorAlert: false
    };
  }

  return state;
}
