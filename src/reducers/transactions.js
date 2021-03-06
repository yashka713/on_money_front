import orderBy from "lodash/orderBy";

const initialState = {
  transactions: []
};

export default function transactions(state = initialState, action) {
  if (action.type === "DOWNLOAD_TRANSACTIONS") {
    let transactions = action.payload;
    return {
      ...state,
      transactions: transactions
    };
  } else if (action.type === "NEW_TRANSACTION") {
    let transactions = orderBy(
      state.transactions.concat(action.payload),
      item => new Date(item.attributes.date),
      ["desc"]
    );

    return {
      ...state,
      transactions: transactions
    };
  } else if (action.type === "DELETE_TRANSACTION") {
    let new_transactions = state.transactions.filter(item => {
      return item.id !== action.payload.id;
    });

    return {
      ...state,
      transactions: new_transactions
    };
  } else if (action.type === "UPDATE_TRANSACTION") {
    let new_transactions = state.transactions.filter(item => {
      return item.id !== action.payload.id;
    });

    let transactions = orderBy(
      new_transactions.concat(action.payload),
      item => new Date(item.attributes.date),
      ["desc"]
    );

    return {
      ...state,
      transactions: transactions
    };
  }

  return state;
}
