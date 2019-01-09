const initialState = {
  destroy_item: {}
};

export default function destroyer(state = initialState, action) {
  if (action.type === "UPDATE_DESTROYER") {
    return {
      ...state,
      destroy_item: action.payload.item
    };
  } else if (action.type === "CLEAR_DESTROYER") {
    return {
      ...state,
      destroy_item: {}
    };
  }
  return state;
}
