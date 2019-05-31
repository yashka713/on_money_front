const initialState = {
  showTrashIcon: false
};

export default function trashIcon(state = initialState, action) {
  if (action.type === "SHOW_TRASH_ICON") {
    return {
      ...state,
      showTrashIcon: action.payload
    };
  }
  return state;
}
