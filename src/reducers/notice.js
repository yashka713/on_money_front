const initialState = {
  show: false,
  status: ""
};

export default function notice(state = initialState, action) {
  if (action.type === "SHOW_ALERT") {
    return {
      ...state,
      show: !state.show,
      status: action.payload
    };
  }
  return state;
}
