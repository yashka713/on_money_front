const initialState = {
  transactions: [],
  relatedFields: []
};

export default function transactions(state = initialState, action) {
  if (action.type === "DOWNLOAD_TRANSACTIONS") {
    // let newTransactions = uniqWith(state.transactions.concat(action.payload), isEqual);
    let newTransactions = action.payload;
    return {
      ...state,
      transactions: newTransactions
    };
  } else if (action.type === "DOWNLOAD_RELATED_FIELDS") {
    // let newRelatedFields = compact(uniqWith(state.relatedFields.concat(action.payload), isEqual));
    let newRelatedFields = action.payload;

    return {
      ...state,
      relatedFields: newRelatedFields
    };
  }

  return state;
}
