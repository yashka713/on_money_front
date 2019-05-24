const initialState = {
  tags: []
};

export default function tags(state = initialState, action) {
  if (action.type === "DOWNLOAD_TAGS") {
    return {
      ...state,
      tags: action.payload
    };
  } else if (action.type === "CHECK_TAG") {
    const tagExist = state.tags.map(tag => tag.id).includes(action.payload.id);

    let new_tags = [];
    if (tagExist) {
      new_tags = state.tags;
    } else {
      new_tags = [...state.tags, action.payload];
    }

    return {
      ...state,
      tags: new_tags
    };
  } else if (action.type === "DESTROY_TAG") {
    const new_tags = state.tags.filter(item => {
      return item.id !== action.payload;
    });

    return {
      ...state,
      tags: new_tags
    };
  } else if (action.type === "UPDATE_TAG") {
    const new_tags = state.tags.map(tag => {
      return tag.id === action.payload.id ? action.payload : tag;
    });

    return {
      ...state,
      tags: new_tags
    };
  }

  return state;
}
