let initialState = {
  id: 0,
  email: "",
  name: "",
  nickname: "",
  isAuthenticated: false
};

export default function current_user(state = initialState, action) {
  if (action.type === "AUTH_SUCCESS") {
    return {
      ...state,
      isAuthenticated: true,
      id: action.payload.id || 0,
      email: action.payload.email || "",
      name: action.payload.name || "",
      nickname: action.payload.nickname || ""
    };
  } else if (action.type === "UPDATE_PROFILE") {
    return {
      ...state,
      name: action.payload.name || "",
      nickname: action.payload.nickname || ""
    };
  } else if (action.type === "UPDATE_USER") {
    return {
      ...state,
      name: action.payload.name || "",
      nickname: action.payload.nickname || ""
    };
  }
  return state;
}
