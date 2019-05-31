const initialState = {
  accounts: []
};

export default function accounts(state = initialState, action) {
  if (action.type === "DOWNLOAD_ACCOUNTS") {
    return {
      ...state,
      accounts: action.payload
    };
  } else if (action.type === "ADD_ACCOUNT") {
    return {
      ...state,
      accounts: [...state.accounts, action.payload]
    };
  } else if (action.type === "DESTROY_ACCOUNT") {
    let new_accounts = state.accounts.filter(item => {
      return item.id !== action.payload;
    });

    return {
      ...state,
      accounts: new_accounts
    };
  } else if (action.type === "UPDATE_ACCOUNT") {
    let new_accounts = state.accounts.map(item => {
      return item.id === action.payload.id ? action.payload : item;
    });

    return {
      ...state,
      accounts: new_accounts
    };
  }

  return state;
}
