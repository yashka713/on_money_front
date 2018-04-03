const initialState = {
  show: false
};

export default function notice(state = initialState, action) {
  if (action.type === "SHOW_ALERT") {
    return {
      ...state,
      show: action.payload
    };
  }
  return state;
}
