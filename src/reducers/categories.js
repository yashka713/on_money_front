const initialState = {
  categories: {
    charge: [],
    profit: []
  }
};

export default function categories(state = initialState, action) {
  if (action.type === "DOWNLOAD_CHARGE_CATEGORIES") {
    return {
      ...state,
      categories: {
        ...state.categories,
        charge: action.payload.items
      }
    };
  } else if (action.type === "DOWNLOAD_PROFIT_CATEGORIES") {
    return {
      ...state,
      categories: {
        ...state.categories,
        profit: action.payload.items
      }
    };
  } else if (action.type === "ADD_CHARGE_CATEGORIES") {
    return {
      ...state,
      categories: {
        ...state.categories,
        charge: [...state.categories.charge, action.payload]
      }
    };
  } else if (action.type === "ADD_PROFIT_CATEGORIES") {
    return {
      ...state,
      categories: {
        ...state.categories,
        profit: [...state.categories.profit, action.payload]
      }
    };
  } else if (action.type === "HIDE_CHARGE_CATEGORIES") {
    let new_categories = state.categories.charge.filter(item => {
      return item.id !== action.payload;
    });

    return {
      ...state,
      categories: {
        ...state.categories,
        charge: new_categories
      }
    };
  } else if (action.type === "HIDE_PROFIT_CATEGORIES") {
    let new_categories = state.categories.profit.filter(item => {
      return item.id !== action.payload;
    });

    return {
      ...state,
      categories: {
        ...state.categories,
        profit: new_categories
      }
    };
  } else if (action.type === "UPDATE_CHARGE_CATEGORIES") {
    let new_categories = state.categories.charge.map(item => {
      return item.id === action.payload.id ? action.payload : item;
    });

    return {
      ...state,
      categories: {
        ...state.categories,
        charge: new_categories
      }
    };
  } else if (action.type === "UPDATE_PROFIT_CATEGORIES") {
    let new_categories = state.categories.profit.map(item => {
      return item.id === action.payload ? action.payload : item;
    });

    return {
      ...state,
      categories: {
        ...state.categories,
        profit: new_categories
      }
    };
  }

  return state;
}
