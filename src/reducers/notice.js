const initialState = {
  showSignInAlert: false
};

export default function notice(state = initialState, action) {
  if (action.type === "SHOW_ERROR_ALERT") {
    return {
      ...state,
      showSignInAlert: action.payload
    };
  }
  return state;
}
